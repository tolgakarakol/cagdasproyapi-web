'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      router.push('/admin/dashboard');
    } catch {
      setError('Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <i className="fas fa-shield-alt" />
        </div>
        <h1 className={styles.title}>Admin Paneli</h1>
        <p className={styles.sub}>Çağdaş Pro Yapı Yönetim Sistemi</p>
        {error && <div className={styles.error}><i className="fas fa-exclamation-circle" /> {error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>E-posta</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@cagdasproyapi.com" />
          </div>
          <div className={styles.field}>
            <label>Şifre</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin" /> Giriş yapılıyor...</> : <><i className="fas fa-sign-in-alt" /> Giriş Yap</>}
          </button>
        </form>
        <a href="/" className={styles.back}><i className="fas fa-arrow-left" /> Siteye Dön</a>
      </div>
    </div>
  );
}
