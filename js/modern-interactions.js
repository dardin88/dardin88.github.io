// Modern interactions and animations for the website
document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }

    // Add smooth scroll behavior for internal links using native CSS
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    // Simplified navigation handling
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Simple native CSS transition for active state
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.15s ease';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Handle hash links with native scrollIntoView
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                        block: 'start'
                    });
                }
            }

            // Collapse mobile menu using native Bootstrap 5 API
            if (navbarCollapse?.classList.contains('show') && window.bootstrap?.Collapse) {
                const collapse = window.bootstrap.Collapse.getInstance(navbarCollapse) || 
                                new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
                collapse.hide();
            }
        });
    });

    // Use native Intersection Observer for fade-in animations
    if (!prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });

        document.querySelectorAll('.modern-card').forEach(el => observer.observe(el));
    }

    // Simplified hover effects using CSS :hover instead of JS
    // Remove JS hover handlers and rely on CSS transitions

    // Security for external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        const rel = link.getAttribute('rel') || '';
        if (!rel.includes('noopener')) {
            link.setAttribute('rel', `${rel} noopener`.trim());
        }
        if (!rel.includes('noreferrer')) {
            link.setAttribute('rel', `${link.getAttribute('rel')} noreferrer`.trim());
        }
    });

    // Simplified navbar scroll effect using CSS classes
    const navbar = document.getElementById('sideNav');
    if (navbar && window.innerWidth <= 991) {
        let ticking = false;
        
        function updateNavbar() {
            navbar.classList.toggle('backdrop-blur', window.scrollY > 50);
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    // Simple click effects using native CSS transitions
    document.querySelectorAll('.btn-modern, .list-social-icons a').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.15s ease';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});
