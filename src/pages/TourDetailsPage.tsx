import React, { useState } from 'react';

const TOURS_DATA: Record<string, any> = {
  "1": {
    title: "Альпійська казка",
    location: "Швейцарія",
    price: 1200,
    duration: "7 днів",
    rating: "4.9",
    imageUrl: "https://unsplash.com",
    description: "Неймовірна подорож у серце Альп. На вас чекають засніжені вершини, кришталево чисті гірські озера, прогулянки затишними швейцарськими селищами та першокласний сервіс у затишних шале. Програма включає відвідування оглядових майданчиків та дегустацію традиційного швейцарського сиру та шоколаду.",
    category: "Гори"
  },
  "2": {
    title: "Золоті пляжі Балі",
    location: "Індонезія",
    price: 1500,
    duration: "10 днів",
    rating: "4.8",
    imageUrl: "https://unsplash.com",
    description: "Екзотичний відпочинок на одному з найкрасивіших островів світу. Білосніжні та вулканічні пляжі, тропічні джунглі, стародавни індуїстські храми та унікальна культура Балі. У вартість включені спа-процедури, уроки серфінгу та захоплюючі екскурсії до водоспадів.",
    category: "Пляж"
  },
  "3": {
    title: "Таємниці Риму",
    location: "Італія",
    price: 850,
    duration: "5 днів",
    rating: "4.7",
    imageUrl: "https://unsplash.com",
    description: "Пориньте в атмосферу Вічного міста. Професійні гіди проведуть вас таємними стежками Колізею, Ватикану та Римського Форуму. Ви дізнаєтеся історію великої імперії, скуштуєте справжню італійську пасту та піцу в автентичних траторіях Двору.",
    category: "Місто"
  },
  "4": {
    title: "Магія Ісландії",
    location: "Ісландія",
    price: 2100,
    duration: "8 днів",
    rating: "5.0",
    imageUrl: "https://unsplash.com",
    description: "Подорож у країну льоду та вогню. Величні гейзери, гігантські водоспади, застигла вулканічна лава та неймовірні чорні пляжі Вік. Програма включає купання в геотермальному комплексі Блакитна Лагуна та вечірні виїзди для полювання за Північним сяйвом.",
    category: "Природа"
  },
  "5": {
    title: "Сафарі в Кенії",
    location: "Кенія",
    price: 1800,
    duration: "6 днів",
    rating: "4.9",
    imageUrl: "https://unsplash.com",
    description: "Справжня африканська пригода у національних парках Кенії. Поїздки на відкритих джипах на відстані витягнутої руки від левів, слонів, жирафів та леопардів. Неймовірна краса савани, ночівлі в комфортабельних еко-лоджах та знайомство з легендарним племенем Масаї.",
    category: "Сафарі"
  }
};

export default function TourDetailsPage() {
  let tourId = "1";
  if (typeof window !== 'undefined') {
    const parts = window.location.pathname.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart && TOURS_DATA[lastPart]) {
      tourId = lastPart;
    }
  }
  
  const tour = TOURS_DATA[tourId] || TOURS_DATA["1"];
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Будь ласка, заповніть обов’язкові поля (ім’я та email).');
      return;
    }
    setIsSubmitted(false);
    alert('Запит успешно надіслано! Ми зв’яжемося з вами найближчим часом.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div style={{ backgroundColor: '#171717', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '50px' }}>
      <nav style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
        <a href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316', textDecoration: 'none' }}>TourBureau</a>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Головна</a>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>Про нас</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: '40vh', width: '100%' }}>
        <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '20px', borderRadius: '15px' }}>
          <span style={{ color: '#f97316', fontSize: '12px', fontWeight: 'bold' }}>{tour.location}</span>
          <h1 style={{ fontSize: '32px', margin: '5px 0' }}>{tour.title}</h1>
          <p style={{ margin: '0', fontSize: '14px', color: '#ccc' }}>Тривалість: {tour.duration} | Рейтинг: {tour.rating} ★</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ color: '#f97316', fontSize: '24px', marginTop: '0' }}>Про цей тур</h2>
          <p style={{ lineHeight: '1.6', color: '#ddd' }}>{tour.description}</p>
          
          <h3 style={{ color: '#f97316', marginTop: '30px' }}>Що входить у вартість:</h3>
          <ul style={{ color: '#ccc', lineHeight: '1.8' }}>
            <li>Проживання в преміум готелях 4-5*</li>
            <li>Сніданки та обіди за програмою</li>
            <li>Всі вхідні квитки та збори</li>
            <li>Супровід професійного сертифікованого гіда</li>
            <li>Повне медичне страхування</li>
            <li>Комфортабельний трансфер протягом всього туру</li>
          </ul>
          
          <h3 style={{ color: '#f97316', marginTop: '30px' }}>Ціна туру: <span style={{ color: 'white', fontSize: '24px' }}>${tour.price}</span></h3>
        </div>

        <div style={{ background: '#262626', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#f97316', marginTop: '0', fontSize: '20px' }}>Швидке бронювання</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Ваше ім’я *</label>
              <input type="text" placeholder="Іван Іванов" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #404040', background: '#171717', color: 'white' }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Email *</label>
              <input type="email" placeholder="ivan@example.com" required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #404040', background: '#171717', color: 'white' }} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Телефон</label>
              <input type="tel" placeholder="+380 99 123 45 67" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #404040', background: '#171717', color: 'white' }} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '5px' }}>Побажання</label>
              <textarea placeholder="Побажання щодо дат або кількості місць" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #404040', background: '#171717', color: 'white', height: '60px', resize: 'none' }} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#f97316', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>Надіслати заявку</button>
          </form>
        </div>
      </div>
    </div>
  );
}
