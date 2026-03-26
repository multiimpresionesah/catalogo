'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select(`*, category:categories(*), images:product_images(*)`)
        .eq('id', params.id)
        .single();

      if (data) {
        // Sort images
        if (data.images) {
          data.images.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order);
        }
        setProduct(data);
      }
      setLoading(false);
    }
    if (params.id) fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    const image = product.images?.[0]?.image_url || '';
    addToCart(product, quantity, image);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-azul-cielo/10 rounded-xl h-96 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-azul-cielo/10 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-azul-cielo/10 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-azul-cielo/10 rounded w-full animate-pulse" />
            <div className="h-4 bg-azul-cielo/10 rounded w-full animate-pulse" />
            <div className="h-10 bg-azul-cielo/10 rounded w-1/3 animate-pulse mt-6" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-azul-profundo mb-4">Producto no encontrado</h2>
        <Link href="/" className="text-azul-brillante hover:underline">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const images = product.images || [];
  const currentImage = images[selectedImage]?.image_url;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-azul-brillante transition-colors">Inicio</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link href={`/?category=${product.category.slug}`} className="hover:text-azul-brillante transition-colors">
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-azul-profundo font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Images */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-azul-cielo/20 aspect-square">
            {currentImage ? (
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-azul-palido to-azul-cielo/20 flex items-center justify-center">
                <svg className="w-24 h-24 text-azul-cielo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {product.is_featured && (
              <span className="absolute top-3 left-3 bg-azul-brillante text-white text-sm font-bold px-3 py-1 rounded-lg">
                Destacado
              </span>
            )}
          </div>

          {/* Thumbnail carousel */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === selectedImage
                      ? 'border-azul-brillante shadow-lg shadow-azul-brillante/20 scale-105'
                      : 'border-azul-cielo/30 hover:border-azul-cielo opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.image_url} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product details */}
        <div className="space-y-6">
          {/* Category badge */}
          {product.category && (
            <span className="inline-block text-xs font-semibold text-azul-real bg-azul-palido px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category.name}
            </span>
          )}

          {/* Name */}
          <h1 className="text-2xl lg:text-3xl font-bold text-azul-profundo leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-azul-brillante">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-400">USD</span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="prose prose-sm text-gray-600 leading-relaxed">
              <p>{product.description}</p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-azul-cielo/30" />

          {/* Quantity selector */}
          <div>
            <label className="block text-sm font-semibold text-azul-profundo mb-2">Cantidad</label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-azul-palido text-azul-profundo hover:bg-azul-cielo/40 flex items-center justify-center font-bold text-lg transition-colors"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 text-center border border-azul-cielo/30 rounded-lg text-azul-profundo font-semibold focus:outline-none focus:ring-2 focus:ring-azul-brillante"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-azul-palido text-azul-profundo hover:bg-azul-cielo/40 flex items-center justify-center font-bold text-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="bg-azul-palido rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-xl font-bold text-azul-profundo">${(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              addedToCart
                ? 'bg-green-500 text-white scale-[0.98]'
                : 'bg-azul-brillante hover:bg-azul-real text-white hover:shadow-lg hover:shadow-azul-brillante/30'
            }`}
          >
            {addedToCart ? (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                ¡Agregado al carrito!
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Añadir al Carrito
              </>
            )}
          </button>

          {/* Extra details */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Personalización disponible</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Delivery disponible (+$1.50)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Coordina tu pedido por WhatsApp</span>
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="text-sm text-azul-real hover:text-azul-brillante transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
