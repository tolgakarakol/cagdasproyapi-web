const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200', name: 'giyotin_hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6199fbfd0b?q=80&w=1200', name: 'pergola_hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200', name: 'katlanir_hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200', name: 'kis_bahcesi_hero.jpg' }
];

const dir = path.join(process.cwd(), 'public', 'images', 'products');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

images.forEach(img => {
  const filePath = path.join(dir, img.name);
  const file = fs.createWriteStream(filePath);
  https.get(img.url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded: ${img.name}`);
    });
  });
});
