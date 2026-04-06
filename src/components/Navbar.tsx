'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useSettingsStore } from '@/store/settingsStore';
import Sidebar from './Sidebar';
import Image from 'next/image';

function SearchInput() {
  const { searchQuery, setSearchQuery } = useCartStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex-1 relative">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full py-2 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-azul-brillante focus:bg-white/20 transition-all text-sm"
      />
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}

function SearchInputFallback() {
  return (
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Buscar productos..."
        disabled
        className="w-full py-2 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-azul-brillante focus:bg-white/20 transition-all text-sm opacity-50"
      />
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { getItemCount, openDrawer } = useCartStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fetchSettings, getSetting } = useSettingsStore();

  React.useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, [fetchSettings]);

  const itemCount = mounted ? getItemCount() : 0;
  const logoUrl = getSetting('store_logo', '/logo-multi.png');
  const storeName = getSetting('store_name', 'Multi Impresiones AH');

  return (
    <>
      <nav className="sticky top-0 z-40 bg-azul-profundo shadow-lg">
        {/* Row 1 */}
        <div className="relative flex items-center justify-between px-4 py-2 lg:px-8 h-16">
          {/* Burger menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="z-10 text-white hover:text-azul-cielo transition-colors p-1"
            aria-label="Abrir menú"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo (center) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Link href="/" className="pointer-events-auto flex items-center hover:opacity-80 transition-opacity">
              <div className="relative h-12 w-48">
                <Image
                  src={logoUrl}
                  alt={`${storeName} Logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Cart icon (right) */}
          <button onClick={openDrawer} className="z-10 relative text-white hover:text-azul-cielo transition-colors p-1" aria-label="Abrir carrito">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-azul-brillante text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-3 px-4 pb-3 lg:px-8">
          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${getSetting('whatsapp', process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="hidden sm:inline">Comprar por WhatsApp</span>
          </a>

          {/* Search bar */}
          <Suspense fallback={<SearchInputFallback />}>
            <SearchInput />
          </Suspense>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
