document.addEventListener('DOMContentLoaded', function () {
    const resourcesDropdown = document.querySelector('.dropdown');
    const resourcesLink = document.getElementById('resources-link');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.menu-overlay');
    const mobileBreakpoint = 600;

    if (resourcesDropdown && resourcesLink) {
        resourcesLink.addEventListener('click', function (e) {
            // On mobile, only open dropdown if menu is open
            if (window.innerWidth <= mobileBreakpoint) {
                e.preventDefault();
                if (navLinks.classList.contains('open')) {
                    resourcesDropdown.classList.toggle('open');
                }
            } else {
                // On desktop, open/close dropdown
                e.preventDefault();
                resourcesDropdown.classList.toggle('open');
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            // Only close if NOT clicking inside dropdown or resources link
            if (!resourcesDropdown.contains(e.target) && e.target !== resourcesLink) {
                resourcesDropdown.classList.remove('open');
            }
        });
    }

    // Hamburger/menu logic
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        overlay.classList.toggle('active');
        if (navLinks.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            // Always close dropdown if main nav closes (mobile)
            if (window.innerWidth <= mobileBreakpoint) {
                resourcesDropdown.classList.remove('open');
            }
        }
    });

    overlay.addEventListener('click', () => {
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (window.innerWidth <= mobileBreakpoint) {
            resourcesDropdown.classList.remove('open');
        }
    });

    // Close menu on link click (mobile only)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            // If this is the resources link, just toggle the dropdown and stop here
            if (this.id === 'resources-link') {
                e.preventDefault(); // Already handled in dropdown logic
                return;
            }
            if (window.innerWidth <= mobileBreakpoint) {
                navLinks.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                resourcesDropdown.classList.remove('open');
            }
        });
    });

    // Make sure dropdown closes on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > mobileBreakpoint) {
            navLinks.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            resourcesDropdown.classList.remove('open');
        }
    });

    // Scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    })
});