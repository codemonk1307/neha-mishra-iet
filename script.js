// ===========================
// Initialize AOS (Animate On Scroll)
// ===========================
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// ===========================
// Navbar Scroll Effect
// ===========================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 249, 245, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 249, 245, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// ===========================
// Smooth Scrolling for Navigation Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Typewriter Effect
// ===========================
const typewriterTexts = [
    'Software Engineer @ Arcesium',
    'Cloud Architecture Enthusiast',
    'Machine Learning Explorer',
    'Passionate Painter',
    'Stand-up Comedian',
    'Literature Devotee',
    'Hackathon Champion',
    'An Artist in Disguise'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeWriter() {
    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        setTimeout(typeWriter, 500);
    } else {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeWriter, speed);
    }
}

// Start typewriter effect
typeWriter();

// ===========================
// Particle Canvas Background
// ===========================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(212, 136, 106, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===========================
// Active Navigation Highlighting
// ===========================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Achievement Cards Animation
// ===========================
const achievementCards = document.querySelectorAll('.achievement-card');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInScale 0.6s ease forwards';

            // Add number counting animation for ranks
            const rankElement = entry.target.querySelector('.achievement-rank');
            if (rankElement) {
                const finalNumber = parseInt(rankElement.textContent.replace('#', ''));
                animateNumber(rankElement, finalNumber);
            }
        }
    });
}, observerOptions);

achievementCards.forEach(card => {
    achievementObserver.observe(card);
});

// ===========================
// Number Counter Animation
// ===========================
function animateNumber(element, finalNumber) {
    let currentNumber = 0;
    const increment = finalNumber / 30;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        element.textContent = '#' + Math.floor(currentNumber);
    }, 50);
}

// ===========================
// Book Cards Hover Effect
// ===========================
const bookCards = document.querySelectorAll('.book-card');

bookCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(-1deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// ===========================
// Skills Progress Animation
// ===========================
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => {
    skillObserver.observe(card);
});

// ===========================
// Gallery Lightbox Effect
// ===========================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-lightbox">&times;</span>
                <div class="lightbox-image">
                    <p>Painting ${index + 1}</p>
                    <div style="width: 400px; height: 400px; background: linear-gradient(135deg, #FAE5D3, #E8B4A0); border-radius: 20px;"></div>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);

        // Add lightbox styles
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
            }
            .close-lightbox {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 30px;
                cursor: pointer;
                color: #333;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Close lightbox
        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.remove();
            style.remove();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                style.remove();
            }
        });
    });
});

// ===========================
// Timeline Animation
// ===========================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// ===========================
// Loader
// ===========================
window.addEventListener('load', () => {
    // Create loader
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <h2 style="font-family: 'Playfair Display', serif; color: #D4886A; margin-bottom: 20px;">Welcome</h2>
            <div class="loader-dots">
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
            </div>
        </div>
    `;

    document.body.appendChild(loader);

    // Remove loader after 1.5 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// ===========================
// Parallax Effect for Hero Section
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ===========================
// Mouse Follow Effect for Hero
// ===========================
const heroSection = document.querySelector('.hero-section');

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });
}

// ===========================
// Random Quote Display
// ===========================
const quotes = [
    "Code is poetry written in logic",
    "Every bug is a lesson in disguise",
    "Art is the algorithm of the soul",
    "Where creativity meets computation",
    "Painting pixels and debugging dreams"
];

function displayRandomQuote() {
    const quoteElements = document.querySelectorAll('.random-quote');
    quoteElements.forEach(element => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        element.textContent = randomQuote;
    });
}

// Call on load
displayRandomQuote();

// ===========================
// Form Validation (if contact form is added)
// ===========================
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add form validation logic here
        const formData = new FormData(contactForm);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = 'Message sent successfully!';
        contactForm.appendChild(successMessage);

        // Reset form
        contactForm.reset();

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    });
}

// ===========================
// Console Easter Egg
// ===========================
console.log('%c Welcome to Neha\'s Digital Canvas! ',
    'background: linear-gradient(135deg, #D4886A, #E8B4A0); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Where code meets creativity, and bugs become features! ',
    'color: #D4886A; font-size: 14px; font-style: italic;');

// ===========================
// Dynamic Copyright Year
// ===========================
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
});