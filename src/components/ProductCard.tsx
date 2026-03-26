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
        <div className="relative h-36 sm:h-56 bg-gradient-to-br from-azul-palido to-azul-cielo/20 overflow-hidden">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-azul-cielo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {product.is_featured && (
            <span className="absolute top-1.5 left-1.5 bg-azul-brillante text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              Destacado
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-azul-profundo text-xs sm:text-base line-clamp-1 group-hover:text-azul-brillante transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-[10px] sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-tight">
              {product.description}
            </p>
          )}
          <div className="mt-2 sm:mt-4 flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-lg font-bold text-azul-brillante">
                ${product.price.toFixed(2)}
              </span>
              <span className="hidden sm:block text-xs text-azul-real font-medium">
                {product.category?.name}
              </span>
            </div>
            
            <div className="w-full py-2 bg-azul-brillante group-hover:bg-azul-real text-white text-[11px] sm:text-sm font-bold rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <span>Añadir</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
