const fs = require('fs');
const path = require('path');

// Target Directories
const ROOT_DIR = path.resolve(__dirname, '..');
const STATIC_DIR = path.join(ROOT_DIR, 'html-css-copy');
const URUNLER_DIR = path.join(STATIC_DIR, 'urunler');
const CSS_DIR = path.join(STATIC_DIR, 'css');
const JS_DIR = path.join(STATIC_DIR, 'js');

console.log('🚀 HTML/CSS Statik Kopyalama ve Dönüştürme Başlatılıyor...');

// 1. Recreate folder structure
[STATIC_DIR, URUNLER_DIR, CSS_DIR, JS_DIR].forEach(dir => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
});

// 2. Recursive Copy Helper for Assets
function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    const stat = fs.lstatSync(fromPath);
    if (stat.isFile()) {
      fs.copyFileSync(fromPath, toPath);
    } else if (stat.isDirectory()) {
      copyFolderSync(fromPath, toPath);
    }
  });
}

// Copy public assets
console.log('📁 Görsel ve Katalog Klasörleri Kopyalanıyor...');
const publicDirs = ['images', 'catalogs', 'hap-bilgiler'];
publicDirs.forEach(dirName => {
  const src = path.join(ROOT_DIR, 'public', dirName);
  const dest = path.join(STATIC_DIR, dirName);
  if (fs.existsSync(src)) {
    copyFolderSync(src, dest);
  }
});

// Also check root images directory if it exists and copy
const rootImages = path.join(ROOT_DIR, 'images');
if (fs.existsSync(rootImages)) {
  copyFolderSync(rootImages, path.join(STATIC_DIR, 'images'));
}

// 3. CSS Processor
// We read CSS Module files, prefix their classes to avoid collisions, and merge them into style.css
const cssFiles = [
  { path: 'app/globals.css', prefix: 'global' },
  { path: 'components/public/Navbar.module.css', prefix: 'navbar' },
  { path: 'components/public/Footer.module.css', prefix: 'footer' },
  { path: 'components/public/HeroSlider.module.css', prefix: 'hero' },
  { path: 'components/public/ProductsGrid.module.css', prefix: 'products' },
  { path: 'components/public/GuaranteeBand.module.css', prefix: 'guarantee' },
  { path: 'components/public/AboutSection.module.css', prefix: 'about' },
  { path: 'components/public/PartnersCarousel.module.css', prefix: 'partners' },
  { path: 'components/public/CatalogSection.module.css', prefix: 'catalogs' },
  { path: 'components/public/HapBilgiler.module.css', prefix: 'hapbilgiler' },
  { path: 'components/public/QuoteForm.module.css', prefix: 'quote' },
  { path: 'components/public/ContactSection.module.css', prefix: 'contact' },
  { path: 'components/public/Testimonials.module.css', prefix: 'testimonials' },
  { path: 'components/public/PageHeader.module.css', prefix: 'pageheader' },
  { path: 'app/hakkimizda/hakkimizda.module.css', prefix: 'aboutpage' },
  { path: 'app/e-katalog/catalogs.module.css', prefix: 'catalogspage' },
  { path: 'app/galeri/galeri.module.css', prefix: 'gallery' },
  { path: 'app/urunler/[slug]/product.module.css', prefix: 'product' }
];

let compiledCSS = '';
const skipClasses = new Set([
  'png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'pdf', 'html', 'css', 'js',
  'com', 'tr', 'net', 'org', 'ms', 'px', 'em', 'rem', 'vh', 'vw', 'deg', 'rad', 's'
]);

cssFiles.forEach(file => {
  const filePath = path.join(ROOT_DIR, file.path);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ CSS dosyası bulunamadı: ${file.path}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  if (file.prefix === 'global') {
    // Globals are concatenated directly
    compiledCSS += `/* --- Globals --- */\n${content}\n\n`;
    return;
  }

  // Prefix classnames in non-global stylesheets to avoid collisions
  // Matches `.className` but ignores element selectors, states like :hover, etc.
  const prefixed = content.replace(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g, (match, className) => {
    if (skipClasses.has(className.toLowerCase()) || className.startsWith('fa-')) {
      return match;
    }
    // Don't prefix state classes like active, open, scrolled, visible
    if (['active', 'open', 'scrolled', 'visible', 'mobilemenuopen', 'dropdownitem', 'mobilelink', 'teklifbtn', 'hamburger'].includes(className.toLowerCase())) {
      return match;
    }
    return `.${file.prefix}-${className}`;
  });

  compiledCSS += `/* --- Component: ${file.prefix} --- */\n${prefixed}\n\n`;
});

// Save unified stylesheet
fs.writeFileSync(path.join(CSS_DIR, 'style.css'), compiledCSS, 'utf8');
console.log('🎨 CSS Dosyaları başarıyla birleştirildi ve style.css oluşturuldu.');

// 4. Standalone JS
const mainJSContent = `
document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const nav = document.querySelector('nav');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('navbar-scrolled');
    } else {
      // In static pages we can keep it scrolled style or transparent based on page
      if (document.body.dataset.page === 'home' && window.scrollY <= 50) {
        nav.classList.remove('navbar-scrolled');
      }
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // --- Mobile Hamburger Menu ---
  const hamburger = document.querySelector('.navbar-hamburger');
  const closeBtn = document.querySelector('.navbar-closeBtn');
  const mobileMenu = document.querySelector('.navbar-mobileMenu');
  const mobileLinks = document.querySelectorAll('.navbar-mobileLink');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('navbar-mobileMenuOpen');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('navbar-mobileMenuOpen');
      document.body.style.overflow = '';
    });
  }

  // Mobile Submenu for products
  const mobileProductsTrigger = document.querySelector('.mobile-products-trigger');
  const mobileSubLinks = document.querySelector('.navbar-mobileSubLinks');
  if (mobileProductsTrigger && mobileSubLinks) {
    mobileProductsTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const chevron = mobileProductsTrigger.querySelector('i');
      if (mobileSubLinks.style.display === 'flex') {
        mobileSubLinks.style.display = 'none';
        if (chevron) chevron.className = 'fas fa-chevron-down';
      } else {
        mobileSubLinks.style.display = 'flex';
        if (chevron) chevron.className = 'fas fa-chevron-up';
      }
    });
  }

  // Close mobile menu on clicking links
  mobileLinks.forEach(link => {
    if (!link.classList.contains('mobile-products-trigger')) {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('navbar-mobileMenuOpen');
        document.body.style.overflow = '';
      });
    }
  });

  // --- Hero Slider ---
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrowLeft');
  const nextBtn = document.querySelector('.hero-arrowRight');
  let currentSlide = 0;
  let slideInterval;

  const showSlide = (idx) => {
    if (slides.length === 0) return;
    slides.forEach((slide, i) => {
      if (i === idx) {
        slide.classList.add('hero-active');
        const text = slide.querySelector('.hero-text');
        if (text) text.classList.add('hero-textActive');
      } else {
        slide.classList.remove('hero-active');
        const text = slide.querySelector('.hero-text');
        if (text) text.classList.remove('hero-textActive');
      }
    });

    dots.forEach((dot, i) => {
      if (i === idx) {
        dot.classList.add('hero-dotActive');
      } else {
        dot.classList.remove('hero-dotActive');
      }
    });
    currentSlide = idx;
  };

  const nextSlide = () => {
    showSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  if (slides.length > 0) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 5000);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(i);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // --- Partners Infinite Scroll Hover Stop ---
  const innerTrack = document.querySelector('.partners-inner');
  if (innerTrack) {
    innerTrack.addEventListener('mouseenter', () => {
      innerTrack.style.animationPlayState = 'paused';
    });
    innerTrack.addEventListener('mouseleave', () => {
      innerTrack.style.animationPlayState = 'running';
    });
  }

  // --- Gallery Horizontal Scroll and Lightbox ---
  const gallerySliders = document.querySelectorAll('.gallery-sliderContainer');
  gallerySliders.forEach(slider => {
    const prev = slider.parentElement.querySelector('.gallery-prevBtn');
    const next = slider.parentElement.querySelector('.gallery-nextBtn');

    if (prev && next) {
      prev.addEventListener('click', () => {
        slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
      });
      next.addEventListener('click', () => {
        slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
      });
    }
  });

  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg && lightboxClose) {
    const slides = document.querySelectorAll('.gallery-slide');
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        const img = slide.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', closeLightbox);
    lightboxImg.addEventListener('click', (e) => e.stopPropagation());
  }

  // --- Quote Form WhatsApp Submit ---
  const quoteForm = document.getElementById('quote-form-el');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quote-name').value;
      const phone = document.getElementById('quote-phone').value;
      const service = document.getElementById('quote-service').value;
      const message = document.getElementById('quote-message').value;

      const text = \`Merhaba, Çağdaş Pro Yapı web siteniz üzerinden teklif formu doldurdum.\\n\\nİsim: \${name}\\nTelefon: \${phone}\\nHizmet: \${service}\\nMesaj: \${message}\`;
      const encoded = encodeURIComponent(text);
      window.open(\`https://wa.me/905079165707?text=\${encoded}\`, '_blank');
    });
  }

  // --- Contact Form WhatsApp Submit ---
  const contactForm = document.getElementById('contact-form-el');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const phone = document.getElementById('contact-phone').value;
      const msg = document.getElementById('contact-message').value;

      const text = \`Merhaba, Çağdaş Pro Yapı web siteniz üzerinden mesaj gönderiyorum.\\n\\nİsim: \${name}\\nE-posta: \${email}\\nTelefon: \${phone}\\nMesaj: \${msg}\`;
      const encoded = encodeURIComponent(text);
      window.open(\`https://wa.me/905079165707?text=\${encoded}\`, '_blank');
    });
  }
});
`;
fs.writeFileSync(path.join(JS_DIR, 'main.js'), mainJSContent, 'utf8');
console.log('⚡ JavaScript dosyaları oluşturuldu.');

