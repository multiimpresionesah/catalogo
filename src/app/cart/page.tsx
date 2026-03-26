'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getSubtotal } = useCart();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 border border-azul-cielo/20">
          <svg className="w-24 h-24 text-azul-cielo mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <h2 className="text-2xl font-bold text-azul-profundo mb-3">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-6">Agrega productos para empezar tu pedido</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-azul-brillante hover:bg-azul-real text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Ver Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-azul-profundo mb-8">Mi Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-xl border border-azul-cielo/20 shadow-sm p-4 flex gap-4 animate-fade-in"
            >
              {/* Image */}
              <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-azul-palido">
                {item.image ? (
                  <img src={item.image} alt={item.product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-azul-cielo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/product/${item.product.id}`} className="font-semibold text-azul-profundo hover:text-azul-brillante transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label="Eliminar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-azul-brillante font-bold mt-1">${item.product.price.toFixed(2)} c/u</p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-azul-palido text-azul-profundo hover:bg-azul-cielo/40 flex items-center justify-center font-bold transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-azul-profundo">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-azul-palido text-azul-profundo hover:bg-azul-cielo/40 flex items-center justify-center font-bold transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Item total */}
                  <span className="font-bold text-azul-profundo">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-azul-cielo/20 shadow-lg p-6 sticky top-28">
            <h3 className="text-lg font-bold text-azul-profundo mb-4">Resumen del Pedido</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Productos ({items.length})</span>
                <span className="font-semibold text-azul-profundo">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className="text-gray-400 text-xs">Se calcula al finalizar</span>
              </div>
            </div>

            <div className="border-t border-azul-cielo/30 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-azul-profundo">Subtotal</span>
                <span className="text-xl font-bold text-azul-brillante">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full py-3 bg-azul-brillante hover:bg-azul-real text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-azul-brillante/30 flex items-center justify-center gap-2"
            >
              Finalizar Compra
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link href="/" className="mt-3 w-full py-2 text-azul-real hover:text-azul-brillante text-sm font-medium transition-colors flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
