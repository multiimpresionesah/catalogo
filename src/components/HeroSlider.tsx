'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Slider } from '@/types';
import { useSettingsStore } from '@/store/settingsStore';

export default function HeroSlider() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { getSetting } = useSettingsStore();

  useEffect(() => {
    async function fetchSliders() {
      const { data } = await supabase
        .from('sliders')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (data) setSliders(data);
    }
    fetchSliders();
  }, []);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % sliders.length);
  }, [current, sliders.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + sliders.length) % sliders.length);
  }, [current, sliders.length, goTo]);

  // Auto-play
  useEffect(() => {
    if (sliders.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, sliders.length]);

  if (sliders.length === 0) {
    // Placeholder while loading
    return (
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-to-r from-azul-profundo to-azul-real flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-5xl font-bold mb-3">{getSetting('store_name', 'Multi Impresiones AH')}</h2>
          <p className="text-lg lg:text-xl text-white/80">Impresiones de alta calidad para tu negocio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden group">
      {/* Slides */}
      {sliders.map((slider, index) => (
        <div
          key={slider.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {/* Background gradient fallback */}
          <div className="absolute inset-0 bg-gradient-to-r from-azul-profundo via-azul-real to-azul-brillante" />
          
          {/* Image */}
          {slider.image_url && (
            <img
              src={slider.image_url}
              alt={slider.title || 'Promoción'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {slider.title && (
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                {slider.title}
              </h2>
            )}
            {slider.subtitle && (
              <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl drop-shadow-md">
                {slider.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      {sliders.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {sliders.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === current
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