// Data Definitions
const INITIAL_SECTIONS = [
  {
    _id: 'hero',
    type: 'hero_slider',
    content: {
      slides: [
        {
          image: '/images/biyoklimatik-balkon.png',
          title: 'Bioklimatik Pergola',
          subtitle: 'Motorlu alüminyum lamel sistemi ile dört mevsim açık hava konforu.',
          ctaText: 'HEMEN KEŞFET',
          ctaLink: '/urunler/bioklimatik-pergola'
        },
        {
          image: '/images/slides/slider_kis_bahcesi.png',
          title: 'Kış Bahçesi',
          subtitle: 'Doğayla iç içe, her mevsim yaşayan cam ve çelik konstrüksiyon sistemleri.',
          ctaText: 'İNCELE',
          ctaLink: '/urunler/kis-bahcesi'
        },
        {
          image: '/images/giyotin-balkon-banner.png',
          title: 'Giyotin Cam Balkon',
          subtitle: 'Silinebilir akıllı cam balkon sistemleri ile manzaranızı kesmeyin.',
          ctaText: 'TÜM ÜRÜNLERİ GÖR',
          ctaLink: '/urunler/giyotin-tam-balkon'
        }
      ]
    }
  },
  {
    _id: 'products',
    type: 'products_grid',
    content: {
      sectionSubtitle: 'Albert Genau yetkili bayisi olarak premium çözümler sunuyoruz.',
      products: [
        {
          id: 'giyotin-tam-balkon',
          title: 'Giyotin Cam Balkon',
          description: 'Silinebilir akıllı cam balkon sistemi.',
          image: '/images/products/giyotin_final.jpg'
        },
        {
          id: 'bioklimatik-pergola',
          title: 'Bioklimatik Pergola',
          description: 'Açılır-kapanır konforlu tavan sistemleri.',
          image: '/images/products/pergola_final.jpg'
        },
        {
          id: 'katlanir-sistem-cam-balkon',
          title: 'Katlanır Cam Balkon',
          description: 'Geniş manzara, tam açılım sağlayan sistemler.',
          image: '/images/products/katlanir_teknik.jpg'
        }
      ]
    }
  },
  {
    _id: 'guarantee',
    type: 'guarantee_band',
    content: {
      guarantees: [
        { icon: 'fa-regular fa-circle-check', title: '10 Yıl Garanti', subtitle: 'Paslanmazlık ve çalışma garantisi.' },
        { icon: 'fa-regular fa-star', title: 'Yetkili Bayi', subtitle: 'Albert Genau resmi teknik servis desteği.' },
        { icon: 'fa-regular fa-clock', title: 'Hızlı Montaj', subtitle: 'Deneyimli ekiplerle zamanında teslimat.' },
        { icon: 'fa-regular fa-comments', title: '7/24 Destek', subtitle: 'Satış sonrası kesintisiz müşteri hizmetleri.' }
      ]
    }
  }
];

const PRODUCTS_LIST = [
  { name: 'Giyotin Tam Balkon', slug: 'giyotin-tam-balkon' },
  { name: 'Katlanır - Sürme Cam Balkon', slug: 'katlanir-sistem-cam-balkon' },
  { name: 'Bioklimatik Pergola', slug: 'bioklimatik-pergola' },
  { name: 'Rüzgar Kırıcı Sistem', slug: 'ruzgar-kirici-sistem' },
  { name: 'Çelik Konstrüksiyon & Kış Bahçesi', slug: 'kis-bahcesi' },
  { name: 'Duşakabin Sistemleri', slug: 'dusakabin-sistemleri' },
  { name: 'Cam Kapı Sistemleri', slug: 'cam-kapi-sistemleri' },
  { name: 'Kompozit Cephe Sistemleri', slug: 'kompozit-cephe-sistemleri' },
  { name: 'PVC Cam Sistemleri', slug: 'pvc-cam-sistemleri' },
  { name: 'Küpeşte Modelleri', slug: 'kupeste-modelleri' },
];

function loadProductData() {
  const tsxPath = path.join(ROOT_DIR, 'app/urunler/[slug]/ProductClient.tsx');
  if (!fs.existsSync(tsxPath)) {
    console.error(`⚠️ ProductClient.tsx bulunamadı: ${tsxPath}`);
    return {};
  }
  const tsxContent = fs.readFileSync(tsxPath, 'utf8');

  // ProductClient.tsx içindeki "export const PRODUCT_DATA: any = {" alanını bulalım
  const marker = 'export const PRODUCT_DATA: any =';
  const startIndex = tsxContent.indexOf(marker);
  if (startIndex === -1) {
    console.error('⚠️ ProductClient.tsx içinde PRODUCT_DATA tanımı bulunamadı.');
    return {};
  }

  // Ana objenin bittiği parantezi brace counting ile bulalım
  let braceCount = 0;
  let objectStart = tsxContent.indexOf('{', startIndex);
  let objectEnd = -1;
  for (let i = objectStart; i < tsxContent.length; i++) {
    if (tsxContent[i] === '{') {
      braceCount++;
    } else if (tsxContent[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        objectEnd = i + 1;
        break;
      }
    }
  }

  if (objectEnd === -1) {
    console.error('⚠️ PRODUCT_DATA süslü parantez eşleşmesi bulunamadı.');
    return {};
  }

  const objectStr = tsxContent.slice(objectStart, objectEnd);
  let data = {};
  try {
    data = eval('(' + objectStr + ')');
  } catch (e) {
    console.error('⚠️ PRODUCT_DATA eval hatası:', e);
    return {};
  }

  // Sonrasındaki dynamic atamaları (alias ve yeni eklenen ürünleri) çekelim
  const trailingContent = tsxContent.slice(objectEnd);
  const assignmentMarker = "PRODUCT_DATA['";
  let searchPos = 0;

  while (true) {
    const pos = trailingContent.indexOf(assignmentMarker, searchPos);
    if (pos === -1) break;

    const keyStart = pos + assignmentMarker.length;
    const keyEnd = trailingContent.indexOf("']", keyStart);
    if (keyEnd === -1) break;
    const key = trailingContent.slice(keyStart, keyEnd);

    const equalPos = trailingContent.indexOf("=", keyEnd);
    if (equalPos === -1) break;

    let valStart = equalPos + 1;
    while (valStart < trailingContent.length && /\s/.test(trailingContent[valStart])) {
      valStart++;
    }

    if (trailingContent.startsWith("PRODUCT_DATA", valStart)) {
      const semiPos = trailingContent.indexOf(";", valStart);
      const valStr = trailingContent.slice(valStart, semiPos).trim();
      const sourceKeyMatch = valStr.match(/PRODUCT_DATA\['([^']+)'\]/);
      if (sourceKeyMatch) {
        data[key] = data[sourceKeyMatch[1]];
      }
      searchPos = semiPos + 1;
    } else if (trailingContent[valStart] === '{') {
      let braceCount = 0;
      let valEnd = -1;
      for (let i = valStart; i < trailingContent.length; i++) {
        if (trailingContent[i] === '{') {
          braceCount++;
        } else if (trailingContent[i] === '}') {
          braceCount--;
          if (braceCount === 0) {
            valEnd = i + 1;
            break;
          }
        }
      }
      if (valEnd !== -1) {
        const valStr = trailingContent.slice(valStart, valEnd);
        try {
          data[key] = eval('(' + valStr + ')');
        } catch (e) {
          console.error(`⚠️ PRODUCT_DATA['${key}'] eval hatası:`, e);
        }
        searchPos = valEnd;
      } else {
        searchPos = valStart + 1;
      }
    } else {
      searchPos = valStart + 1;
    }
  }

  return data;
}

