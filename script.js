/* ============================================
   Sy OS 官网 — 交互脚本
   鸿蒙粒子 / 液态玻璃光追 / 鸿蒙涟漪 / 滚动动画 / 主题切换
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  HarmonyParticles.init();
  LiquidGlass.init();
  ScrollReveal.init();
  Navbar.init();
  HarmonyRipple.init();
  ThemeManager.init();
});

/* ========== 鸿蒙粒子系统 ========== */
const HarmonyParticles = {
  canvas: null,
  ctx: null,
  particles: [],
  mouse: { x: -1000, y: -1000 },
  raf: null,
  count: 80,

  init() {
    // 减少动效模式跳过
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particles-canvas';
    document.body.prepend(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  },

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    // 低性能设备减少粒子
    const dpr = window.devicePixelRatio || 1;
    if (dpr > 2 || window.innerWidth < 768) {
      this.count = 30;
    } else {
      this.count = 80;
    }
  },

  createParticles() {
    this.particles = [];
    const colors = [
      'rgba(99, 102, 241, 0.2)',
      'rgba(139, 92, 242, 0.2)',
      'rgba(16, 185, 129, 0.15)',
      'rgba(99, 102, 241, 0.1)',
      'rgba(139, 92, 242, 0.1)',
    ];
    for (let i = 0; i < this.count; i++) {
      const isSpot = Math.random() > 0.6;
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.3 - 0.1,
        size: isSpot ? Math.random() * 12 + 6 : Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        isSpot,
        blur: isSpot ? 4 : 0,
      });
    }
  },

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });
  },

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // 鼠标引力场
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        const force = (200 - dist) / 200 * 0.02;
        p.vx += dx / dist * force;
        p.vy += dy / dist * force;
      }

      // 阻尼
      p.vx *= 0.98;
      p.vy *= 0.98;

      // 缓慢上浮
      p.vy -= 0.002;

      p.x += p.vx;
      p.y += p.vy;

      // 边界循环
      if (p.y < -20) { p.y = this.canvas.height + 20; p.x = Math.random() * this.canvas.width; }
      if (p.x < -20) p.x = this.canvas.width + 20;
      if (p.x > this.canvas.width + 20) p.x = -20;

      // 绘制
      this.ctx.save();
      if (p.blur > 0) {
        this.ctx.filter = `blur(${p.blur}px)`;
      }
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
      this.ctx.restore();

      // 连线
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
        if (d < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - d / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.raf = requestAnimationFrame(() => this.animate());
  },

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.canvas) this.canvas.remove();
  }
};

/* ========== 液态玻璃光追 ========== */
const LiquidGlass = {
  init() {
    const elements = document.querySelectorAll('.liquid-glass');
    if (!elements.length) return;

    document.addEventListener('mousemove', (e) => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mouse-x', `${x}%`);
        el.style.setProperty('--mouse-y', `${y}%`);
      });
    }, { passive: true });
  }
};

/* ========== 滚动渐入 ========== */
const ScrollReveal = {
  init() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => observer.observe(el));
  }
};

/* ========== 导航栏 ========== */
const Navbar = {
  init() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.nav-mobile');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }
};

/* ========== 鸿蒙涟漪 ========== */
const HarmonyRipple = {
  init() {
    const targets = document.querySelectorAll('.btn-primary, .btn-secondary, .product-card');
    targets.forEach(el => {
      el.addEventListener('click', (e) => {
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'harmony-ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        el.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }
};

/* ========== 主题管理 ========== */
const ThemeManager = {
  init() {
    const toggle = document.querySelector('.nav-theme-toggle');
    if (!toggle) return;

    // 读取存储的主题
    const saved = localStorage.getItem('syos-theme');
    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      toggle.textContent = '🌙';
    } else {
      toggle.textContent = '☀️';
    }

    toggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('syos-theme', 'dark');
        toggle.textContent = '☀️';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('syos-theme', 'light');
        toggle.textContent = '🌙';
      }
      // 触觉反馈接口
      this.haptic('medium');
    });
  },

  haptic(intensity) {
    // 触觉反馈接口 — 支持 Vibration API 的设备
    if ('vibrate' in navigator) {
      const ms = intensity === 'light' ? 10 : intensity === 'medium' ? 20 : 30;
      navigator.vibrate(ms);
    }
  }
};
