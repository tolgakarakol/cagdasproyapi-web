'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Giriş başarısız');
        return;
      }
      router.push('/admin/dashboard');
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Site Logosu */}
        <div className={styles.logo}>
          <Image
            src="/images/cagdasproyapi_beyaz.png"
            alt="Çağdaş Pro Yapı"
            width={200}
            height={60}
            style={{ width: '200px', height: 'auto' }}
            priority
          />
        </div>

        <h1 className={styles.title}>Yönetim Paneli</h1>
        <p className={styles.sub}>Çağdaş Pro Yapı · Admin Girişi</p>

        {error && (
          <div className={styles.error}>
            <i className="fas fa-exclamation-circle" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              placeholder="Kullanıcı adınızı girin"
              autoComplete="username"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" />
                Giriş yapılıyor...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt" />
                Giriş Yap
              </>
            )}
          </button>
        </form>

        <a href="/" className={styles.back}>
          <i className="fas fa-arrow-left" />
          Siteye Dön
        </a>
      </div>
    </div>
  );
}
