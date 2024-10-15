// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in effect for images when they come into view
const faders = document.querySelectorAll('.article-image, .main-image');

const appearOptions = {
    threshold: 0.5,  // When 50% of the image is visible
    rootMargin: "0px 0px -100px 0px"  // Allows image to appear slightly before it's in full view
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Add a back-to-top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Google Analytics Event Tracking (optional)
document.querySelectorAll('.article-image, .main-image').forEach(image => {
    image.addEventListener('click', () => {
        gtag('event', 'image_click', {
            'event_category': 'engagement',
            'event_label': 'User clicked an image',
        });
    });
});
