# KRKN Garage Production Deployment

This project now runs as a small Node.js application. The Node server serves the website, stores the live product catalog, receives quote requests and protects the admin studio.

## 1. Production build

Run once on the deployment machine or CI system:

```bash
npm ci
npm run build:server
```

`npm ci` is only needed on a clean server. It is not needed when `node_modules` is already present and current.

## 2. Required environment variables

Configure these in the hosting panel, systemd, PM2 or the container platform:

```text
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
ADMIN_USERNAME=admin
ADMIN_PASSWORD=use-a-long-unique-password
ADMIN_SESSION_HOURS=8
```

Do not put the real password in Git. `.env.example` is only a template; `server.mjs` reads variables supplied by the hosting environment.

## 3. Start command

```bash
npm start
```

Point `krkngarage.com` to this Node process with the hosting panel or a reverse proxy. HTTPS should terminate at the hosting platform or proxy.

Public website: `https://krkngarage.com/`

Admin studio: `https://krkngarage.com/admin`

## 4. Persistent directories

The following directories must survive deployments and be writable by the Node process:

- `data/`: live catalog, quote requests and newsletter subscribers
- `uploads/`: images uploaded from the admin studio

For platforms that replace the release directory, set persistent absolute locations:

```text
DATA_DIR=/persistent/krkn/data
UPLOAD_DIR=/persistent/krkn/uploads
STATIC_DIR=/path/to/release/server-dist
```

Back up `data/` and `uploads/` regularly. The admin studio can also export the full catalog as JSON.

## 5. Reverse proxy example

```nginx
server {
  listen 443 ssl http2;
  server_name krkngarage.com www.krkngarage.com;

  client_max_body_size 8m;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## 6. Admin workflow

1. Sign in at `/admin`.
2. Add, edit, duplicate or delete products in either language.
3. Upload JPG, PNG or WebP product images up to 5 MB.
4. Save edits to the unpublished draft.
5. Select **Publish Changes** to update the live shop immediately.
6. Review consultation requests under **Consultations** and mark them contacted or archived.

The website falls back to the built-in product catalog until the first catalog publication. No source-code edit or rebuild is required for later product changes.

## 7. Health check

The hosting platform can monitor:

```text
GET /api/health
```

It returns whether the service is running and whether the admin password is configured.
