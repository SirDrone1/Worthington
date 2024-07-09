const texts = [
    "سعادة وأستمتاع بلا حدود",
    "ورثينغتون أفضل مما تتوقع",
    "بوابتك لتكون ملكي",
    "حيث يتجسد الأبداع والتميّز"
];
const typingTextElement = document.getElementById('typing-text');
const dotsElement = document.getElementById('dots');
const typingSpeed = 40;
const deletingSpeed = 40;
const pauseDuration = 500;

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function type() {
    const text = texts[currentTextIndex];
    if (!isDeleting) {
        if (currentCharIndex < text.length) {
            typingTextElement.textContent += text.charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(type, typingSpeed);
        } else {
            dotsElement.style.opacity = 0.5;
            setTimeout(() => {
                isDeleting = true;
                type();
            }, pauseDuration);
        }
    } else {
        if (currentCharIndex > 0) {
            typingTextElement.textContent = text.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(type, deletingSpeed);
        } else {
            dotsElement.style.opacity = 1;
            isDeleting = false;
            currentCharIndex = 0;
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            setTimeout(type, pauseDuration);
        }
    }
}

type();

function showLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'flex';
    document.getElementById('content').classList.add('hidden');
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('content').classList.remove('hidden');
}

window.addEventListener('load', function() {
    hideLoadingScreen();

    var delayedImage = document.getElementById('delayed-image');

    delayedImage.addEventListener('loadstart', showLoadingScreen);

    delayedImage.addEventListener('load', hideLoadingScreen);

    delayedImage.addEventListener('error', hideLoadingScreen);
});
