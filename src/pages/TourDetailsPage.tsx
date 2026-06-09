import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, Link } from '@tanstack/react-router';
import { blink } from '@/blink/client';
import { Button, Badge, Skeleton, Input, Textarea, Card, toast } from '@blinkdotnew/ui';
import { MapPin, Clock, Star, Calendar, Users, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export default function TourDetailsPage() {
  const { id } = useParams({ from: '/tour/$id' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const { data: tour, isLoading } = useQuery({
    queryKey: ['tour', id],
    queryFn: async () => {
      const result = await blink.db.tours.get(id);
      return result;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newData: any) => {
      return await blink.db.inquiries.create({
        id: `inq_${Date.now()}`,
        tourId: id,
        customerName: newData.name,
        customerEmail: newData.email,
        customerPhone: newData.phone,
        message: newData.message
      });
    },
    onSuccess: () => {
      toast.success('Запит успішно надіслано! Ми зв’яжемося з вами найближчим часом.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    },
    onError: () => {
      toast.error('Сталася помилка при відправці запиту.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Будь ласка, заповніть обов’язкові поля (ім’я та email).');
      return;
    }
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8 space-y-8">
        <Skeleton className="h-[50vh] w-full rounded-3xl" />
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!tour) return <div className="p-8 text-center">Тур не знайдено.</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={tour.imageUrl} 
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 text-white animate-fade-in">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Назад до каталогу</span>
            </Link>
            <div className="flex items-center gap-2 text-primary font-bold">
              <MapPin className="w-5 h-5" />
              <span className="uppercase tracking-widest">{tour.location}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">{tour.title}</h1>
            <div className="flex items-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold text-lg">{tour.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl min-w-[280px] text-center">
            <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest mb-1">Ціна від</p>
            <p className="text-4xl font-serif font-bold text-primary mb-4">${tour.price}</p>
            <Button size="lg" className="w-full rounded-2xl py-6" onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Забронювати зараз
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold border-b pb-4">Про цей тур</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {tour.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
              {[
                { label: 'Група', val: 'до 12 осіб', icon: Users },
                { label: 'Дата', val: 'Будь-яка', icon: Calendar },
                { label: 'Категорія', val: tour.category, icon: Plane }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <item.icon className="w-6 h-6 text-primary" />
                  <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{item.label}</span>
                  <span className="font-bold">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold border-b pb-4">Що входить у вартість</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Проживання в готелях 4-5*',
                'Сніданки та обіди',
                'Всі вхідні квитки за програмою',
                'Супровід професійного гіда',
                'Медичне страхування',
                'Трансфер з аеропорту'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Inquiry Form */}
        <div id="booking-form" className="lg:col-span-1">
          <Card className="p-8 rounded-[2.5rem] shadow-xl border-primary/10 sticky top-24">
            <h3 className="text-2xl font-serif font-bold mb-6">Дізнатися більше</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Ваше ім’я *</label>
                <Input 
                  placeholder="Олександр Іванов" 
                  className="rounded-xl py-6"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Email *</label>
                <Input 
                  type="email" 
                  placeholder="alex@example.com" 
                  className="rounded-xl py-6"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Телефон</label>
                <Input 
                  type="tel" 
                  placeholder="+380 99 123 45 67" 
                  className="rounded-xl py-6"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Повідомлення</label>
                <Textarea 
                  placeholder="Розкажіть нам про свої побажання..." 
                  className="rounded-xl min-h-[120px]"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full rounded-2xl py-7 text-lg mt-4 shadow-lg shadow-primary/20"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Надсилання...' : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" /> Надіслати запит
                  </span>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif font-bold text-primary italic">TourBureau</div>
          <p className="text-muted-foreground text-sm">© 2026 TourBureau Tracker. Усі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