const PRODUCT_DATA = loadProductData();

// Layout templates helpers
function getHead(title, relativePath) {
  return `
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="Silivri ve İstanbul genelinde profesyonel cam balkon, bioklimatik pergola ve kış bahçesi sistemleri. Albert Genau yetkili bayisinden 10 yıl garantili çözümler." />
    <link rel="icon" href="${relativePath}images/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <link rel="stylesheet" href="${relativePath}css/style.css" />
  </head>
  `;
}

function getHeader(relativePath, activePage = '') {
  const productsMenu = PRODUCTS_LIST.map(p => `
    <a href="${relativePath}urunler/${p.slug}.html" class="navbar-dropdownItem">${p.name}</a>
  `).join('');

  const mobileProductsMenu = PRODUCTS_LIST.map(p => `
    <li>
      <a href="${relativePath}urunler/${p.slug}.html" class="navbar-mobileSubLink">${p.name}</a>
    </li>
  `).join('');

  return `
    <nav class="navbar-nav navbar-scrolled">
      <div class="navbar-container">
        <a href="${relativePath}index.html" class="navbar-logo">
          <img src="${relativePath}images/cagdas_pro_yapi_logo.png" alt="Anasayfa" />
        </a>

        <ul class="navbar-menu">
          <li class="navbar-menuItem"><a href="${relativePath}hakkimizda.html" class="navbar-menuLink">Hakkımızda</a></li>
          <li class="navbar-menuItem">
            <span class="navbar-menuLink">Ürünlerimiz <i class="fas fa-chevron-down"></i></span>
            <div class="navbar-dropdown">
              ${productsMenu}
            </div>
          </li>
          <li class="navbar-menuItem"><a href="${relativePath}e-katalog.html" class="navbar-menuLink">E-Katalog</a></li>
          <li class="navbar-menuItem"><a href="${relativePath}hap-bilgiler.html" class="navbar-menuLink">Hap Bilgiler</a></li>
          <li class="navbar-menuItem"><a href="${relativePath}galeri.html" class="navbar-menuLink">Galeri</a></li>
          <li class="navbar-menuItem"><a href="${relativePath}iletisim.html" class="navbar-menuLink">İletişim</a></li>
        </ul>

        <div class="navbar-actions">
          <a href="${relativePath}iletisim.html" class="navbar-teklifBtn">Teklif Al</a>
          <button class="navbar-hamburger">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <!-- MOBILE OVERLAY MENU -->
      <div class="navbar-mobileMenu">
        <div class="navbar-mobileHeader">
          <img src="${relativePath}images/cagdasproyapi_beyaz.png" alt="Logo" style="width: 210px; height: auto;" />
          <button class="navbar-closeBtn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <ul class="navbar-mobileLinks">
          <li><a href="${relativePath}index.html" class="navbar-mobileLink">Anasayfa</a></li>
          <li><a href="${relativePath}hakkimizda.html" class="navbar-mobileLink">Hakkımızda</a></li>
          <li>
            <div class="navbar-mobileLink mobile-products-trigger">
              Ürünlerimiz <i class="fas fa-chevron-down" style="font-size: 0.9rem;"></i>
            </div>
            <ul class="navbar-mobileSubLinks" style="display: none; flex-direction: column; gap: 12px; list-style: none; padding: 15px 0 0 15px;">
              ${mobileProductsMenu}
            </ul>
          </li>
          <li><a href="${relativePath}e-katalog.html" class="navbar-mobileLink">E-Katalog</a></li>
          <li><a href="${relativePath}hap-bilgiler.html" class="navbar-mobileLink">Hap Bilgiler</a></li>
          <li><a href="${relativePath}galeri.html" class="navbar-mobileLink">Galeri</a></li>
          <li><a href="${relativePath}iletisim.html" class="navbar-mobileLink">İletişim</a></li>
        </ul>
      </div>
    </nav>
  `;
}

function getFooter(relativePath) {
  const productsList = PRODUCTS_LIST.slice(0, 6).map(p => `
    <li><a href="${relativePath}urunler/${p.slug}.html" class="footer-link">${p.name}</a></li>
  `).join('');

  return `
    <footer class="footer-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-logoWrapper">
              <img src="${relativePath}images/cagdasproyapi_beyaz.png" alt="Çağdaş Pro Yapı" class="footer-footerLogo" style="max-height: 48px; width: auto;" />
            </div>
            <p class="footer-brandText">
              Çağdaş Pro Yapı olarak 15 yıldır Silivri merkezli tüm Türkiye'ye Albert Genau kalitesini taşıyoruz.
            </p>
            <div class="footer-socials">
              <a href="https://instagram.com/albertgenau_cagdaspro" target="_blank" rel="noopener noreferrer" class="footer-socialLink">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 class="footer-columnTitle">Hızlı Menü</h4>
            <ul class="footer-linkList">
              <li><a href="${relativePath}hakkimizda.html" class="footer-link">Hakkımızda</a></li>
              <li><a href="${relativePath}e-katalog.html" class="footer-link">E-Katalog</a></li>
              <li><a href="${relativePath}hap-bilgiler.html" class="footer-link">Hap Bilgiler</a></li>
              <li><a href="${relativePath}galeri.html" class="footer-link">Galeri</a></li>
              <li><a href="${relativePath}iletisim.html" class="footer-link">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-columnTitle">Popüler Ürünler</h4>
            <ul class="footer-linkList">
              ${productsList}
            </ul>
          </div>

          <div>
            <h4 class="footer-columnTitle">İletişim Bilgileri</h4>
            <ul class="footer-contactList">
              <li class="footer-contactItem">
                <i class="fas fa-map-marker-alt"></i>
                <span>Piri Mehmet Paşa Mah. Burhan Soyaslan Cad. No: 20/A Silivri / İstanbul</span>
              </li>
              <li class="footer-contactItem">
                <i class="fas fa-phone"></i>
                <a href="tel:05079165707">0507 916 57 07</a>
              </li>
              <li class="footer-contactItem">
                <i class="fas fa-envelope"></i>
                <a href="mailto:info@cagdasproyapi.com">info@cagdasproyapi.com</a>
              </li>
              <li class="footer-contactItem">
                <i class="fas fa-clock"></i>
                <span>Pazartesi–Cumartesi: 09:00–19:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottomInfo">
            <p>© ${new Date().getFullYear()} Çağdaş Pro Yapı. Tüm Hakları Saklıdır.</p>
            <div class="footer-legalLinks">
              <a href="#">Gizlilik Politikası</a>
              <span>|</span>
              <a href="#">Kullanım Koşulları</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- WhatsApp Floating Action -->
    <a href="https://wa.me/905079165707" class="whatsapp-float" target="_blank" rel="noopener noreferrer" style="position: fixed; bottom: 30px; right: 30px; width: 60px; height: 60px; background-color: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 10px rgba(0,0,0,0.3); z-index: 999; text-decoration: none;">
      <i class="fab fa-whatsapp" style="color: #fff; font-size: 34px;"></i>
    </a>

    <script src="${relativePath}js/main.js"></script>
  `;
}

function getPageHeader(title, subtitle) {
  return `
    <section class="pageheader-headerSection">
      <div class="container">
        <h1 class="pageheader-title">${title}</h1>
        <p class="pageheader-subtitle">${subtitle}</p>
      </div>
    </section>
  `;
}

