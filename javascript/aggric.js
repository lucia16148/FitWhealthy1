// add-recipe-script.js (AGGIORNATO)

// Mappa per associare il tipo di ricetta alla pagina HTML corrispondente
const recipeTypeToPageMap = {
    'primo': 'RicettePrimi.html',
    'secondo': 'RicetteSecondi.html',
    'dolce': 'RicetteDolci.html',
    'contorno': 'RicetteContorni.html'
};

document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image-input');
    const imagePlaceholder = document.querySelector('.image-placeholder');
    const uploadButton = document.querySelector('.upload-button');
    const publishButton = document.querySelector('.publish-button');

    let uploadedImageBase64 = '';

    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImageBase64 = e.target.result;
                imagePlaceholder.innerHTML = `<img src="${e.target.result}" alt="Immagine Caricata" style="max-width:100%; max-height:100%; object-fit:contain;">`;
            };
            reader.readAsDataURL(this.files[0]);
        } else {
            uploadedImageBase64 = '';
        }
    });

    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Devi essere loggato per aggiungere una ricetta!');
        window.location.href = 'login.html';
        return;
    }

    if (publishButton) {
        publishButton.addEventListener('click', () => {
            const recipeName = document.getElementById('recipe-name').value.trim();
            const recipeType = document.getElementById('recipe-type').value;
            const instructions = document.querySelector('.instructions-section .text-area').value.trim();
            const ingredients = document.querySelector('.ingredients-section .text-area').value.trim();

            if (!recipeName || !recipeType || !instructions || !ingredients || !uploadedImageBase64) {
                alert('Per favore, compila tutti i campi e carica un\'immagine per la ricetta.');
                return;
            }

            const newRecipe = {
                id: 'custom-' + Date.now(),
                title: recipeName,
                imageUrl: uploadedImageBase64,
                ingredients: ingredients,
                instructions: instructions,
                type: recipeType,
                creatorId: loggedInUser.email // ASSOCIA LA RICETTA ALL'UTENTE

            };
            console.log()
            let customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
            customRecipes.push(newRecipe);
            sessionStorage.setItem('customRecipes', JSON.stringify(customRecipes));

            loggedInUser.createdRecipeIds = loggedInUser.createdRecipeIds || [];
            loggedInUser.createdRecipeIds.push(newRecipe.id);
            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.email === loggedInUser.email);
            if (userIndex !== -1) {
                users[userIndex] = loggedInUser;
                localStorage.setItem('users', JSON.stringify(users));
            }

            alert('Ricetta pubblicata e salvata nel browser!');

            // Reindirizza alla pagina specifica del tipo di ricetta
            const targetPage = recipeTypeToPageMap[recipeType];
            if (targetPage) {
                window.location.href = targetPage;
            } else {
                alert('Tipo di ricetta non riconosciuto, reindirizzamento alla homepage.');
                window.location.href = 'mainpageloggato.html'; // Fallback
            }
        });
    }

    if (uploadButton) {
        uploadButton.addEventListener('click', () => {
            imageInput.click();
        });
    }
});