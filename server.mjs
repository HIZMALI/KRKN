import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const staticDir = resolve(rootDir, process.env.STATIC_DIR || 'server-dist');
const dataDir = resolve(rootDir, process.env.DATA_DIR || 'data');
const uploadDir = resolve(rootDir, process.env.UPLOAD_DIR || 'uploads');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
const adminUser = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || '';
const sessionHours = Math.max(1, Number(process.env.ADMIN_SESSION_HOURS || 8));
const maxCatalogProducts = 750;
const sessions = new Map();
const loginAttempts = new Map();
const inquiryAttempts = new Map();

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

await Promise.all([mkdir(dataDir, { recursive: true }), mkdir(uploadDir, { recursive: true })]);

const catalogFile = join(dataDir, 'catalog.json');
const inquiriesFile = join(dataDir, 'inquiries.json');
const subscribersFile = join(dataDir, 'subscribers.json');

function setSecurityHeaders(response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  );
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request, maxBytes = 256_000) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBytes) throw new Error('PAYLOAD_TOO_LARGE');
    chunks.push(chunk);
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function readJsonFile(path, fallback) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') return fallback;
    throw error;
  }
}

async function writeJsonFile(path, value) {
  const tempPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rename(tempPath, path);
}

function isSameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;

  try {
    return new URL(origin).host === request.headers.host;
  } catch {
    return false;
  }
}

function parseCookies(request) {
  return Object.fromEntries(
    String(request.headers.cookie || '')
      .split(';')
      .map((item) => item.trim().split('='))
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key, decodeURIComponent(value)]),
  );
}

function getSession(request) {
  const token = parseCookies(request).krkn_admin;
  const session = token ? sessions.get(token) : null;
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  return { token, ...session };
}