// 5. Generate Homepage
console.log('📄 Anasayfa Oluşturuluyor...');
const homepageSlides = INITIAL_SECTIONS.find(s => s.type === 'hero_slider').content.slides;
const homeSlidesHTML = homepageSlides.map((slide, i) => {
  // Map link
  let relativeLink = slide.ctaLink.replace(/^\//, '');
  if (!relativeLink.endsWith('.html') && !relativeLink.startsWith('#') && relativeLink !== '') {
    relativeLink += '.html';
  }
  if (relativeLink === '') relativeLink = 'index.html';

  return `
    <div class="hero-slide" style="background-image: url('${slide.image.replace(/^\//, '')}')">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">Albert Genau Üretici Bayisi</span>
          <h1 class="hero-title">${slide.title}</h1>
          <p class="hero-subtitle">${slide.subtitle}</p>
          <div class="hero-ctas">
            <a href="${relativeLink}" class="btn btn-primary">${slide.ctaText || 'Ücretsiz Teklif Al'}</a>
            <a href="urunler/katlanir-sistem-cam-balkon.html" class="btn btn-outline" style="color: #fff; border-color: #fff;">TÜM ÜRÜNLERİ GÖR</a>
          </div>
        </div>
      </div>
    </div>
  `;
}).join('');

const homeProducts = INITIAL_SECTIONS.find(s => s.type === 'products_grid').content.products;
const homeProductsHTML = homeProducts.map(p => `
  <a href="urunler/${p.id}.html" class="products-card">
    <div class="products-imageWrap">
      <img src="${p.image.replace(/^\//, '')}" alt="${p.title}" class="products-productImg" style="width: 100%; height: 100%; object-fit: cover;" />
    </div>
    <div class="products-body">
      <h3 class="products-title">${p.title}</h3>
      <p class="products-desc">${p.description}</p>
      <div class="products-cta">
        <span>İncele <i class="fas fa-arrow-right"></i></span>
      </div>
    </div>
  </a>
`).join('');

const homeGuarantees = INITIAL_SECTIONS.find(s => s.type === 'guarantee_band').content.guarantees;
const homeGuaranteesHTML = homeGuarantees.map(g => `
  <div class="guarantee-item">
    <div class="guarantee-icon"><i class="${g.icon}"></i></div>
    <div>
      <h4 class="guarantee-title">${g.title}</h4>
      <p class="guarantee-sub">${g.subtitle}</p>
    </div>
  </div>
`).join('');

const homeHTML = `
<!DOCTYPE html>
<html lang="tr">
${getHead('Çağdaş Pro Yapı | Silivri Cam Balkon & Pergola', '')}
<body data-page="home">
  ${getHeader('', 'home')}

  <!-- HERO SLIDER -->
  <section class="hero-slider" id="anasayfa">
    ${homeSlidesHTML}
    <button class="hero-arrow hero-arrowLeft" aria-label="Önceki">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button class="hero-arrow hero-arrowRight" aria-label="Sonraki">
      <i class="fas fa-chevron-right"></i>
    </button>
    <div class="hero-dots">
      ${homepageSlides.map((_, i) => `<button class="hero-dot" aria-label="Slide ${i+1}"></button>`).join('')}
    </div>
  </section>

  <!-- GUARANTEE BAND -->
  <section class="guarantee-band">
    <div class="container">
      <div class="guarantee-grid">
        ${homeGuaranteesHTML}
      </div>
    </div>
  </section>

  <!-- PRODUCTS GRID -->
  <section class="products-section" id="urunler">
    <div class="container">
      <div class="section-header">
        <h2 class="products-mainTitle">Ürün Gruplarımız</h2>
        <p>Albert Genau yetkili bayisi olarak premium çözümler sunuyoruz.</p>
      </div>
      <div class="products-grid">
        ${homeProductsHTML}
      </div>
    </div>
  </section>

  <!-- ABOUT PREVIEW -->
  <section class="about-section">
    <div class="container">
      <div class="about-grid">
        <div class="about-imageCol">
          <img src="images/products/katlanir_teknik.jpg" alt="Çağdaş Pro Yapı" class="about-mainImg" />
          <div class="about-experienceBox">
            <span class="about-expYears">15</span>
            <span class="about-expText">Yıllık Deneyim</span>
          </div>
        </div>
        <div>
          <span class="about-tag">Çağdaş Pro Yapı</span>
          <h2 class="about-heading">Sektörün Öncü Çözüm Ortağı</h2>
          <p class="about-bodyText">
            Çağdaş Pro Yapı olarak 15 yıldır Silivri merkezli tüm Türkiye'ye Albert Genau kalitesini taşıyoruz. Profesyonel ekibimiz ve müşteri odaklı yaklaşımımızla yaşam alanlarınıza değer katıyoruz.
          </p>
          <div class="about-statsGrid">
            <div class="about-statCard">
              <div class="about-statValue">500+</div>
              <div class="about-statLabel">Başarılı Proje</div>
            </div>
            <div class="about-statCard">
              <div class="about-statValue">%100</div>
              <div class="about-statLabel">Müşteri Memnuniyeti</div>
            </div>
          </div>
          <a href="hakkimizda.html" class="btn btn-primary">DAHA FAZLA BİLGİ</a>
        </div>
      </div>
    </div>
  </section>

  <!-- PARTNERS CAROUSEL -->
  <section class="partners-section">
    <div class="container" style="text-align: center; margin-bottom: 30px;">
      <p class="partners-label">ÇÖZÜM ORTAKLARIMIZ</p>
      <h2 class="partners-title">Güvenilir Markalar</h2>
    </div>
    <div class="partners-track">
      <div class="partners-inner">
        ${[
          { name: 'Albert Genau', color: '#8B0000' },
          { name: 'Kömmerling', color: '#FFD700' },
          { name: 'Ege Pen', color: '#003087' },
          { name: 'Deceuninck', color: '#0066CC' },
          { name: 'Pimapen', color: '#CC0000' },
          { name: 'Winsa', color: '#006400' },
          { name: 'Schüco', color: '#003366' },
          { name: 'Asaş', color: '#CC0000' }
        ].concat([
          { name: 'Albert Genau', color: '#8B0000' },
          { name: 'Kömmerling', color: '#FFD700' },
          { name: 'Ege Pen', color: '#003087' },
          { name: 'Deceuninck', color: '#0066CC' },
          { name: 'Pimapen', color: '#CC0000' },
          { name: 'Winsa', color: '#006400' },
          { name: 'Schüco', color: '#003366' },
          { name: 'Asaş', color: '#CC0000' }
        ]).map(p => `
          <div class="partners-brand">
            <span class="partners-brandName" style="color: ${p.color}">${p.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testimonials-section">
    <div class="container">
      <div class="testimonials-header">
        <span class="testimonials-subTitle">Müşteri Deneyimleri</span>
        <h2 class="testimonials-mainTitle">Müşterilerimiz Ne Diyor?</h2>
        <p class="testimonials-description">Google üzerindeki gerçek müşterilerimizin tarafsız yorumları.</p>
      </div>

      <div class="testimonials-grid">
        <div class="testimonials-card">
          <div class="testimonials-cardHeader">
            <div class="testimonials-userInfo">
              <div class="testimonials-avatar" style="background-color: #e31e24">BA</div>
              <div>
                <h3 class="testimonials-userName">Büşra Atmaca</h3>
                <span class="testimonials-userLocation">Google İncelemesi</span>
              </div>
            </div>
          </div>
          <div class="testimonials-ratingRow">
            <div class="testimonials-cardStars">
              ${[...Array(5)].map(() => `
                <svg class="testimonials-star" viewBox="0 0 24 24" fill="#FFB800" style="width: 18px; height: 18px;">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              `).join('')}
            </div>
            <span class="testimonials-date">1 ay önce</span>
          </div>
          <p class="testimonials-text">Müşteri memnuniyeti için tek adressiniz🙏</p>
        </div>

        <div class="testimonials-card">
          <div class="testimonials-cardHeader">
            <div class="testimonials-userInfo">
              <div class="testimonials-avatar" style="background-color: #0f172a">SP</div>
              <div>
                <h3 class="testimonials-userName">Sude Pekel</h3>
                <span class="testimonials-userLocation">Google İncelemesi</span>
              </div>
            </div>
          </div>
          <div class="testimonials-ratingRow">
            <div class="testimonials-cardStars">
              ${[...Array(5)].map(() => `
                <svg class="testimonials-star" viewBox="0 0 24 24" fill="#FFB800" style="width: 18px; height: 18px;">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              `).join('')}
            </div>
            <span class="testimonials-date">1 ay önce</span>
          </div>
          <p class="testimonials-text">Çağdaş Pro Yapı’da çalışıyorum ama aynı zamanda kendi evime de cam balkon yaptırdım. Süreçlere hakim olduğum için gönül rahatlığıyla tercih ettim. Temiz işçilik, ilgili ekip.</p>
        </div>

        <div class="testimonials-card">
          <div class="testimonials-cardHeader">
            <div class="testimonials-userInfo">
              <div class="testimonials-avatar" style="background-color: #a11418">MA</div>
              <div>
                <h3 class="testimonials-userName">Merve Altıntaş</h3>
                <span class="testimonials-userLocation">Google İncelemesi</span>
              </div>
            </div>
          </div>
          <div class="testimonials-ratingRow">
            <div class="testimonials-cardStars">
              ${[...Array(5)].map(() => `
                <svg class="testimonials-star" viewBox="0 0 24 24" fill="#FFB800" style="width: 18px; height: 18px;">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              `).join('')}
            </div>
            <span class="testimonials-date">1 ay önce</span>
          </div>
          <p class="testimonials-text">Profesyonel bir hizmet arayanlar tereddüt etmeden tercih edebilir.</p>
        </div>
      </div>
    </div>
  </section>

  ${getFooter('')}
</body>
</html>
`;
fs.writeFileSync(path.join(STATIC_DIR, 'index.html'), homeHTML, 'utf8');

// 6. Generate Hakkımızda Page
console.log('📄 Hakkımızda Sayfası Oluşturuluyor...');
const hakkimizdaHTML = `
<!DOCTYPE html>
<html lang="tr">
${getHead('Hakkımızda | Çağdaş Pro Yapı - Silivri Cam Balkon', '')}
<body>
  ${getHeader('', 'hakkimizda')}
  ${getPageHeader('Hakkımızda', '15 Yıllık Deneyim & Güven')}

  <!-- Hikayemiz -->
  <section class="about-section">
    <div class="container">
      <div class="about-grid">
        <div class="about-imageCol">
          <img src="images/products/katlanir_teknik.jpg" alt="Çağdaş Pro Yapı" class="about-mainImg" />
          <div class="about-experienceBox">
            <span class="about-expYears">15</span>
            <span class="about-expText">Yıl Deneyim</span>
          </div>
        </div>
        <div>
          <span class="about-tag">Hikayemiz</span>
          <h2 class="about-heading">Sektörün Öncü Çözüm Ortağı</h2>
          <p class="about-bodyText">
            Çağdaş Pro Yapı olarak 15 yıldır Silivri merkezli tüm Türkiye'ye Albert Genau kalitesini taşıyoruz. Profesyonel ekibimiz ve müşteri odaklı yaklaşımımızla yaşam alanlarınıza değer katıyoruz.
          </p>
          <div class="about-statsGrid">
            <div class="about-statCard">
              <div class="about-statValue">500+</div>
              <div class="about-statLabel">Proje</div>
            </div>
            <div class="about-statCard">
              <div class="about-statValue">12</div>
              <div class="about-statLabel">Uzman Ekip</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Story Section -->
  <section class="aboutpage-storySection" style="padding-top: 2rem; background: #fff;">
    <div class="container">
      <div class="aboutpage-storyGrid" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: center;">
        <div>
          <h2 style="font-size: 2.2rem; margin-bottom: 20px;">Camın Alüminyumla Sanatsal Buluşması</h2>
          <p style="color: #555; line-height: 1.8; margin-bottom: 15px;">
            Çağdaş Pro Yapı olarak 15 yılı aşkın süredir, yaşam alanlarınızı daha geniş, daha aydınlık ve daha konforlu hale getirmek için çalışıyoruz. Silivri merkezli kurulan şirketimiz, bugün tüm Türkiye'ye Albert Genau'nun premium kalitesini taşıyan lider uygulayıcı bayilerden biri konumundadır.
          </p>
          <p style="color: #555; line-height: 1.8; margin-bottom: 15px;">
            Bir cam balkondan veya kış bahçesinden çok daha fazlasını inşa ediyoruz. Doğanın güzelliğini dört mevsim evinize taşıyan, zorlu hava koşullarına meydan okuyan ve mimari estetiği kusursuzlaştıran özel yaşam alanları tasarlıyoruz. Her bir projemizde mühendislik disiplinini ve zanaatkar hassasiyetini bir araya getiriyoruz.
          </p>
        </div>
        <div>
          <img src="images/products/katlanir_balkon_hero_v4.jpg" alt="Hikaye" style="width: 100%; border-radius: 4px; border: 1px solid var(--border);" />
        </div>
      </div>
    </div>
  </section>

  <!-- Core Values -->
  <section class="aboutpage-valuesSection" style="background: #fbfbfb; padding: 80px 0;">
    <div class="container">
      <h2 style="text-align: center; margin-bottom: 50px; font-size: 2.2rem;">Temel Değerlerimiz</h2>
      <div class="aboutpage-valuesGrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
        <div class="aboutpage-valueCard" style="background: #fff; padding: 40px; border-radius: 4px; border: 1px solid #eee; text-align: center;">
          <i class="fas fa-award" style="font-size: 2.5rem; color: var(--accent); margin-bottom: 20px;"></i>
          <h3 style="font-size: 1.25rem; margin-bottom: 15px;">Ödün Verilmeyen Kalite</h3>
          <p style="color: #666; font-size: 0.95rem;">Albert Genau kalitesini Avrupa standartlarındaki montaj işçiliğimizle birleştiriyor, sıfır hata prensibiyle projelerimizi teslim ediyoruz.</p>
        </div>
        <div class="aboutpage-valueCard" style="background: #fff; padding: 40px; border-radius: 4px; border: 1px solid #eee; text-align: center;">
          <i class="fas fa-handshake" style="font-size: 2.5rem; color: var(--accent); margin-bottom: 20px;"></i>
          <h3 style="font-size: 1.25rem; margin-bottom: 15px;">Koşulsuz Güven</h3>
          <p style="color: #666; font-size: 0.95rem;">Satış öncesi ve sonrası sunduğumuz şeffaf süreç yönetimi, garanti belgeli ürünlerimizle müşterilerimizle ömürlük bir güven inşa ediyoruz.</p>
        </div>
        <div class="aboutpage-valueCard" style="background: #fff; padding: 40px; border-radius: 4px; border: 1px solid #eee; text-align: center;">
          <i class="fas fa-leaf" style="font-size: 2.5rem; color: var(--accent); margin-bottom: 20px;"></i>
          <h3 style="font-size: 1.25rem; margin-bottom: 15px;">Estetik ve İnovasyon</h3>
          <p style="color: #666; font-size: 0.95rem;">Teknolojiyi yakından takip eden uzman ekibimizle, modern mimarinin gereksinimlerini karşılayan estetik tasarımlara imza atıyoruz.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission Vision -->
  <section class="aboutpage-missionVision" style="padding: 80px 0;">
    <div class="container">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
        <div style="background: #0f172a; color: #fff; padding: 50px; border-radius: 4px;">
          <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 20px;">Vizyonumuz</h3>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.8;">
            Türkiye'nin her köşesinde, mimari yapılara değer katan ve insanların yaşam konforunu artıran yenilikçi cam sistemleri uygulamalarında akla gelen ilk, en güvenilir marka olmak. Geleceğin mimarisini bugünden balkonlarınıza taşımak.
          </p>
        </div>
        <div style="background: #0f172a; color: #fff; padding: 50px; border-radius: 4px;">
          <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 20px;">Misyonumuz</h3>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.8;">
            En ileri teknolojiyi ve en dayanıklı malzemeleri kullanarak, estetikten ödün vermeden, müşteri beklentilerinin de ötesinde, tam zamanında ve kusursuz işçilikle teslim edilen projeler üretmek.
          </p>
        </div>
      </div>
    </div>
  </section>

  ${getFooter('')}
</body>
</html>
`;
fs.writeFileSync(path.join(STATIC_DIR, 'hakkimizda.html'), hakkimizdaHTML, 'utf8');

// 7. Generate E-Katalog Page
console.log('📄 E-Katalog Sayfası Oluşturuluyor...');
const CATALOGS_DATA = [
  { title: 'Genel Ürün Kataloğu', file: 'albert-genau-2023.pdf', cover: 'images/catalogs/urun-katalogu.png' },
  { title: 'Bioklimatik Pergola', file: 'bioklimatik-pergola.pdf', cover: 'images/catalogs/bioklimatik-pergola.png' },
  { title: 'Hareketli Cephe Sistemleri', file: 'hareketli-cephe.pdf', cover: 'images/catalogs/hareketli-cephe.png' },
  { title: 'Giyotin Cam Sistemleri', file: 'giyotin-cam-sistemleri.pdf', cover: 'images/catalogs/giyotin-sistem.png' },
  { title: 'SlideMaster Sürme Sistem', file: 'slidemaster-surme.pdf', cover: 'images/catalogs/isicamli-surme.png' },
  { title: 'Yeni Nesil Cam Balkon', file: 'yeni-nesil-cam-balkon.pdf', cover: 'images/catalogs/yeni-nesil-cam-balkon.png' },
  { title: 'Isıcamlı Cam Balkon', file: 'tiara-twinmax.pdf', cover: 'images/catalogs/isicamli-balkon.png' },
];

const catalogCardsHTML = CATALOGS_DATA.map(cat => `
  <a href="catalogs/${cat.file}" target="_blank" rel="noopener noreferrer" class="catalogspage-card" style="display: flex; flex-direction: column; border: 1px solid #eee; text-decoration: none; color: inherit; background: #fff; border-radius: 4px; overflow: hidden; transition: all 0.3s;">
    <div style="position: relative; height: 320px; background: #f9f9f9; overflow: hidden;">
      <img src="${cat.cover}" alt="${cat.title}" style="width: 100%; height: 100%; object-fit: contain; padding: 10px; transition: transform 0.5s;" />
      <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); opacity: 0; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s; color: #fff; font-weight: 800; font-size: 0.9rem; letter-spacing: 1px;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0">
        ŞİMDİ OKU
      </div>
    </div>
    <div style="padding: 20px; text-align: center;">
      <h3 style="font-size: 1.1rem; margin-bottom: 5px; font-weight: 700; color: #111;">${cat.title}</h3>
      <p style="color: #777; font-size: 0.8rem; text-transform: uppercase;">PDF Kataloğu</p>
    </div>
  </a>
`).join('');

const ekatalogHTML = `
<!DOCTYPE html>
<html lang="tr">
${getHead('E-Katalog | Çağdaş Pro Yapı - Silivri Cam Balkon', '')}
<body>
  ${getHeader('', 'e-katalog')}
  ${getPageHeader('E-Katalog', 'Ürünlerimizi Detaylı İnceleyin')}

  <section style="padding: 80px 0; background: #fbfbfb;">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 30px;">
        ${catalogCardsHTML}
      </div>
    </div>
  </section>

  ${getFooter('')}
</body>
</html>
`;
fs.writeFileSync(path.join(STATIC_DIR, 'e-katalog.html'), ekatalogHTML, 'utf8');

// 8. Generate Hap Bilgiler Page
console.log('📄 Hap Bilgiler Sayfası Oluşturuluyor...');
const HAP_BILGILER_DATA = [
  { title: 'SlideMaster Sürme Cambalkon', file: 'slidemaster-surme.pdf', cover: 'hap-bilgiler/covers/slidemaster-surme.png', subtitle: 'Albert Genau - SlideMaster' },
  { title: 'Tambalkon Giyotin Cam', file: 'tambalkon-giyotin.pdf', cover: 'hap-bilgiler/covers/tambalkon-giyotin.png', subtitle: 'Albert Genau - Tambalkon' },
  { title: 'Tiara Katlanır Cambalkon', file: 'tiara-katlanir.pdf', cover: 'hap-bilgiler/covers/tiara-katlanir.png', subtitle: 'Albert Genau - Tiara' },
  { title: 'Cambalkon Seçim Rehberi', file: 'cambalkon-rehberi.pdf', cover: 'hap-bilgiler/covers/cambalkon-rehberi.png', subtitle: 'Dikkat Edilmesi Gerekenler' },
];

const hapBilgilerCardsHTML = HAP_BILGILER_DATA.map(item => `
  <a href="hap-bilgiler/${item.file}" target="_blank" rel="noopener noreferrer" class="catalogspage-card" style="display: flex; flex-direction: column; border: 1px solid #eee; text-decoration: none; color: inherit; background: #fff; border-radius: 4px; overflow: hidden; transition: all 0.3s;">
    <div style="position: relative; height: 320px; background: #f9f9f9; overflow: hidden;">
      <img src="${item.cover}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: contain; padding: 10px; transition: transform 0.5s;" />
      <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); opacity: 0; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s; color: #fff; font-weight: 800; font-size: 0.9rem; letter-spacing: 1px;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0">
        OKUMAYA BAŞLA
      </div>
    </div>
    <div style="padding: 20px; text-align: center;">
      <h3 style="font-size: 1.1rem; margin-bottom: 5px; font-weight: 700; color: #111;">${item.title}</h3>
      <p style="color: #777; font-size: 0.8rem;">${item.subtitle}</p>
    </div>
  </a>
