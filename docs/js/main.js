class WebsiteInteractions {
    constructor() {
        this.cursorGlow = document.querySelector('.cursor-glow');
        this.init();
    }

    init() {
        this.setupCursorGlow();
        this.setupScrollAnimations();
        this.setupSmoothScroll();
        this.setupNavbarEffects();
        this.setupParallaxEffect();
        this.setupCardTilt();
    }

    setupCursorGlow() {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animate = () => {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;

            this.cursorGlow.style.left = `${glowX}px`;
            this.cursorGlow.style.top = `${glowY}px`;

            requestAnimationFrame(animate);
        };

        animate();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                }
            });
        }, observerOptions);

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        });
    }

    setupParallaxEffect() {
        const orbs = document.querySelectorAll('.gradient-orb');

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.1;
                const yPos = scrollY * speed;
                orb.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupCardTilt() {
        const cards = document.querySelectorAll('.blog-card, .learning-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WebsiteInteractions();

    const heroTitle = document.querySelector('.hero-title');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'none';
                entry.target.offsetHeight;
                entry.target.style.animation = null;
            }
        });
    }, { threshold: 0.5 });

    if (heroTitle) {
        observer.observe(heroTitle);
    }
});
