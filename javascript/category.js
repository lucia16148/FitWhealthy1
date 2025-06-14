// js/category-page-script.js

document.addEventListener('DOMContentLoaded', () => {
    const recipeGrid = document.getElementById('category-recipe-grid');
    const addButton = document.querySelector('.add-button');

    function getPageRecipeType() {
        const path = window.location.pathname;
        if (path.includes('RicettePrimi.html')) return 'primo';
        if (path.includes('RicetteSecondi.html')) return 'secondo';
        if (path.includes('dolci.html')) return 'dolce';
        if (path.includes('contorni.html')) return 'contorno';
        return null;
    }
    const currentPageType = getPageRecipeType();

    // --- DATABASE DELLE RICETTE STATICHE PREIMPOSTATE ---
    const staticRecipes = {
        'spaghetti-pomodoro': { id: 'spaghetti-pomodoro', title: 'Spaghetti al Pomodoro', imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Spaghetti', ingredients: `...`, instructions: `...`, type: 'primo' },
        'risotto-funghi': { id: 'risotto-funghi', title: 'Risotto ai Funghi', imageUrl: 'https://via.placeholder.com/180x120/FFD700?text=Risotto+Funghi', ingredients: `...`, instructions: `...`, type: 'primo' },
        'filetto-pesce': { id: 'filetto-pesce', title: 'Filetto di pesce al forno', imageUrl: '../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'pollo-limone': { id: 'pollo-limone', title: 'Pollo al Limone', imageUrl: 'https://via.placeholder.com/180x120/ADD8E6?text=Pollo+Limone', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'orata-cartoccio': { id: 'orata-cartoccio', title: 'Orata al cartoccio', imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Orata+al+cartoccio', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'insalata-pollo': { id: 'insalata-pollo', title: 'Insalata di pollo', imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Insalata+di+pollo', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'carne-pizzaiola': { id: 'carne-pizzaiola', title: 'Carne alla pizzaiola', imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Carne+pizzaola', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'calamari-limone': { id: 'calamari-limone', title: 'Calamari al limone', imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Calamari+limone', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'pollo-curry': { id: 'pollo-curry', title: 'Pollo al curry', imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Pollo+curry', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'tiramisu': { id: 'tiramisu', title: 'Tiramisù Classico', imageUrl: 'https://via.placeholder.com/180x120/DAA520?text=Tiramisu', ingredients: `...`, instructions: `...`, type: 'dolce' },
        'patate-forno': { id: 'patate-forno', title: 'Patate al Forno', imageUrl: 'https://via.placeholder.com/180x120/FFA500?text=Patate+Forno', ingredients: `...`, instructions: `...`, type: 'contorno' }
        // ... AGGIUNGI QUI TUTTE LE TUE RICETTE STATICHE ESISTENTI
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
                        <img src="${recipe.imageUrl}" alt="${recipe.title}">
                    </div>
                    <div class="recipe-details">
                        <p>${recipe.title}</p>
                    </div>
                </a>
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