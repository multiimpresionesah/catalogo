'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onTagClick?: (tag: string) => void;
}

export default function ProductCard({ product, onTagClick }: ProductCardProps) {
  const router = useRouter();
  const primaryImage = product.images?.find(img => img.is_primary)?.image_url
    || product.images?.[0]?.image_url;

  const tags = product.tags?.filter(Boolean) ?? [];

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    } else {
      router.push(`/?tag=${encodeURIComponent(tag)}`);
    }
  };

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
          {/* Tags - Now more prominent above title */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  onClick={(e) => handleTagClick(e, tag)}
                  className="inline-flex items-center text-[9px] sm:text-[10px] font-bold text-azul-brillante bg-azul-palido/50 px-2 py-0.5 rounded-md border border-azul-cielo/20"
                >
                  <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 8.5C4.67 8.5 4 7.83 4 7s.67-1.5 1.5-1.5S7 6.17 7 7s-.67 1.5-1.5 1.5z" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-bold text-azul-profundo text-xs sm:text-base line-clamp-1 group-hover:text-azul-brillante transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-[10px] sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-tight whitespace-pre-line">
              {product.description}
            </p>
          )}



          <div className="mt-2 sm:mt-3 flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-lg font-bold text-azul-brillante">
                ${product.price.toFixed(2)}
              </span>
              <span className="hidden sm:block text-xs text-azul-real font-medium bg-azul-palido px-2 py-0.5 rounded-full">
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
