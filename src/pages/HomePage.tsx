import React, { useState } from 'react';
import { Card, Badge, Button } from '@blinkdotnew/ui';
import { MapPin, Clock, Star, Search, CheckCircle2, Shield, Users, Compass } from 'lucide-react';

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
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20">
      {/* Навбар */}
      <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center border-b border-border/40">
        <a href="/" className="text-2xl font-bold tracking-wider text-primary font-serif">TourBureau</a>
        <div className="flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors">Головна</a>
          <a href="#about" className="hover:text-primary transition-colors">Про нас</a>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("https://unsplash.com")' }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
            Відкрий світ разом з <span className="text-primary italic">TourBureau</span>
          </h1>
          <p className="text-xl text-white/90 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
            Ми створюємо незабутні спогади, поєднуючи комфорт та справжні пригоди.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto border border-white/20 shadow-2xl">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 text-white">
              <Search className="w-5 h-5 opacity-70 text-white" />
              <input 
                type="text" 
                placeholder="Куди ви хочете поїхати?" 
                className="bg-transparent border-none outline-none w-full placeholder:text-white/60 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20 font-bold bg-primary text-primary-foreground hover:opacity-90">
              Знайти пригоду
            </Button>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-bold mb-4 tracking-tight">Наші популярні напрямки</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Обирайте тур, який відповідає вашому настрою та бюджету. Кожна подорож — це нова історія.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Badge 
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'} 
                className="px-5 py-2 cursor-pointer transition-all rounded-full text-xs font-bold"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Badge>
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
              <Card className="overflow-hidden border-none shadow-none bg-transparent h-full transition-transform hover:-translate-y-2 duration-300">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-md">
                  <img 
                    src={tour.imageUrl} 
                    alt={tour.title}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                      {tour.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                    <p className="font-bold text-primary text-lg font-serif">${tour.price}</p>
                  </div>
                </div>
                
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold tracking-wider uppercase text-primary/90">{tour.location}</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors tracking-tight leading-tight">
                    {tour.title}
                  </h3>
                  
                  <div className="flex items-center gap-6 text-muted-foreground text-sm pt-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-foreground pl-0.5">{tour.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Фирменный блок преимуществ из твоего скриншота */}
      <section id="about" className="bg-primary/5 py-24 border-t border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://pixabay.com" 
              alt="Пригоди"
              className="rounded-[3rem] shadow-2xl relative z-10 border border-border/40"
            />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight tracking-tight">
              Чому обирають саме <span className="text-primary italic">нас</span> для своїх пригод?
            </h2>
            
            <div className="space-y-6">
              {[
                { 
                  title: "Досвідчені гіди", 
                  desc: "Наші професіонали знають кожен потаємний куточок вашого маршруту.", 
                  icon: Compass 
                },
                { 
                  title: "Гнучкість та комфорт", 
                  desc: "Ми підлаштуємо кожен тур під ваші побажання та потреби.", 
                  icon: Users 
                },
                { 
