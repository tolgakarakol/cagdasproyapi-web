
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

      const text = `Merhaba, Çağdaş Pro Yapı web siteniz üzerinden teklif formu doldurdum.\n\nİsim: ${name}\nTelefon: ${phone}\nHizmet: ${service}\nMesaj: ${message}`;
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/905079165707?text=${encoded}`, '_blank');
    });
  }

  // --- Contact Form WhatsApp Submit ---
  const contactForm = document.getElementById('contact-form-el');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const phone = document.getElementById('contact-phone')?.value || '';
      const service = document.getElementById('contact-service')?.value || '';
      const msg = document.getElementById('contact-message')?.value || '';

      let text = `Merhaba, Çağdaş Pro Yapı web siteniz üzerinden mesaj gönderiyorum.\n\nİsim: ${name}\nTelefon: ${phone}`;
      if (email) text += `\nE-posta: ${email}`;
      if (service) text += `\nİlgilenilen Hizmet: ${service}`;
      if (msg) text += `\nMesaj: ${msg}`;
      
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/905079165707?text=${encoded}`, '_blank');
    });
  }

});
