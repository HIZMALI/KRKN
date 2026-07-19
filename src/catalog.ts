export type Language = 'en' | 'es';

export const categoryIds = [
  'exhaust',
  'intake',
  'performance',
  'suspension',
  'brakes',
  'carbon',
  'body-kit',
  'wheels',
  'lighting',
  'interior',
  'electronics',
  'car-care',
  'detailing',
  'track-drag',
  'suv-truck',
  'merchandise',
] as const;

export type CategoryId = (typeof categoryIds)[number];
export type StockStatus = 'in' | 'low' | 'preorder';

export type Product = {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  category: CategoryId;
  price: string;
  originalPrice?: string;
  sale?: boolean;
  badge?: Record<Language, string>;
  stock: StockStatus;
  brand: string;
  compatibility: string[];
  tags?: string[];
  visual: string;
  image?: string;
};

export type CatalogPayload = {
  version: 1;
  useDefaults?: boolean;
  updatedAt?: string;
  products: Product[];
};

const stockStatuses: StockStatus[] = ['in', 'low', 'preorder'];

export function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false;
  const product = value as Partial<Product>;
  return Boolean(
    product.id &&
      product.name?.en &&
      product.name?.es &&
      product.description?.en &&
      product.description?.es &&
      product.category &&
      categoryIds.includes(product.category) &&
      product.price &&
      product.stock &&
      stockStatuses.includes(product.stock) &&
      product.brand &&
      Array.isArray(product.compatibility) &&
      typeof product.visual === 'string',
  );
}

export function catalogProductsFrom(value: unknown): Product[] | null {
  if (!value || typeof value !== 'object') return null;
  const payload = value as Partial<CatalogPayload>;
  if (payload.useDefaults) return null;
  if (!Array.isArray(payload.products) || !payload.products.length || !payload.products.every(isProduct)) return null;
  return payload.products;
}
