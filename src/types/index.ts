export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  category?: Category;
  images?: ProductImage[];
  product_variants?: ProductVariant[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface Slider {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface StoreSetting {
  id: string;
  key: string;
  value: string | null;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  image: string;
  variant?: ProductVariant;
}