`).join('');

const hapBilgilerHTML = `
<!DOCTYPE html>
<html lang="tr">
${getHead('Hap Bilgiler | Çağdaş Pro Yapı - Silivri Cam Balkon', '')}
<body>
  ${getHeader('', 'hap-bilgiler')}
  ${getPageHeader('Hap Bilgiler', 'Pratik ve Teknik Bilgilendirmeler')}

  <section style="padding: 80px 0; background: #fbfbfb;">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 30px;">
        ${hapBilgilerCardsHTML}
      </div>
    </div>
  </section>

  ${getFooter('')}
</body>
</html>
`;
fs.writeFileSync(path.join(STATIC_DIR, 'hap-bilgiler.html'), hapBilgilerHTML, 'utf8');

// 9. Generate Galeri Page
console.log('📄 Galeri Sayfası Oluşturuluyor...');
const MENU_CATEGORIES = [
  { id: 'giyotin-tam-balkon', title: 'Giyotin Tam Balkon' },
  { id: 'tiara-08-10', title: 'Katlanır - Sürme Cam Balkon' },
  { id: 'bioklimatik-pergola', title: 'Bioklimatik Pergola' },
  { id: 'ruzgar-kirici-sistem', title: 'Rüzgar Kırıcı Sistem' },
  { id: 'kis-bahcesi', title: 'Çelik Konstrüksiyon & Kış Bahçesi' },
  { id: 'dusakabin', title: 'Duşakabin Sistemleri' },
  { id: 'cam-kapi', title: 'Cam Kapı Sistemleri' },
  { id: 'kompozit-cephe-sistemleri', title: 'Kompozit Cephe Sistemleri' },
  { id: 'pvc-cam-sistemleri', title: 'PVC Cam Sistemleri' },
  { id: 'kupeste-modelleri', title: 'Küpeşte Modelleri' },
];

const GALLERY_DATA = MENU_CATEGORIES.map(category => {
  const product = PRODUCT_DATA[category.id];
  const imageSet = new Set();

  if (product) {
    if (product.heroImg) imageSet.add(product.heroImg);
    if (product.safetyImg) imageSet.add(product.safetyImg);
    if (product.cleaningImg) imageSet.add(product.cleaningImg);
    if (product.features) {
      product.features.forEach(f => {
        if (f.img) imageSet.add(f.img);
      });
    }
    if (product.sections) {
      product.sections.forEach(s => {
        if (s.image) imageSet.add(s.image);
      });
    }
  }

  // Tiara Twinmax images to katlanır as well
  if (category.id === 'tiara-08-10') {
    const twinmax = PRODUCT_DATA['tiara-twinmax'];
    if (twinmax) {
      if (twinmax.heroImg) imageSet.add(twinmax.heroImg);
      if (twinmax.safetyImg) imageSet.add(twinmax.safetyImg);
      if (twinmax.cleaningImg) imageSet.add(twinmax.cleaningImg);
      if (twinmax.features) {
        twinmax.features.forEach(f => {
          if (f.img) imageSet.add(f.img);
        });
      }
    }
  }

  return {
    title: category.title,
    images: Array.from(imageSet).filter(Boolean).map(src => ({
      src: src,
      alt: `${category.title} Uygulaması`
    }))
  };
}).filter(section => section.images.length > 0);

const gallerySectionsHTML = GALLERY_DATA.map((section, idx) => {
  const imagesHTML = section.images.map(img => `
    <div class="gallery-slide" style="flex: 0 0 300px; height: 200px; position: relative; cursor: pointer; border-radius: 4px; overflow: hidden; border: 1px solid #eee;">
      <img src="${img.src.replace(/^\//, '')}" alt="${img.alt}" style="width: 100%; height: 100%; object-fit: cover;" />
      <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; color: #fff; font-size: 1.5rem;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0">
        <i class="fas fa-magnifying-glass-plus"></i>
      </div>
    </div>
  `).join('');

  return `
    <div class="gallery-gallerySection" style="margin-bottom: 60px;">
      <div class="gallery-sectionHeader" style="margin-bottom: 25px; border-left: 4px solid var(--accent); padding-left: 15px;">
        <h2 class="gallery-sectionTitle" style="font-size: 1.5rem; text-transform: uppercase; font-weight: 800; color: #111;">${section.title}</h2>
      </div>
      <div style="position: relative; display: flex; align-items: center;">
        <button class="gallery-navBtn gallery-prevBtn" style="position: absolute; left: -20px; z-index: 10; width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 1px solid #eee; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><i class="fas fa-chevron-left"></i></button>
        <div class="gallery-sliderContainer" style="display: flex; gap: 20px; overflow-x: auto; scroll-behavior: smooth; width: 100%; padding: 10px 0; -scrollbar-width: none;" onscroll="this.style.scrollbarWidth='none'">
          ${imagesHTML}
        </div>
        <button class="gallery-navBtn gallery-nextBtn" style="position: absolute; right: -20px; z-index: 10; width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 1px solid #eee; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  `;
}).join('');

