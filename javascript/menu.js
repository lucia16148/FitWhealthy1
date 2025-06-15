const staticRecipesArray = [
        { "id": "spaghetti-pomodoro", "name": "Spaghetti al Pomodoro", "image": "../image/pasta-al-pomodoro-dietetica-1200x799.jpg.webp", "ingredients": "", "instructions": "", "category": "Primi" },
        { "id": "eliche-peperoni-fave-ricotta", "name": "Eliche con peperoni, fave e ricotta", "image": "../image/eliche-con-peperoni-fave-e-ricotta.webp", "ingredients": "", "instructions": "", "category": "Primi" },
        { "id": "filetto-pesce", "name": "Filetto di pesce al forno", "image": "../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg", "ingredients": "", "instructions": "", "category": "Secondi" },
        { "id": "risotto-funghi", "name": "Risotto ai Funghi", "image": "../image/FullSizeRender-1-7-scaled.jpg", "ingredients": "", "instructions": "", "category": "Primi" },
        { "id": "orecchiette-tonno-zucchine", "name": "Orecchiette tiepide con verdure e tonno", "image": "../image/orecchiette-tiepide-e-verdure-allolio-aromatico.webp", "ingredients": "", "instructions": "", "category": "Primi" },
        { "id": "strozzapreti-salmone-fiori-zucca-acciuga", "name": "Strozzapreti salmone, fiori di zucca e acciuga", "image": "../image/Strozzapreti salmone, fiori di zucca e acciuga.webp", "ingredients": "", "instructions": "", "category": "Primi" },
        { "id": "pasta-carciofi-pancetta", "name": "Pasta con carciofi e pancetta", "image": "../image/Pasta-carciofi-e-pancetta-26122024-buttalapasta.it_.jpg", "ingredients": "", "instructions": "", "category": "Primi" },
        { "id": "gnocchi-pesto", "name": "Gnocchi al pesto", "image": "../image/th.jpg", "ingredients": "", "instructions": "", "category": "Primi" },
        { "id": "platessa-zucchine-mandorle", "name": "Filetti di platessa con zucchine e mandorle", "image": "../image/filetti-di-platessa-mandorle-zucchine.jpg", "ingredients": "", "instructions": "", "category": "Secondi" },
        { "id": "orata-cartoccio", "name": "Orata al Cartoccio al Forno", "image": "../image/orata-pomodori-olive-16032024-buttalapasta.it_.jpg", "ingredients": "", "instructions": "", "category": "Secondi" },
        { "id": "insalata-pollo", "name": "Insalata di pollo", "image": "../image/Insalata-di-pollo-allitaliana-27062023-buttalapasta.it_-1024x683.jpg", "ingredients": "", "instructions": "", "category": "Secondi" },
        { "id": "carne-pizzaiola", "name": "Carne alla Pizzaiola", "image": "../image/Carne-alla-pizzaiola_450x300.jpg", "ingredients": "", "instructions": "", "category": "Secondi" },
        { "id": "calamari-limone", "name": "Calamari al Limone", "image": "../image/Calamari-al-limone.jpg", "ingredients": "", "instructions": "", "category": "Secondi" },
        { "id": "tacchino-zucchine-birra", "name": "Tacchino con Zucchine alla Birra", "image": "../image/tacchino-con-zucchine.jpg", "ingredients": "", "instructions": "", "category": "Secondi" },
        { "id": "insalata-finocchi-arance", "name": "Insalata di Finocchi e Arance", "image": "../image/Insalata_Finocchi_Arance.jpg", "ingredients": "", "instructions": "", "category": "Contorni" },
        { "id": "patate-forno", "name": "Patate al Forno", "image": "../image/Patate.jpg", "ingredients": "", "instructions": "", "category": "Contorni" },
        { "id": "fiori-zucca-gratinati-forno", "name": "Fiori di Zucca Gratinati al Forno", "image": "../image/Fiori-di-zucca-al-forno-0D6A9016.webp", "ingredients": "", "instructions": "", "category": "Contorni" },
        { "id": "fagiolini-carote-sesamo", "name": "Fagiolini con carote al sesamo", "image": "../image/1123_carote.webp", "ingredients": "", "instructions": "", "category": "Contorni" },
        { "id": "pure-patate-light", "name": "Purè di patate LIGHT", "image": "../image/purepatate.jpg", "ingredients": "", "instructions": "", "category": "Contorni" },
        { "id": "cheesecake-light", "name": "Cheesecake Light", "image": "../image/SH_cheesecake_light.jpg.webp", "ingredients": "", "instructions": "", "category": "Dolci" },
        { "id": "muffin-leggeri", "name": "Muffin Leggeri", "image": "../image/SH_muffin_light.jpg.webp", "ingredients": "", "instructions": "", "category": "Dolci" },
        { "id": "torta-carote", "name": "Torta di Carote", "image": "../image/torta-di-carote-still-life-2.webp", "ingredients": "", "instructions": "", "category": "Dolci" },
        { "id": "crema-caffe-acqua", "name": "Crema di caffè all’acqua", "image": "../image/crema_caffe.webp", "ingredients": "", "instructions": "", "category": "Dolci" }
];


