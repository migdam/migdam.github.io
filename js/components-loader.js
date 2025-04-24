/**
 * Simplified Component Loader for M-Infinity Website
 * Ultra-reliable approach that loads all content in one go
 */

// Component configuration with combined files to reduce HTTP requests
const components = [
    { id: 'header-container', path: 'components/header-hero-combined.html' },
    { id: 'about-container', path: 'components/about-services-combined.html' },
    { id: 'projects-container', path: 'components/projects.html' },
    { id: 'stats-container', path: 'components/stats.html' },
    { id: 'bio-container', path: 'components/bio.html' },
    { id: 'articles-container', path: 'components/articles.html' },
    { id: 'cta-container', path: 'components/cta.html' },
    { id: 'contact-container', path: 'components/contact.html' },
    { id: 'footer-container', path: 'components/footer-combined.html' }
];

// Simple function to load a component
async function loadComponent(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error loading ${filePath}: ${response.status}`);
        }
        
        const html = await response.text();
        const container = document.getElementById(containerId);
        
        if (container) {
            // Remove placeholder class
            container.classList.remove('component-placeholder');
            
            // Insert the HTML
            container.innerHTML = html;
            
            // Special handling for combined components
            if (filePath === 'components/header-hero-combined.html') {
                // Mark hero as loaded
                const heroContainer = document.getElementById('hero-container');
                if (heroContainer) {
                    heroContainer.removeAttribute('style');
                }
            } else if (filePath === 'components/about-services-combined.html') {
                // Mark services as loaded
                const servicesContainer = document.getElementById('services-container');
                if (servicesContainer) {
                    servicesContainer.removeAttribute('style');
                }
            } else if (filePath === 'components/footer-combined.html') {
                // Mark UI elements as loaded
                const uiElementsContainer = document.getElementById('ui-elements-container');
                if (uiElementsContainer) {
                    uiElementsContainer.removeAttribute('style');
                }
            }
            
            // Run any scripts in the component
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = script.textContent;
                script.parentNode.replaceChild(newScript, script);
            });
            
            return true;
        } else {
            console.warn(`Container #${containerId} not found in the document.`);
            return false;
        }
    } catch (error) {
        console.error(`Failed to load component ${containerId}:`, error);
        return false;
    }
}

// Load all components at once - simple and reliable
async function loadAllComponents() {
    // Show a small loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'component-loading-indicator';
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '0';
    loadingIndicator.style.left = '0';
    loadingIndicator.style.width = '0%';
    loadingIndicator.style.height = '3px';
    loadingIndicator.style.backgroundColor = '#0070f3';
    loadingIndicator.style.zIndex = '9999';
    loadingIndicator.style.transition = 'width 0.3s ease-out';
    document.body.appendChild(loadingIndicator);
    
    try {
        // Load components one by one to maintain order
        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            await loadComponent(component.id, component.path);
            
            // Update loading indicator
            const progress = Math.round(((i + 1) / components.length) * 100);
            loadingIndicator.style.width = `${progress}%`;
        }
        
        // Fade out loading indicator
        setTimeout(() => {
            loadingIndicator.style.opacity = '0';
            setTimeout(() => {
                if (loadingIndicator.parentNode) {
                    loadingIndicator.parentNode.removeChild(loadingIndicator);
                }
            }, 300);
        }, 400);
        
        // Initialize components
        initializeComponents();
        
    } catch (error) {
        console.error('Error loading components:', error);
        if (loadingIndicator.parentNode) {
            loadingIndicator.parentNode.removeChild(loadingIndicator);
        }
    }
}

// Initialize component functionality
function initializeComponents() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.setAttribute(
                'aria-expanded', 
                mobileMenuBtn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }
    
    // Initialize any other components that need JavaScript functionality
    
    // If main.js has a function to run after components are loaded, call it
    if (typeof initAfterComponentsLoaded === 'function') {
        initAfterComponentsLoaded();
    }
}

// Start loading components when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    // DOM already loaded, start immediately
    loadAllComponents();
}