const galeriHTML = `
<!DOCTYPE html>
<html lang="tr">
${getHead('Galeri | Çağdaş Pro Yapı - Silivri Cam Balkon', '')}
<body>
  ${getHeader('', 'galeri')}
  ${getPageHeader('Galeri', 'Çağdaş Pro Yapı kalitesiyle hayata geçirilen premium projelerimiz')}

  <section style="padding: 80px 0;">
    <div class="container">
      ${gallerySectionsHTML}
    </div>
  </section>

  <!-- LIGHTBOX MODAL -->
  <div id="lightbox-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 10000; align-items: center; justify-content: center; cursor: pointer;">
    <button id="lightbox-close" style="position: absolute; top: 30px; right: 30px; background: none; border: none; color: #fff; font-size: 2.5rem; cursor: pointer;"><i class="fas fa-times"></i></button>
    <img id="lightbox-img" src="" alt="" style="max-width: 90%; max-height: 85%; object-fit: contain; cursor: default;" />
  </div>

  ${getFooter('')}
</body>
</html>
`;
fs.writeFileSync(path.join(STATIC_DIR, 'galeri.html'), galeriHTML, 'utf8');

// 10. Generate İletişim Page
console.log('📄 İletişim Sayfası Oluşturuluyor...');
const iletisimHTML = `
<!DOCTYPE html>
<html lang="tr">
${getHead('İletişim | Çağdaş Pro Yapı - Silivri Cam Balkon', '')}
<body>
  ${getHeader('', 'iletisim')}
  ${getPageHeader('İletişim', 'Size Bir Telefon Kadar Yakınız')}

  <!-- CONTACT SECTION -->
  <section class="contact-section">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info">
          <div class="contact-card">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h4>Adres</h4>
              <p>Piri Mehmet Paşa Mah. Burhan Soyaslan Cad. No: 20/A Silivri / İstanbul</p>
            </div>
          </div>
          <div class="contact-card">
            <i class="fas fa-phone"></i>
            <div>
              <h4>Telefon</h4>
              <p><a href="tel:05079165707">0507 916 57 07</a></p>
            </div>
          </div>
          <div class="contact-card">
            <i class="fab fa-whatsapp"></i>
            <div>
              <h4>WhatsApp</h4>
              <p><a href="https://wa.me/905079165707" target="_blank" rel="noopener noreferrer">WhatsApp ile Yazın</a></p>
            </div>
          </div>
          <div class="contact-card">
            <i class="fas fa-envelope"></i>
            <div>
              <h4>E-posta</h4>
              <p><a href="mailto:info@cagdasproyapi.com">info@cagdasproyapi.com</a></p>
            </div>
          </div>
          <div class="contact-card">
            <i class="fas fa-clock"></i>
            <div>
              <h4>Çalışma Saatleri</h4>
              <p>Pazartesi–Cumartesi: 09:00–19:00</p>
            </div>
          </div>
        </div>

        <div class="contact-mapWrap">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.3!2d28.2438394!3d41.0770615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b5153dffc233f9%3A0x412e31643c326a5a!2sALBERT%20GENAU%20CAGDAS%20PRO%20YAPI!5e0!3m2!1str!2str!4v1715000000000!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- QUOTE FORM SECTION -->
  <section class="quote-section">
    <div class="container">
      <div class="quote-wrapper">
        <div>
          <span class="quote-tag">Teklif İsteyin</span>
          <h2 class="quote-heading">Fiyat Teklifi İsteyin</h2>
          <p class="quote-sub">Aşağıdaki formu doldurun, ihtiyacınıza en uygun teklifi hazırlayıp WhatsApp üzerinden anında paylaşalım.</p>
          <div class="quote-features">
            <div class="quote-feature"><i class="fas fa-check"></i> <span>Ücretsiz Yerinde Keşif</span></div>
            <div class="quote-feature"><i class="fas fa-check"></i> <span>Albert Genau Yetkili Bayi Güvencesi</span></div>
            <div class="quote-feature"><i class="fas fa-check"></i> <span>Hızlı ve Profesyonel Montaj</span></div>
          </div>
        </div>
        <form id="quote-form-el" class="quote-form">
          <div class="quote-field">
            <label for="quote-name">Adınız Soyadınız</label>
            <input type="text" id="quote-name" required placeholder="Örn: Ahmet Yılmaz" />
          </div>
          <div class="quote-field">
            <label for="quote-phone">Telefon Numaranız</label>
            <input type="tel" id="quote-phone" required placeholder="Örn: 0500 000 00 00" />
          </div>
          <div class="quote-field">
            <label for="quote-service">İstediğiniz Hizmet</label>
            <select id="quote-service" required>
              <option value="Cam Balkon">Cam Balkon</option>
              <option value="Kış Bahçesi">Kış Bahçesi</option>
              <option value="Duşakabin">Duşakabin</option>
              <option value="Cam Kapı">Cam Kapı</option>
              <option value="Çelik Konstrüksiyon">Çelik Konstrüksiyon</option>
              <option value="Bioklimatik Pergola">Bioklimatik Pergola</option>
              <option value="Rüzgar Kırıcı Sistem">Rüzgar Kırıcı Sistem</option>
              <option value="Diğer Hizmetler">Diğer Hizmetler</option>
            </select>
          </div>
          <div class="quote-field">
            <label for="quote-message">Detaylar / Mesajınız</label>
            <textarea id="quote-message" rows="4" placeholder="Balkon ölçüleri veya istediğiniz renk vb. detaylar..."></textarea>
          </div>
          <button type="submit" class="quote-submit">WHATSAPP İLE TEKLİF İSTE</button>
        </form>
      </div>
    </div>
  </section>

  ${getFooter('')}
</body>
</html>
`;
fs.writeFileSync(path.join(STATIC_DIR, 'iletisim.html'), iletisimHTML, 'utf8');

