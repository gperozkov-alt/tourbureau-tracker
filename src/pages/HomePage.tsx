import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { blink } from '@/blink/client';
import { Card, Badge, Button, Skeleton } from '@blinkdotnew/ui';
import { MapPin, Clock, Star, Search, Plane } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Усі');

  const { data: tours, isLoading } = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const result = await blink.db.tours.list();
      return result;
    },
  });

  const categories = ['Усі', 'Гори', 'Пляж', 'Місто', 'Природа', 'Сафарі'];

  const filteredTours = tours?.filter((tour: any) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Усі' || tour.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000")' }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Відкрий світ разом з <span className="text-primary italic">TourBureau</span>
          </h1>
          <p className="text-xl text-white/90 mb-10 font-medium max-w-2xl mx-auto">
            Ми створюємо незабутні спогади, поєднуючи комфорт та справжні пригоди.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto border border-white/20">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 text-white">
              <Search className="w-5 h-5 opacity-70" />
              <input 
                type="text" 
                placeholder="Куди ви хочете поїхати?" 
                className="bg-transparent border-none outline-none w-full placeholder:text-white/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/20">
              Знайти пригоду
            </Button>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-bold mb-4">Наші популярні напрямки</h2>
            <p className="text-muted-foreground text-lg">
              Обирайте тур, який відповідає вашому настрою та бюджету. Кожна подорож — це нова історія.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Badge 
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'} 
                className={cn(
                  "px-4 py-1.5 cursor-pointer transition-all",
                  activeCategory !== cat && "hover:bg-primary/10"
                )}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-3xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : filteredTours && filteredTours.length > 0 ? (
            filteredTours.map((tour: any) => (
              <Link 
                key={tour.id} 
                to="/tour/$id" 
                params={{ id: tour.id }}
                className="group block"
              >
                <Card className="overflow-hidden border-none shadow-none bg-transparent h-full transition-transform hover:-translate-y-2">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                    <img 
                      src={tour.imageUrl} 
                      alt={tour.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-3 py-1">
                        {tour.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                      <p className="font-bold text-primary text-lg">${tour.price}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 px-2">
                    <div className="flex items-center gap-2 text-primary">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-semibold tracking-wide uppercase">{tour.location}</span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                      {tour.title}
                    </h3>
                    
                    <div className="flex items-center gap-6 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-semibold">{tour.rating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl font-serif text-muted-foreground italic">Турів не знайдено за вашим запитом...</p>
              <Button variant="link" onClick={() => { setSearchTerm(''); setActiveCategory('Усі'); }} className="mt-4">
                Скинути всі фільтри
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 scale-95 opacity-50 absolute -top-4 -left-4 bg-primary/20 -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000" 
              alt="Adventure"
              className="rounded-[3rem] shadow-2xl relative z-10"
            />
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Чому обирають саме нас для своїх пригод?
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Досвідчені гіди', desc: 'Наші професіонали знають кожен потаємний куточок вашого маршруту.' },
                { title: 'Гнучкість та комфорт', desc: 'Ми підлаштовуємо кожен тур під ваші побажання та потреби.' },
                { title: 'Безпека понад усе', desc: 'Ми забезпечуємо повну страховку та підтримку 24/7 під час подорожі.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Plane className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button size="lg" className="rounded-2xl px-10 py-7 text-lg">Дізнатися більше</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif font-bold text-primary italic">TourBureau</div>
          <p className="text-muted-foreground text-sm">© 2026 TourBureau Tracker. Усі права захищені.</p>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">Політика конфіденційності</a>
            <a href="#" className="hover:text-primary transition-colors">Умови використання</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
