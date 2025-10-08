// main/static/main/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // FORMULAIRE DE CONTACT (validation)
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            // Validation basique
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs');
                return;
            }
            
            // Créer le message WhatsApp personnalisé
            const whatsappMessage = `Bonjour NOVACOM,\n\nNom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(url, '_blank');
        });
    }

    
    // ============================================
    // LAZY LOADING DES IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    backToTop.className = 'fixed bottom-8 right-8 bg-novacom-yellow text-novacom-blue p-4 rounded-full shadow-lg hover:bg-yellow-400 transition opacity-0 pointer-events-none z-40';
    backToTop.id = 'back-to-top';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    
    // ============================================
    // HOVER EFFECTS POUR LES CARTES
    // ============================================
    const cards = document.querySelectorAll('.hover-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    
    // ============================================
    // COPIER EMAIL AU CLIC
    // ============================================
    const emailElements = document.querySelectorAll('[data-email]');
    
    emailElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function() {
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Afficher notification
                showNotification('Email copié dans le presse-papier!');
            });
        });
    });

    
    // ============================================
    // SYSTÈME DE NOTIFICATIONS
    // ============================================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all transform translate-x-full ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-semibold`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animation de sortie
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    
    // ============================================
    // PARALLAX EFFECT (optionnel)
    // ============================================
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    
    // ============================================
    // PRELOADER (optionnel)
    // ============================================
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    
    // ============================================
    // TYPING EFFECT POUR LE HERO
    // ============================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    const typingElement = document.querySelector('[data-typing]');
    if (typingElement) {
        const text = typingElement.textContent;
        typeWriter(typingElement, text);
    }

    
    // ============================================
    // RECHERCHE DE RÉALISATIONS (si nécessaire)
    // ============================================
    const searchInput = document.getElementById('search-realisations');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const items = document.querySelectorAll('[data-searchable]');
            
            items.forEach(item => {
                const title = item.getAttribute('data-title').toLowerCase();
                const description = item.getAttribute('data-description').toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    
    // ============================================
    // ANALYTICS (Google Analytics, Facebook Pixel, etc.)
    // ============================================
    function trackEvent(category, action, label) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', action, {
                category: category,
                label: label
            });
        }
        
        console.log('Event tracked:', category, action, label);
    }
    
    // Tracker les clics sur WhatsApp
    document.querySelectorAll('[data-whatsapp]').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Contact', 'WhatsApp Click', 'Contact Button');
        });
    });
    
    // Tracker les vues de réalisations
    const realisationCards = document.querySelectorAll('[data-realisation]');
    const realisationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('tracked')) {
                const title = entry.target.getAttribute('data-title');
                trackEvent('Realisations', 'View', title);
                entry.target.classList.add('tracked');
            }
        });
    }, { threshold: 0.5 });
    
    realisationCards.forEach(card => realisationObserver.observe(card));

    
    // ============================================
    // CONSOLE MESSAGE (Branding)
    // ============================================
    console.log('%c🚀 NOVACOM', 'color: #FDB913; font-size: 30px; font-weight: bold;');
    console.log('%cL\'Innovation au Service du Commerce', 'color: #1e3a8a; font-size: 14px;');
    console.log('%cVous cherchez à rejoindre notre équipe ? Contactez-nous !', 'color: #666; font-size: 12px;');
    console.log('%ccontact@novacom.cm', 'color: #FDB913; font-size: 12px; font-weight: bold;');

});


// ============================================
// UTILITAIRES GLOBAUX
// ============================================

// Fonction pour formater les dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Fonction pour tronquer le texte
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Fonction pour valider l'email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Fonction pour detecter le device
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Exporter les utilitaires si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        truncateText,
        isValidEmail,
        isMobile
    };
}
    // CONFIGURATION
    // ============================================
    const WHATSAPP_NUMBER = '237698794158'; // À MODIFIER
    const WHATSAPP_MESSAGE = 'Bonjour NOVACOM, je souhaite obtenir plus d\'informations sur vos services.';
    
    
    // ============================================
    // NAVIGATION MOBILE
    // ============================================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });

        // Fermer le menu lors du clic sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });
    }

    
    // ============================================
    // SMOOTH SCROLL POUR LES ANCRES
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // ============================================
    // CONTACT WHATSAPP
    // ============================================
    function openWhatsApp() {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
        window.open(url, '_blank');
    }

    // Attacher la fonction aux boutons WhatsApp
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', openWhatsApp);
    });

    
    // ============================================
    // ANIMATIONS AU SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Optionnel: arrêter d'observer après l'animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Ajouter ombre au scroll
        if (currentScroll > 10) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.add('shadow-md');
        }
        
        lastScroll = currentScroll;
    });

    
    // ============================================
    // COMPTEURS ANIMÉS (pour les statistiques)
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // Observer pour les compteurs
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    // Appliquer l'observer aux compteurs
    document.querySelectorAll('[data-counter]').forEach(counter => {
        counterObserver.observe(counter);
    });

    
    // ============================================
    // GALERIE D'IMAGES (Lightbox simple)
    // ============================================
    const galleryImages = document.querySelectorAll('[data-gallery]');
    
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    function openLightbox(src, alt) {
        // Créer le lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
        lightbox.innerHTML = `
            <div class="relative max-w-5xl w-full">
                <button class="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300">&times;</button>
                <img src="${src}" alt="${alt}" class="w-full h-auto rounded-lg">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Fermer au clic
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.tagName === 'BUTTON') {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
        });
    }

    
    // ============================================
    // FILTRES DES RÉALISATIONS (Animation)
    // ============================================
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation de sortie
            const items = document.querySelectorAll('[data-category]');
            items.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
            });
            
            // Rediriger après l'animation
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });

    
    // ============================================