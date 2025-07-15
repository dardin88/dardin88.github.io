// Modern interactions and animations for the website
document.addEventListener('DOMContentLoaded', function() {
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

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll('.modern-card, .timeline-card, .contact-info');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Add hover effects to social icons
    const socialIcons = document.querySelectorAll('.list-social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add parallax effect to decorative elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('section.resume-section');
        
        sections.forEach((section, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            if (section.querySelector('::before')) {
                section.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

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

    // Enhanced navbar interaction
    const navbar = document.getElementById('sideNav');
    if (navbar) {
        // Add blur effect on scroll for mobile
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 991) {
                const scrollTop = window.pageYOffset;
                if (scrollTop > 50) {
                    navbar.classList.add('backdrop-blur');
                } else {
                    navbar.classList.remove('backdrop-blur');
                }
            }
        });
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-modern, .list-social-icons a');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

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

    // Performance optimization: Debounce scroll events
    let ticking = false;
    function updateOnScroll() {
        // Scroll-based animations here
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
});
