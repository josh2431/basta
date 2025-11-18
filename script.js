// === GLOBAL ELEMENTS ===
const storyBox = document.querySelector(".story");
const noteBox = document.getElementById("note");
const meterFill = document.getElementById("meter-fill");
const meterPercent = document.getElementById("meter-percent");
const memoryGallery = document.getElementById("memory-gallery");
const loveLetter = document.getElementById("love-letter");

let affection = 22; // starting value

// === HEART RAIN ===
const btnHearts = document.getElementById("btn-hearts");
btnHearts.addEventListener("click", () => {
    for (let i = 0; i < 15; i++) createHeart();
    increaseMeter(100);
    showMessage("Hearts coming your way! 💖");
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    const size = Math.random() * 25 + 20;
    const x = Math.random() * window.innerWidth;
    const duration = Math.random() * 3 + 2;

    Object.assign(heart.style, {
        width: size + "px",
        height: size + "px",
        left: x + "px",
        top: "-40px",
        position: "fixed",
        opacity: "0.9",
        transition: `transform ${duration}s ease-out, opacity ${duration}s ease-out`
    });

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
        heart.style.transform = `translateY(${window.innerHeight + 120}px) rotate(-45deg)`;
        heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), duration * 1000);
}

// === REVEAL BUTTON ===
const btnReveal = document.getElementById("btn-reveal");
let revealed = false;

btnReveal.addEventListener("click", () => {
    if (revealed) return;
    revealed = true;

    noteBox.style.border = "2px solid #ff6b94";
    noteBox.style.background = "linear-gradient(135deg, #fff0f6, #ffe4f1)";
    noteBox.style.transition = "all 0.5s ease";

    noteBox.insertAdjacentHTML(
        "beforeend",
        `<p style="margin-top:12px;color:#ff6b94;font-weight:600;font-style:italic">I kept all of this because you matter to me — more than you could ever know.</p>`
    );

    btnReveal.disabled = true;
    btnReveal.innerText = "✨ Secret Revealed";
    btnReveal.style.background = "#e0e0e0";

    increaseMeter(100);
    showMessage("You discovered my secret thought! 💫");
});

// === MEMORIES BUTTON ===
const btnMemories = document.getElementById("btn-memories");
btnMemories.addEventListener("click", () => {
    memoryGallery.style.display = 'block';
    memoryGallery.scrollIntoView({ behavior: 'smooth' });
    increaseMeter(100);
    showMessage("These are just a few of the things I adore about you ✨");
});

// === LOVE LETTER BUTTON ===
const btnLoveLetter = document.createElement('button');
btnLoveLetter.className = 'btn ghost';
btnLoveLetter.innerHTML = '💌 Read my letter';
btnLoveLetter.addEventListener('click', () => {
    loveLetter.style.display = 'block';
    loveLetter.scrollIntoView({ behavior: 'smooth' });
    increaseMeter(100);
    showMessage("This comes straight from my heart 💖");
});

// Add love letter button after memories button
btnMemories.parentNode.insertBefore(btnLoveLetter, btnMemories.nextSibling);

// === CONFESSION MODAL ===
const btnConfess = document.getElementById("btn-confess");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");

btnConfess.addEventListener("click", () => {
    modal.classList.add("open");
    document.body.style.overflow = 'hidden';
    increaseMeter(100);
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("open");
    document.body.style.overflow = 'auto';
});

// Clicking outside closes modal
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("open");
        document.body.style.overflow = 'auto';
    }
});

// === CONFESSION RESPONSES ===
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const responseBox = document.getElementById("response");

// === COMPLIMENT BUTTON ===
const btnCompliment = document.getElementById("btn-compliment");
const compliments = [
    "You have the most beautiful heart 💖",
    "Your passion for life is inspiring ✨",
    "You make everything more fun 🎉",
    "Your kindness touches everyone around you 💫",
    "You're even more amazing than you realize 🌈",
    "Your laugh is my favorite sound 🎵",
    "You have a way of making people feel special 💝"
];