function requireAdmin(request, response) {
  const session = getSession(request);
  if (!session) {
    sendJson(response, 401, { ok: false, error: 'Unauthorized' });
    return null;
  }
  return session;
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function clientIp(request) {
  return String(request.headers['x-forwarded-for'] || request.socket.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
}

function rateLimited(store, key, limit, windowMs) {
  const now = Date.now();
  const current = store.get(key);
  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > limit;
}

function validateCatalog(payload) {
  if (!payload || !Array.isArray(payload.products)) return false;
  if (payload.products.length < 1 || payload.products.length > maxCatalogProducts) return false;

  return payload.products.every((product) =>
    product &&
    typeof product.id === 'string' &&
    typeof product.name?.en === 'string' &&
    typeof product.name?.es === 'string' &&
    typeof product.description?.en === 'string' &&
    typeof product.description?.es === 'string' &&
    typeof product.category === 'string' &&
    typeof product.price === 'string' &&
    typeof product.stock === 'string' &&
    typeof product.brand === 'string' &&
    Array.isArray(product.compatibility),
  );
}

function cleanText(value, maxLength = 500) {
  return String(value ?? '').trim().slice(0, maxLength);
}

async function handleApi(request, response, url) {
  if (!isSameOrigin(request) && request.method !== 'GET') {
    sendJson(response, 403, { ok: false, error: 'Origin rejected' });
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/api/health') {
    sendJson(response, 200, {
      ok: true,
      service: 'krkn-garage',
      adminConfigured: Boolean(adminPassword),
    });
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/api/catalog') {
    const catalog = await readJsonFile(catalogFile, { version: 1, useDefaults: true, products: [] });
    sendJson(response, 200, catalog);
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/inquiries') {
    const ip = clientIp(request);
    if (rateLimited(inquiryAttempts, ip, 8, 15 * 60_000)) {
      sendJson(response, 429, { ok: false, error: 'Too many requests' });
      return true;
    }

    const body = await readJsonBody(request);
    if (body.website) {
      sendJson(response, 200, { ok: true });
      return true;
    }

    const inquiry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'new',
      language: body.language === 'es' ? 'es' : 'en',
      fullName: cleanText(body.fullName, 120),
      email: cleanText(body.email, 180).toLowerCase(),
      phone: cleanText(body.phone, 80),
      country: cleanText(body.country, 100),
      make: cleanText(body.make, 100),
      model: cleanText(body.model, 100),
      year: cleanText(body.year, 12),
      engine: cleanText(body.engine, 100),
      service: cleanText(body.service, 160),
      message: cleanText(body.message, 3000),
    };

    if (!inquiry.fullName || !inquiry.email || !inquiry.service || !inquiry.email.includes('@')) {
      sendJson(response, 400, { ok: false, error: 'Required fields are missing' });
      return true;
    }

    const data = await readJsonFile(inquiriesFile, { version: 1, inquiries: [] });
    data.inquiries = [inquiry, ...(Array.isArray(data.inquiries) ? data.inquiries : [])].slice(0, 2000);
    await writeJsonFile(inquiriesFile, data);
    sendJson(response, 201, { ok: true, id: inquiry.id });
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/newsletter') {
    const body = await readJsonBody(request, 32_000);
    const email = cleanText(body.email, 180).toLowerCase();
    if (!email.includes('@')) {
      sendJson(response, 400, { ok: false, error: 'Valid email required' });
      return true;
    }
    const data = await readJsonFile(subscribersFile, { version: 1, subscribers: [] });
    const subscribers = Array.isArray(data.subscribers) ? data.subscribers : [];
    if (!subscribers.some((item) => item.email === email)) {
      subscribers.unshift({ email, createdAt: new Date().toISOString() });
      data.subscribers = subscribers.slice(0, 5000);
      await writeJsonFile(subscribersFile, data);
    }
    sendJson(response, 201, { ok: true });
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/admin/login') {
    const ip = clientIp(request);
    if (rateLimited(loginAttempts, ip, 6, 15 * 60_000)) {
      sendJson(response, 429, { ok: false, error: 'Too many login attempts. Try again later.' });
      return true;
    }
    if (!adminPassword) {
      sendJson(response, 503, { ok: false, error: 'ADMIN_PASSWORD is not configured on the server.' });
      return true;
    }
    const body = await readJsonBody(request, 32_000);
    if (!safeEqual(body.username, adminUser) || !safeEqual(body.password, adminPassword)) {
      sendJson(response, 401, { ok: false, error: 'Invalid username or password.' });
      return true;
    }

    loginAttempts.delete(ip);
    const token = randomBytes(32).toString('base64url');
    const expiresAt = Date.now() + sessionHours * 60 * 60_000;
    sessions.set(token, { username: adminUser, expiresAt });
    const forwardedProto = String(request.headers['x-forwarded-proto'] || '');
    const secure = process.env.NODE_ENV === 'production' || forwardedProto.includes('https');
    response.setHeader(
      'Set-Cookie',
      `krkn_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${sessionHours * 3600}${secure ? '; Secure' : ''}`,
    );
    sendJson(response, 200, { ok: true, username: adminUser });
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/api/admin/session') {
    const session = getSession(request);
    sendJson(response, session ? 200 : 401, {
      ok: Boolean(session),
      configured: Boolean(adminPassword),
      username: session?.username,
    });
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/admin/logout') {
    const session = getSession(request);
    if (session) sessions.delete(session.token);
    response.setHeader('Set-Cookie', 'krkn_admin=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (request.method === 'PUT' && url.pathname === '/api/admin/catalog') {
    if (!requireAdmin(request, response)) return true;
    const body = await readJsonBody(request, 8_000_000);
    if (!validateCatalog(body)) {
      sendJson(response, 400, { ok: false, error: 'Catalog validation failed.' });
      return true;
    }
    const catalog = {
      version: 1,
      useDefaults: false,
      updatedAt: new Date().toISOString(),
      products: body.products,
    };
    await writeJsonFile(catalogFile, catalog);
    sendJson(response, 200, { ok: true, updatedAt: catalog.updatedAt, count: catalog.products.length });
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/api/admin/inquiries') {
    if (!requireAdmin(request, response)) return true;
    const data = await readJsonFile(inquiriesFile, { version: 1, inquiries: [] });
    sendJson(response, 200, data);
    return true;
  }

  if (request.method === 'PATCH' && url.pathname.startsWith('/api/admin/inquiries/')) {
    if (!requireAdmin(request, response)) return true;
    const id = decodeURIComponent(url.pathname.split('/').pop() || '');
    const body = await readJsonBody(request, 32_000);
    const allowedStatuses = new Set(['new', 'contacted', 'archived']);
    if (!allowedStatuses.has(body.status)) {
      sendJson(response, 400, { ok: false, error: 'Invalid status.' });
      return true;
    }
    const data = await readJsonFile(inquiriesFile, { version: 1, inquiries: [] });
    const inquiry = data.inquiries?.find((item) => item.id === id);
    if (!inquiry) {
      sendJson(response, 404, { ok: false, error: 'Inquiry not found.' });
      return true;
    }
    inquiry.status = body.status;
    inquiry.updatedAt = new Date().toISOString();
    await writeJsonFile(inquiriesFile, data);
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/admin/media') {
    if (!requireAdmin(request, response)) return true;
    const body = await readJsonBody(request, 8_000_000);
    const typeToExtension = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
    };
    const extension = typeToExtension[body.type];
    const match = typeof body.data === 'string' ? body.data.match(/^data:image\/(?:jpeg|png|webp);base64,(.+)$/) : null;
    if (!extension || !match) {
      sendJson(response, 400, { ok: false, error: 'Only JPG, PNG and WebP images are supported.' });
      return true;
    }
    const buffer = Buffer.from(match[1], 'base64');
    if (!buffer.length || buffer.length > 5_000_000) {
      sendJson(response, 400, { ok: false, error: 'Image must be smaller than 5 MB.' });
      return true;
    }
    const fileName = `${Date.now()}-${randomBytes(6).toString('hex')}${extension}`;
    await writeFile(join(uploadDir, fileName), buffer);
    sendJson(response, 201, { ok: true, path: `/uploads/${fileName}` });
    return true;
  }

  return false;
}

async function sendFile(request, response, path, cacheControl) {
  const fileStat = await stat(path);
  const type = mimeTypes[extname(path).toLowerCase()] || 'application/octet-stream';
  const range = request.headers.range;
  response.setHeader('Content-Type', type);
  response.setHeader('Accept-Ranges', 'bytes');
  response.setHeader('Cache-Control', cacheControl);

  if (range) {
    const [startValue, endValue] = range.replace(/bytes=/, '').split('-');
    const start = Number(startValue || 0);
    const end = Math.min(Number(endValue || fileStat.size - 1), fileStat.size - 1);
    if (Number.isNaN(start) || Number.isNaN(end) || start > end) {
      response.writeHead(416, { 'Content-Range': `bytes */${fileStat.size}` });
      response.end();
      return;
    }
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
      'Content-Length': end - start + 1,
    });
    createReadStream(path, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, { 'Content-Length': fileStat.size });
  createReadStream(path).pipe(response);
}

