/* ==========================================================
   DRIFT KING SCHOOL: COURSES MICROSITE
   Trilingual HE/EN/RU. Hebrew default. Bangkok pattern.
   ========================================================== */

(function () {
    'use strict';

    const STORAGE_KEY = 'dks-courses-lang';
    const DEFAULT_LANG = 'he';
    const LANG_CYCLE = ['he', 'en', 'ru'];
    const LANG_LABELS = { he: 'עברית', en: 'English', ru: 'Русский' };

    /* ---------- LANGUAGE SWITCHING ---------- */
    function applyLanguage(lang) {
        if (!LANG_CYCLE.includes(lang)) lang = DEFAULT_LANG;
        const html = document.documentElement;
        html.lang = lang;
        html.dir = lang === 'he' ? 'rtl' : 'ltr';
        html.setAttribute('data-lang', lang);

        document.querySelectorAll('[data-he]').forEach((el) => {
            const val = el.getAttribute('data-' + lang);
            if (val === null) return;
            if (el.tagName === 'META') {
                el.setAttribute('content', val);
            } else if (el.tagName === 'TITLE') {
                document.title = val;
            } else {
                el.innerHTML = val;
            }
        });

        document.querySelectorAll('.lang-btn').forEach((btn) => {
            const active = btn.getAttribute('data-lang') === lang;
            btn.classList.toggle('active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        const floatText = document.getElementById('langFloatText');
        if (floatText) {
            const idx = LANG_CYCLE.indexOf(lang);
            const next = LANG_CYCLE[(idx + 1) % LANG_CYCLE.length];
            floatText.textContent = LANG_LABELS[next];
        }

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    function initLanguage() {
        let saved = DEFAULT_LANG;
        try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) { /* ignore */ }

        applyLanguage(saved);

        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                applyLanguage(lang);
            });
        });

        const float = document.getElementById('langFloat');
        if (float) {
            float.addEventListener('click', () => {
                const current = document.documentElement.lang || DEFAULT_LANG;
                const idx = LANG_CYCLE.indexOf(current);
                const next = LANG_CYCLE[(idx + 1) % LANG_CYCLE.length];
                applyLanguage(next);
            });
        }
    }

    /* ---------- NAVBAR SCROLL STATE ---------- */
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        const onScroll = () => {
            if (window.scrollY > 20) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ---------- MOBILE MENU ---------- */
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const menu = document.getElementById('mobileMenu');
        if (!hamburger || !menu) return;
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }

    window.closeMobile = function () {
        const hamburger = document.getElementById('hamburger');
        const menu = document.getElementById('mobileMenu');
        if (hamburger) hamburger.classList.remove('open');
        if (menu) menu.classList.remove('open');
    };

    /* ---------- HERO PARTICLES ---------- */
    function initParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;
        const count = 22;
        for (let i = 0; i < count; i++) {
            const s = document.createElement('span');
            s.style.left = Math.random() * 100 + '%';
            s.style.animationDelay = Math.random() * 8 + 's';
            s.style.animationDuration = 6 + Math.random() * 8 + 's';
            s.style.opacity = (0.35 + Math.random() * 0.5).toString();
            container.appendChild(s);
        }
    }

    /* ---------- HERO VIDEO RESILIENCE ---------- */
    function initHeroVideo() {
        const video = document.getElementById('heroVideo');
        if (!video) return;
        const tryPlay = () => {
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
        };
        tryPlay();
        video.addEventListener('pause', tryPlay);
        video.addEventListener('stalled', tryPlay);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) tryPlay();
        });
    }

    /* ---------- STATS COUNTERS ---------- */
    function animateCounters() {
        const els = document.querySelectorAll('.stat-num');
        if (!els.length) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10) || 0;
                const duration = 1500;
                const start = performance.now();
                function step(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const value = Math.floor(target * ease);
                    el.textContent = value.toLocaleString();
                    if (progress < 1) requestAnimationFrame(step);
                    else el.textContent = target.toLocaleString();
                }
                requestAnimationFrame(step);
                io.unobserve(el);
            });
        }, { threshold: 0.4 });
        els.forEach((el) => io.observe(el));
    }

    /* ---------- REVEAL ON SCROLL ---------- */
    function initReveal() {
        const candidates = document.querySelectorAll('.adv-card, .signature-card, .section-header, .comp-item, .car-course, .quick-close-card, .teaser-card, .journey-bridge');
        candidates.forEach((el) => el.classList.add('reveal'));
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        candidates.forEach((el) => io.observe(el));
    }

    /* ---------- LOGO INTRO HIDE ---------- */
    function initIntro() {
        const intro = document.getElementById('logoIntro');
        if (!intro) return;
        setTimeout(() => { intro.style.display = 'none'; }, 2600);
    }

    /* ---------- ADVANTAGE BG IMAGE TOGGLE (click reveals image) ---------- */
    function initAdvImages() {
        document.querySelectorAll('.adv-card.has-bg').forEach((card) => {
            card.addEventListener('click', () => {
                card.classList.toggle('show-image');
            });
        });
    }

    /* ---------- INIT ---------- */
    function init() {
        initLanguage();
        initNavbar();
        initMobileMenu();
        initParticles();
        initHeroVideo();
        animateCounters();
        initReveal();
        initIntro();
        initAdvImages();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
