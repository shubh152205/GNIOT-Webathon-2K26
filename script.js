document.addEventListener('DOMContentLoaded', () => {
    console.log('Webathon 2K26 boilerplate is ready to go!');

    const startBtn = document.getElementById('start-btn');
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Add a ripple or scale effect
            startBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                startBtn.style.transform = '';
                // You can add your start logic here (e.g., scrolling to a specific section or triggering an animation)
                alert("Let the coding begin! Navigate to your files and build something amazing from scratch.");
            }, 150);
        });
    }

    // Optional: Add Intersection Observer for scroll animations when the page grows
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // To use the observer, add the class 'scroll-animate' to your dynamic future elements
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    });
});
