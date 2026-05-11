'use client';
export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/905079165707"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
        width: '56px', height: '56px', borderRadius: '50%',
        background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        transition: 'all 0.3s', fontSize: '1.6rem', color: '#fff',
        animation: 'wpPulse 2.5s infinite',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <i className="fab fa-whatsapp" />
      <style>{`@keyframes wpPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.4)}50%{box-shadow:0 4px 30px rgba(37,211,102,0.7)}}`}</style>
    </a>
  );
}
