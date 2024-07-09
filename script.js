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

function searchForWords() {
    const button = document.getElementById('search-button');
    const buttonText = button.querySelector('.button-text');

    const searchTerms = {
        input1: ["التفريق", "تفريق"],
        input2: ["غير واقعي", "خارق عن الطبيعة", "خارق عن الطبيعه", "غير واقعية", "غير واقعيه"],
        input3: ["هروب", "الهروب"],
        input4: ["بالمركبة", "بالمركبه"],
        input5: ["شخص", "قتل", "بدون سبب"],
        input6: ["إعدام", "اعدام", "أعدام", "من قبل ", "أدمن", "ادمن", "مشرف"],
    };

    let notifications = [];

    for (let i = 1; i <= 6; i++) {
        const input = document.getElementById(`input${i}`);
        const terms = searchTerms[`input${i}`];
        let found = false;
        for (const term of terms) {
            if (input.value.includes(term)) {
                found = true;
                notifications.push({
                    term: term,
                    message: `لقد نجحت!`
                });
                break;
            }
        }
        if (!found) {
            notifications.push({
                term: terms.join(' or '),
                message: `لقد فشلت!`
            });
        }
    }

    const notification = document.getElementById('notification');
    const overlay = document.getElementById('overlay');
    const failureNotifications = notifications.filter(n => n.message.includes('فشلت'));

    if (failureNotifications.length > 0) {
        const firstFailure = failureNotifications[0];
        notification.querySelector('.icon').textContent = '❌';
        notification.querySelector('.message').textContent = firstFailure.message;
        notification.className = 'notification failure';
        notification.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        const successNotifications = notifications.filter(n => n.message.includes('نجحت'));
        if (successNotifications.length > 0) {
            const firstSuccess = successNotifications[0];
            notification.querySelector('.icon').textContent = '✅';
            notification.querySelector('.message').textContent = firstSuccess.message;
            notification.className = 'notification success';
            notification.style.display = 'block';
            overlay.style.display = 'block';
        }
    }
}

function closeNotification() {
    document.getElementById('notification').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
