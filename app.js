///MARK: - Cursor

// Cursor creation
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Update cursor position based on mouse coordinates
function updateCursorPosition(e) {
    //get the mouse position
    const offsetX = e.clientX;
    const offsetY = e.clientY;

    //setting the cursor position
    cursor.style.left = `${offsetX}px`;
    cursor.style.top = `${offsetY}px`;
}

// Smoothly update cursor position on mouse move using requestAnimationFrame
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => updateCursorPosition(e));
});

// Shrink cursor on mouse down
document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

// Restore cursor size on mouse up
document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Make cursor as a line while hovering on texts
document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Hide cursor while hovering links
document.querySelectorAll('a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover-link');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover-link');
    });
});

// Get the navigation menu icon to change its asset on hover
const icon = document.getElementById('home-icon');

icon.addEventListener('mouseenter', () => {
    icon.src = './Assets/home-glow.png';
});

icon.addEventListener('mouseleave', () => {
    icon.src = './Assets/home.png';
});


