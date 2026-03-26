'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeFromCart, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-azul-profundo text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <h2 className="font-bold text-lg">Mi Carrito</h2>
            {items.length > 0 && (
              <span className="bg-azul-brillante text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="text-white/80 hover:text-white transition-colors p-1"
            aria-label="Cerrar carrito"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <svg className="w-20 h-20 text-azul-cielo mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <h3 className="text-lg font-semibold text-azul-profundo mb-2">Tu carrito está vacío</h3>
            <p className="text-sm text-gray-500 mb-6">¡Agrega productos para empezar!</p>
            <button
              onClick={closeDrawer}
              className="bg-azul-brillante hover:bg-azul-real text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
            >
              Seguir Comprando
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.map(item => (
              <div
                key={item.product.id}
                className="bg-azul-palido rounded-xl p-3 flex gap-3 animate-fade-in"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                  {item.image ? (
                    <img src={item.image} alt={item.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-azul-cielo/10">
                      <svg className="w-6 h-6 text-azul-cielo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-sm font-semibold text-azul-profundo line-clamp-1">{item.product.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-0.5"
                      aria-label="Eliminar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-azul-brillante font-bold">${item.product.price.toFixed(2)}</p>

                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-white text-azul-profundo hover:bg-azul-cielo/30 flex items-center justify-center font-bold text-xs transition-colors border border-azul-cielo/20"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-azul-profundo">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-white text-azul-profundo hover:bg-azul-cielo/30 flex items-center justify-center font-bold text-xs transition-colors border border-azul-cielo/20"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-bold text-azul-profundo">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-azul-cielo/20 p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-azul-profundo">Subtotal</span>
              <span className="text-xl font-bold text-azul-brillante">${subtotal.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="w-full py-3 bg-azul-brillante hover:bg-azul-real text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 mb-2"
            >
              Finalizar Compra
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <button
              onClick={closeDrawer}
              className="w-full py-2 text-azul-real hover:text-azul-brillante text-sm font-medium transition-colors flex items-center justify-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
