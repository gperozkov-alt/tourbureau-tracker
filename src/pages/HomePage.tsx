import React, { useState } from 'react';
import { Card, Badge, Button } from '@blinkdotnew/ui';
import { MapPin, Clock, Star, Search, CheckCircle2 } from 'lucide-react';

// Твоя оригинальная база данных на 5 туров с надежными картинками из интернета
const TOURS_STATIC = [
  {
    id: "1",
    title: "Альпійська казка",
    location: "Швейцарія",
    price: 1200,
    duration: "7 днів",
    rating: "4.9",
    imageUrl: "https://unsplash.com",
    category: "Гори"
  },
  {
    id: "2",
    title: "Золоті пляжі Балі",
    location: "Індонезія",
    price: 1500,
    duration: "10 днів",
    rating: "4.8",
    imageUrl: "https://unsplash.com",
    category: "Пляж"
  },
  {
    id: "3",
    title: "Таємниці Риму",
    location: "Італія",
    price: 850,
    duration: "5 днів",
    rating: "4.7",
    imageUrl: "https://unsplash.com",
    category: "Місто"
  },
  {
    id: "4",
    title: "Магія Ісландії",
    location: "Ісландія",
    price: 2100,
    duration: "8 днів",
    rating: "5.0",
    imageUrl: "https://unsplash.com",
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
    <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-orange-500">
      <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center border-b border-white/10">
        <a href="/" className="text-2xl font-bold tracking-wider text-orange-500 font-serif">TourBureau</a>
        <div className="flex gap-6 text-sm font-medium text-white/80">
          <a href="/" className="hover:text-orange-500 transition-colors">Головна</a>
          <a href="#about" className="hover:text-orange-500 transition-colors">Про нас</a>
        </div>
      </nav>
      
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("https://unsplash.com")' }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
            Відкрий світ разом з <span className="text-orange-500 italic">TourBureau</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 font-medium max-w-2xl mx-auto">
            Ми створюємо незабутні спогади, поєднуючи комфорт та справжні пригоди.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-xl mx-auto border border-white/10">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 text-white">
              <Search className="w-5 h-5 text-orange-500" />
              <input 
                type="text" 
                placeholder="Куди ви хочете поїхати?" 
                className="bg-transparent border-none outline-none w-full placeholder:text-white/40 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6 py-3 font-bold">
              Знайти пригоду
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl font-serif font-bold mb-2 text-orange-500">Наші популярні напрямки</h2>
            <p className="text-white/60 text-sm">
              Обирайте тур, який відповідає вашому настрою та бюджету. Кожна подорож — це нова історія.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'bg-orange-500 border-orange-500 text-white' 
                    : 'bg-transparent border-white/10 text-white/60 hover:border-white/30'
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
              <Card className="overflow-hidden border border-white/5 bg-neutral-800/40 rounded-3xl h-full transition-transform hover:-translate-y-2 backdrop-blur-sm p-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={tour.imageUrl} 
                    alt={tour.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-black/40 backdrop-blur-md text-white border-white/10 px-2 py-0.5 text-[10px]">
                      {tour.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-neutral-900/90 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                    <p className="font-bold text-orange-500 text-md">${tour.price}</p>
                  </div>
                </div>
                
                <div className="space-y-2 px-1">
                  <div className="flex items-center gap-1.5 text-orange-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold tracking-wide uppercase">{tour.location}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold group-hover:text-orange-500 transition-colors text-white">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-white/50 text-xs pt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-white">{tour.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="bg-neutral-800/30 border-t border-b border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://unsplash.com" 
              alt="Adventure"
              className="rounded-[2rem] shadow-2xl relative z-10 border border-white/10"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-orange-500">Чому обирають саме TourBureau?</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Ми дбаємо про кожну деталь вашої подорожі, забезпечуючи maximalний рівень комфорту та безпеки, щоб ви могли повністю поринути у нові відкриття.
            </p>
            
            <div className="space-y-3">
              {[
                { title: "Преміум житло", desc: "Проживання тільки в перевірених 4* та 5* готелях." },
                { title: "Сертифіковані гіди", desc: "Екскурсії від професіоналів, закоханих у свою справу." },
                { title: "Турбота 24/7", desc: "Наша підтримка завжди на зв'язку у будь-якій точці світу." }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
