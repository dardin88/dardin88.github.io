// Modern interactions and animations for the website
document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }

    // Add smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add active state animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Simplified intersection observer for fade-in animations (reduced flickering)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('fade-in-up')) {
                entry.target.classList.add('fade-in-up');
                // Remove random delay to prevent flickering
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
            // Simple scale effect instead of complex ripple
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Removed complex ripple animation CSS

    // Improve mobile menu experience
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
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

    // Optimized performance: Throttled scroll events to reduce flickering
    let isScrolling = false;
    function updateOnScroll() {
        // Minimal scroll-based updates
        isScrolling = false;
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(updateOnScroll);
            isScrolling = true;
        }
    }, { passive: true });
});
