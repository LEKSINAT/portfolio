document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Smooth scrolling for anchor links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Add scrolled class on page load if scrolled
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Initialize navbar state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }
    
    // Add animation classes on scroll with Intersection Observer for better performance
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        // Use Intersection Observer if available for better performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Unobserve after animation is triggered
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            const checkIfInView = () => {
                const windowHeight = window.innerHeight;
                const scrollY = window.scrollY || window.pageYOffset;
                
                animatedElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top + scrollY;
                    const elementBottom = elementTop + element.offsetHeight;
                    
                    // If element is in viewport
                    if (elementTop < (scrollY + windowHeight - 100) && elementBottom > scrollY + 100) {
                        element.classList.add('visible');
                    }
                });
            };
            
            // Run once on load
            checkIfInView();
            
            // Then on scroll with debounce for performance
            let isScrolling;
            window.addEventListener('scroll', () => {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(checkIfInView, 66); // ~15fps
            }, false);
        }
    }

    // Initialize animations when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Add animate-on-scroll class to all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
        });
        
        // Initialize animations
        animateOnScroll();
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
