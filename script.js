document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initNavToggle();
    initNavbarScroll();
    initSmoothScroll();
});

function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    if (!items.length) return;

    let currentIndex = 0;
    let interval;
    const DURATION = 5000;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        items[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() { showSlide((currentIndex + 1) % items.length); }
    function prevSlide() { showSlide((currentIndex - 1 + items.length) % items.length); }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, DURATION);
    }

    indicators.forEach((ind, i) => ind.addEventListener('click', () => { showSlide(i); resetInterval(); }));
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

    // Touch swipe
    let touchX = 0;
    const carousel = document.querySelector('.carousel-inner');
    if (carousel) {
        carousel.addEventListener('touchstart', e => { touchX = e.changedTouches[0].screenX; }, { passive: true });
        carousel.addEventListener('touchend', e => {
            const diff = touchX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
                resetInterval();
            }
        }, { passive: true });
    }

    // Keyboard
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') { prevSlide(); resetInterval(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetInterval(); }
    });

    resetInterval();
}

function initNavToggle() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
        document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

function initNavbarScroll() {
    let lastY = window.scrollY;
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > lastY && y > 300) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastY = y;
    }, { passive: true });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 72;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
}