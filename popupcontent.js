const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),
    popup: document.getElementById("popup")
};

const texts = [
    "He finds her alone in a secluded garden, moonlight filtering through the leaves, casting a silvery glow. Heart pounding, he approaches, the poem carefully folded in his hand.",
    "“Shubhi,” he calls softly, his voice barely above a whisper. She turns, surprise flickering in her eyes.",
    "With a slight bow, he takes a step closer. “I’ve written something for you,” he says, the weight of his words hanging in the air.",
    "He unfolds the paper slowly, revealing the carefully crafted lines, his gaze never leaving hers.",
    "And he read...",
    `Softly, your laughter dances through the air,<br>
    Heart of light in shadows deep and rare.<br>
    Unveiling secrets with a single glance,<br>
    Beauty like the stars that dare to prance.<br>
    Holding the warmth of a thousand suns,<br>
    In your presence, the darkest night becomes undone.`,
    ""
];

const morphTime = 2;
const baseCooldownTime = 4;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let isAnimating = true;

elts.text1.innerHTML = texts[textIndex % texts.length];// textcontent skips html tags
elts.text2.innerHTML = texts[(textIndex + 1) % texts.length];

let cooldown = baseCooldownTime;

// Event listeners for hold to pause functionality on the popup
elts.popup.addEventListener('mousedown', pauseAnimation);
document.addEventListener('mouseup', resumeAnimation);

function pauseAnimation() {
    isAnimating = false; // Stop the animation
}

function resumeAnimation() {
    if (!isAnimating) {
        isAnimating = true; // Resume animation
        setTimeout(()=>{
            animate()
        }, 500); // Restart the animation if it was paused
    }
}

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = baseCooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.innerHTML = texts[textIndex % texts.length];
    elts.text2.innerHTML = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    if (!isAnimating) return; // Exit if not animating

    animationFrameId = requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;
 
    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

// Function to stop animation
function stopAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// Popup
const moonPopup = document.querySelector('.moon');
const popup = document.getElementById('popup');
const computedStyle = window.getComputedStyle(popup);
const overlay = document.getElementById('overlay');


// Open the popup when the moon is clicked
moonPopup.addEventListener('click', () => {
    popup.classList.add('show');
    overlay.style.display = 'block';

    setTimeout(()=>{         
        animate();
    }, 1000);    
});

// Close popup when clicking outside of it
document.addEventListener('click', (event) => {
    if (!popup.contains(event.target) && !moonPopup.contains(event.target)) {
        popup.classList.remove('show');
        overlay.style.display = 'none';
        stopAnimation();
    }
});