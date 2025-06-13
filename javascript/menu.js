document.addEventListener('DOMContentLoaded', () => {
    // Funzione per inizializzare un singolo carosello
    function initializeCarousel(carouselId) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const carouselInner = carousel.querySelector('.carousel-inner');
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

        let currentIndex = 0;
        const totalItems = carouselItems.length;

        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        function setPositionByIndex() {
            const itemWidth = carouselItems[0].offsetWidth;
            currentTranslate = -currentIndex * itemWidth;
            setCarouselTransform();
        }

        function setCarouselTransform() {
            carouselInner.style.transform = `translateX(${currentTranslate}px)`;
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
            });
        }

        function animation() {
            setCarouselTransform();
            if (isDragging) requestAnimationFrame(animation);
        }

        // --- Event Handlers per il Trascinamento ---

        // Inizio del trascinamento (mouse down)
        carouselInner.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPos = e.clientX;
            // Interrompi qualsiasi animazione in corso
            cancelAnimationFrame(animationID);
            carouselInner.style.transition = 'none'; // Disabilita la transizione CSS durante il drag
            prevTranslate = currentTranslate; // Salva la posizione attuale prima di iniziare a trascinare
        });

        // Movimento del mouse durante il trascinamento
        carouselInner.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const currentPosition = e.clientX;
            const diff = currentPosition - startPos; // Differenza di movimento
            currentTranslate = prevTranslate + diff;

            // Limita il trascinamento per non andare oltre i bordi del carosello
            const maxTranslate = 0;
            const minTranslate = -(totalItems - 1) * carouselItems[0].offsetWidth;

            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate;
            } else if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate;
            }

            animationID = requestAnimationFrame(animation);
        });

        // Fine del trascinamento (mouse up)
        carouselInner.addEventListener('mouseup', () => {
            isDragging = false;
            cancelAnimationFrame(animationID);
            carouselInner.style.transition = 'transform 0.5s ease-in-out'; // Riabilita la transizione

            const movedBy = currentTranslate - prevTranslate; // Quanto si è mosso rispetto all'inizio del drag
            const itemWidth = carouselItems[0].offsetWidth;

            // Determina la nuova slide basata sul movimento del drag
            if (movedBy < -itemWidth / 4 && currentIndex < totalItems - 1) { // Se trascinato a sinistra sufficientemente
                currentIndex++;
            } else if (movedBy > itemWidth / 4 && currentIndex > 0) { // Se trascinato a destra sufficientemente
                currentIndex--;
            }

            // Assicurati che l'indice sia nei limiti
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex >= totalItems) currentIndex = totalItems - 1;

            setPositionByIndex(); // Vai alla posizione finale della slide
            updateDots();
        });

        // Lasciare il carosello con il mouse (mouse leave)
        // Se l'utente rilascia il mouse fuori dal carosello
        carouselInner.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                cancelAnimationFrame(animationID);
                carouselInner.style.transition = 'transform 0.5s ease-in-out';
                setPositionByIndex(); // Riporta alla slide corrente se si è lasciato il trascinamento a metà
                updateDots();
            }
        });


        // --- Event Handlers per i Dots ---
        dots.forEach(dot => {
            dot.addEventListener('click', (event) => {
                const slideIndex = parseInt(event.target.dataset.slide);
                if (slideIndex >= 0 && slideIndex < totalItems) {
                    currentIndex = slideIndex;
                    setPositionByIndex(); // Vai alla posizione del dot
                    updateDots();
                }
            });
        });

        // --- Gestione del Ridimensionamento della Finestra ---
        window.addEventListener('resize', () => {
            currentIndex = 0; // Reset dell'indice per sicurezza sul ridimensionamento
            setPositionByIndex(); // Ricalcola la posizione in base alla nuova larghezza dell'item
            updateDots();
        });

        // Inizializzazione iniziale del carosello
        setPositionByIndex();
        updateDots();
    }

    // Inizializza tutti i caroselli
    initializeCarousel('carousel-primi');
    initializeCarousel('carousel-secondi');
    initializeCarousel('carousel-contorni');
    initializeCarousel('carousel-dolci');

    // Listener per il bottone "Add"
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            alert('Hai cliccato il bottone "Aggiungi"!');
            // Qui puoi aggiungere la logica per aprire un modale, navigare, ecc.
        });
    }
});