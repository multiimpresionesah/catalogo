'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const subtotal = getSubtotal();
  const deliveryFee = deliveryOption === 'delivery' ? parseFloat(process.env.NEXT_PUBLIC_DELIVERY_FEE || '1.50') : 0;
  const total = subtotal + deliveryFee;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50360528774';

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = 'Por favor ingresa tu nombre';
    if (!phone.trim()) newErrors.phone = 'Por favor ingresa tu número de teléfono';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Build WhatsApp message
    const itemLines = items.map(
      item => `• ${item.product.name} x${item.quantity} — $${(item.product.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const deliveryText = deliveryOption === 'delivery' ? 'Delivery (+$1.50)' : 'Recoger en tienda';

    const message = `🛒 *Nuevo Pedido - Multi Impresiones AH*\n\n` +
      `👤 *Cliente:* ${name}\n` +
      `📱 *Teléfono:* ${phone}\n` +
      `🚚 *Entrega:* ${deliveryText}\n\n` +
      `📋 *Productos:*\n${itemLines}\n\n` +
      `${deliveryOption === 'delivery' ? `📦 Envío: $${deliveryFee.toFixed(2)}\n` : ''}` +
      `💰 *Total: $${total.toFixed(2)}*\n\n` +
      `¡Gracias por su pedido! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Clear cart and redirect
    clearCart();
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-12 border border-azul-cielo/20">
          <svg className="w-24 h-24 text-azul-cielo mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <h2 className="text-2xl font-bold text-azul-profundo mb-3">No hay productos en tu carrito</h2>
          <p className="text-gray-500 mb-6">Agrega productos antes de finalizar tu compra</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-azul-brillante hover:bg-azul-real text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Ver Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8">
      <h1 className="text-2xl lg:text-3xl font-bold text-azul-profundo mb-2">Finalizar Compra</h1>
      <p className="text-gray-500 mb-8">Completa tus datos para enviar tu pedido por WhatsApp</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form + Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-xl border border-azul-cielo/20 shadow-sm p-6">
            <h3 className="font-bold text-azul-profundo mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-azul-brillante" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Datos del Cliente
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-azul-profundo mb-1">Nombre completo *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
                  placeholder="Ej: Juan Pérez"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-400 bg-red-50' : 'border-azul-cielo/30'} focus:outline-none focus:ring-2 focus:ring-azul-brillante text-azul-profundo placeholder-gray-400`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-azul-profundo mb-1">Número de teléfono *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setErrors(prev => ({ ...prev, phone: undefined })); }}
                  placeholder="Ej: 7890-1234"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-400 bg-red-50' : 'border-azul-cielo/30'} focus:outline-none focus:ring-2 focus:ring-azul-brillante text-azul-profundo placeholder-gray-400`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Delivery option */}
          <div className="bg-white rounded-xl border border-azul-cielo/20 shadow-sm p-6">
            <h3 className="font-bold text-azul-profundo mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-azul-brillante" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Método de Entrega
            </h3>

            <div className="space-y-3">
              <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryOption === 'pickup' ? 'border-azul-brillante bg-azul-palido' : 'border-azul-cielo/30 hover:border-azul-cielo'}`}>
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={deliveryOption === 'pickup'}
                  onChange={() => setDeliveryOption('pickup')}
                  className="w-5 h-5 text-azul-brillante accent-azul-brillante"
                />
                <div className="flex-1">
                  <span className="font-semibold text-azul-profundo">Recoger en tienda</span>
                  <p className="text-xs text-gray-500 mt-0.5">Sin costo adicional</p>
                </div>
                <span className="font-bold text-green-600 text-sm">Gratis</span>
              </label>

              <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryOption === 'delivery' ? 'border-azul-brillante bg-azul-palido' : 'border-azul-cielo/30 hover:border-azul-cielo'}`}>
                <input
                  type="radio"
                  name="delivery"
                  value="delivery"
                  checked={deliveryOption === 'delivery'}
                  onChange={() => setDeliveryOption('delivery')}
                  className="w-5 h-5 text-azul-brillante accent-azul-brillante"
                />
                <div className="flex-1">
                  <span className="font-semibold text-azul-profundo">Delivery</span>
                  <p className="text-xs text-gray-500 mt-0.5">Entrega a domicilio</p>
                </div>
                <span className="font-bold text-azul-brillante text-sm">+$1.50</span>
              </label>
            </div>
          </div>

          {/* Order items preview */}
          <div className="bg-white rounded-xl border border-azul-cielo/20 shadow-sm p-6">
            <h3 className="font-bold text-azul-profundo mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-azul-brillante" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Resumen de Productos
            </h3>

            <div className="space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-azul-cielo/10 last:border-0">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-azul-palido">
                    {item.image ? (
                      <img src={item.image} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-azul-cielo/20" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-azul-profundo truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                  <span className="font-semibold text-azul-profundo text-sm">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-azul-cielo/20 shadow-lg p-6 sticky top-28">
            <h3 className="text-lg font-bold text-azul-profundo mb-4">Total del Pedido</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold text-azul-profundo">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className={`font-semibold ${deliveryFee > 0 ? 'text-azul-brillante' : 'text-green-600'}`}>
                  {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Gratis'}
                </span>
              </div>
            </div>

            <div className="border-t border-azul-cielo/30 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-azul-profundo text-lg">Total</span>
                <span className="text-2xl font-bold text-azul-brillante">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2 text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              FINALIZAR COMPRA
            </button>

            <p className="text-xs text-center text-gray-400 mt-3 leading-relaxed">
              Serás redirigido a <strong className="text-green-600">WhatsApp</strong> donde un representante de la tienda te atenderá para completar tu compra.
            </p>

            <Link href="/cart" className="mt-4 w-full py-2 text-azul-real hover:text-azul-brillante text-sm font-medium transition-colors flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al Carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