async function serveStatic(request, response, url) {
  const isUpload = url.pathname.startsWith('/uploads/');
  const baseDir = isUpload ? uploadDir : staticDir;
  const relativePath = decodeURIComponent(isUpload ? url.pathname.slice('/uploads/'.length) : url.pathname.slice(1));
  let filePath = resolve(baseDir, relativePath || 'index.html');
  const allowedPrefix = `${baseDir}${sep}`;

  if (filePath !== baseDir && !filePath.startsWith(allowedPrefix)) {
    sendJson(response, 403, { ok: false, error: 'Forbidden' });
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = join(filePath, 'index.html');
    const immutable = !isUpload && url.pathname.startsWith('/assets/');
    await sendFile(request, response, filePath, immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=300');
  } catch (error) {
    if (!isUpload && request.method === 'GET' && !extname(url.pathname)) {
      await sendFile(request, response, join(staticDir, 'index.html'), 'no-cache');
      return;
    }
    sendJson(response, error?.code === 'ENOENT' ? 404 : 500, { ok: false, error: 'Not found' });
  }
}

const server = createServer(async (request, response) => {
  setSecurityHeaders(response);
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

  try {
    if (url.pathname.startsWith('/api/')) {
      const handled = await handleApi(request, response, url);
      if (!handled) sendJson(response, 404, { ok: false, error: 'API route not found' });
      return;
    }

    if (!['GET', 'HEAD'].includes(request.method || 'GET')) {
      sendJson(response, 405, { ok: false, error: 'Method not allowed' });
      return;
    }

    await serveStatic(request, response, url);
  } catch (error) {
    const status = error?.message === 'PAYLOAD_TOO_LARGE' ? 413 : 500;
    console.error('[KRKN server]', error);
    if (!response.headersSent) sendJson(response, status, { ok: false, error: status === 413 ? 'Payload too large' : 'Server error' });
    else response.end();
  }
});

setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(token);
  }
}, 30 * 60_000).unref();

server.listen(port, host, () => {
  console.log(`KRKN Garage server listening on http://${host}:${port}`);
  if (!adminPassword) console.warn('ADMIN_PASSWORD is not configured. Admin login is disabled.');
});
