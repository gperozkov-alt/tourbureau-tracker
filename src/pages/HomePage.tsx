import React, { useState, useEffect } from 'react';

const TOURS_STATIC = [
  {
    id: "1",
    title: "Альпійська казка",
    location: "Швейцарія",
    price: 1200,
    duration: "7 днів",
    rating: "4.9",
    imageUrl: "https://cdn.pixabay.com/photo/2020/03/03/20/31/boat-4899802_1280.jpg",
    category: "Гори"
  },
  {
    id: "2",
    title: "Золоті пляжі Балі",
    location: "Індонезія",
    price: 1500,
    duration: "10 днів",
    rating: "4.8",
    imageUrl: "https://media.istockphoto.com/id/475519262/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D1%83%D1%80%D0%B0-%D1%83%D0%BB%D1%83%D0%BD-%D0%B4%D0%B0%D0%BD%D1%83-%D0%B1%D1%80%D0%B0%D1%82%D0%B0%D0%BD-%D0%B2-%D0%B1%D0%B0%D0%BB%D0%B8-%D0%B8%D0%BD%D0%B4%D0%BE%D0%BD%D0%B5%D0%B7%D0%B8%D1%8F.jpg?s=612x612&w=0&k=20&c=ZMIaRt5BCadx94F2_GMYyRaGy207wGNi0IZNVxxLgmI=",
    category: "Пляж"
  },
  {
    id: "3",
    title: "Таємниці Риму",
    location: "Італія",
    price: 850,
    duration: "5 днів",
    rating: "4.7",
    imageUrl: "https://aws-tiqets-cdn.imgix.net/images/content/ae55c13761824ba5b6f3126bc1d7a561.jpg?auto=format,compress&fit=crop&h=260&q=40&w=390",
    category: "Місто"
  },
  {
    id: "4",
    title: "Магія Ісландії",
    location: "Ісландія",
    price: 2100,
    duration: "8 днів",
    rating: "5.0",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Idyllic_landscape_with_a_waterfall_(Unsplash).jpg/1280px-Idyllic_landscape_with_a_waterfall_(Unsplash).jpg",
    category: "Природа"
  },
  {
    id: "5",
    title: "Сафарі в Кенії",
    location: "Кенія",
    price: 1800,
    duration: "6 днів",
    rating: "4.9",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Safari_in_Kenya.jpg/1280px-Safari_in_Kenya.jpg",
    category: "Сафарі"
  }
];

const scrollStyles = `
  .sa {
    opacity: 0;
    transform: translateY(35px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .sa-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .sa-d1 { transition-delay: 0.05s; }
  .sa-d2 { transition-delay: 0.15s; }
  .sa-d3 { transition-delay: 0.25s; }
  .sa-d4 { transition-delay: 0.35s; }
  .sa-d5 { transition-delay: 0.45s; }
  .tour-card {
    background: #262626;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px;
    padding: 15px;
    height: 100%;
    transition: transform 0.25s ease, border-color 0.25s ease;
  }
  .tour-card:hover {
    transform: translateY(-6px);
    border-color: rgba(249,115,22,0.4);
  }
`;

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sa-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.sa');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Усі');
  const delays = ['sa-d1', 'sa-d2', 'sa-d3', 'sa-d4', 'sa-d5'];

  useScrollAnimation();

  const categories = ['Усі', 'Гори', 'Пляж', 'Місто', 'Природа', 'Сафарі'];

  const filteredTours = TOURS_STATIC.filter((tour: any) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Усі' || tour.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#171717', color: 'white', minHeight: '100vh', fontFamily: 'Geist, sans-serif' }}>
      <style>{scrollStyles}</style>

      <nav style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        <a href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316', textDecoration: 'none' }}>TourBureau</a>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Головна</a>
          <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>Про нас</a>
        </div>
      </nav>

      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: 'url("https://tripmydream.cc/travelhub/blog/blog/15/46/block_1546.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: '0', backgroundColor: 'rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Відкрий світ разом з <span style={{ color: '#f97316', fontStyle: 'italic' }}>TourBureau</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#eee', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Ми створюємо незабутні спогади, поєднуючи комфорт та справжні пригоди.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '15px', display: 'flex', gap: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <input
              type="text"
              placeholder="Куди ви хочете поїхати?"
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', padding: '10px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button style={{ background: '#f97316', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Знайти пригоду</button>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div className="sa" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '32px', margin: '0 0 10px 0', color: '#f97316' }}>Наші популярні напрямки</h2>
            <p style={{ color: '#aaa', margin: '0' }}>Обирайте тур, який відповідає вашому настрою та бюджету.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: activeCategory === cat ? '#f97316' : 'transparent', color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {filteredTours.map((tour: any, index: number) => (
            
              <a key={tour.id}
              href={`/tour/${tour.id}`}
              className={`sa ${delays[index] || 'sa-d1'}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div className="tour-card">
                <div style={{ position: 'relative', height: '200px', borderRadius: '15px', overflow: 'hidden', marginBottom: '15px' }}>
                  <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '8px', fontSize: '10px' }}>{tour.category}</span>
                  <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#171717', color: '#f97316', padding: '6px 12px', borderRadius: '10px', fontWeight: 'bold' }}>${tour.price}</span>
                </div>
                <span style={{ color: '#f97316', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>{tour.location}</span>
                <h3 style={{ fontSize: '20px', margin: '5px 0 10px 0', color: 'white' }}>{tour.title}</h3>
                <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>{tour.duration} | {tour.rating} ★</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
