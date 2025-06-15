// js/category-page-script.js

document.addEventListener('DOMContentLoaded', () => {
    const recipeGrid = document.getElementById('category-recipe-grid');
    const addButton = document.querySelector('.add-button');

    function getPageRecipeType() {
        const path = window.location.pathname;
        if (path.includes('RicettePrimi.html')) return 'primo';
        if (path.includes('RicetteSecondi.html')) return 'secondo';
        if (path.includes('RicetteDolci.html')) return 'dolce';
        if (path.includes('RicetteContorni.html')) return 'contorno';
        return null;
    }
    const currentPageType = getPageRecipeType();

    // --- DATABASE DELLE RICETTE STATICHE PREIMPOSTATE ---
    const staticRecipes = {
        'spaghetti-pomodoro': { id: 'spaghetti-pomodoro', title: 'Spaghetti al Pomodoro', imageUrl: '../image/pasta-al-pomodoro-dietetica-1200x799.jpg.webp', ingredients: ``, instructions: ``, type: 'primo' },
        'eliche-peperoni-fave-ricotta': { id: 'eliche-peperoni-fave-ricotta', title: 'Eliche con peperoni, fave e ricotta', imageUrl: '../image/eliche-con-peperoni-fave-e-ricotta.webp', ingredients: ``, instructions: ``, type: 'primo' },        'filetto-pesce': { id: 'filetto-pesce', title: 'Filetto di pesce al forno', imageUrl: '../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'risotto-funghi': { id: 'risotto-funghi', title: 'Risotto ai Funghi', imageUrl: '../image/FullSizeRender-1-7-scaled.jpg', ingredients: ``, instructions: ``, type: 'primo' },
        'orecchiette-tonno-zucchine': { id: 'orecchiette-tonno-zucchine', title: 'Orecchiette tiepide con verdure e tonno', imageUrl: '../image/orecchiette-tiepide-e-verdure-allolio-aromatico.webp', ingredients: ``, instructions: ``, type: 'primo' },
        'strozzapreti-salmone-fiori-zucca-acciuga': { id: 'strozzapreti-salmone-fiori-zucca-acciuga', title: 'Strozzapreti salmone, fiori di zucca e acciuga', imageUrl: '../image/Strozzapreti salmone, fiori di zucca e acciuga.webp', ingredients: ``, instructions: ``, type: 'primo' },
        'pasta-carciofi-pancetta': { id: 'pasta-carciofi-pancetta', title: 'Pasta con carciofi e pancetta', imageUrl: '../image/Pasta-carciofi-e-pancetta-26122024-buttalapasta.it_.jpg', ingredients: ``, instructions: ``, type: 'primo' },
        'gnocchi-pesto': { id: 'gnocchi-pesto', title: 'Gnocchi al pesto', imageUrl: '../image/th.jpg', ingredients: ``, instructions: ``, type: 'primo' },
        'filetto-pesce': { id: 'filetto-pesce', title: 'Filetto di pesce al forno', imageUrl: '../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg', ingredients: ``, instructions: ``, type: 'secondo' },
        'platessa-zucchine-mandorle': { id: 'platessa-zucchine-mandorle', title: 'Filetti di platessa con zucchine e mandorle', imageUrl: '../image/filetti-di-platessa-mandorle-zucchine.jpg', ingredients: ``, instructions: ``, type: 'secondo' },
        'orata-cartoccio': { id: 'orata-cartoccio', title: 'Orata al Cartoccio al Forno', imageUrl: '../image/orata-pomodori-olive-16032024-buttalapasta.it_.jpg', ingredients: ``, instructions: ``, type: 'secondo' },
        'insalata-pollo': { id: 'insalata-pollo', title: 'Insalata di pollo', imageUrl: '../image/Insalata-di-pollo-allitaliana-27062023-buttalapasta.it_-1024x683.jpg', ingredients: ``, instructions: ``, type: 'secondo' },
        'carne-pizzaiola': { id: 'carne-pizzaiola', title: 'Carne alla Pizzaiola', imageUrl: '../image/Carne-alla-pizzaiola_450x300.jpg', ingredients: ``, instructions: ``, type: 'secondo' },
        'calamari-limone': { id: 'calamari-limone', title: 'Calamari al Limone', imageUrl: '../image/Calamari-al-limone.jpg', ingredients: ``, instructions: ``, type: 'secondo' },
        'tacchino-zucchine-birra': { id: 'tacchino-zucchine-birra', title: 'Tacchino con Zucchine alla Birra', imageUrl: '../image/tacchino-con-zucchine.jpg', ingredients: ``, instructions: ``, type: 'secondo' },
        'insalata-finocchi-arance': { id: 'insalata-finocchi-arance', title: 'Insalata di Finocchi e Arance', imageUrl: '../image/Insalata_Finocchi_Arance.jpg', ingredients: ``, instructions: ``, type: 'contorno' },
        'patate-forno': { id: 'patate-forno', title: 'Patate al Forno', imageUrl: '../image/Patate.jpg', ingredients: ``, instructions: ``, type: 'contorno' },
        'fiori-zucca-gratinati-forno': { id: 'fiori-zucca-gratinati-forno', title: 'Fiori di Zucca Gratinati al Forno', imageUrl: '../image/Fiori-di-zucca-al-forno-0D6A9016.webp', ingredients: ``, instructions: ``, type: 'contorno' },
        'fagiolini-carote-sesamo': { id: 'fagiolini-carote-sesamo', title: 'Fagiolini con carote al sesamo', imageUrl: '../image/1123_carote.webp', ingredients: ``, instructions: ``, type: 'contorno' },
        'pure-patate-light': { id: 'pure-patate-light', title: 'Purè di patate LIGHT', imageUrl: '../image/purepatate.jpg', ingredients: ``, instructions: ``, type: 'contorno' },
        'cheesecake-light': { id: 'cheesecake-light', title: 'Cheesecake Light', imageUrl: '../image/SH_cheesecake_light.jpg.webp', ingredients: ``, instructions: ``, type: 'dolce' },
        'muffin-leggeri': { id: 'muffin-leggeri', title: 'Muffin Leggeri', imageUrl: '../image/SH_muffin_light.jpg.webp', ingredients: ``, instructions: ``, type: 'dolce' },
        'torta-carote': { id: 'torta-carote', title: 'Torta di Carote', imageUrl: '../image/torta-di-carote-still-life-2.webp', ingredients: ``, instructions: ``, type: 'dolce' },
        'crema-caffe-acqua': { id: 'crema-caffe-acqua', title: 'Crema di caffè all’acqua', imageUrl: '../image/crema_caffe.webp', ingredients: ``, instructions: ``, type: 'dolce' },
    };

    const commentsModal = document.getElementById('comments-modal');
    const closeButton = commentsModal ? commentsModal.querySelector('.close-button') : null; // Controllo null

    // --- UTILITY PER L'UTENTE E I DATI (DUPLICATE PER ISOLAMENTO) ---
    function saveUserToLocalStorage(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            console.warn("Utente non trovato in localStorage per l'aggiornamento in category-page-script.js.");
        }
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    function toggleLikeStatus(recipeId) {
        let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser || !loggedInUser.email) {
            alert('Devi effettuare il login per mettere Mi Piace o rimuoverlo.');
            return false;
        }

        loggedInUser.likedRecipeIds = loggedInUser.likedRecipeIds || [];
        const index = loggedInUser.likedRecipeIds.indexOf(recipeId);
        let isLiked;

        if (index === -1) {
            loggedInUser.likedRecipeIds.push(recipeId);
            isLiked = true;
            console.log(`Ricetta '${recipeId}' aggiunta ai preferiti di '${loggedInUser.email}'.`);
        } else {
            loggedInUser.likedRecipeIds.splice(index, 1);
            isLiked = false;
            console.log(`Ricetta '${recipeId}' rimossa dai preferiti di '${loggedInUser.email}'.`);
        }

        saveUserToLocalStorage(loggedInUser);

        // Notifica il sistema di sincronizzazione globale
        if (typeof window.refreshAllRecipeDisplays === 'function') {
            window.refreshAllRecipeDisplays();
        }

        return isLiked;
    }

    function isRecipeLiked(recipeId) {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser || !loggedInUser.email) {
            return false;
        }
        const likedRecipeIds = loggedInUser.likedRecipeIds || [];
        return likedRecipeIds.includes(recipeId);
    }

    function updateHeartIcon(button, isLiked) {
        if (isLiked) {
            button.classList.add('liked');
            button.innerHTML = '❤️';
        } else {
            button.classList.remove('liked');
            button.innerHTML = '♡';
        }
    }

    function getRecipeDetailsById(recipeId) {
        if (staticRecipes[recipeId]) {
            return staticRecipes[recipeId];
        }
        const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
        return customRecipes.find(r => r.id === recipeId);
    }

    function generateRecipeHtml(recipe) {
        const liked = isRecipeLiked(recipe.id);
        const heartIcon = liked ? '♥' : '♡';
        const likedClass = liked ? ' liked' : '';

        return `
            <div class="recipe-item" data-recipe-id="${recipe.id}">
                <a href="DettagliRicetta.html?id=${recipe.id}" class="recipe-link">
                    <div class="recipe-image-container">
                        <img src="${recipe.imageUrl}" alt="${recipe.title}"></a>
                    </div>
                    <div class="recipe-details">
                        <p>${recipe.title}</p>
                    </div>
                
                <div class="actions">
                    <button class="like-button${likedClass}" data-recipe-id="${recipe.id}">${heartIcon}</button>
                    <button class="comment-button"><img src="../image/207-2078186_comment-icon-png.png" alt="Commenta"></button>
                </div>
            </div>
        `;
    }

    // --- CARICAMENTO E VISUALIZZAZIONE RICETTE (Funzione resa globale) ---
    window.loadAndDisplayRecipes = function() {
        recipeGrid.innerHTML = '';

        Object.values(staticRecipes).forEach(recipe => {
            if (recipe.type === currentPageType) {
                recipeGrid.insertAdjacentHTML('beforeend', generateRecipeHtml(recipe));
            }
        });

        const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
        customRecipes.forEach(recipe => {
            if (recipe.type === currentPageType) {
                recipeGrid.insertAdjacentHTML('beforeend', generateRecipeHtml(recipe));
            }
        });

        // Reinizializza i listener per i bottoni "Like"
        document.querySelectorAll('.recipe-grid .like-button').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const recipeId = button.dataset.recipeId;
                const newLikedStatus = toggleLikeStatus(recipeId);
                updateHeartIcon(button, newLikedStatus);
            });
        });

        // Reinizializza i listener per i bottoni "Comment"
        document.querySelectorAll('.recipe-grid .comment-button').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const recipeItem = button.closest('.recipe-item');
                const recipeId = recipeItem ? recipeItem.dataset.recipeId : null;

                if (recipeId) {
                    const recipe = getRecipeDetailsById(recipeId);
                    let recipeTitleForComments = "Ricetta Sconosciuta";
                    if (recipe) {
                        recipeTitleForComments = recipe.title;
                    }

                    if (commentsModal) {
                        commentsModal.style.display = 'flex';
                    }

                    if (typeof window.loadCommentsForRecipeModal === 'function') {
                        window.loadCommentsForRecipeModal(recipeId, recipeTitleForComments);
                    } else {
                        console.error("Funzione 'loadCommentsForRecipeModal' non trovata. Assicurati che comments-script.js sia caricato correttamente.");
                    }
                } else {
                    console.error("ID ricetta non trovato per il pulsante commenta.");
                }
            });
        });
    }

    loadAndDisplayRecipes(); // Carica le ricette all'avvio della pagina

    if (addButton) {
        addButton.addEventListener('click', () => {
            window.location.href = 'AggiungiRicetta.html';
        });
    }

    // Gestione chiusura modal commenti
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (commentsModal) commentsModal.style.display = 'none';
        });
    }

    if (commentsModal) {
        commentsModal.addEventListener('click', (event) => {
            if (event.target === commentsModal) {
                commentsModal.style.display = 'none';
            }
        });
    }
});