// js/recipe-interaction.js

// js/global-sync.js

document.addEventListener('DOMContentLoaded', () => {
    // Questa funzione viene chiamata quando lo stato di un like cambia in QUALSIASI PAGINA.
    // L'obiettivo è ri-renderizzare le sezioni delle ricette che mostrano lo stato dei like.
    window.refreshAllRecipeDisplays = function() {

        // Aggiorna la pagina del profilo se è presente e ha la funzione globale
        if (typeof window.loadLikedRecipes === 'function') {
            window.loadLikedRecipes();
        }

        // Aggiorna le pagine di categoria se sono presenti e hanno la funzione globale
        if (typeof window.loadAndDisplayRecipes === 'function') {
            window.loadAndDisplayRecipes();
        }

        // Aggiorna la pagina dei dettagli se è presente e ha la funzione globale
        if (typeof window.refreshDetailsPage === 'function') {
            window.refreshDetailsPage();
        }
    };

    // Aggiungi un listener per gli eventi di `storage`
    // Questo cattura i cambiamenti a localStorage che avvengono in *altre* tab/finestre.
    window.addEventListener('storage', (event) => {
        // Controlla se la chiave 'users' è stata modificata
        if (event.key === 'users' && event.newValue !== event.oldValue) {
            // Un breve timeout per dare tempo al browser di processare completamente il cambiamento in localStorage
            setTimeout(() => {
                window.refreshAllRecipeDisplays();
            }, 50); // Piccolo ritardo per evitare race conditions
        }
    });

});