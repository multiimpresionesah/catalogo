'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useSettingsStore } from '@/store/settingsStore';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { openDrawer } = useCartStore();
  const { getSetting } = useSettingsStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle store access only after mount to avoid hydration mismatch
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mounted) {
      openDrawer();
    }
  };

  return (
    <footer className="bg-azul-profundo text-white mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-azul-cielo">{getSetting('store_name', 'Multi Impresiones AH')}</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Tu mejor opción en impresiones de alta calidad. Banners, camisas, tazas, facturas y más para tu negocio.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-white/70">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{getSetting('phone', '+503 6052-8774')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-azul-cielo">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-azul-cielo transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-white/70 hover:text-azul-cielo transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/#values" className="text-white/70 hover:text-azul-cielo transition-colors">
                  Nuestros Valores
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleCartClick}
                  className="text-white/70 hover:text-azul-cielo transition-colors text-left"
                >
                  Mi Carrito
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-azul-cielo">Productos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?category=banners" className="text-white/70 hover:text-azul-cielo transition-colors">
                  🖼️ Banners
                </Link>
              </li>
              <li>
                <Link href="/?category=tazas" className="text-white/70 hover:text-azul-cielo transition-colors">
                  ☕ Tazas
                </Link>
              </li>
              <li>
                <Link href="/?category=camisas" className="text-white/70 hover:text-azul-cielo transition-colors">
                  👕 Camisas
                </Link>
              </li>
              <li>
                <Link href="/?category=facturas" className="text-white/70 hover:text-azul-cielo transition-colors">
                  📄 Facturas
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-azul-cielo">Síguenos</h4>
            <div className="flex items-center gap-4 mb-6">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${getSetting('whatsapp', process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50360528774')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* Facebook */}
              {getSetting('facebook_url') && (
                <a
                  href={getSetting('facebook_url')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}

              {/* Instagram */}
              {getSetting('instagram_url') && (
                <a
                  href={getSetting('instagram_url')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-pink-400 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}

              {/* TikTok */}
              {getSetting('tiktok_url') && (
                <a
                  href={getSetting('tiktok_url')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13-.08-.26-.17-.38-.26v7.34c0 1.93-.5 3.81-1.62 5.27-1.32 1.75-3.41 2.75-5.59 2.87-2.18.12-4.44-.55-5.96-2.11C3.3 20.12 2.5 17.7 2.72 15.3c.22-2.3 1.54-4.5 3.65-5.59 1.17-.61 2.51-.9 3.82-.88v4.11c-.72-.05-1.46.06-2.11.4-.95.5-1.61 1.44-1.8 2.5-.2 1.05.02 2.16.63 3.02.58.81 1.55 1.3 2.53 1.34 1.02.05 2.06-.32 2.75-1.07.69-.75 1.02-1.78 1.02-2.8v-16.3z"/>
                  </svg>
                </a>
              )}
            </div>
            <a
              href={`https://wa.me/${getSetting('whatsapp', process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50360528774')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escríbenos
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-white/50">
        <p>© {new Date().getFullYear()} {getSetting('store_name', 'Multi Impresiones AH')}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
