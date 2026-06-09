import React, { useState } from 'react';
import { MapPin, Clock, Star, Search, CheckCircle2 } from 'lucide-react';

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
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Подключаем красивый шрифт Playfair Display напрямую из Google Fonts */}
      <link rel="preconnect" href="https://googleapis.com" />
      <link rel="preconnect" href="https://gstatic.com" crossOrigin="anonymous" />
      <link href="https://googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      
      <style>{`
        .font-serif {
          font-family: 'Playfair Display', Georgia, serif !important;
        }
      `}</style>

      {/* Навбар */}
      <nav style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
        <a href="/" className="font-serif" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316', textDecoration: 'none', trackingWider: '0.05em' }}>TourBureau</a>
        <div style={{ display: 'flex', gap: '32px', fontSize: '14px' }}>
          <a href="/" style={{ color: '#f97316', textDecoration: 'none', fontWeight: '500' }}>Головна</a>
          <a href="#about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: '500' }}>Про нас</a>
        </div>
      </nav>
      
      {/* Заставка с фургончиком */}
      <section style={{ position: 'relative', height: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url("https://unsplash.com")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: '0', backgroundColor: 'rgba(0,0,0,0.45)' }} />
        <div style={{ position: 'relative', zIndex: '10', textAlign: 'center', maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
          <h1 className="font-serif" style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.1', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
            Відкрий світ разом з <span style={{ color: '#f97316', fontStyle: 'italic' }}>TourBureau</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '40px', fontWeight: 'normal' }}>
            Ми створюємо незабутні спогади, поєднуючи комфорт та справжні пригоди.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.08)', padding: '8px', borderRadius: '16px', display: 'flex', gap: '10px', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
            <div style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '12px' }}>
              <Search style={{ width: '20px', height: '20px', color: '#f97316' }} />
              <input 
                type="text" 
                placeholder="Куди ви хочете поїхати?" 
                style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '14px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button style={{ background: '#f97316', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Знайти пригоду</button>
          </div>
        </div>
      </section>

      {/* Каталог туров */}
      <section style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h2 className="font-serif" style={{ fontSize: '36px', margin: '0 0 12px 0', fontWeight: 'bold' }}>Наші популярні напрямки</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: '0', fontSize: '16px' }}>Обирайте тур, який відповідає вашому настрою та бюджету. Кожна подорож — це нова історія.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                style={{ padding: '8px 20px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: activeCategory === cat ? '#f97316' : 'transparent', color: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.6)', fontSize: '12px', fontWeight: 'bold', transition: '0.2s' }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {filteredTours.map((tour: any) => (
            <a key={tour.id} href={`/tour/${tour.id}`} style={{ textDecoration: 'none', color: 'white' }}>
              <div style={{ background: 'rgba(38,38,38,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '32px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backdropFilter: 'blur(4px)' }}>
                <div>
                  <div style={{ position: 'relative', height: '220px', borderRadius: '24px', overflow: 'hidden', marginBottom: '20px' }}>
                    <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: '9999px', fontSize: '10px', fontWeight: 'bold', trackingWider: '0.05em', textTransform: 'uppercase' }}>{tour.category}</span>
                    <span className="font-serif" style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(23,23,23,0.85)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', color: '#f97316', padding: '6px 16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px' }}>${tour.price}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
                    <MapPin style={{ width: '14px', height: '14px' }} />
                    <span style={{ textTransform: 'uppercase', trackingWider: '0.05em' }}>{tour.location}</span>
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '24px', margin: '0 0 16px 0', fontWeight: 'bold', lineHeight: '1.2' }}>{tour.title}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock style={{ width: '14px', height: '14px', color: '#f97316' }} />
                    <span>{tour.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                    {/* Фирменная золотая закрашенная звездочка */}
