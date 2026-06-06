document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initNavToggle();
    initNavbarScroll();
    initSmoothScroll();
    initRevealAnimations();
});

/* ============================================
   Carousel
   ============================================ */
function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const progressBar = document.getElementById('carouselProgress');

    if (!items.length) return;

    let currentIndex = 0;
    let interval;
    let progressInterval;
    const SLIDE_DURATION = 5000;
    const PROGRESS_STEP = 50;

    function showSlide(index) {
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        items[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');
        currentIndex = index;

        // Reset progress
        startProgress();
    }

    function nextSlide() {
        let next = (currentIndex + 1) % items.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentIndex - 1 + items.length) % items.length;
        showSlide(prev);
    }

    function startProgress() {
        if (progressBar) {
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            // Force reflow
            progressBar.offsetHeight;
            progressBar.style.transition = `width ${SLIDE_DURATION}ms linear`;
            progressBar.style.width = '100%';
        }
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, SLIDE_DURATION);
    }

    indicators.forEach((ind, index) => {
        ind.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const carousel = document.querySelector('.carousel-inner');

    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetInterval();
            }
        }, { passive: true });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    startProgress();
    resetInterval();
}

/* ============================================
   Nav Toggle (Mobile)
   ============================================ */
function initNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbarScroll() {
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translate(-50%, -150%)';
            navbar.style.opacity = '0';
        } else {
            navbar.style.transform = 'translate(-50%, 0)';
            navbar.style.opacity = '1';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   Reveal on Scroll Animations
   ============================================ */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}
