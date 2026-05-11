import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 2000,
    };

    if (!MONGODB_URI || MONGODB_URI.includes('localhost')) {
      // Yerel geliştirme için sessizce dene, hata alırsan durma
      cached.promise = mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/cagdasproyapi', opts)
        .then((m) => {
          console.log('✅ MongoDB Bağlandı');
          return m;
        })
        .catch((err) => {
          console.warn('⚠️ Yerel MongoDB bulunamadı, site salt-okunur modda veya mock data ile çalışacak.');
          // Mongoose'un çökmesini engellemek için sahte bir bağlantı objesi dönebiliriz 
          // ama şimdilik sadece null bırakıp API'lerde kontrol edeceğiz
          return null;
        });
    } else {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
