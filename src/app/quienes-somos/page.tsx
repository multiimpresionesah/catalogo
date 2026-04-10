import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiénes Somos | Multi Impresiones AH',
  description: 'Conoce más sobre nuestra historia, misión y visión en Multi Impresiones AH.',
};

export const dynamic = 'force-dynamic';

async function getAboutContent() {
  const { data } = await supabase
    .from('store_settings')
    .select('key, value')
    .in('key', ['about_title', 'about_content']);

  const settings: Record<string, string> = {};
  data?.forEach(s => {
    if (s.value) settings[s.key] = s.value;
  });

  return {
    title: settings.about_title || 'Quiénes Somos',
    content: settings.about_content || 'Información sobre nuestra empresa próximamente.',
  };
}

export default async function QuienesSomosPage() {
  const { title, content } = await getAboutContent();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 w-full">
        {/* Navigation Breadcrumb */}
        <nav className="mb-8 flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-azul-brillante transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-azul-profundo font-medium">Quiénes Somos</span>
        </nav>

        {/* Hero-like Header */}
        <div className="bg-white rounded-3xl shadow-xl shadow-azul-profundo/5 overflow-hidden mb-10 border border-azul-cielo/20">
          <div className="h-2 bg-gradient-to-r from-azul-brillante via-azul-real to-azul-profundo" />
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-azul-profundo mb-6 tracking-tight">
              {title}
            </h1>
            <div className="w-20 h-1.5 bg-azul-brillante rounded-full mb-8" />
            
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6 text-justify">
              {content.split('\n').map((paragraph, index) => (
                paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 bg-azul-profundo hover:bg-azul-real text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-azul-profundo/20 group"
          >
            <svg 
              className="w-5 h-5 transform rotate-180 group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Volver al Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
