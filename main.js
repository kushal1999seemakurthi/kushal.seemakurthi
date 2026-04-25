// Custom Cursor
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

// Hero Interactive specific
const heroInteractive = document.getElementById("hero-interactive");

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Check if hovering interactive element
    const hoverTarget = e.target.closest('a, button, .work-card, .post-card');
    if (hoverTarget) {
        document.body.classList.add('hovering');
    } else {
        document.body.classList.remove('hovering');
    }

    if (heroInteractive) {
        const rect = heroInteractive.getBoundingClientRect();
        // Calculate mouse position relative to hero, in percentage
        const xPercent = ((mouseX - rect.left) / rect.width) * 100;
        const yPercent = ((mouseY - rect.top) / rect.height) * 100;
        heroInteractive.style.setProperty('--mouse-x', `${xPercent}%`);
        heroInteractive.style.setProperty('--mouse-y', `${yPercent}%`);
    }
});

function animateCursor() {
    // Dot follows immediately
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    
    // Ring follows with easing
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    
    requestAnimationFrame(animateCursor);
}
if (window.innerWidth > 768) {
    animateCursor();
}

// Navbar scroll styles
const navbar = document.getElementById('navbar');
const skipIntro = document.getElementById('skip-intro');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Deep Dive Hero Scroll
const heroSection = document.getElementById('hero-section');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768 && heroSection && heroContent) {
        const scrollY = window.scrollY;
        const wh = window.innerHeight;
        
        if (scrollY < wh) {
            // Zoom in effect
            // We use Math.pow to make it start slow and accelerate as we scroll down
            const progress = scrollY / wh;
            const scale = 1 + Math.pow(progress, 2) * 8; // Scales up significantly
            const opacity = 1 - (progress * 1.5);
            const yOffset = scrollY * 0.2; 
            
            heroContent.style.transform = `translateY(${yOffset}px) scale(${scale})`;
            heroContent.style.opacity = Math.max(0, opacity);
            heroContent.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto';
        }
    }
});

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// 3D Tilt Effect for Cards
const tiltCards = document.querySelectorAll('.impact-card, .work-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.zIndex = "10";
        
        // Dynamic glare/shadow based on mouse position
        const shadowX = rotateY * -1.5;
        const shadowY = rotateX * -1.5;
        card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(240, 210, 100, 0.15), 0 0 0 1px rgba(240, 210, 100, 0.5)`;
        card.style.borderColor = 'transparent';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.zIndex = "1";
        card.style.boxShadow = 'none';
        card.style.borderColor = `var(--border)`;
    });
});

// Metric Cards Count-up Animation
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const valEl = entry.target;
            const finalVal = parseFloat(valEl.getAttribute('data-val'));
            const prefix = valEl.getAttribute('data-prefix') || '';
            const suffix = valEl.getAttribute('data-suffix') || '';
            
            let start = 0;
            const duration = 1500; // ms
            const startTime = performance.now();
            
            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(1, elapsed / duration);
                
                // easeOutQuad
                const easing = progress * (2 - progress);
                const current = start + (finalVal - start) * easing;
                
                // format
                let displayVal = finalVal % 1 === 0 ? Math.round(current) : current.toFixed(1);
                valEl.innerText = `${prefix}${displayVal}${suffix}`;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    valEl.innerText = `${prefix}${finalVal}${suffix}`;
                }
            }
            requestAnimationFrame(updateCount);
            
            metricObserver.unobserve(valEl);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-value').forEach(el => {
    metricObserver.observe(el);
});