btnCompliment.addEventListener("click", () => {
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    showMessage(randomCompliment);
    increaseMeter(100);
    
    // Create floating compliment
    createFloatingText(randomCompliment);
});

function createFloatingText(text) {
    const floatingText = document.createElement("div");
    floatingText.textContent = text;
    floatingText.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 148, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1001;
        animation: floatUp 3s ease-out forwards;
        text-align: center;
        max-width: 80%;
        box-shadow: 0 10px 30px rgba(255, 107, 148, 0.3);
    `;
    
    document.body.appendChild(floatingText);
    
    setTimeout(() => {
        floatingText.remove();
    }, 3000);
}

// === MUSIC PLAYER (optional) ===
const btnPlay = document.getElementById("btn-play");
const btnStop = document.getElementById("btn-stop");
const musicInput = document.getElementById("music-link");
let iframe = null;

// Only attach music handlers when the controls exist on the page
if (btnPlay && btnStop && musicInput) {
    btnPlay.addEventListener("click", () => {
        const link = musicInput.value.trim();
        if (!link) {
            showMessage("Please paste a YouTube or Spotify link first 🎵");
            return;
        }

        let embed = convertToEmbed(link);

        if (!embed) {
            showMessage("Please use a YouTube or Spotify link that can be embedded");
            return;
        }

        if (iframe) iframe.remove();

        iframe = document.createElement("iframe");
        Object.assign(iframe, {
            width: "100%",
            height: "80",
            frameBorder: "0",
            allow: "autoplay",
            src: embed
        });

        // Add to playlist section (fail gracefully if playlist missing)
        const playlist = document.querySelector('.playlist');
        if (playlist) playlist.appendChild(iframe);
        
        showMessage("Music started! 🎶");
        increaseMeter(100);
    });

    btnStop.addEventListener("click", () => {
        if (iframe) {
            iframe.remove();
            iframe = null;
            showMessage("Music stopped ⏹️");
        }
    });
}

function convertToEmbed(url) {
    if (url.includes("youtube.com/watch?v="))
        return url.replace("watch?v=", "embed/") + "?autoplay=1";
    if (url.includes("youtu.be"))
        return `https://www.youtube.com/embed/${url.split("/").pop()}?autoplay=1`;
    if (url.includes("open.spotify.com/track"))
        return `https://open.spotify.com/embed/track/${url.split("/").pop()}`;
    if (url.includes("soundcloud.com"))
        return `https://w.soundcloud.com/player/?url=${url}&auto_play=true`;
    return null;
}

// === RESET (optional) ===
const btnReset = document.getElementById("btn-reset");
if (btnReset) {
    btnReset.addEventListener("click", () => {
        if (confirm("Start over from the beginning?")) {
            location.reload();
        }
    });
}

// === AFFECTION METER INCREASE ===
function increaseMeter(amount) {
    affection = Math.min(100, affection + amount);
    meterFill.style.width = affection + "%";
    meterPercent.textContent = affection + "%";
    
}

// === UTILITY FUNCTIONS ===
function showMessage(text, duration = 3000) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.floating-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement("div");
    message.className = "floating-message";
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--pink);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1001;
        box-shadow: 0 8px 25px rgba(255, 107, 148, 0.4);
        animation: slideDown 0.5s ease-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = "slideUp 0.5s ease-in forwards";
        setTimeout(() => message.remove(), 500);
    }, duration);
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { top: -50px; opacity: 0; }
        to { top: 20px; opacity: 1; }
    }
    
    @keyframes slideUp {
        from { top: 20px; opacity: 1; }
        to { top: -50px; opacity: 0; }
    }
    
    @keyframes floatUp {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        20% { transform: translate(-50%, -60%) scale(1.1); opacity: 1; }
        80% { transform: translate(-50%, -80%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -100%) scale(0.8); opacity: 0; }
    }
