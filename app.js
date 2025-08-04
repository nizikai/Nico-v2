///MARK: - WEB SETTINGS

window.history.scrollRestoration = 'manual';

window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

///MARK: - INTRO ANIMATION

const intro = document.getElementById('intro');
const projects = document.getElementById('projects');
const cards = document.querySelectorAll('.cards'); 

function showProjectsAfterIntro() {
    projects.style.display = 'none';
    cards.forEach((card) => (card.style.display = 'none')); 

    if (sessionStorage.getItem('introShown')) {
        intro.style.display = 'none';
        projects.style.display = 'flex';
        cards.forEach((card) => (card.style.display = 'flex')); 
        updateThumbSize();
    } else {
        setTimeout(() => {
            intro.style.display = 'none';
            projects.style.display = 'flex';
            cards.forEach((card) => (card.style.display = 'flex')); 

            sessionStorage.setItem('introShown', 'true');
            updateThumbSize();
        }, 3000);
    }
}

window.addEventListener('DOMContentLoaded', showProjectsAfterIntro);

/// MARK: - CURSOR

// Cursor creation
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Update cursor position based on mouse coordinates
function updateCursorPosition(e) {
    const offsetX = e.clientX;
    const offsetY = e.clientY;

    cursor.style.left = `${offsetX}px`;
    cursor.style.top = `${offsetY}px`;
}

// Smoothly update cursor position on mouse move
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => updateCursorPosition(e));
    cursor.classList.remove('hidden');
});

function throttle(callback, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        callback(...args);
    };
}

document.addEventListener(
    'mousemove',
    throttle((e) => updateCursorPosition(e), 16)
);

// Shrink cursor on mouse down
document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

// Restore cursor size on mouse up
document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Hide cursor on mobile tap
document.addEventListener('touchstart', () => {
    cursor.classList.remove('active');
    cursor.classList.remove('hover');
    cursor.classList.add('hidden');
    cursor.style.display = 'none';
});

// Mouse leaves window: hide cursor
document.addEventListener('mouseleave', () => {
    cursor.classList.add('hidden');
    cursor.style.display = 'none';
});

// Mouse enters window: show cursor
document.addEventListener('mouseenter', (e) => {
    cursor.classList.remove('hidden');
    cursor.style.display = 'block';
    updateCursorPosition(e);
});

// Make cursor a line while hovering over text elements
document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li, .gradient-text').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight);
        const lines = el.innerText.split('\n').length;
        const textHeight = lineHeight * lines;
        cursor.style.height = `${textHeight}px`;
        cursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.height = '';
        cursor.classList.remove('hover');
    });
});

// Hide cursor while hovering over links or specific elements
document.querySelectorAll('a, .custom-thumb, .card-container img, .go-home, #rounded-box').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover-link');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover-link');
    });
});

/// MARK: - HOME ICON ON NAVBAR

const homeIcon = document.getElementById('home-icon');

homeIcon.addEventListener('mouseenter', () => {
    homeIcon.src = './Assets/home-glow.png';
});

homeIcon.addEventListener('mouseleave', () => {
    homeIcon.src = './Assets/home.png';
});

homeIcon.addEventListener('touchend', (e) => {
    homeIcon.src = './Assets/home.png';
});

/// MARK: - PROJECT SCROLLBAR

const cardContainer = document.querySelector('.card-container');
const scrollbar = document.querySelector('.custom-scrollbar');
const thumb = document.querySelector('.custom-thumb');

// Adjust thumb size based on content
const updateThumbSize = () => {
    const containerScrollWidth = cardContainer.scrollWidth;
    const containerVisibleWidth = cardContainer.offsetWidth;
    const thumbWidth = (containerVisibleWidth / containerScrollWidth) * 100;
    thumb.style.width = `${thumbWidth}%`;
};

// Handle scroll sync
const syncScroll = () => {
    const scrollRatio = cardContainer.scrollLeft / (cardContainer.scrollWidth - cardContainer.offsetWidth);
    const thumbPosition = scrollRatio * (scrollbar.offsetWidth - thumb.offsetWidth);
    thumb.style.left = `${thumbPosition}px`;
};

// Scroll card container when thumb is dragged
let isDragging = false;
let startX;

thumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - thumb.offsetLeft;
    cursor.classList.add('hidden');
    cursor.classList.remove('active');
    thumb.classList.add('hover');
    document.body.style.cursor = 'none';
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const offsetX = e.clientX - startX;
    const maxOffset = scrollbar.offsetWidth - thumb.offsetWidth;
    const clampedOffset = Math.max(0, Math.min(offsetX, maxOffset));
    thumb.style.left = `${clampedOffset}px`;

    const scrollRatio = clampedOffset / maxOffset;
    cardContainer.scrollLeft = scrollRatio * (cardContainer.scrollWidth - cardContainer.offsetWidth);
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = '';
    cursor.classList.remove('hidden');
    thumb.classList.remove('hover');
});

window.addEventListener('load', updateThumbSize);

window.addEventListener('resize', updateThumbSize);
cardContainer.addEventListener('scroll', syncScroll);

updateThumbSize();

/// MARK: - PROJECTS CARDS HOVER EFFECT

const images = document.querySelectorAll('.card-container img');

if (window.matchMedia('(min-width: 768px)').matches) {
    images.forEach((image) => {
        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const shadowX = Math.max(-2, Math.min((offsetX / rect.width - 0.5) * 3.5, 8));
            const shadowY = Math.max(0, Math.min((offsetY / rect.height - 0.5) * 4, 4));

            image.style.boxShadow = `${shadowX}px ${shadowY}px 0px 4px rgba(255, 255, 255, 0.3)`;
        });

        image.addEventListener('mouseleave', () => {
            image.style.boxShadow = '0px 0px 0px 0px rgba(255, 255, 255, 0.3)';
        });
    });
}

///MARK: NAVIGATION

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-container img');

    const overlay = document.createElement('div');
    overlay.classList.add('page-dim');
    document.body.appendChild(overlay);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            overlay.classList.add('active');

            const targetLink = card.getAttribute('data-link');
            if (targetLink) {
                setTimeout(() => {
                    window.location.href = targetLink;
                }, 500); 
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('#rounded-box');

    const overlay = document.createElement('div');
    overlay.classList.add('page-dim');
    document.body.appendChild(overlay);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            overlay.classList.add('active');

            const targetLink = card.getAttribute('data-link');
            if (targetLink) {
                setTimeout(() => {
                    window.location.href = targetLink;
                }, 500); 
            }
        });
    });
});

/// MARK: - CONTACTS

document.addEventListener('DOMContentLoaded', () => {
    const contactLinks = document.querySelectorAll('.contact-buttons a');

    if (window.matchMedia('(min-width: 768px)').matches) {
        contactLinks.forEach((link) => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const offsetX = e.clientX - rect.left;
                const offsetY = e.clientY - rect.top;

                const shadowX = Math.max(-2, Math.min((offsetX / rect.width - 0.5) * 3.5, 8));
                const shadowY = Math.max(0, Math.min((offsetY / rect.height - 0.5) * 4, 4));

                link.style.boxShadow = `${shadowX}px ${shadowY}px 0px 4px rgba(255, 255, 255, 0.3)`;
            });

            link.addEventListener('mouseleave', () => {
                link.style.boxShadow = '0px 0px 0px 0px rgba(255, 255, 255, 0.3)';
            });
        });
    }
});

/// MARK: - CARD SCALING UP FOOTER

document.addEventListener('DOMContentLoaded', () => {
    const roundedBox = document.querySelector('#rounded-box');
    const moreText = document.querySelector('.more p');

    let hasScaled = false;

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= documentHeight && !hasScaled) {
            roundedBox.classList.add('scaled-up');
            moreText.classList.add('scaled-up');
            hasScaled = true;
        } else if (scrollPosition < documentHeight && hasScaled) {
            roundedBox.classList.remove('scaled-up');
            moreText.classList.remove('scaled-up');
            hasScaled = false;
        }
    };

    window.addEventListener('scroll', handleScroll);
});

const roundedBox = document.querySelector('#rounded-box');

if (window.matchMedia('(min-width: 768px)').matches) {
    roundedBox.addEventListener('mousemove', (e) => {
        const rect = roundedBox.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // Calculate shadow offsets
        const shadowX = Math.max(-2, Math.min((offsetX / rect.width - 0.5) * 4, 4));
        const shadowY = Math.max(-2, Math.min((offsetY / rect.height - 0.5) * 4, 4));

        // Apply shadow effect
        roundedBox.style.boxShadow = `${shadowX}px ${shadowY}px 0px 3px rgba(255, 255, 255, 0.3)`;
    });

    roundedBox.addEventListener('mouseleave', () => {
        // Reset shadow on mouse leave
        roundedBox.style.boxShadow = '0px 0px 0px 0px rgba(255, 255, 255, 0.3)';
    });
}

