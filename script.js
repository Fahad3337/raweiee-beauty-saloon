// Enhanced JavaScript for Professional Website

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const bookingForm = document.getElementById('bookingForm');
const newsletterForm = document.querySelector('.newsletter-form');
const categoryTabs = document.querySelectorAll('.category-tab');
const serviceCards = document.querySelectorAll('.service-card');
const resetBtn = document.getElementById('resetForm');

// Enhanced Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

// Enhanced Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Enhanced Smooth scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Category Filter System
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const category = tab.dataset.category;
        filterServices(category);
    });
});

function filterServices(category) {
    serviceCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Enhanced Form Validation
function validateForm(formData) {
    const errors = {};
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Please enter your full name (minimum 2 characters)';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex /^[\d\s\-\+\(\)]+$/;
    if (!formData.phone || !phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Please enter a valid phone number (minimum 10 digits)';
    }
    
    // Service validation
    if (!formData.service) {
        errors.service = 'Please select a service';
    }
    
    // Date validation
    if (!formData.date) {
        errors.date = 'Please select a date';
    } else {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            errors.date = 'Please select a future date';
        }
    }
    
    // Time validation
    if (!formData.time) {
        errors.time = 'Please select a time';
    }
    
    return errors;
}

// Show form errors
function showFormErrors(errors) {
    // Clear all previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    // Show new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.querySelector(`#${field} + .form-error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
            errorElement.classList.add('show');
        }
    });
}

// Enhanced Booking Form Handler
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        date: formData.get('date'),
        time: formData.get('time'),
        message: formData.get('message')
    };
    
    // Validate form
    const errors = validateForm(bookingData);
    if (Object.keys(errors).length > 0) {
        showFormErrors(errors);
        return;
    }
    
    // Clear any existing errors
    showFormErrors({});
    
    // Show loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call
        await simulateBooking(bookingData);
        
        // Show success message
        showNotification('Appointment booked successfully! We will contact you soon.', 'success');
        bookingForm.reset();
        
        // Scroll to top of form
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } catch (error) {
        showNotification('Failed to book appointment. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Reset form button
resetBtn.addEventListener('click', () => {
    bookingForm.reset();
    showFormErrors({});
    showNotification('Form has been reset', 'info');
});

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
                  type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
                  '<i class="fas fa-info-circle"></i>'}
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        min-width: 350px;
        padding: 0;
        border-radius: 12px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    `;

    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #28a745, #20c997)',
        error: 'linear-gradient(135deg, #dc3545, #c82333)',
        info: 'linear-gradient(135deg, #17a2b8, #138496)'
    };
    
    notification.style.background = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 6 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 6000);
}

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            
            // Add staggered animation for service cards
            if (entry.target.classList.contains('service-card')) {
                const cards = Array.from(entry.target.parentElement.children);
                const index = cards.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .about-text, .contact-form');
    elementsToAnimate.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
});

// Booking Form Handler
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const bookingData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        date: formData.get('date'),
        time: formData.get('time'),
        message: formData.get('message')
    };

    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }

    // Show loading state
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;

    try {
        // Simulate API call (replace with actual booking system)
        await simulateBooking(bookingData);
        
        // Show success message
        showNotification('Appointment booked successfully! We will contact you soon.', 'success');
        bookingForm.reset();
        
    } catch (error) {
        showNotification('Failed to book appointment. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Newsletter Form Handler
newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    const submitBtn = newsletterForm.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    try {
        // Simulate API call
        await simulateNewsletterSubscription(email);
        
        showNotification('Successfully subscribed to newsletter!', 'success');
        newsletterForm.reset();
        
    } catch (error) {
        showNotification('Failed to subscribe. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Form Validation Functions
function validateBookingForm(data) {
    if (!data.name || data.name.trim().length < 2) {
        showNotification('Please enter your full name.', 'error');
        return false;
    }

    if (!validateEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    if (!validatePhone(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }

    if (!data.service) {
        showNotification('Please select a service.', 'error');
        return false;
    }

    if (!data.date) {
        showNotification('Please select a date.', 'error');
        return false;
    }

    // Check if date is in the future
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Please select a future date.', 'error');
        return false;
    }

    if (!data.time) {
        showNotification('Please select a time.', 'error');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;

    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #17a2b8, #138496)';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Simulate API calls (replace with actual backend integration)
async function simulateBooking(bookingData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({ success: true, bookingId: 'BK' + Date.now() });
            } else {
                reject(new Error('Booking failed'));
            }
        }, 1500);
    });
}

async function simulateNewsletterSubscription(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() > 0.05) {
                resolve({ success: true, email: email });
            } else {
                reject(new Error('Subscription failed'));
            }
        }, 1000);
    });
}

// Gallery Lightbox (for future implementation)
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // This would open a lightbox with the full image
            // For now, just show a notification
            showNotification('Gallery lightbox feature coming soon!', 'info');
        });
    });
}

// Service Cards Animation
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Testimonial Slider (optional enhancement)
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateServiceCards();
    initGalleryLightbox();
    
    // Set minimum date for booking form to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Performance optimization - Debounce scroll events
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations can go here
}, 10));

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Console welcome message
console.log('%c🌸 Welcome to Rawaiee Beauty Salon Website! 🌸', 'color: #d4a574; font-size: 20px; font-weight: bold;');
