'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find(img => img.is_primary)?.image_url
    || product.images?.[0]?.image_url;

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="product-card bg-white rounded-xl overflow-hidden shadow-md border border-azul-cielo/20 group">
        {/* Image */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-azul-palido to-azul-cielo/20 overflow-hidden">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-azul-cielo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {product.is_featured && (
            <span className="absolute top-2 left-2 bg-azul-brillante text-white text-xs font-bold px-2 py-1 rounded-md">
              Destacado
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-azul-profundo text-sm sm:text-base line-clamp-1 group-hover:text-azul-brillante transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-azul-brillante">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-azul-real bg-azul-palido px-2 py-1 rounded-full font-medium group-hover:bg-azul-cielo/30 transition-colors">
              Ver más →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
