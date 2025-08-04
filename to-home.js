document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.querySelector('.go-home');

    const overlay = document.createElement('div');
    overlay.classList.add('page-dim');
    document.body.appendChild(overlay);

    homeButton.addEventListener('click', () => {
        overlay.classList.add('active');

        const targetLink = homeButton.getAttribute('data-link');
        if (targetLink) {
            setTimeout(() => {
                window.location.href = targetLink;
            }, 500); 
        }
    });

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
    };
});


