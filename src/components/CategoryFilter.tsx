'use client';

import React from 'react';
import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  banners: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21V3h18v18M7 3v18M3 7h4M3 12h4M3 17h4M7 7h14M7 12h14M7 17h14" />
    </svg>
  ),
  tazas: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-3c.5-1 1.5-2 2-2s1.5 1 2 2M10 5c.5-1 1.5-2 2-2s1.5 1 2 2" />
    </svg>
  ),
  camisas: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 2l-4 4 3 2v12h12V8l3-2-4-4-3 2h-4L7 2z" />
    </svg>
  ),
  facturas: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

export default function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap py-6 px-4">
      {/* All button */}
      <button
        onClick={() => onSelect(null)}
        className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 min-w-[80px] ${
          selected === null
            ? 'bg-azul-brillante text-white shadow-lg shadow-azul-brillante/30 scale-105'
            : 'bg-white text-azul-profundo hover:bg-azul-palido shadow-md border border-azul-cielo/30'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span className="text-xs font-semibold">Todos</span>
      </button>

      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.slug === selected ? null : cat.slug)}
          className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 min-w-[80px] ${
            selected === cat.slug
              ? 'bg-azul-brillante text-white shadow-lg shadow-azul-brillante/30 scale-105'
              : 'bg-white text-azul-profundo hover:bg-azul-palido shadow-md border border-azul-cielo/30'
          }`}
        >
          {categoryIcons[cat.slug] || <span className="text-2xl">{cat.icon}</span>}
          <span className="text-xs font-semibold">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
