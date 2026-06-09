import React, { useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { Button, Badge, Input, Textarea, Card } from '@blinkdotnew/ui';
import { MapPin, Clock, Star, Calendar, Users, CheckCircle2, ArrowLeft, Send } from 'lucide-react';

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
    description: "Екзотичний відпочинок на одному з найкрасивіших островів світу. Білосніжні та вулканічні пляжі, тропічні джунглі, стародавні індуїстські храми та унікальна культура Балі. У вартість включені спа-процедури, уроки серфінгу та захоплюючі екскурсії до водоспадів.",
    category: "Пляж"
  },
  "3": {
    title: "Таємниці Риму",
    location: "Італія",
    price: 850,
    duration: "5 днів",
    rating: "4.7",
    imageUrl: "https://unsplash.com",
    description: "Пориньте в атмосферу Вічного міста. Професійні гіди провели вас таємними стежками Колізею, Ватикану та Римського Форуму. Ви дізнаєтеся історію великої імперії, скуштуєте справжню італійську пасту та піцу в автентичних траторіях Двору.",
    category: "Місто"
  }
};

export default function TourDetailsPage() {
  const { id } = useParams({ strict: false }) as any;
  const tourId = id || "1"; 
  const tour = TOURS_DATA[tourId] || TOURS_DATA["1"];

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Будь ласка, заповніть обов’язкові поля (ім’я та email).');
      return;
    }
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-orange-500">
      <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center border-b border-white/10">
        <Link to="/" className="text-2xl font-bold tracking-wider text-orange-500 font-serif">TourBureau</Link>
        <div className="flex gap-6 text-sm font-medium text-white/80">
          <Link to="/" className="hover:text-orange-500 transition-colors">Головна</Link>
          <Link to="/" className="hover:text-orange-500 transition-colors">Про нас</Link>
        </div>
      </nav>

      <section className="relative h-[55vh] overflow-hidden">
        <img 
          src={tour.imageUrl} 
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-3 text-white">
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-orange-500 transition-colors mb-2 text-sm group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Назад до каталогу</span>
            </Link>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              <span>{tour.location}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">{tour.title}</h1>
            <div className="flex items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{tour.rating}</span>
              </div>
              <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full px-3">{tour.category}</Badge>
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-white/10 p-6 rounded-[2rem] shadow-2xl min-w-[260px] text-center backdrop-blur-md">
            <p className="text-white/50 text-xs uppercase font-bold tracking-widest mb-1">Ціна туру</p>
            <p className="text-4xl font-serif font-bold text-orange-500 mb-4">${tour.price}</p>
            <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Забронювати
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold border-b border-white/10 pb-3 text-orange-500">Про цей тур</h2>
            <p className="text-md text-white/70 leading-relaxed">
              {tour.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {[
                { label: 'Група', val: 'до 12 осіб', icon: Users },
                { label: 'Дата виїзду', val: 'Щотижня', icon: Calendar },
                { label: 'Гід', val: 'Включено', icon: MapPin }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  <item.icon className="w-5 h-5 text-orange-500" />
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">{item.label}</span>
                  <span className="font-bold text-sm">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold border-b border-white/10 pb-3 text-orange-500">Відгуки мандрівників</h2>
            <div className="space-y-3">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-bold">Максим Коваленко</span>
                  <span className="text-amber-400">★★★★★</span>
                </div>
                <p className="text-xs text-white/60">Це була найкраща подорож у моєму житті! Організація на найвищому рівні, готелі супер, гід знав відповідь на будь-яке питання. Рекомендую!</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-bold">Олена Петренко</span>
                  <span className="text-amber-400">★★★★★</span>
                </div>
                <p className="text-xs text-white/60">Все дуже сподобалося. Ціна повністю виправдовує якість. Дуже зручні автобуси та крута екскурсійна програма.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold border-b border-white/10 pb-3 text-orange-500">Що входить у вартість</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Проживання в преміум готелях 4-5*',
                'Сніданки та обіди за програмою',
                'Всі вхідні квитки та збори',
                'Супровід професійного сертифікованого гіда',
                'Повне медичне страхування',
                'Комфортабельний трансфер протягом всього туру'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="booking-form" className="lg:col-span-1">
          <Card className="p-6 bg-neutral-800 border-white/10 rounded-[2rem] shadow-xl sticky top-24">
            <h3 className="text-xl font-serif font-bold mb-4 text-orange-500">Швидке尋бронювання</h3>
            
            {isSubmitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="font-bold text-sm text-emerald-400">Запит успішно надіслано!</p>
                <p className="text-xs text-white/60">Наш менеджер зв’яжеться з вами найближчим часом для підтвердження місць.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
