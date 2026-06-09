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
