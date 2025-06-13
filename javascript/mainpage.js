document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Crea indicatori
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        updateDots();
    }

    // Aggiorna slide attiva
    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === currentSlide ? '1' : '0';
            slide.style.zIndex = index === currentSlide ? '1' : '0';
        });
        updateDots();
    }

    // Aggiorna indicatori
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Vai a slide specifica
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // Slide successiva
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    // Slide precedente
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Inizializzazione
    createDots();
    updateSlider();

    // Event listeners
    arrowRight.addEventListener('click', nextSlide);
    arrowLeft.addEventListener('click', prevSlide);

    // Auto-scroll (opzionale)
    let slideInterval = setInterval(nextSlide, 5000);

    // Pausa auto-scroll al hover
    const banner = document.querySelector('.banner');
    banner.addEventListener('mouseenter', () => clearInterval(slideInterval));
    banner.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
});