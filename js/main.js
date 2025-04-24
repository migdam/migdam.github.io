/**
 * Main JavaScript for M-Infinity Website
 * Optimized for performance
 */

// Lightweight initialization that runs immediately
(function() {
    // Set up preloader if it exists in the page
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 300);
        });
    }
    
    // Set up smooth scrolling for internal links in navigation
    // This will work even before all components are loaded
    document.addEventListener('click', function(e) {
        // Find closest anchor element
        let anchor = e.target;
        while (anchor && anchor.tagName !== 'A') {
            anchor = anchor.parentElement;
            if (!anchor) break;
        }
        
        if (anchor && anchor.getAttribute('href') && anchor.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        }
    });
})();

// Functions that will be initialized once components are loaded
function initAfterComponentsLoaded() {
    // Initialize cookie consent if loaded
    initCookieConsent();
    
    // Initialize project tabs if loaded
    initProjectTabs();
    
    // Initialize contact form if loaded
    initContactForm();
    
    // Update copyright year
    updateCopyrightYear();
    
    // Initialize stats counter if visible
    initStatsCounter();
}

// Initialize cookie consent
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const cookieSettings = document.getElementById('cookieSettings');
    
    if (cookieConsent && acceptCookies) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            // Show cookie consent after a short delay
            setTimeout(function() {
                cookieConsent.classList.add('active');
            }, 1000);
            
            // Handle accept button
            acceptCookies.addEventListener('click', function() {
                localStorage.setItem('cookiesAccepted', 'true');
                cookieConsent.classList.remove('active');
            });
            
            // Handle settings button
            if (cookieSettings) {
                cookieSettings.addEventListener('click', function() {
                    // Here you would typically open a cookie settings modal
                    // For now, just accept all cookies
                    localStorage.setItem('cookiesAccepted', 'true');
                    cookieConsent.classList.remove('active');
                    alert('Cookie settings would open here. For this demo, all cookies are accepted.');
                });
            }
        }
    }
}

// Initialize project tabs
function initProjectTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabLinks.length > 0 && tabPanels.length > 0) {
        tabLinks.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                tabLinks.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Show corresponding panel
                const panelId = this.getAttribute('aria-controls');
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                document.getElementById(panelId).classList.add('active');
            });
        });
    }
}

// Initialize contact form validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formFields = {
                name: { element: document.getElementById('name'), errorElement: document.getElementById('name-error') },
                email: { element: document.getElementById('email'), errorElement: document.getElementById('email-error') },
                subject: { element: document.getElementById('subject'), errorElement: document.getElementById('subject-error') },
                message: { element: document.getElementById('message'), errorElement: document.getElementById('message-error') }
            };
            
            // Validate each field
            for (const field in formFields) {
                const { element, errorElement } = formFields[field];
                if (!element || !errorElement) continue;
                
                if (!element.value.trim()) {
                    isValid = false;
                    errorElement.textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
                    element.classList.add('error');
                } else if (field === 'email' && !isValidEmail(element.value)) {
                    isValid = false;
                    errorElement.textContent = 'Please enter a valid email address';
                    element.classList.add('error');
                } else {
                    errorElement.textContent = '';
                    element.classList.remove('error');
                }
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, just show a success message
                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thanks for reaching out. We'll get back to you shortly.</p>
                `;
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
            }
        });
        
        // Add input event handlers to clear errors
        for (const field of ['name', 'email', 'subject', 'message']) {
            const element = document.getElementById(field);
            const errorElement = document.getElementById(`${field}-error`);
            
            if (element && errorElement) {
                element.addEventListener('input', function() {
                    errorElement.textContent = '';
                    element.classList.remove('error');
                });
            }
        }
    }
}

// Update copyright year
function updateCopyrightYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Initialize stats counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const counter = parseInt(el.getAttribute('data-counter'), 10);
                    const prefix = el.getAttribute('data-prefix') || '';
                    const suffix = el.getAttribute('data-suffix') || '';
                    
                    let current = 0;
                    const increment = counter / 30; // Divide animation into fewer steps for performance
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= counter) {
                            current = counter;
                            clearInterval(timer);
                        }
                        el.textContent = `${prefix}${Math.round(current)}${suffix}`;
                    }, 40);
                    
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
}

// Helper function to validate email format
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
