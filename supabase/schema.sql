-- ============================================
-- Multi Impresiones AH - Database Schema
-- ============================================
-- Run this SQL in Supabase SQL Editor

-- Enable UUID extension (should be enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PRODUCT IMAGES (multiple per product)
-- ============================================
CREATE TABLE product_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- HERO SLIDERS
-- ============================================
CREATE TABLE sliders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- STORE SETTINGS (social links, phone, etc.)
-- ============================================
CREATE TABLE store_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (Public read access)
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE sliders ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read sliders" ON sliders FOR SELECT USING (true);
CREATE POLICY "Public read store_settings" ON store_settings FOR SELECT USING (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_sliders_active ON sliders(is_active, display_order);

-- ============================================
-- SEED DATA
-- ============================================

-- Categories
INSERT INTO categories (name, slug, icon, display_order) VALUES
  ('Banners', 'banners', '🖼️', 1),
  ('Tazas', 'tazas', '☕', 2),
  ('Camisas', 'camisas', '👕', 3),
  ('Facturas', 'facturas', '📄', 4);

-- Store settings (placeholders for social links)
INSERT INTO store_settings (key, value) VALUES
  ('phone', '+503 6052-8774'),
  ('whatsapp', '+50360528774'),
  ('facebook_url', ''),
  ('instagram_url', ''),
  ('tiktok_url', ''),
  ('address', 'El Salvador'),
  ('store_name', 'Multi Impresiones AH');

-- Sample products (using placeholder images)
INSERT INTO products (name, description, price, category_id, is_active, is_featured) VALUES
  ('Banner Publicitario Grande', 'Banner de lona de alta calidad para exteriores. Impresión a full color con acabado resistente al agua y rayos UV. Ideal para publicidad de negocios.', 25.00, (SELECT id FROM categories WHERE slug = 'banners'), true, true),
  ('Banner Roll Up', 'Banner retráctil portátil de 80x200cm. Incluye estructura metálica y bolsa de transporte. Perfecto para ferias y eventos.', 35.00, (SELECT id FROM categories WHERE slug = 'banners'), true, false),
  ('Banner de Malla', 'Banner de malla microperforada para cercas y fachadas. Permite el paso del viento, ideal para instalaciones exteriores de gran tamaño.', 30.00, (SELECT id FROM categories WHERE slug = 'banners'), true, false),
  ('Taza Personalizada Blanca', 'Taza de cerámica de 11oz con sublimación a full color. Apta para lavavajillas y microondas. Ideal para regalos y promociones.', 5.99, (SELECT id FROM categories WHERE slug = 'tazas'), true, true),
  ('Taza Mágica', 'Taza que cambia de color con el calor. Al agregar líquido caliente se revela tu diseño personalizado. Efecto sorpresa garantizado.', 8.99, (SELECT id FROM categories WHERE slug = 'tazas'), true, false),
  ('Taza con Cuchara', 'Taza de cerámica con cuchara incluida y tapa de silicona. Diseño personalizado con sublimación. Perfecta para el café de oficina.', 7.50, (SELECT id FROM categories WHERE slug = 'tazas'), true, false),
  ('Camisa Polo Bordada', 'Camisa tipo polo de algodón piqué con bordado de logo empresarial. Disponible en varios colores y tallas. Calidad profesional.', 15.00, (SELECT id FROM categories WHERE slug = 'camisas'), true, true),
  ('Camisa Deportiva Sublimada', 'Camisa deportiva de tela dry-fit con sublimación completa. Diseño personalizado de bordes a borde. Ideal para equipos y eventos.', 12.00, (SELECT id FROM categories WHERE slug = 'camisas'), true, false),
  ('Camisa de Algodón Serigrafiada', 'Camisa de algodón 100% con impresión en serigrafía. Disponible desde 12 unidades. Perfecta para uniformes y promociones.', 8.00, (SELECT id FROM categories WHERE slug = 'camisas'), true, false),
  ('Factura Comercial', 'Bloc de 100 facturas comerciales CCF en papel autocopiable. Incluye original y copia. Numeradas y con datos de la empresa.', 12.00, (SELECT id FROM categories WHERE slug = 'facturas'), true, true),
  ('Recibo de Pago', 'Bloc de 100 recibos de pago en papel autocopiable. Diseño estándar con espacio para logo y datos del negocio.', 8.00, (SELECT id FROM categories WHERE slug = 'facturas'), true, false),
  ('Nota de Remisión', 'Bloc de 100 notas de remisión en triplicado. Papel autocopiable con numeración consecutiva. Formato profesional.', 15.00, (SELECT id FROM categories WHERE slug = 'facturas'), true, false);

-- Sample sliders
INSERT INTO sliders (title, subtitle, image_url, is_active, display_order) VALUES
  ('¡Impresiones de Alta Calidad!', 'Banners, camisas, tazas y más para tu negocio', '/images/slider-1.jpg', true, 1),
  ('Promociones del Mes', 'Hasta 20% de descuento en pedidos al por mayor', '/images/slider-2.jpg', true, 2),
  ('Personaliza Todo', 'Tazas, camisas y accesorios con tu logo o diseño', '/images/slider-3.jpg', true, 3);
