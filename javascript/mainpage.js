// Slider Banner (funzionalità base)
let currentSlide = 0;
const slides = [
    "images/banner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg"
];

const bannerImg = document.querySelector('.banner-img');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

function updateBanner() {
    bannerImg.src = slides[currentSlide];
}

arrowLeft.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateBanner();
});

arrowRight.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateBanner();
});

// Inizializza il banner
updateBanner();