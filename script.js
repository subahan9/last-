// Typewriter effect with mobile optimization
const typewriterText = "Many, many more happy returns of the day, my cute “DADDY”!I am the most blessed son in the world to have a father like you.";
const typewriterElement = document.getElementById('typewriter');
let index = 0;

function typeWriter() {
    if (index < typewriterText.length) {
        typewriterElement.innerHTML += typewriterText.charAt(index);
        index++;
        // Adjust speed based on device (mobile vs desktop)
        const delay = window.innerWidth < 768 ? 80 : 100;
        setTimeout(typeWriter, delay);
    }
}

// Prevent zoom on double-tap (mobile)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Show scene2 and start typewriter after SVG animation (4-5s), then hide scene1
window.addEventListener('load', () => {
    // Ensure viewport is properly set
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        const scene1 = document.getElementById('scene1');
        const scene2 = document.getElementById('scene2');
        
        if (scene1) scene1.style.display = 'none';
        if (scene2) scene2.style.display = 'flex';
        
        typeWriter();
    }, 4000);
});

// Button click to show decorations and then next scene
const celebrateBtn = document.getElementById('celebrate-btn');
const decorations = document.getElementById('decorations');
let celebrationDone = false;
let scene3Viewed = false;

if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
        if (!celebrationDone) {
            // Show decorations
            if (decorations) {
                decorations.classList.remove('hidden');
                decorations.classList.add('show');
            }
            celebrateBtn.textContent = 'Next';
            celebrationDone = true;
        } else if (!scene3Viewed) {
            // Transition to scene3
            const scene2 = document.getElementById('scene2');
            const scene3 = document.getElementById('scene3');
            
            if (scene2) scene2.style.display = 'none';
            if (scene3) {
                scene3.style.display = 'flex';
                // Show the "Final Message" button inside scene3
                if (nextToEndingBtn) nextToEndingBtn.style.display = 'inline-block';
            }
            
            scene3Viewed = true;
            celebrateBtn.textContent = 'Final Message';
            
            // Initialize Swiper after showing scene3
            initializeSwiper();
        } else {
            // Transition to scene4 (final scene)
            const scene3 = document.getElementById('scene3');
            const scene4 = document.getElementById('scene4');
            
            if (scene3) scene3.style.display = 'none';
            if (nextToEndingBtn) nextToEndingBtn.style.display = 'none';
            if (scene4) scene4.style.display = 'flex';
            
            // Hide the button on final scene
            celebrateBtn.style.display = 'none';
        }
    });
}

// Handle next to ending button (scene3 to scene4)
const nextToEndingBtn = document.getElementById('next-to-ending-btn');
if (nextToEndingBtn) {
    nextToEndingBtn.addEventListener('click', () => {
        const scene3 = document.getElementById('scene3');
        const scene4 = document.getElementById('scene4');
        
        if (scene3) scene3.style.display = 'none';
        if (scene4) scene4.style.display = 'flex';
    });
}

// Initialize Swiper with mobile-optimized settings
function initializeSwiper() {
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper library not loaded');
        return;
    }

    const swiper = new Swiper('.memories-swiper', {
        effect: 'cards',
        grabCursor: true,
        touchRatio: 1,
        touchAngle: 45,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Mobile-specific settings
        speed: 300,
        spaceBetween: 10,
        initialSlide: 0,
    });
}

// Prevent body scroll on mobile during transitions
function disableScroll() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
}

// Handle viewport changes
window.addEventListener('orientationchange', () => {
    // Recalculate layout on orientation change
    setTimeout(() => {
        window.scrollTo(0, 0);
        if (typeof Swiper !== 'undefined') {
            const swipers = document.querySelectorAll('.swiper');
            swipers.forEach(el => {
                if (el.swiper) {
                    el.swiper.update();
                }
            });
        }
    }, 500);
});

// Prevent horizontal scrolling
// Use a non-passive listener and guard `closest` to avoid errors on text nodes
document.addEventListener('touchmove', (event) => {
    const touch = event.touches && event.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX;

    // If this is likely a horizontal movement
    if (Math.abs(deltaX) > 10) {
        // Ensure target is an Element before calling closest
        const targetEl = event.target instanceof Element ? event.target : (event.target && event.target.parentElement) || null;
        if (!targetEl || (!targetEl.closest('.swiper') && !targetEl.closest('.swiper-wrapper'))) {
            // Not in a swiper area: prevent horizontal scroll
            event.preventDefault();
        }
    }
}, { passive: false });

// Disable zoom on mobile
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
}, false);

// Handle window resize
window.addEventListener('resize', () => {
    // Prevent layout shift
    const currentScroll = window.scrollY;
    window.scrollTo(0, currentScroll);
});
