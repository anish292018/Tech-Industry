// 7Skill Academy Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initTypewriter();
    initScrollAnimations();
    initTestimonialSlider();
    initMobileMenu();
    initDemoPopup();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Typewriter effect for hero section
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const phrases = [
        'Live 1:1 Digital Marketing Training',
        'AI Automation Services for Businesses'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 1500; // Wait before deleting
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase after deleting
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(type, 1000);
}

// Scroll animations
function initScrollAnimations() {
    // Initialize GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Timeline animation
        gsap.to('.timeline-container', {
            scrollTrigger: {
                trigger: '.timeline-container',
                start: 'top 80%',
                toggleClass: 'animated',
                once: true
            }
        });
        
        // Timeline items staggered animation
        gsap.to('.timeline-item', {
            scrollTrigger: {
                trigger: '.timeline-container',
                start: 'top 80%',
                once: true
            },
            opacity: 1,
            x: 0,
            stagger: 0.3,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        // Service cards animation
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '#services',
                start: 'top 70%',
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        });
        
        // Blog cards animation
        gsap.from('.blog-card', {
            scrollTrigger: {
                trigger: '#blog',
                start: 'top 70%',
                once: true
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
        });
    } else {
        // Fallback for when GSAP is not available
        const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .timeline-container, .timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('timeline-container') || entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('animated');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Testimonial slider
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    
    // Set initial active slide
    slides[currentIndex].classList.add('active');
    
    function goToSlide(index) {
        // Handle index boundaries
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Update current index
        currentIndex = index;
        
        // Move the track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active class
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentIndex].classList.add('active');
    }
    
    // Event listeners for buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
    }
    
    // Auto-advance the slider every 5 seconds
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuButton || !mobileMenu) return;
    
    menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = menuButton.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
            
            const icon = menuButton.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Free Demo Popup
function initDemoPopup() {
    const demoLinks = document.querySelectorAll('a[href="#free-demo"]');
    const demoPopup = document.getElementById('free-demo');
    const closeButton = document.getElementById('close-demo');
    const demoForm = document.getElementById('demo-form');
    
    if (!demoPopup) return;
    
    // Open popup when clicking demo links
    demoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            demoPopup.classList.remove('hidden');
            setTimeout(() => {
                demoPopup.classList.add('active');
            }, 10);
        });
    });
    
    // Close popup when clicking close button
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            demoPopup.classList.remove('active');
            setTimeout(() => {
                demoPopup.classList.add('hidden');
            }, 300);
        });
    }
    
    // Close popup when clicking outside
    demoPopup.addEventListener('click', function(e) {
        if (e.target === demoPopup) {
            demoPopup.classList.remove('active');
            setTimeout(() => {
                demoPopup.classList.add('hidden');
            }, 300);
        }
    });
    
    // Handle form submission
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just show a success message
            demoForm.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-check-circle text-primary text-5xl mb-4"></i>
                    <h4 class="text-xl font-bold mb-2">Thank You!</h4>
                    <p class="text-gray-700">Your demo class has been scheduled. We'll contact you shortly to confirm the details.</p>
                </div>
            `;
            
            // Close the popup after 3 seconds
            setTimeout(() => {
                demoPopup.classList.remove('active');
                setTimeout(() => {
                    demoPopup.classList.add('hidden');
                    // Reset form after hiding
                    setTimeout(() => {
                        initDemoPopup(); // Reinitialize the popup
                    }, 300);
                }, 300);
            }, 3000);
        });
    }
}