// 11. Generate Products Pages
console.log('📄 Ürün Detay Sayfaları Oluşturuluyor...');
const activeProducts = Object.keys(PRODUCT_DATA);

activeProducts.forEach(slug => {
  const p = PRODUCT_DATA[slug];

  let bodyHTML = '';

  if (p.isCategory) {
    // Render Category Page listing sub-products
    const subProductsHTML = p.subProducts.map(sp => `
      <a href="${sp.slug}.html" class="products-card">
        <div class="products-imageWrap">
          <img src="../${sp.image.replace(/^\//, '')}" alt="${sp.title}" class="products-productImg" style="width: 100%; height: 100%; object-fit: cover;" />
          <span style="position: absolute; top: 15px; left: 15px; background: var(--accent); color: #fff; font-size: 0.7rem; font-weight: 800; padding: 5px 12px; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px;">
            ${sp.badge}
          </span>
        </div>
        <div class="products-body">
          <h3 class="products-title">${sp.title}</h3>
          <p class="products-desc">${sp.desc}</p>
          <div class="products-cta">
            <span>Katalog & Teknik Detay <i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </a>
    `).join('');

    bodyHTML = `
      <!-- CATEGORY HERO -->
      <section class="product-hero" style="position: relative; height: 60vh; background-image: url('../${p.heroImg.replace(/^\//, '')}'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; color: #fff; text-align: center;">
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.65);"></div>
        <div class="container" style="position: relative; z-index: 3;">
          <span style="display: inline-block; color: var(--accent); font-weight: 700; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 15px;">
            ${p.badge}
          </span>
          <h1 style="font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 20px;">${p.heroTitle}</h1>
          <p style="font-size: clamp(1rem, 2vw, 1.25rem); color: rgba(255,255,255,0.8); max-width: 700px; margin: 0 auto;">${p.heroSub}</p>
        </div>
      </section>

      <!-- SUB-PRODUCTS LISTING -->
      <section class="products-section" style="padding: 90px 0; background: #fff;">
        <div class="container">
          <div class="section-header">
            <h2 class="products-mainTitle">Çözüm Seçenekleri</h2>
            <p>Balkonunuzun mimarisine ve bütçenize en uygun cam çözümlerimizi inceleyin.</p>
          </div>
          <div class="products-grid">
            ${subProductsHTML}
          </div>
        </div>
      </section>
    `;
  } else {
    // Render Detail Product Page
    const featuresHTML = (p.features || []).map(f => `
      <div class="product-featureItem" style="display: flex; gap: 30px; align-items: center; margin-bottom: 50px;">
        <div style="flex: 0 0 350px; height: 240px; border-radius: 4px; overflow: hidden; border: 1px solid #eee;">
          <img src="../${f.img.replace(/^\//, '')}" alt="${f.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div>
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 15px; color: #111;">${f.title}</h3>
          <p style="color: #555; line-height: 1.8;">${f.desc}</p>
        </div>
      </div>
    `).join('');

    const darkFeaturesHTML = (p.darkFeatures || []).map(f => `
      <div style="padding: 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 4px;">
        <i class="${f.icon}" style="font-size: 2rem; color: var(--accent); margin-bottom: 20px; display: inline-block;"></i>
        <h4 style="color: #fff; font-size: 1.1rem; font-weight: 700; margin-bottom: 10px;">${f.title}</h4>
        <p style="color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.6;">${f.desc}</p>
      </div>
    `).join('');

    const sectionsHTML = (p.sections || []).map(s => {
      if (s.type === 'text_image') {
        return `
          <div class="container" style="margin-bottom: 80px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center;">
              <div style="${s.reverse ? 'order: 2;' : ''}">
                <h3 style="font-size: 1.8rem; margin-bottom: 20px; font-weight: 800;">${s.title}</h3>
                <p style="color: #555; line-height: 1.8;">${s.content}</p>
              </div>
              <div>
                <img src="../${s.image.replace(/^\//, '')}" alt="${s.title}" style="width: 100%; border-radius: 4px; border: 1px solid #eee;" />
              </div>
            </div>
          </div>
        `;
      } else if (s.type === 'highlight') {
        return `
          <div style="background: #fdf8e2; border-top: 1px solid #faebcc; border-bottom: 1px solid #faebcc; padding: 60px 0; margin-bottom: 80px; text-align: center;">
            <div class="container">
              <span style="background: var(--accent); color: #fff; font-size: 0.75rem; font-weight: 800; padding: 6px 15px; border-radius: 20px; text-transform: uppercase; display: inline-block; margin-bottom: 20px;">
                ${s.badge}
              </span>
              <h3 style="font-size: 1.8rem; margin-bottom: 15px; color: #8a6d3b;">${s.title}</h3>
              <p style="color: #66512c; max-width: 800px; margin: 0 auto; line-height: 1.8;">${s.content}</p>
            </div>
          </div>
        `;
      } else if (s.type === 'grid') {
        return `
          <div class="container" style="margin-bottom: 80px;">
            <h3 style="font-size: 2rem; text-align: center; margin-bottom: 50px; font-weight: 800;">${s.title}</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
              ${s.items.map(item => `
                <div style="border: 1px solid #eee; padding: 30px; border-radius: 4px;">
                  <i class="${item.icon}" style="font-size: 1.8rem; color: var(--accent); margin-bottom: 15px; display: inline-block;"></i>
                  <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 10px; color: #111;">${item.title}</h4>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.6;">${item.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
      return '';
    }).join('');

    const testimonialsHTML = (p.testimonials || []).map(t => `
      <div style="background: #fff; padding: 35px; border: 1px solid #eee; border-radius: 4px;">
        <p style="font-style: italic; color: #555; margin-bottom: 20px; font-size: 0.95rem;">"${t.text}"</p>
        <div style="font-weight: 700; color: #111;">${t.name} <span style="font-weight: 400; color: #888;">— ${t.city}</span></div>
      </div>
    `).join('');

    bodyHTML = `
      <!-- PRODUCT HERO -->
      <section style="position: relative; height: 75vh; background-image: url('../${p.heroImg.replace(/^\//, '')}'); background-size: cover; background-position: center; display: flex; align-items: center; color: #fff;">
        <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);"></div>
        <div class="container" style="position: relative; z-index: 3; padding: 0 40px;">
          <span style="background: radial-gradient(circle, #e31e24 0%, #a11418 100%); color: #fff; font-size: 0.75rem; font-weight: 800; padding: 8px 18px; border-radius: 20px; text-transform: uppercase; letter-spacing: 2px; display: inline-block; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(227,30,36,0.3);">
            ${p.badge}
          </span>
          <h1 style="font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 20px; line-height: 1.1;">${p.heroTitle}</h1>
          <p style="font-size: clamp(1rem, 2vw, 1.3rem); color: rgba(255,255,255,0.7); max-width: 600px; margin-bottom: 40px; line-height: 1.6;">${p.heroSub}</p>
          <a href="../iletisim.html" class="btn btn-primary">FİYAT TEKLİFİ AL</a>
        </div>
      </section>

      <!-- TAGLINE / INTRO -->
      <section style="padding: 80px 0; border-bottom: 1px solid #f0f0f0;">
        <div class="container">
          <div style="max-width: 800px; margin: 0 auto; text-align: center;">
            <p style="font-size: 1.2rem; line-height: 1.9; color: #333; font-weight: 500; font-style: italic;">
              ${p.tagline.replace(/\n/g, '<br/>')}
            </p>
          </div>
        </div>
      </section>

      <!-- FEATURES LIST -->
      ${p.features && p.features.length > 0 ? `
        <section style="padding: 90px 0;">
          <div class="container">
            <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 60px; text-transform: uppercase; letter-spacing: -0.5px;">Öne Çıkan Özellikler</h2>
            <div>
              ${featuresHTML}
            </div>
          </div>
        </section>
      ` : ''}

      <!-- DYNAMIC SECTIONS -->
      ${sectionsHTML ? `
        <section style="padding: 50px 0;">
          ${sectionsHTML}
        </section>
      ` : ''}

      <!-- CLEANING AND SAFETY -->
      ${p.safetyImg || p.cleaningImg ? `
        <section style="padding: 90px 0; background: #fbfbfb;">
          <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
              <div>
                <h3 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 25px; color: #111;">${p.safetyTitle || 'Güvenlik ve Emniyet'}</h3>
                <p style="color: #555; line-height: 1.8; margin-bottom: 40px;">${p.safetyDesc || 'Temperli kalınlıkta cam sistemleri ile rüzgar ve darbeye dayanıklıdır.'}</p>
                
                ${p.cleaningSteps && p.cleaningSteps.length > 0 ? `
                  <h4 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; color: #111;">Kolay Temizlenebilir Yapı</h4>
                  <ul style="padding-left: 20px; line-height: 2; color: #555;">
                    ${p.cleaningSteps.map(step => `<li>${step}</li>`).join('')}
                  </ul>
                ` : ''}
              </div>
              <div style="position: relative; height: 450px; border-radius: 4px; overflow: hidden; border: 1px solid #eee;">
                <img src="../${(p.safetyImg || p.cleaningImg).replace(/^\//, '')}" alt="Emniyet ve Temizlik" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            </div>
          </div>
        </section>
      ` : ''}

      <!-- DARK FEATURES (PREMIUM BENEFITS) -->
      ${(p.darkFeatures && p.darkFeatures.length > 0) || (p.bottomFeatures && p.bottomFeatures.length > 0) || (p.finalFeatures && p.finalFeatures.length > 0) ? `
        <section style="background: #0f172a; padding: ${p.darkFeatures && p.darkFeatures.length > 0 ? '100px 0' : '40px 0'}; color: #fff;">
          <div class="container">
            <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: ${p.darkFeatures && p.darkFeatures.length > 0 ? '60px' : '0'}; color: #fff; text-transform: uppercase;">Teknik Üstünlükler</h2>
            ${p.darkFeatures && p.darkFeatures.length > 0 ? `
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-top: 60px;">
                ${darkFeaturesHTML}
              </div>
            ` : ''}
          </div>
        </section>
      ` : ''}

      <!-- BOTTOM FEATURES -->
      ${p.bottomFeatures && p.bottomFeatures.length > 0 ? `
        <section class="product-features" style="padding: 80px 0 ${p.finalFeatures && p.finalFeatures.length > 0 ? '15px' : '80px'} 0; background: #f8f8f8;">
          <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 30px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
              ${p.bottomFeatures.map(f => `
                <div class="product-featureCard" style="background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s;">
                  <div style="position: relative; height: 220px; overflow: hidden;">
                    <img src="../${f.img.replace(/^\//, '')}" alt="${f.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;" />
                  </div>
                  <div style="padding: 28px 24px;">
                    <h3 style="font-size: 1.15rem; font-weight: 800; color: #111; margin-bottom: 10px;">${f.title}</h3>
                    <p style="font-size: 0.9rem; color: #666; line-height: 1.7;">${f.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      <!-- FINAL FEATURES -->
      ${p.finalFeatures && p.finalFeatures.length > 0 ? `
        <section class="product-final-features" style="padding: 15px 0 80px 0; background: #f8f8f8;">
          <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 30px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
              ${p.finalFeatures.map(f => `
                <div class="product-featureCard" style="background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s;">
                  <div style="position: relative; height: 220px; overflow: hidden;">
                    <img src="../${f.img.replace(/^\//, '')}" alt="${f.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;" />
                  </div>
                  <div style="padding: 28px 24px;">
                    <h3 style="font-size: 1.15rem; font-weight: 800; color: #111; margin-bottom: 10px;">${f.title}</h3>
                    <p style="font-size: 0.9rem; color: #666; line-height: 1.7; white-space: pre-line;">${f.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      <!-- TESTIMONIALS -->
      ${p.testimonials && p.testimonials.length > 0 ? `
        <section style="padding: 90px 0;">
          <div class="container">
            <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 60px; text-transform: uppercase;">Uygulama Yorumları</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
              ${testimonialsHTML}
            </div>
          </div>
        </section>
      ` : ''}
    `;
  }

  const productPageHTML = `
<!DOCTYPE html>
<html lang="tr">
${getHead(`${p.heroTitle} | Çağdaş Pro Yapı - Silivri Cam Balkon`, '../')}
<body>
  ${getHeader('../', slug)}
  ${bodyHTML}
  ${getFooter('../')}
</body>
</html>
  `;

  fs.writeFileSync(path.join(URUNLER_DIR, `${slug}.html`), productPageHTML, 'utf8');
});

console.log('✅ Tüm Sayfalar Başarıyla Oluşturuldu!');
console.log('🎉 Statik site kopyası "html-css-copy" klasörü altında hazır!');
process.exit(0);
