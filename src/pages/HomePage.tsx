import React, { useState } from 'react';
import { MapPin, Clock, Star, Search, Shield, Users, Compass } from 'lucide-react';

const TOURS_STATIC = [
  {
    id: "1",
    title: "Альпійська казка",
    location: "Швейцарія",
    price: 1200,
    duration: "7 днів",
    rating: "4.9",
    imageUrl: "https://pixabay.com",
    category: "Гори"
  },
  {
    id: "2",
    title: "Золоті пляжі Балі",
    location: "Індонезія",
    price: 1500,
    duration: "10 днів",
    rating: "4.8",
    imageUrl: "https://istockphoto.com",
    category: "Пляж"
  },
  {
    id: "3",
    title: "Таємниці Риму",
    location: "Італія",
    price: 850,
    duration: "5 днів",
    rating: "4.7",
    imageUrl: "https://imgix.net",
    category: "Місто"
  },
  {
    id: "4",
    title: "Магія Ісландії",
    location: "Ісландія",
    price: 2100,
    duration: "8 днів",
    rating: "5.0",
    imageUrl: "https://wikimedia.org",
    category: "Природа"
  },
  {
    id: "5",
    title: "Сафарі в Кенії",
    location: "Кенія",
    price: 1800,
    duration: "6 днів",
    rating: "4.9",
    imageUrl: "https://unsplash.com",
    category: "Сафарі"
  }
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Усі');

  const categories = ['Усі', 'Гори', 'Пляж', 'Місто', 'Природа', 'Сафарі'];

  const filteredTours = TOURS_STATIC.filter((tour: any) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Усі' || tour.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans antialiased selection:bg-orange-500/30">
      {/* Навбар */}
      <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center border-b border-white/5">
        <a href="/" className="text-2xl font-bold tracking-wider text-orange-500 font-serif hover:opacity-90 transition-opacity">TourBureau</a>
        <div className="flex gap-8 text-sm font-medium text-white/60">
          <a href="/" className="hover:text-orange-500 transition-colors">Головна</a>
          <a href="#about" className="hover:text-orange-500 transition-colors">Про нас</a>
        </div>
      </nav>
      
      {/* Головна заставка з машиною */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("https://unsplash.com")' }}
        >
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-5 leading-tight tracking-tight">
            Відкрий світ разом з <span className="text-orange-500 italic">TourBureau</span>
          </h1>
          <p className="text-xl text-white/80 mb-10 font-normal max-w-2xl mx-auto leading-relaxed">
            Ми створюємо незабутні спогади, поєднуючи комфорт та справжні пригоди.
          </p>
          
          <div className="bg-white/5 backdrop-blur-md p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto border border-white/10 shadow-2xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 text-white">
              <Search className="w-5 h-5 text-orange-500 shrink-0" />
              <input 
                type="text" 
                placeholder="Куди ви хочете поїхати?" 
                className="bg-transparent border-none outline-none w-full placeholder:text-white/40 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 font-bold transition-all shadow-lg shadow-orange-500/10 py-3 text-sm">
              Знайти пригоду
            </button>
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-bold mb-4 tracking-tight text-white">Наші популярні напрямки</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Обирайте тур, який відповідає вашому настрою та бюджету. Кожна подорож — це нова історія.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/10' 
                    : 'bg-transparent border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour: any) => (
            <a 
              key={tour.id} 
              href={`/tour/${tour.id}`} 
              className="group block"
            >
              <div className="overflow-hidden border border-white/5 bg-neutral-900/30 backdrop-blur-sm rounded-[2rem] h-full transition-all duration-300 hover:-translate-y-2 hover:border-white/10 hover:shadow-2xl hover:shadow-orange-500/5 p-4 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                    <img 
                      src={tour.imageUrl} 
                      alt={tour.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/50 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        {tour.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10">
                      <p className="font-bold text-orange-500 text-lg font-serif">${tour.price}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5 px-1">
                    <div className="flex items-center gap-1.5 text-orange-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">{tour.location}</span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold group-hover:text-orange-500 transition-colors text-white tracking-tight leading-tight">
                      {tour.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 text-white/50 text-xs pt-4 border-t border-white/5 mt-4 px-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-bold text-white/90 text-sm pl-0.5">{tour.rating}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Твій красивий блок переваг з човном */}
      <section id="about" className="bg-neutral-900/20 border-t border-b border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://pixabay.com" 
              alt="Пригоди"
              className="rounded-[3rem] shadow-2xl relative z-10 border border-white/10"
            />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight tracking-tight">
              Чому обирають саме <span className="text-orange-500 italic">нас</span> для своїх пригод?
            </h2>
            
            <div className="space-y-6">