document.addEventListener('DOMContentLoaded', () => {

    // --- Funzioni di gestione "Mi Piace" (SPOSATE QUI DA GLOBAL-SYNC.JS) ---

    // Funzione helper per salvare lo stato dell'utente (probabilmente dovrebbe rimanere globale
    // o essere gestita da un modulo di autenticazione comune)
    // Per ora, la duplichiamo qui come richiesta di non usare global-sync.js per i like.
    function saveUserToLocalStorage(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = user;
        } else {
            users.push(user);
        }
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        console.log("Utente salvato/aggiornato in menu.js:", user.email);
    }


    function isRecipeLiked(recipeIdToCheck) {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser || !loggedInUser.email) {
            return false;
        }
        const likedRecipeIds = loggedInUser.likedRecipeIds || [];
        return likedRecipeIds.includes(recipeIdToCheck);
    }

    function updateHeartIcon(button, isLiked) {
        if (button) {
            if (isLiked) {
                button.classList.add('liked');
                button.textContent = '♥'; // Cuore pieno
            } else {
                button.classList.remove('liked');
                button.textContent = '♡'; // Cuore vuoto
            }
        }
    }

    function toggleLikeStatus(recipeIdToToggle) {
        let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser || !loggedInUser.email) {
            alert('Devi effettuare il login per mettere Mi Piace o rimuoverlo.');
            return false;
        }

        loggedInUser.likedRecipeIds = loggedInUser.likedRecipeIds || [];
        const index = loggedInUser.likedRecipeIds.indexOf(recipeIdToToggle);
        let isLiked;

        if (index === -1) {
            loggedInUser.likedRecipeIds.push(recipeIdToToggle);
            isLiked = true;
            console.log(`Ricetta '${recipeIdToToggle}' aggiunta ai preferiti di '${loggedInUser.email}'.`);
        } else {
            loggedInUser.likedRecipeIds.splice(index, 1);
            isLiked = false;
            console.log(`Ricetta '${recipeIdToToggle}' rimossa dai preferiti di '${loggedInUser.email}'.`);
        }

        saveUserToLocalStorage(loggedInUser); // Usa la funzione locale qui

        // Poiché le funzioni di like ora sono locali a menu.js,
        // non c'è una "window.refreshAllRecipeDisplays" da chiamare globalmente.
        // L'aggiornamento avverrà solo per i bottoni in questa pagina.
        // Se cambi idea e vuoi una gestione globale, dovrai rimetterla su window.
        // Qui, l'aggiornamento del singolo bottone è gestito nel listener del click.

        return isLiked;
    }
    // --- FINE Funzioni di gestione "Mi Piace" ---


    // Funzione per filtrare le ricette per categoria
    function getRecipesByCategory(category) {
        return staticRecipesArray.filter(recipe => recipe.category === category);
    }

    // Funzione per selezionare N ricette casuali da un array
    function getRandomRecipes(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    // Funzione per creare un elemento carosello HTML
    function createCarouselItem(recipe) {
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.dataset.recipeId = recipe.id;

        item.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="item-details">
                <p>${recipe.name}</p>
                <button class="like-button" data-recipe-id="${recipe.id}">♡</button>
            </div>
        `;

        // Aggiungi qui il listener per il click sull'intera card
        item.addEventListener('click', () => {
            window.location.href = `DettagliRicetta.html?id=${recipe.id}`;
        });

        return item;
    }

    // Funzione per popolare un carosello
    function populateCarousel(carouselId, category) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const carouselInner = carousel.querySelector('.carousel-inner');
        const dotsContainer = carousel.querySelector('.carousel-dots');

        carouselInner.innerHTML = '';
        dotsContainer.innerHTML = '';

        const recipesForCategory = getRecipesByCategory(category);
        const numRecipesToShow = Math.min(3, recipesForCategory.length);
        const randomRecipes = getRandomRecipes(recipesForCategory, numRecipesToShow);

        if (randomRecipes.length === 0) {
            carouselInner.innerHTML = `<p style="text-align: center; width: 100%;">Nessuna ricetta disponibile per questa categoria.</p>`;
            dotsContainer.style.display = 'none';
            carousel.style.display = 'none';
            return;
        } else {
            dotsContainer.style.display = 'flex';
            carousel.style.display = 'block';
        }

        randomRecipes.forEach((recipe, index) => {
            const item = createCarouselItem(recipe);
            carouselInner.appendChild(item);

            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.carousel = carouselId;
            dot.dataset.slide = index;
            if (index === 0) {
                dot.classList.add('active');
            }
            dotsContainer.appendChild(dot);
        });

        initializeCarousel(carouselId);
    }


    // Funzione per inizializzare un singolo carosello
    function initializeCarousel(carouselId) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const carouselInner = carousel.querySelector('.carousel-inner');
        const carouselItems = carousel.querySelectorAll(`#${carouselId} .carousel-item`);
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];


        let currentIndex = 0;
        const totalItems = carouselItems.length;

        if (totalItems === 0) {
            return;
        }


        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        function setPositionByIndex() {
            const itemWidth = carouselItems[0] ? carouselItems[0].offsetWidth : 0;
            currentTranslate = -currentIndex * itemWidth;
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

        // --- Event Handlers per il Trascinamento ---

        carouselInner.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPos = e.clientX;
            cancelAnimationFrame(animationID);
            carouselInner.style.transition = 'none';
            prevTranslate = currentTranslate;
        });

        carouselInner.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const currentPosition = e.clientX;
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;

            const itemWidth = carouselItems[0] ? carouselItems[0].offsetWidth : 0;
            const maxTranslate = 0;
            const minTranslate = -(totalItems - 1) * itemWidth;

            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate;
            } else if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate;
            }

            carouselInner.style.transform = `translateX(${currentTranslate}px)`;
        });

        carouselInner.addEventListener('mouseup', () => {
            isDragging = false;
            cancelAnimationFrame(animationID);
            carouselInner.style.transition = 'transform 0.5s ease-in-out';

            const movedBy = currentTranslate - prevTranslate;
            const itemWidth = carouselItems[0] ? carouselItems[0].offsetWidth : 0;

            if (itemWidth > 0) {
                if (movedBy < -itemWidth / 4 && currentIndex < totalItems - 1) {
                    currentIndex++;
                } else if (movedBy > itemWidth / 4 && currentIndex > 0) {
                    currentIndex--;
                }
            }

            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex >= totalItems) currentIndex = totalItems - 1;

            setPositionByIndex();
            updateDots();
        });

        carouselInner.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                cancelAnimationFrame(animationID);
                carouselInner.style.transition = 'transform 0.5s ease-in-out';
                setPositionByIndex();
                updateDots();
            }
        });


        // --- Event Handlers per i Dots ---
        dots.forEach(dot => {
            dot.removeEventListener('click', handleDotClick);
            dot.addEventListener('click', handleDotClick);
        });

        function handleDotClick(event) {
            const slideIndex = parseInt(event.target.dataset.slide);
            if (slideIndex >= 0 && slideIndex < totalItems) {
                currentIndex = slideIndex;
                setPositionByIndex();
                updateDots();
            }
        }


        // --- Gestione del Ridimensionamento della Finestra ---
        window.addEventListener('resize', () => {
            currentIndex = 0;
            setPositionByIndex();
            updateDots();
        });

        // Inizializzazione iniziale del carosello
        setPositionByIndex();
        updateDots();


        // Gestione dei pulsanti Mi Piace all'interno di questo carosello
        const likeButtons = carousel.querySelectorAll('.like-button');

        likeButtons.forEach(button => {
            const recipeId = button.dataset.recipeId;

            // Inizializza lo stato del cuore al caricamento
            if (recipeId && typeof isRecipeLiked === 'function') { // isRecipeLiked è ora locale
                updateHeartIcon(button, isRecipeLiked(recipeId)); // updateHeartIcon è ora locale
            }

            button.removeEventListener('click', handleLikeButtonClick);
            button.addEventListener('click', handleLikeButtonClick);
        });

        function handleLikeButtonClick(event) {
            event.stopPropagation();
            const recipeId = event.target.dataset.recipeId;
            // Chiamata alle funzioni locali di questo script
            if (recipeId && typeof toggleLikeStatus === 'function' && typeof updateHeartIcon === 'function') {
                const isNowLiked = toggleLikeStatus(recipeId); // toggleLikeStatus è ora locale
                updateHeartIcon(event.target, isNowLiked);    // updateHeartIcon è ora locale
            } else if (!recipeId) {
                console.warn("ID ricetta non trovato per il pulsante Mi Piace:", event.target);
            } else {
                // Questo errore non dovrebbe più comparire se le funzioni sono definite qui
                console.error("Errore: Funzioni di gestione Mi Piace non disponibili (dovrebbero essere in questo file).");
            }
        }
    } // FINE initializeCarousel


    // Esegui la popolazione e inizializzazione dei caroselli
    populateCarousel('carousel-primi', 'Primi');
    populateCarousel('carousel-secondi', 'Secondi');
    populateCarousel('carousel-contorni', 'Contorni');
    populateCarousel('carousel-dolci', 'Dolci');


});