import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Copy,
  Download,
  ExternalLink,
  ImagePlus,
  Languages,
  LockKeyhole,
  LogOut,
  Package,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Upload,
} from 'lucide-react';
import { ChangeEvent, FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { CatalogPayload, CategoryId, Language, Product, StockStatus, catalogProductsFrom, categoryIds } from './catalog';

type InquiryStatus = 'new' | 'contacted' | 'archived';

type Inquiry = {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  language: Language;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  make?: string;
  model?: string;
  year?: string;
  engine?: string;
  service: string;
  message?: string;
};

type AdminCopy = {
  studio: string;
  subtitle: string;
  loginTitle: string;
  loginBody: string;
  username: string;
  password: string;
  login: string;
  configuredError: string;
  catalog: string;
  inquiries: string;
  productCount: string;
  stockCount: string;
  leadCount: string;
  search: string;
  addProduct: string;
  publish: string;
  published: string;
  unsaved: string;
  import: string;
  export: string;
  logout: string;
  storefront: string;
  editProduct: string;
  newProduct: string;
  identity: string;
  content: string;
  commerce: string;
  fitment: string;
  media: string;
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  category: string;
  price: string;
  originalPrice: string;
  brand: string;
  stock: string;
  badgeEn: string;
  badgeEs: string;
  compatibility: string;
  tags: string;
  image: string;
  imageHint: string;
  uploadImage: string;
  sale: string;
  saveDraft: string;
  cancel: string;
  edit: string;
  duplicate: string;
  delete: string;
  confirmDelete: string;
  noProducts: string;
  noInquiries: string;
  newLead: string;
  contacted: string;
  archived: string;
  vehicle: string;
  service: string;
  message: string;
  markContacted: string;
  archive: string;
  restore: string;
  loginFailed: string;
  publishFailed: string;
  importFailed: string;
  savedDraft: string;
  validation: string;
  serverUnavailable: string;
  refresh: string;
};

const adminCopy: Record<Language, AdminCopy> = {
  en: {
    studio: 'KRKN Operations Studio', subtitle: 'Catalog, media and consultation management', loginTitle: 'Secure admin access', loginBody: 'Sign in with the credentials configured on the KRKN server.', username: 'Username', password: 'Password', login: 'Sign In', configuredError: 'Admin access is not configured on the server. Set ADMIN_PASSWORD before launch.', catalog: 'Catalog', inquiries: 'Consultations', productCount: 'Products', stockCount: 'Available', leadCount: 'New requests', search: 'Search products', addProduct: 'Add Product', publish: 'Publish Changes', published: 'Catalog published successfully.', unsaved: 'Unpublished changes', import: 'Import JSON', export: 'Export JSON', logout: 'Sign Out', storefront: 'View Website', editProduct: 'Edit product', newProduct: 'New product', identity: 'Product identity', content: 'Bilingual content', commerce: 'Pricing and status', fitment: 'Fitment and search', media: 'Product media', id: 'Product ID', nameEn: 'English name', nameEs: 'Spanish name', descriptionEn: 'English description', descriptionEs: 'Spanish description', category: 'Category', price: 'Display price', originalPrice: 'Original price', brand: 'Brand', stock: 'Stock status', badgeEn: 'English badge', badgeEs: 'Spanish badge', compatibility: 'Compatible vehicles, one per line', tags: 'Search tags, comma separated', image: 'Image path or URL', imageHint: 'Use /uploads/... or an existing /assets/images/... path.', uploadImage: 'Upload Image', sale: 'Show sale styling', saveDraft: 'Save to Draft', cancel: 'Cancel', edit: 'Edit', duplicate: 'Duplicate', delete: 'Delete', confirmDelete: 'Confirm delete', noProducts: 'No products match this search.', noInquiries: 'No consultation requests yet.', newLead: 'New', contacted: 'Contacted', archived: 'Archived', vehicle: 'Vehicle', service: 'Service', message: 'Message', markContacted: 'Mark Contacted', archive: 'Archive', restore: 'Restore as New', loginFailed: 'Could not sign in.', publishFailed: 'Could not publish changes.', importFailed: 'The selected catalog file is not valid.', savedDraft: 'Product saved to the unpublished draft.', validation: 'Complete both languages, price, brand and at least one compatibility value.', serverUnavailable: 'The KRKN API is unavailable. Run the production server to use admin tools.', refresh: 'Refresh',
  },
  es: {
    studio: 'KRKN Operations Studio', subtitle: 'Gestión de catálogo, medios y consultas', loginTitle: 'Acceso seguro de administración', loginBody: 'Inicia sesión con las credenciales configuradas en el servidor KRKN.', username: 'Usuario', password: 'Contraseña', login: 'Iniciar sesión', configuredError: 'El acceso de administración no está configurado. Define ADMIN_PASSWORD antes del lanzamiento.', catalog: 'Catálogo', inquiries: 'Consultas', productCount: 'Productos', stockCount: 'Disponibles', leadCount: 'Solicitudes nuevas', search: 'Buscar productos', addProduct: 'Añadir producto', publish: 'Publicar cambios', published: 'Catálogo publicado correctamente.', unsaved: 'Cambios sin publicar', import: 'Importar JSON', export: 'Exportar JSON', logout: 'Cerrar sesión', storefront: 'Ver sitio', editProduct: 'Editar producto', newProduct: 'Nuevo producto', identity: 'Identidad del producto', content: 'Contenido bilingüe', commerce: 'Precio y estado', fitment: 'Fitment y búsqueda', media: 'Medios del producto', id: 'ID del producto', nameEn: 'Nombre en inglés', nameEs: 'Nombre en español', descriptionEn: 'Descripción en inglés', descriptionEs: 'Descripción en español', category: 'Categoría', price: 'Precio visible', originalPrice: 'Precio original', brand: 'Marca', stock: 'Estado de stock', badgeEn: 'Badge en inglés', badgeEs: 'Badge en español', compatibility: 'Vehículos compatibles, uno por línea', tags: 'Tags de búsqueda, separados por coma', image: 'Ruta o URL de imagen', imageHint: 'Usa /uploads/... o una ruta /assets/images/... existente.', uploadImage: 'Subir imagen', sale: 'Mostrar estilo de oferta', saveDraft: 'Guardar borrador', cancel: 'Cancelar', edit: 'Editar', duplicate: 'Duplicar', delete: 'Eliminar', confirmDelete: 'Confirmar eliminación', noProducts: 'Ningún producto coincide con la búsqueda.', noInquiries: 'Todavía no hay solicitudes de consulta.', newLead: 'Nueva', contacted: 'Contactado', archived: 'Archivada', vehicle: 'Vehículo', service: 'Servicio', message: 'Mensaje', markContacted: 'Marcar contactado', archive: 'Archivar', restore: 'Restaurar como nueva', loginFailed: 'No se pudo iniciar sesión.', publishFailed: 'No se pudieron publicar los cambios.', importFailed: 'El archivo de catálogo seleccionado no es válido.', savedDraft: 'Producto guardado en el borrador sin publicar.', validation: 'Completa ambos idiomas, precio, marca y al menos un valor de compatibilidad.', serverUnavailable: 'La API de KRKN no está disponible. Ejecuta el servidor de producción para usar el panel.', refresh: 'Actualizar',
  },
};

const categoryLabels: Record<Language, Record<CategoryId, string>> = {
  en: { exhaust: 'Exhaust Systems', intake: 'Air Intake Systems', performance: 'Engine / Performance', suspension: 'Suspension', brakes: 'Brakes', carbon: 'Carbon / Exterior', 'body-kit': 'Body Kits', wheels: 'Wheels / Tires', lighting: 'Lighting', interior: 'Interior', electronics: 'Electronics / Software', 'car-care': 'Car Care', detailing: 'Detailing / Protection', 'track-drag': 'Track / Drag', 'suv-truck': 'SUV / Truck', merchandise: 'Merchandise' },
  es: { exhaust: 'Sistemas de escape', intake: 'Sistemas air intake', performance: 'Motor / Rendimiento', suspension: 'Suspensión', brakes: 'Frenos', carbon: 'Carbono / Exterior', 'body-kit': 'Body kits', wheels: 'Ruedas / Neumáticos', lighting: 'Iluminación', interior: 'Interior', electronics: 'Electrónica / Software', 'car-care': 'Cuidado del vehículo', detailing: 'Detailing / Protección', 'track-drag': 'Track / Drag', 'suv-truck': 'SUV / Truck', merchandise: 'Merchandising' },
};

const stockLabels: Record<Language, Record<StockStatus, string>> = {
  en: { in: 'In Stock', low: 'Low Stock', preorder: 'Pre-order' },
  es: { in: 'En stock', low: 'Stock limitado', preorder: 'Preventa' },
};

const adminDraftKey = 'krkn-admin-catalog-draft-v1';

function makeProduct(): Product {
  return {
    id: '',
    name: { en: '', es: '' },
    description: { en: '', es: '' },
    category: 'performance',
    price: '',
    stock: 'in',
    brand: 'KRKN Eluxx Customs',
    compatibility: ['Universal'],
    tags: [],
    visual: 'visual-performance',
  };
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'same-origin',
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload as T;
}

function Field({ label, children, full = false }: { label: string; children: ReactNode; full?: boolean }) {
  return <label className={`admin-field ${full ? 'admin-field-full' : ''}`}><span>{label}</span>{children}</label>;
}

export default function AdminStudio({
  language,
  setLanguage,
  products,
  onProductsChange,
  productImage,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  products: Product[];
  onProductsChange: (products: Product[]) => void;
  productImage: (product: Product) => string;
}) {
  const c = adminCopy[language];
  const [authState, setAuthState] = useState<'checking' | 'guest' | 'authenticated' | 'offline'>('checking');
  const [configured, setConfigured] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'catalog' | 'inquiries'>('catalog');
  const [draftProducts, setDraftProducts] = useState<Product[]>(products);
  const [editing, setEditing] = useState<Product | null>(null);
  const [originalId, setOriginalId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState('');
  const [pendingDelete, setPendingDelete] = useState('');
  const [uploading, setUploading] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const importRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = `${c.studio} | KRKN Eluxx Customs`;
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const createdRobots = !robots;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow, noarchive';
    return () => {
      if (createdRobots) robots?.remove();
    };
  }, [c.studio]);

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'same-origin', cache: 'no-store' })
      .then(async (response) => {
        const result = await response.json();
        setConfigured(result.configured);
        setAuthState(result.ok ? 'authenticated' : 'guest');
      })
      .catch(() => setAuthState('offline'));
  }, []);

  useEffect(() => {
    if (authState !== 'authenticated') return;
    try {
      const savedDraft = catalogProductsFrom(JSON.parse(localStorage.getItem(adminDraftKey) || 'null'));
      if (savedDraft) {
        setDraftProducts(savedDraft);
        setDirty(true);
      }
    } catch {
      localStorage.removeItem(adminDraftKey);
    }
  }, [authState]);

  useEffect(() => {
    if (!dirty) return;
    const payload: CatalogPayload = { version: 1, useDefaults: false, products: draftProducts };
    localStorage.setItem(adminDraftKey, JSON.stringify(payload));
  }, [dirty, draftProducts]);

  useEffect(() => {
    if (!dirty) setDraftProducts(products);
  }, [dirty, products]);

  const loadInquiries = () => {
    api<{ inquiries: Inquiry[] }>('/api/admin/inquiries')
      .then((result) => setInquiries(Array.isArray(result.inquiries) ? result.inquiries : []))
      .catch(() => setStatus(c.publishFailed));
  };

  useEffect(() => {
    if (authState === 'authenticated') loadInquiries();
  }, [authState]);

  const filteredProducts = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return draftProducts;
    return draftProducts.filter((product) =>
      [product.name.en, product.name.es, product.brand, product.category, product.compatibility.join(' '), (product.tags || []).join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [draftProducts, search]);

  const newInquiryCount = inquiries.filter((inquiry) => inquiry.status === 'new').length;
  const inStockCount = draftProducts.filter((product) => product.stock === 'in').length;

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError('');
    const data = new FormData(event.currentTarget);
    try {
      await api('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username: data.get('username'), password: data.get('password') }),
      });
      setAuthState('authenticated');
      event.currentTarget.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setLoginError(message.includes('ADMIN_PASSWORD') ? c.configuredError : c.loginFailed);
    }
  };

  const logout = async () => {
    await api('/api/admin/logout', { method: 'POST', body: '{}' }).catch(() => undefined);
    setAuthState('guest');
  };

  const openNewProduct = () => {
    setOriginalId(null);
    setEditing(makeProduct());
    setStatus('');
  };

  const openProduct = (product: Product) => {
    setOriginalId(product.id);
    setEditing(structuredClone(product));
    setStatus('');
  };

  const duplicateProduct = (product: Product) => {
    const copy = structuredClone(product);
    copy.id = `${product.id}-copy`;
    copy.name = { en: `${product.name.en} Copy`, es: `${product.name.es} Copia` };
    setOriginalId(null);
    setEditing(copy);
  };

  const updateEditing = <K extends keyof Product>(key: K, value: Product[K]) => {
    setEditing((current) => current ? { ...current, [key]: value } : current);
  };

  const saveDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;
    const id = slugify(editing.id || editing.name.en);
    const normalized: Product = {
      ...editing,
      id,
      name: { en: editing.name.en.trim(), es: editing.name.es.trim() },
      description: { en: editing.description.en.trim(), es: editing.description.es.trim() },
      price: editing.price.trim(),
      originalPrice: editing.originalPrice?.trim() || undefined,
      badge: editing.badge?.en || editing.badge?.es ? { en: editing.badge?.en?.trim() || '', es: editing.badge?.es?.trim() || '' } : undefined,
      brand: editing.brand.trim(),
      compatibility: editing.compatibility.map((item) => item.trim()).filter(Boolean),
      tags: editing.tags?.map((item) => item.trim()).filter(Boolean),
      image: editing.image?.trim() || undefined,
      visual: editing.visual || `visual-${editing.category}`,
    };
    const hasRequired = normalized.id && normalized.name.en && normalized.name.es && normalized.description.en && normalized.description.es && normalized.price && normalized.brand && normalized.compatibility.length;
    const duplicateId = draftProducts.some((product) => product.id === normalized.id && product.id !== originalId);
    if (!hasRequired || duplicateId) {
      setStatus(duplicateId ? `${c.id}: ${normalized.id}` : c.validation);
      return;
    }
    setDraftProducts((current) => originalId ? current.map((product) => product.id === originalId ? normalized : product) : [normalized, ...current]);
    setDirty(true);
    setEditing(null);
    setOriginalId(null);
    setStatus(c.savedDraft);
  };

  const deleteProduct = (id: string) => {
    if (pendingDelete !== id) {
      setPendingDelete(id);
      return;
    }
    if (draftProducts.length <= 1) return;
    setDraftProducts((current) => current.filter((product) => product.id !== id));
    setPendingDelete('');
    setDirty(true);
  };

  const publish = async () => {
    setStatus('');
    try {
      const payload: CatalogPayload = { version: 1, useDefaults: false, products: draftProducts };
      await api('/api/admin/catalog', { method: 'PUT', body: JSON.stringify(payload) });
      onProductsChange(draftProducts);
      setDirty(false);
      localStorage.removeItem(adminDraftKey);
      setStatus(c.published);
    } catch {
      setStatus(c.publishFailed);
    }
  };

  const exportCatalog = () => {
    const payload: CatalogPayload = { version: 1, useDefaults: false, updatedAt: new Date().toISOString(), products: draftProducts };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `krkn-catalog-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importCatalog = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const imported = catalogProductsFrom(JSON.parse(await file.text()));
      if (!imported) throw new Error(c.importFailed);
      setDraftProducts(imported);
      setDirty(true);
      setStatus(`${imported.length} ${c.productCount.toLowerCase()}`);
    } catch {
      setStatus(c.importFailed);
    }
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !editing) return;
    setUploading(true);
    setStatus('');
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const result = await api<{ path: string }>('/api/admin/media', {
        method: 'POST',
        body: JSON.stringify({ type: file.type, data }),
      });
      updateEditing('image', result.path);
    } catch {
      setStatus(c.publishFailed);
    } finally {
      setUploading(false);
    }
  };

  const updateInquiry = async (id: string, nextStatus: InquiryStatus) => {
    try {
      await api(`/api/admin/inquiries/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify({ status: nextStatus }) });
      setInquiries((current) => current.map((item) => item.id === id ? { ...item, status: nextStatus } : item));
    } catch {
      setStatus(c.publishFailed);
    }
  };

  if (authState === 'checking' || authState === 'offline' || authState === 'guest') {
    return (
      <main className="admin-login-shell">
        <section className="admin-login-panel">
          <div className="admin-brand-lockup"><img src="/logo.png" alt="KRKN Eluxx Customs" /><div><strong>{c.studio}</strong><span>{c.subtitle}</span></div></div>
          <div className="admin-login-icon"><LockKeyhole size={30} /></div>
          <h1>{c.loginTitle}</h1>
          <p>{authState === 'offline' ? c.serverUnavailable : c.loginBody}</p>
          <div className="admin-language"><Languages size={16} />{(['en', 'es'] as Language[]).map((item) => <button type="button" className={language === item ? 'active' : ''} key={item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div>
          {authState === 'checking' ? <div className="admin-loading" aria-label="Loading" /> : authState === 'offline' ? (
            <button className="secondary-button" type="button" onClick={() => window.location.reload()}><RefreshCw size={17} />{c.refresh}</button>
          ) : (
            <form className="admin-login-form" onSubmit={handleLogin}>
              <Field label={c.username}><input name="username" autoComplete="username" defaultValue="admin" required /></Field>
              <Field label={c.password}><input name="password" type="password" autoComplete="current-password" required /></Field>
              {!configured && <p className="admin-error">{c.configuredError}</p>}
              {loginError && <p className="admin-error">{loginError}</p>}
              <button className="primary-button" type="submit">{c.login}<ArrowLeft className="admin-login-arrow" size={18} /></button>
            </form>
          )}
        </section>
      </main>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-brand-lockup"><img src="/logo.png" alt="KRKN Eluxx Customs" /><div><strong>{c.studio}</strong><span>{c.subtitle}</span></div></div>
        <div className="admin-top-actions">
          <div className="admin-language"><Languages size={16} />{(['en', 'es'] as Language[]).map((item) => <button type="button" className={language === item ? 'active' : ''} key={item} onClick={() => setLanguage(item)}>{item.toUpperCase()}</button>)}</div>
          <a className="admin-icon-action" href="/" title={c.storefront}><ExternalLink size={18} /><span>{c.storefront}</span></a>
          <button className="admin-icon-action" type="button" onClick={logout} title={c.logout}><LogOut size={18} /><span>{c.logout}</span></button>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-summary" aria-label="Dashboard summary">
          <div><Package size={21} /><span>{c.productCount}</span><strong>{draftProducts.length}</strong></div>
          <div><CheckCircle2 size={21} /><span>{c.stockCount}</span><strong>{inStockCount}</strong></div>
          <div><ClipboardList size={21} /><span>{c.leadCount}</span><strong>{newInquiryCount}</strong></div>
        </section>

        <nav className="admin-tabs" aria-label="Admin sections">
          <button type="button" className={activeTab === 'catalog' ? 'active' : ''} onClick={() => setActiveTab('catalog')}><Package size={18} />{c.catalog}</button>
          <button type="button" className={activeTab === 'inquiries' ? 'active' : ''} onClick={() => setActiveTab('inquiries')}><ClipboardList size={18} />{c.inquiries}{newInquiryCount > 0 && <span>{newInquiryCount}</span>}</button>
        </nav>

        {status && <div className="admin-status" role="status"><CheckCircle2 size={18} />{status}</div>}

        {activeTab === 'catalog' ? (
          <section className="admin-workspace">
            <div className="admin-catalog-pane">
              <div className="admin-toolbar">
                <label className="admin-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={c.search} /></label>
                <button type="button" className="primary-button" onClick={openNewProduct}><Plus size={18} />{c.addProduct}</button>
              </div>
              <div className="admin-publishbar">
                <div className={dirty ? 'admin-dirty active' : 'admin-dirty'}><span />{dirty ? c.unsaved : c.published}</div>
                <input ref={importRef} type="file" accept="application/json" hidden onChange={importCatalog} />
                <button type="button" className="admin-quiet-button" onClick={() => importRef.current?.click()}><Upload size={16} />{c.import}</button>
                <button type="button" className="admin-quiet-button" onClick={exportCatalog}><Download size={16} />{c.export}</button>
                <button type="button" className="primary-button" disabled={!dirty} onClick={publish}><Save size={17} />{c.publish}</button>
              </div>
              <div className="admin-product-list">
                {filteredProducts.length ? filteredProducts.map((product) => (
                  <article className="admin-product-row" key={product.id}>
                    <img src={productImage(product)} alt="" onError={(event) => { event.currentTarget.src = '/assets/images/garage-luxury-dark.jpg'; }} />
                    <div className="admin-product-copy"><span>{categoryLabels[language][product.category]}</span><strong>{product.name[language]}</strong><small>{product.brand} · {product.price} · {stockLabels[language][product.stock]}</small></div>
                    <div className="admin-row-actions">
                      <button type="button" title={c.edit} onClick={() => openProduct(product)}><Save size={16} /></button>
                      <button type="button" title={c.duplicate} onClick={() => duplicateProduct(product)}><Copy size={16} /></button>
                      <button type="button" className={pendingDelete === product.id ? 'danger confirm' : 'danger'} title={pendingDelete === product.id ? c.confirmDelete : c.delete} onClick={() => deleteProduct(product.id)}><Trash2 size={16} /><span>{pendingDelete === product.id ? c.confirmDelete : ''}</span></button>
                    </div>
                  </article>
                )) : <div className="admin-empty"><Search size={22} /><p>{c.noProducts}</p></div>}
              </div>
            </div>

            <aside className={`admin-editor ${editing ? 'open' : ''}`}>
              {editing ? (
                <form onSubmit={saveDraft}>
                  <div className="admin-editor-heading"><div><span>{originalId ? c.editProduct : c.newProduct}</span><h2>{editing.name[language] || c.newProduct}</h2></div><button type="button" onClick={() => setEditing(null)} aria-label={c.cancel}>×</button></div>
                  <fieldset><legend>{c.identity}</legend><div className="admin-form-grid">
                    <Field label={c.id}><input value={editing.id} onChange={(event) => updateEditing('id', event.target.value)} placeholder="product-id" /></Field>
                    <Field label={c.category}><select value={editing.category} onChange={(event) => updateEditing('category', event.target.value as CategoryId)}>{categoryIds.map((category) => <option key={category} value={category}>{categoryLabels[language][category]}</option>)}</select></Field>
                    <Field label={c.brand} full><input value={editing.brand} onChange={(event) => updateEditing('brand', event.target.value)} /></Field>
                  </div></fieldset>
                  <fieldset><legend>{c.content}</legend><div className="admin-form-grid">
                    <Field label={c.nameEn}><input value={editing.name.en} onChange={(event) => updateEditing('name', { ...editing.name, en: event.target.value })} required /></Field>
                    <Field label={c.nameEs}><input value={editing.name.es} onChange={(event) => updateEditing('name', { ...editing.name, es: event.target.value })} required /></Field>
                    <Field label={c.descriptionEn} full><textarea rows={3} value={editing.description.en} onChange={(event) => updateEditing('description', { ...editing.description, en: event.target.value })} required /></Field>
                    <Field label={c.descriptionEs} full><textarea rows={3} value={editing.description.es} onChange={(event) => updateEditing('description', { ...editing.description, es: event.target.value })} required /></Field>
                  </div></fieldset>
                  <fieldset><legend>{c.commerce}</legend><div className="admin-form-grid">
                    <Field label={c.price}><input value={editing.price} onChange={(event) => updateEditing('price', event.target.value)} placeholder="$0" required /></Field>
                    <Field label={c.originalPrice}><input value={editing.originalPrice || ''} onChange={(event) => updateEditing('originalPrice', event.target.value)} placeholder="$0" /></Field>
                    <Field label={c.stock}><select value={editing.stock} onChange={(event) => updateEditing('stock', event.target.value as StockStatus)}>{(['in', 'low', 'preorder'] as StockStatus[]).map((stock) => <option key={stock} value={stock}>{stockLabels[language][stock]}</option>)}</select></Field>
                    <label className="admin-check"><input type="checkbox" checked={Boolean(editing.sale)} onChange={(event) => updateEditing('sale', event.target.checked)} /><span>{c.sale}</span></label>
                    <Field label={c.badgeEn}><input value={editing.badge?.en || ''} onChange={(event) => updateEditing('badge', { en: event.target.value, es: editing.badge?.es || '' })} /></Field>
                    <Field label={c.badgeEs}><input value={editing.badge?.es || ''} onChange={(event) => updateEditing('badge', { en: editing.badge?.en || '', es: event.target.value })} /></Field>
                  </div></fieldset>
                  <fieldset><legend>{c.fitment}</legend><div className="admin-form-grid">
                    <Field label={c.compatibility} full><textarea rows={4} value={editing.compatibility.join('\n')} onChange={(event) => updateEditing('compatibility', event.target.value.split('\n'))} /></Field>
                    <Field label={c.tags} full><input value={(editing.tags || []).join(', ')} onChange={(event) => updateEditing('tags', event.target.value.split(','))} /></Field>
                  </div></fieldset>
                  <fieldset><legend>{c.media}</legend><div className="admin-media-editor">
                    <img src={productImage(editing)} alt="" onError={(event) => { event.currentTarget.src = '/assets/images/garage-luxury-dark.jpg'; }} />
                    <div><Field label={c.image}><input value={editing.image || ''} onChange={(event) => updateEditing('image', event.target.value)} placeholder="/uploads/product.webp" /></Field><small>{c.imageHint}</small><input ref={uploadRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={uploadImage} /><button type="button" className="secondary-button" disabled={uploading} onClick={() => uploadRef.current?.click()}><ImagePlus size={17} />{c.uploadImage}</button></div>
                  </div></fieldset>
                  <div className="admin-editor-actions"><button type="button" className="secondary-button" onClick={() => setEditing(null)}>{c.cancel}</button><button type="submit" className="primary-button"><Save size={17} />{c.saveDraft}</button></div>
                </form>
              ) : <div className="admin-editor-placeholder"><Package size={28} /><h2>{c.catalog}</h2><p>{c.editProduct}</p></div>}
            </aside>
          </section>
        ) : (
          <section className="admin-inquiries">
            <div className="admin-section-heading"><div><span>{c.inquiries}</span><h1>{c.leadCount}: {newInquiryCount}</h1></div><button type="button" className="secondary-button" onClick={loadInquiries}><RefreshCw size={17} />{c.refresh}</button></div>
            {inquiries.length ? <div className="admin-inquiry-list">{inquiries.map((inquiry) => (
              <article className={`admin-inquiry status-${inquiry.status}`} key={inquiry.id}>
                <div className="admin-inquiry-head"><div><span>{inquiry.status === 'new' ? c.newLead : inquiry.status === 'contacted' ? c.contacted : c.archived}</span><h2>{inquiry.fullName}</h2></div><time>{new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(inquiry.createdAt))}</time></div>
                <div className="admin-inquiry-grid"><p><strong>Email</strong><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a></p>{inquiry.phone && <p><strong>Phone</strong><a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a></p>}<p><strong>{c.service}</strong>{inquiry.service}</p><p><strong>{c.vehicle}</strong>{[inquiry.year, inquiry.make, inquiry.model, inquiry.engine].filter(Boolean).join(' ') || '—'}</p></div>
                {inquiry.message && <div className="admin-inquiry-message"><strong>{c.message}</strong><p>{inquiry.message}</p></div>}
                <div className="admin-inquiry-actions">{inquiry.status !== 'contacted' && <button type="button" className="primary-button" onClick={() => updateInquiry(inquiry.id, 'contacted')}>{c.markContacted}</button>}{inquiry.status !== 'archived' && <button type="button" className="secondary-button" onClick={() => updateInquiry(inquiry.id, 'archived')}>{c.archive}</button>}{inquiry.status !== 'new' && <button type="button" className="admin-quiet-button" onClick={() => updateInquiry(inquiry.id, 'new')}>{c.restore}</button>}</div>
              </article>
            ))}</div> : <div className="admin-empty"><ClipboardList size={26} /><p>{c.noInquiries}</p></div>}
          </section>
        )}
      </main>
    </div>
  );
}
