'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/types';
import HeroSlider from '@/components/HeroSlider';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { Analytics } from '@vercel/analytics/next';


function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  const tagParam = searchParams.get('tag');

  const { searchQuery, setSearchQuery } = useCartStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [selectedTag, setSelectedTag] = useState<string | null>(tagParam);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSelectedTag(tagParam);
  }, [tagParam]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const [productsRes, categoriesRes] = await Promise.all([
        supabase
          .from('products')
          .select(`*, category:categories(*), images:product_images(*)`)
          // tags is a column on products, included by default via *
          .eq('is_active', true)
          .order('created_at', { ascending: false }),
        supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order'),
      ]);

      if (productsRes.data) setProducts(productsRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter(p => p.category?.slug === selectedCategory);
    }

    if (selectedTag) {
      result = result.filter(p => p.tags && p.tags.includes(selectedTag));
    }

    if (searchQuery.trim()) {
      const term = searchQuery.trim().toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          (p.description && p.description.toLowerCase().includes(term))
      );
    }

    return result;
  }, [products, selectedCategory, selectedTag, searchQuery]);

  const handleCategorySelect = (slug: string | null) => {
    setSelectedCategory(slug);
    setSearchQuery('');
    const params = new URLSearchParams();
    if (slug) params.set('category', slug);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedCategory(null);
    setSearchQuery('');
    router.push(`/?tag=${encodeURIComponent(tag)}`, { scroll: false });
  };

  const handleClearTag = () => {
    setSelectedTag(null);
    router.push('/', { scroll: false });
  };

  const pageTitle = selectedTag
    ? `Etiqueta: #${selectedTag}`
    : selectedCategory
      ? categories.find(c => c.slug === selectedCategory)?.name || 'Productos'
      : searchQuery.trim()
        ? `Resultados para "${searchQuery.trim()}"`
        : 'Todos los Productos';

  return (
    <div>
      <Analytics />
      <HeroSlider />

      <section className="max-w-7xl mx-auto">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-azul-profundo">
              {pageTitle}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedTag && (
              <button
                onClick={handleClearTag}
                className="flex items-center gap-1 text-sm bg-azul-palido text-azul-real hover:text-azul-brillante transition-colors px-3 py-1 rounded-full border border-azul-cielo/40"
              >
                <span className="text-azul-brillante">#</span>{selectedTag}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-azul-profundo hover:text-azul-brillante transition-colors underline underline-offset-2"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="h-48 sm:h-56 bg-azul-cielo/20" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-azul-cielo/20 rounded w-3/4" />
                  <div className="h-3 bg-azul-cielo/10 rounded w-full" />
                  <div className="h-3 bg-azul-cielo/10 rounded w-1/2" />
                  <div className="h-5 bg-azul-cielo/20 rounded w-1/4 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-20 h-20 text-azul-cielo mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-azul-profundo mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta con otra categoría o término de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} onTagClick={handleTagClick} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="w-full h-[400px] bg-gradient-to-r from-azul-profundo to-azul-real flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-bold mb-3">Multi Impresiones AH</h2>
          <p className="text-lg text-white/80">Cargando catálogo...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
