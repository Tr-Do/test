(function () {
    function start() {
        const el = document.getElementById('calendar');
        const lib = window.VanillaCalendarPro;
        if (!el || !lib) return;
        if (el.__vc_instance) return;
        const { Calendar } = lib;
        const cal = new Calendar('#calendar');
        cal.init();
        el.__vc_instance = cal;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
    window.addEventListener('load', start);
})();


(function () {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const THRESHOLD = 50;
    const apply = () => nav.classList.toggle('scrolled', window.scrollY > THRESHOLD);

    apply();
    window.addEventListener('scroll', apply, { passive: true });
})();

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.menu-overlay');
    const resourcesDropdown = document.querySelector('.dropdown');
    const resourcesLink = document.getElementById('resources-link');
    const mobileBreakpoint = 600;

    if (resourcesDropdown && resourcesLink) {
        resourcesLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.innerWidth <= mobileBreakpoint) {
                if (navLinks && navLinks.classList.contains('open')) {
                    resourcesDropdown.classList.toggle('open');
                }
            } else {
                resourcesDropdown.classList.toggle('open');
            }
        });

        document.addEventListener('click', (e) => {
            if (!resourcesDropdown.contains(e.target) && e.target !== resourcesLink) {
                resourcesDropdown.classList.remove('open');
            }
        });
    }

    if (hamburger && navLinks && overlay) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
            if (window.innerWidth <= mobileBreakpoint && resourcesDropdown) {
                resourcesDropdown.classList.remove('open');
            }
        });

        overlay.addEventListener('click', () => {
            navLinks.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            if (window.innerWidth <= mobileBreakpoint && resourcesDropdown) {
                resourcesDropdown.classList.remove('open');
            }
        });

        navLinks.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', function (e) {
                if (this.id === 'resources-link') {
                    e.preventDefault();
                    return;
                }
                if (window.innerWidth <= mobileBreakpoint) {
                    navLinks.classList.remove('open');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    if (resourcesDropdown) resourcesDropdown.classList.remove('open');
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > mobileBreakpoint) {
                navLinks.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                if (resourcesDropdown) resourcesDropdown.classList.remove('open');
            }
        });
    }
});