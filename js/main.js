// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initSkillBars();
    initMobileMenu();
});

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.getBoundingClientRect().top + window.pageYOffset - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initialize on load
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (hero && scrolled < hero.offsetHeight) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const delay = Array.from(entry.target.parentNode.children)
                                     .indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .about-highlights .highlight-item,
        .timeline-item,
        .skill-category,
        .contact-item
    `);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Separate handling for project cards to ensure they're visible
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // Add a slight delay for stagger effect
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }, index * 200);
    });
}

// Animations
function initAnimations() {
    // Typing effect for hero title (disabled to preserve HTML formatting)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Keep the original HTML content with proper formatting
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'fadeInUp 1s ease-out';
        }, 500);
    }
    
    // Counter animation for skills
    function animateCounters() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const target = parseInt(level.textContent);
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    level.textContent = target + '%';
                    clearInterval(updateCounter);
                } else {
                    level.textContent = Math.ceil(current) + '%';
                }
            }, 30);
        });
    }
    
    // Trigger counter animation when skills section is visible
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                
                // Reset width and animate
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formInputs = this.querySelectorAll('.form-control');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Validate form
            let isValid = true;
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
            });
            
            if (!isValid) {
                showNotification('모든 필드를 입력해주세요.', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
                this.reset();
                submitBtn.textContent = '메시지 보내기';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Smooth scroll for all internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate skill bars on load if skills section is visible
    const skillsSection = document.querySelector('.skills');
    if (skillsSection && isElementInViewport(skillsSection)) {
        initSkillBars();
    }
    
    // Handle image loading failures
    handleImageFallbacks();
});

// Handle image loading failures
function handleImageFallbacks() {
    const techImages = [
        { img: '.tech-image', fallback: '.tech-fallback' },
        { img: '.skills-image', fallback: '.skills-fallback' },
        { img: '.cert-image', fallback: '.cert-fallback' }
    ];
    
    techImages.forEach(({ img, fallback }) => {
        const imgElement = document.querySelector(img);
        const fallbackElement = document.querySelector(fallback);
        
        if (imgElement && fallbackElement) {
            imgElement.addEventListener('error', function() {
                this.style.display = 'none';
                fallbackElement.style.display = 'block';
            });
            
            imgElement.addEventListener('load', function() {
                fallbackElement.style.display = 'none';
            });
        }
    });
}

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Hidden developer mode activated!', 'success');
        document.body.classList.add('developer-mode');
        
        // Add some fun effects
        const style = document.createElement('style');
        style.textContent = `
            .developer-mode .hero {
                background: linear-gradient(45deg, #ff0080, #7928ca, #ff0080);
                background-size: 400% 400%;
                animation: gradient 3s ease infinite;
            }
            
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-related operations here if needed
}, 10);