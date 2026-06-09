import React from 'react';
import { Link } from '@tanstack/react-router';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-white italic drop-shadow-md">
          TourBureau
        </Link>
        <div className="flex gap-8 text-white font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
          <a href="#" className="hover:text-primary transition-colors">Про нас</a>
          <a href="#" className="hover:text-primary transition-colors">Контакти</a>
        </div>
      </div>
    </nav>
  );
}
