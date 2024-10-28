window.addEventListener('scroll', function () {
    // Get all full-screen sections
    const fullScreenSections = document.querySelectorAll('#full-screen');
    const windowHeight = window.innerHeight;

    fullScreenSections.forEach((section, index) => {
        // Get the position of the section relative to the viewport
        const sectionTop = section.getBoundingClientRect().top;

        // Check if the section has entered the viewport
        if (sectionTop <= windowHeight && sectionTop > 0) {
            // Set the background image
            section.style.backgroundImage = `url('Assets/background-${index + 1}.png')`; // Replace with your image paths
        }
    });
});