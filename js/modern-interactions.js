// Modern interactions and animations for the website
document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
        // Don't return: still enable basic, non-animated behaviors like offset scrolling
    }

    // Add smooth scroll behavior for internal links and collapse mobile menu on nav clicks
    const navLinks = document.querySelectorAll('.nav-link, .js-scroll-trigger');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    function normalizePath(p) {
        // Ensure trailing slash for index.html and collapse duplicate slashes
        return p.replace(/\\+/g, '/').replace(/\/index\.html$/i, '/');
    }

    function getHeaderOffset() {
        const header = document.querySelector('.navbar.fixed-top, #sideNav');
        let offset = 0;
        if (header) {
            const styles = window.getComputedStyle(header);
            if (styles.position === 'fixed') {
                offset = header.offsetHeight || 0;
            }
        }
        // small extra spacing
        return offset + 8;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active state animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Smooth scroll for hash links on same page
            const rawHref = this.getAttribute('href') || '';
            // Resolve full URL of the link to compare against current location
            let url;
            try {
                url = new URL(this.href, window.location.origin);
            } catch (_) {
                url = null;
            }

            // Handle hash-only and same-page links like "/page#id" or "index.html#id"
            const currentPath = normalizePath(window.location.pathname || '/');
            const linkPath = url ? normalizePath(url.pathname) : currentPath;
            const hash = url ? url.hash : (rawHref.startsWith('#') ? rawHref : '');

            if (hash && hash.length > 1 && linkPath === currentPath && (!url || url.origin === window.location.origin)) {
                const target = document.querySelector(hash);
                if (target) {
                    e.preventDefault();
                    const top = window.pageYOffset + target.getBoundingClientRect().top - getHeaderOffset();
                    if (prefersReducedMotion) {
                        window.scrollTo(0, Math.max(0, top));
                    } else {
                        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
                    }
                }
            }

            // Collapse mobile menu (Bootstrap 5 API)
            if (navbarCollapse && navbarCollapse.classList.contains('show') && window.bootstrap && window.bootstrap.Collapse) {
                const instance = window.bootstrap.Collapse.getInstance(navbarCollapse) || new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
                instance.hide();
            }
        });
    });

    // Intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('fade-in-up')) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.animationDelay = '0s';
            }
        });
    }, observerOptions);

    // Observe all cards and sections (reduced scope)
    const elementsToAnimate = document.querySelectorAll('.modern-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Simplified hover effects to reduce flickering
    const socialIcons = document.querySelectorAll('.list-social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Removed parallax effect to reduce flickering and improve performance

    // Add loading animation to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        // Ensure security best practice
        const rel = (link.getAttribute('rel') || '').toLowerCase();
        if (!rel.includes('noopener')) {
            link.setAttribute('rel', (rel ? rel + ' ' : '') + 'noopener');
        }
        if (!rel.includes('noreferrer')) {
            link.setAttribute('rel', (link.getAttribute('rel') + ' noreferrer').trim());
        }

        link.addEventListener('click', function() {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    });

    // Simplified navbar interaction (reduced animations)
    const navbar = document.getElementById('sideNav');
    if (navbar) {
        // Simplified blur effect on scroll for mobile
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 991) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const scrollTop = window.pageYOffset;
                    if (scrollTop > 50) {
                        navbar.classList.add('backdrop-blur');
                    } else {
                        navbar.classList.remove('backdrop-blur');
                    }
                }, 10);
            }
        });
    }

    // Simplified ripple effect to reduce flickering
    const buttons = document.querySelectorAll('.btn-modern, .list-social-icons a');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Simple scale effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Improve mobile menu experience
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.animation = 'slideDown 0.3s ease-out';
                } else {
                    navbarCollapse.style.animation = 'slideUp 0.3s ease-out';
                }
            }, 10);
        });
    }

    // Add slide animations
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(slideStyle);
});