`;
document.head.appendChild(style);

// === INTERACTIVE ITEMS ===
// Generic interactive handler for SVG-based items (no emoji particles)
const interactiveNodes = Array.from(document.querySelectorAll('#interactive-items > div'));

const messages = {
    'interactive-cat': { msg: "Yey ORENJIII! Ang munting posa mo!", amount: 25 },
    'interactive-f1': { msg: "My favoite F1 fan ", amount: 25 },
    'interactive-fish': { msg: "You're as pretty as a Betta Fish.", amount: 20 },
    'interactive-hamster': { msg: "You're as cute as a Hamster.", amount: 20 },
    'interactive-flowers': { msg: "You know what this mean  ", amount: 20 }
};

interactiveNodes.forEach(node => {
    // make keyboard-activatable
    node.addEventListener('click', () => activateInteractive(node));
    node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateInteractive(node); }
    });
});

function activateInteractive(node) {
    const id = node.id;
    const meta = messages[id] || { msg: 'Nice!', amount: 15 };
    showMessage(meta.msg, 3000);
    increaseMeter(meta.amount);

    // create a few SVG clones that float away
    const svg = node.querySelector('svg');
    if (svg) {
        for (let i = 0; i < 4; i++) createFloatingClone(svg, node);
    }

    // item-specific extra effect
    if (id === 'interactive-f1') {
        // flash speed lines
        const speed = node.querySelector('.f1-speed-lines');
        if (speed) {
            speed.setAttribute('opacity', '1');
            speed.style.transition = 'opacity 420ms ease-out';
            setTimeout(() => { speed.style.opacity = '0'; speed.setAttribute('opacity', '0'); }, 420);
        }
    }

    if (id === 'interactive-cat') {
        // quick tail swish animation by toggling a class
        const tail = node.querySelector('.cat-tail');
        if (tail) {
            tail.style.transition = 'transform 360ms ease-out';
            tail.style.transform = 'rotate(25deg)';
            setTimeout(() => { tail.style.transform = ''; }, 360);
        }
    }

    if (id === 'interactive-flowers') {
        // Show a focused message at top
        showMessage('You know what this mean 💕', 2000);

        // Simple bloom animation on SVG container
        const svg = node.querySelector('.flowers-svg');
        if (svg) {
            svg.classList.add('flowers-bloom');
            setTimeout(() => svg.classList.remove('flowers-bloom'), 450);
        }

        // Create a localized popover that pops up near the flowers
        try {
            const rect = node.getBoundingClientRect();
            const popup = document.createElement('div');
            popup.className = 'flower-popup';
            popup.textContent = 'I love you ❤️';
            
            // Position above the flower, centered
            const centerX = rect.left + rect.width / 2;
            const topY = rect.top - 60; // position above the flowers
            
            popup.style.left = (centerX - 50) + 'px';
            popup.style.top = topY + 'px';
            
            document.body.appendChild(popup);
            
            // auto-remove after animation completes
            setTimeout(() => popup.remove(), 2200);
        } catch (e) {
            console.error('Popup error:', e);
        }
    }

    if (id === 'interactive-fish') {
        const finTop = node.querySelector('.fish-fin-top');
        const finBottom = node.querySelector('.fish-fin-bottom');
        if (finTop) {
            finTop.style.transformOrigin = 'center center';
            finTop.style.transition = 'transform 320ms ease-out';
            finTop.style.transform = 'rotate(18deg)';
        }
        if (finBottom) {
            finBottom.style.transformOrigin = 'center center';
            finBottom.style.transition = 'transform 320ms ease-out';
            finBottom.style.transform = 'rotate(-18deg)';
        }
        setTimeout(() => {
            if (finTop) finTop.style.transform = '';
            if (finBottom) finBottom.style.transform = '';
        }, 380);
    }

    if (id === 'interactive-hamster') {
        const tail = node.querySelector('.hamster-tail');
        const svg = node.querySelector('.hamster-svg');
        if (tail) {
            tail.style.transformOrigin = 'center center';
            tail.style.transition = 'transform 380ms ease-out';
            tail.style.transform = 'rotate(-25deg)';
        }
        if (svg) {
            svg.style.transition = 'transform 380ms ease-out';
            svg.style.transform = 'translateY(-6px)';
        }
        setTimeout(() => {
            if (tail) tail.style.transform = '';
            if (svg) svg.style.transform = '';
        }, 420);
    }
}

function createFloatingClone(svgNode, sourceNode) {
    try {
        const clone = svgNode.cloneNode(true);
        clone.classList.add('float-clone');
        // place at source center
        const rect = sourceNode.getBoundingClientRect();
        const startX = rect.left + rect.width / 2 - 24; // offset for 48px clone
        const startY = rect.top + rect.height / 2 - 24;
        clone.style.left = `${Math.max(8, startX + (Math.random() - 0.5) * 40)}px`;
        clone.style.top = `${Math.max(8, startY + (Math.random() - 0.5) * 30)}px`;
        // shrink inner shapes so clone is visually lighter
        clone.style.width = '48px';
        clone.style.height = '48px';
        clone.setAttribute('aria-hidden', 'true');
        document.body.appendChild(clone);
        // cleanup after animation
        clone.addEventListener('animationend', () => clone.remove());
        // safety removal
        setTimeout(() => { if (clone.parentNode) clone.remove(); }, 2600);
    } catch (err) { /* fail silently */ }
}

// === INITIAL MESSAGE ===
setTimeout(() => {
    showMessage("Welcome to this special place I made for you! 💖");
}, 1000);

// === MEMORY DROPDOWNS ===
function initMemoryUI() {
    const toggles = Array.from(document.querySelectorAll('.mem-toggle'));
    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const targetId = btn.getAttribute('aria-controls');
            const panel = document.getElementById(targetId);
            if (!panel) return;

            if (expanded) {
                btn.setAttribute('aria-expanded', 'false');
                panel.hidden = true;
            } else {
                btn.setAttribute('aria-expanded', 'true');
                panel.hidden = false;
                // ensure panel is visible and scrolled into view on small screens
                panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Read-more buttons -> open modal and display full-letter content
    const readButtons = Array.from(document.querySelectorAll('.read-more'));
    const letterModal = document.getElementById('letter-modal');
    const letterModalBody = document.getElementById('letter-modal-body');
    const letterModalTitle = document.getElementById('letter-modal-title');
    const letterClose = document.getElementById('letter-close');

    readButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const panel = btn.closest('.memory-letter');
            if (!panel) return;
            const full = panel.querySelector('.full-letter');
            // find the mem-toggle within the same memory-item container
            const container = panel.closest('.memory-item');
            const heading = container ? container.querySelector('.mem-toggle') : null;
            const titleText = heading ? heading.textContent.replace(/▾/g, '').trim() : 'Letter';

            if (full) {
                if (letterModalBody) letterModalBody.innerHTML = full.innerHTML;
                if (letterModalTitle) letterModalTitle.textContent = titleText;
                if (letterModal) {
                    letterModal.classList.add('open');
                    letterModal.setAttribute('aria-hidden', 'false');
                }
                document.body.style.overflow = 'hidden';
                // focus close for accessibility
                setTimeout(() => { if (letterClose) letterClose.focus(); }, 100);
            }
        });
    });

    // Close handlers for letter modal
    if (letterClose) {
        letterClose.addEventListener('click', () => {
            if (letterModal) {
                letterModal.classList.remove('open');
                letterModal.setAttribute('aria-hidden', 'true');
            }
            document.body.style.overflow = 'auto';
        });
    }

    // click outside to close
    if (letterModal) {
        letterModal.addEventListener('click', (ev) => {
            if (ev.target === letterModal) {
                letterModal.classList.remove('open');
                letterModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Escape to close
    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && letterModal && letterModal.classList.contains('open')) {
            letterModal.classList.remove('open');
            letterModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMemoryUI);
} else {
    // DOM already ready — initialize immediately
    initMemoryUI();
}

