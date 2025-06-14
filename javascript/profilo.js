// profile-script.js

// js/profile-script.js

document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profile-avatar');
    const avatarUpload = document.getElementById('avatar-upload');
    const changeAvatarButton = document.getElementById('change-avatar-button');

    const userName = document.getElementById('user-name');
    const displayWeight = document.getElementById('display-weight');
    const displayHeight = document.getElementById('display-height'); // Corretto
    const displayAge = document.getElementById('display-age');
    const displayEmail = document.getElementById('display-email');
    const displayPhone = document.getElementById('display-phone');

    const inputWeight = document.getElementById('input-weight');
    const inputHeight = document.getElementById('input-height');
    const inputAge = document.getElementById('input-age');
    const inputEmail = document.getElementById('input-email');
    const inputPhone = document.getElementById('input-phone');

    const editProfileButton = document.getElementById('edit-profile-button');
    const saveProfileButton = document.getElementById('save-profile-button');

    const createdRecipesGrid = document.getElementById('created-recipes-grid');
    const likedRecipesGrid = document.getElementById('liked-recipes-grid');

    let loggedInUser = null; // Sarà l'oggetto utente loggato

    // --- UTILITY PER L'UTENTE E I DATI ---
    function saveUserToLocalStorage(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            console.warn("Utente non trovato in localStorage per l'aggiornamento in profile-script.js.");
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
        }
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    }

    function toggleLikeStatus(recipeId) {
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
        window.loadLikedRecipes(); // Ricarica la sezione delle ricette preferite nel profilo

        // Notifica il sistema di sincronizzazione globale
        if (typeof window.refreshAllRecipeDisplays === 'function') {
            window.refreshAllRecipeDisplays();
        }

        return isLiked;
    }

    function isRecipeLiked(recipeId) {
        if (!loggedInUser || !loggedInUser.email) {
            return false;
        }
        const likedRecipeIds = loggedInUser.likedRecipeIds || [];
        return likedRecipeIds.includes(recipeId);
    }

    // --- GESTIONE UTENTE LOGGATO ---
    function checkLoginStatus() {
        const userString = sessionStorage.getItem('loggedInUser');
        if (userString) {
            loggedInUser = JSON.parse(userString);
            if (loggedInUser.email) {
                displayUserProfile(loggedInUser);
                loadUserRecipes(loggedInUser);
                window.loadLikedRecipes(); // Chiamata iniziale della funzione globale
            } else {
                console.error("L'oggetto utente in sessionStorage non ha la proprietà 'email'.");
                alert('Dati utente non validi. Effettua nuovamente il login.');
                sessionStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            }
        } else {
            alert('Devi effettuare il login per visualizzare il tuo profilo.');
            window.location.href = 'login.html';
        }
    }

    function displayUserProfile(user) {
        userName.textContent = user.name || 'Nome Cognome';
        profileAvatar.src = user.avatar || '../image/default-avatar.png';

        displayWeight.textContent = user.weight ? `${user.weight} kg` : '-- kg';
        displayHeight.textContent = user.height ? `${user.height} cm` : '-- cm';
        displayAge.textContent = user.age ? `${user.age} anni` : '-- anni';
        displayEmail.textContent = user.email || '--';
        displayPhone.textContent = user.phone || '--';

        inputWeight.value = user.weight || '';
        inputHeight.value = user.height || '';
        inputAge.value = user.age || '';
        inputEmail.value = user.email || '';
        inputPhone.value = user.phone || '';

        inputEmail.disabled = true; // L'email non è modificabile se è l'ID
        toggleEditMode(false);
    }

    function toggleEditMode(isEditing) {
        displayWeight.style.display = isEditing ? 'none' : 'inline';
        inputWeight.style.display = isEditing ? 'inline' : 'none';

        displayHeight.style.display = isEditing ? 'none' : 'inline';
        inputHeight.style.display = isEditing ? 'inline' : 'none';

        displayAge.style.display = isEditing ? 'none' : 'inline';
        inputAge.style.display = isEditing ? 'inline' : 'none';

        displayEmail.style.display = isEditing ? 'none' : 'inline';
        inputEmail.style.display = isEditing ? 'inline' : 'none';

        displayPhone.style.display = isEditing ? 'none' : 'inline';
        inputPhone.style.display = isEditing ? 'inline' : 'none';

        editProfileButton.style.display = isEditing ? 'none' : 'block';
        saveProfileButton.style.display = isEditing ? 'block' : 'none';

        changeAvatarButton.style.display = isEditing ? 'block' : 'none';
    }

    editProfileButton.addEventListener('click', () => {
        toggleEditMode(true);
    });

    saveProfileButton.addEventListener('click', () => {
        if (loggedInUser && loggedInUser.email) {
            loggedInUser.weight = inputWeight.value;
            loggedInUser.height = inputHeight.value;
            loggedInUser.age = inputAge.value;
            loggedInUser.phone = inputPhone.value;

            saveUserToLocalStorage(loggedInUser);
            displayUserProfile(loggedInUser);
            alert('Profilo aggiornato con successo!');
        } else {
            alert('Errore: Utente non loggato o dati non validi per il salvataggio.');
        }
    });

    // --- GESTIONE AVATAR ---
    changeAvatarButton.addEventListener('click', () => {
        avatarUpload.click();
    });

    avatarUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileAvatar.src = e.target.result;
                if (loggedInUser && loggedInUser.email) {
                    loggedInUser.avatar = e.target.result;
                    saveUserToLocalStorage(loggedInUser);
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // --- FUNZIONI DI SUPPORTO PER LE RICETTE (DATABASE STATICO) ---
    const allStaticRecipes = {
        'spaghetti-pomodoro': { id: 'spaghetti-pomodoro', title: 'Spaghetti al Pomodoro', imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Spaghetti', ingredients: `...`, instructions: `...`, type: 'primo' },
        'risotto-funghi': { id: 'risotto-funghi', title: 'Risotto ai Funghi', imageUrl: 'https://via.placeholder.com/180x120/FFD700?text=Risotto+Funghi', ingredients: `...`, instructions: `...`, type: 'primo' },
        'filetto-pesce': { id: 'filetto-pesce', title: 'Filetto di pesce al forno', imageUrl: '../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg', ingredients: `...`, instructions: `...`, type: 'secondo' },
        'tiramisu': { id: 'tiramisu', title: 'Tiramisù', imageUrl: 'https://via.placeholder.com/180x120/FFB6C1?text=Tiramisu', ingredients: `...`, instructions: `...`, type: 'dessert' },
        'patate-forno': { id: 'patate-forno', title: 'Patate al Forno', imageUrl: 'https://via.placeholder.com/180x120/8B4513?text=Patate+Forno', ingredients: `...`, instructions: `...`, type: 'contorno' },
        // ... AGGIUNGI QUI TUTTE LE TUE RICETTE STATICHE ESISTENTI
    };

    function getRecipeDetailsById(recipeId) {
        if (allStaticRecipes[recipeId]) {
            return allStaticRecipes[recipeId];
        }
        const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
        return customRecipes.find(r => r.id === recipeId);
    }

    function generateRecipeCardHtml(recipe, showDeleteButton = false) {
        if (!recipe) return '';
        const isCurrentlyLiked = isRecipeLiked(recipe.id);
        const heartIcon = isCurrentlyLiked ? '♥' : '♡';
        const likedClass = isCurrentlyLiked ? ' liked' : '';

        let actionButtons = `<button class="like-button${likedClass}" data-recipe-id="${recipe.id}">${heartIcon}</button>`;
        if (showDeleteButton) {
            actionButtons += `<button class="delete-custom-recipe-button" data-recipe-id="${recipe.id}">🗑️</button>`;
        }

        return `
            <div class="recipe-card-profile" data-recipe-id="${recipe.id}">
                <a href="DettagliRicetta.html?id=${recipe.id}">
                    <img src="${recipe.imageUrl}" alt="${recipe.title}">
                    <h4>${recipe.title}</h4>
                </a>
                <div class="actions">
                    ${actionButtons}
                </div>
            </div>
        `;
    }

    // --- CARICAMENTO RICETTE CREATE ---
    function loadUserRecipes(user) {
        createdRecipesGrid.innerHTML = '';
        if (!user || !user.email) {
            createdRecipesGrid.innerHTML = '<p>Accedi per vedere le ricette che hai creato.</p>';
            return;
        }

        const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
        const userCreatedRecipes = customRecipes.filter(
            recipe => recipe.creatorId === user.email
        );

        if (userCreatedRecipes.length === 0) {
            createdRecipesGrid.innerHTML = '<p>Non hai ancora creato nessuna ricetta.</p>';
        } else {
            userCreatedRecipes.forEach(recipe => {
                createdRecipesGrid.insertAdjacentHTML('beforeend', generateRecipeCardHtml(recipe, true));
            });
            document.querySelectorAll('#created-recipes-grid .delete-custom-recipe-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const recipeIdToDelete = event.target.dataset.recipeId;
                    if (confirm('Sei sicuro di voler eliminare questa ricetta?')) {
                        deleteCustomRecipe(recipeIdToDelete);
                    }
                });
            });
        }
    }

    function deleteCustomRecipe(recipeId) {
        let customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
        const updatedRecipes = customRecipes.filter(recipe => recipe.id !== recipeId);

        if (updatedRecipes.length < customRecipes.length) {
            sessionStorage.setItem('customRecipes', JSON.stringify(updatedRecipes));
            alert('Ricetta eliminata con successo dal tuo profilo!');
            if (loggedInUser && loggedInUser.email) {
                loggedInUser.createdRecipeIds = loggedInUser.createdRecipeIds.filter(id => id !== recipeId);
                saveUserToLocalStorage(loggedInUser);
            }
            loadUserRecipes(loggedInUser);
            // Notifica il sistema di sincronizzazione globale
            if (typeof window.refreshAllRecipeDisplays === 'function') {
                window.refreshAllRecipeDisplays();
            }
        } else {
            alert('Errore: Ricetta non trovata per l\'eliminazione.');
        }
    }

    // --- CARICAMENTO RICETTE PREFERITE (LIKED) - Funzione resa globale ---
    window.loadLikedRecipes = function() {
        likedRecipesGrid.innerHTML = '';
        if (!loggedInUser || !loggedInUser.email) {
            likedRecipesGrid.innerHTML = '<p>Accedi per vedere le tue ricette preferite.</p>';
            return;
        }

        // Rileggi loggedInUser da sessionStorage per assicurarti che sia l'ultima versione
        loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (!loggedInUser) return; // Se per qualche motivo l'utente è sparito

        const likedRecipeIds = loggedInUser.likedRecipeIds || [];

        if (likedRecipeIds.length === 0) {
            likedRecipesGrid.innerHTML = '<p>Non hai ancora messo "Mi Piace" a nessuna ricetta.</p>';
        } else {
            likedRecipeIds.forEach(recipeId => {
                const recipe = getRecipeDetailsById(recipeId);
                if (recipe) {
                    likedRecipesGrid.insertAdjacentHTML('beforeend', generateRecipeCardHtml(recipe, false));
                }
            });
            document.querySelectorAll('#liked-recipes-grid .like-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const recipeId = event.target.dataset.recipeId;
                    toggleLikeStatus(recipeId);
                });
            });
        }
    }

    checkLoginStatus(); // Avvia il controllo dello stato di login
});