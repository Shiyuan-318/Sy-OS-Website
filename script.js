document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initCarousel();
    initScrollAnimation();
});

/* ============================================================
   导航 - Liquid Glass
   - 顶部通栏在滚动后收缩为悬浮圆角胶囊
   - 下滑隐藏、上滑显示
   - 移动端汉堡菜单（瀑布式淡入）
   ============================================================ */
function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const toggle = nav.querySelector('.nav-toggle');
    const navLinks = nav.querySelector('.nav-links');
    const pageTitle = nav.querySelector('.nav-page-title');

    // 滚动状态
    let lastScrollY = window.scrollY;

    function onScroll() {
        const y = window.scrollY;
        // 收缩为胶囊 + 显示页面标题
        if (y > 10) {
            nav.classList.add('scrolled');
            if (pageTitle && pageTitle.textContent.trim()) {
                nav.classList.add('show-page-title');
            }
        } else {
            nav.classList.remove('scrolled', 'show-page-title');
        }

        // 下滑隐藏、上滑显示（超过 140px 后才开始逻辑）
        if (y > lastScrollY && y > 140 && !nav.classList.contains('menu-open')) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }

        lastScrollY = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 移动端菜单
    if (toggle && navLinks) {
        function closeMenu() {
            nav.classList.remove('menu-open');
            navLinks.classList.remove('is-shown');
            toggle.setAttribute('aria-expanded', 'false');
            // 恢复导航毛玻璃
            setTimeout(() => {
                if (!nav.classList.contains('menu-open')) {
                    nav.removeAttribute('style');
                }
            }, 50);
        }

        function toggleMenu() {
            const isOpen = nav.classList.toggle('menu-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) {
                nav.classList.remove('nav-hidden');
                // 下一帧触发瀑布动画
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    navLinks.classList.add('is-shown');
                }));
            } else {
                closeMenu();
            }
        }

        toggle.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // 点击导航区域外部关闭菜单
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('menu-open') && !nav.contains(e.target)) {
                closeMenu();
            }
        });
    }
}

/* ============================================================
   英雄区轮播 - 淡入切换 + 自动播放
   ============================================================ */
function initCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    if (!slides.length) return;

    let current = 0;
    let timer = null;

    function go(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        const target = (index + slides.length) % slides.length;
        slides[target].classList.add('active');
        if (dots[target]) dots[target].classList.add('active');
        current = target;
    }

    function next() { go(current + 1); resetTimer(); }
    function prev() { go(current - 1); resetTimer(); }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, 5000);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { go(i); resetTimer(); });
    });

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // 触摸滑动支持
    let startX = 0;
    carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 40) {
            if (diff < 0) next(); else prev();
        }
    }, { passive: true });

    resetTimer();
}

/* ============================================================
   滚动进入动画 - 元素淡入
   ============================================================ */
function initScrollAnimation() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}