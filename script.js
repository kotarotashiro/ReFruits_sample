document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });

  // Mini Map
  const miniMap = document.getElementById('mini-map');
  if (miniMap) {
    const mapPoints = [
      { id: 1, x: 30, y: 40, title: "2m土壌ピット", description: "地層をのぞく" },
      { id: 2, x: 70, y: 30, title: "草刈りバギーコース", description: "乗車OK" },
      { id: 3, x: 50, y: 60, title: "トロッコレール", description: "撮影スポット" },
      { id: 4, x: 80, y: 70, title: "キウイアーチ", description: "8月開花" },
      { id: 5, x: 20, y: 80, title: "休憩エリア", description: "カフェあり" },
    ];

    mapPoints.forEach(point => {
      const mapPoint = document.createElement('button');
      mapPoint.className = 'map-point';
      mapPoint.style.left = `${point.x}%`;
      mapPoint.style.top = `${point.y}%`;
      mapPoint.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <div class="map-tooltip">
          <div class="map-tooltip-title">${point.title}</div>
          <div class="map-tooltip-desc">${point.description}</div>
        </div>
      `;
      
      mapPoint.addEventListener('click', function() {
        const activePoint = miniMap.querySelector('.map-point.active');
        if (activePoint === this) {
          this.classList.remove('active');
        } else {
          if (activePoint) {
            activePoint.classList.remove('active');
          }
          this.classList.add('active');
        }
      });
      
      miniMap.appendChild(mapPoint);
    });
  }

  // Review Carousel
  const reviews = [
    {
      id: 1,
      name: "田中 美咲",
      rating: 5,
      text: "キウイの植樹体験が素晴らしかったです！自分で植えた木が成長していくのを見るのが楽しみです。スタッフの方々も親切で、キウイについて詳しく教えてくれました。",
      date: "2023年4月",
    },
    {
      id: 2,
      name: "佐藤 健太",
      rating: 5,
      text: "畑サウナ体験は最高でした！自然の中でのサウナは格別です。キウイの香りがする水風呂も爽快でした。また必ず行きます。",
      date: "2023年7月",
    },
    {
      id: 3,
      name: "鈴木 優子",
      rating: 4,
      text: "キウイ収穫体験に家族で参加しました。子供たちも大喜びで、自分で収穫したキウイの味は格別でした。ただ、少し混雑していたのが残念。",
      date: "2023年10月",
    },
    {
      id: 4,
      name: "高橋 誠",
      rating: 5,
      text: "夜間ライトアップツアーが幻想的で素晴らしかったです。ライトに照らされたキウイの木々が美しく、写真撮影にも最適でした。ガイドの説明も興味深かったです。",
      date: "2023年11月",
    },
    {
      id: 5,
      name: "渡辺 さくら",
      rating: 5,
      text: "キウイジャム作り体験が楽しかったです。自分で作ったジャムは本当に美味しくて、家族にも好評でした。レシピも教えてもらえて嬉しかったです。",
      date: "2023年9月",
    },
  ];

  const reviewTrack = document.querySelector('.review-track');
  const reviewDots = document.querySelector('.review-dots');

  if (reviewTrack && reviewDots) {
    // Create review cards
    reviews.forEach(review => {
      const reviewCard = document.createElement('div');
      reviewCard.className = 'review-card';
      
      const starsHtml = Array(5).fill('').map((_, i) => 
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${i < review.rating ? 'currentColor' : '#d1d5db'}" stroke="${i < review.rating ? 'currentColor' : '#d1d5db'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
      ).join('');
      
      reviewCard.innerHTML = `
        <div class="review-stars">${starsHtml}</div>
        <blockquote class="review-text">"${review.text}"</blockquote>
        <div class="review-author">${review.name}</div>
        <div class="review-date">${review.date}</div>
      `;
      
      reviewTrack.appendChild(reviewCard);
      
      // Create dot
      const dot = document.createElement('button');
      dot.className = 'review-dot';
      if (review.id === 1) dot.classList.add('active');
      dot.setAttribute('data-index', review.id - 1);
      reviewDots.appendChild(dot);
    });
    
    // Set up carousel
    let activeIndex = 0;
    const dots = document.querySelectorAll('.review-dot');
    
    function updateCarousel() {
      reviewTrack.style.transform = `translateX(-${activeIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    }
    
    // Auto rotate
    let carouselInterval = setInterval(() => {
      activeIndex = (activeIndex + 1) % reviews.length;
      updateCarousel();
    }, 5000);
    
    // Click on dots
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        activeIndex = parseInt(dot.getAttribute('data-index'));
        updateCarousel();
        clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
          activeIndex = (activeIndex + 1) % reviews.length;
          updateCarousel();
        }, 5000);
      });
    });
  }

  // Accordion
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      
      if (this.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });
  });

  // Counters
  const counters = document.querySelectorAll('.counter');
  
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-count'));
    const valueDisplay = counter.querySelector('.counter-value');
    const duration = 2000; // 2 seconds
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      valueDisplay.textContent = Math.floor(current).toLocaleString();
    }, interval);
  }
  
  // Intersection Observer for counters
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      observer.observe(counter);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    counters.forEach(counter => {
      animateCounter(counter);
    });
  }
});