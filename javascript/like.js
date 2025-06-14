// js/recipe-interaction.js

// js/global-sync.js

document.addEventListener('DOMContentLoaded', () => {
    // Questa funzione viene chiamata quando lo stato di un like cambia in QUALSIASI PAGINA.
    // L'obiettivo è ri-renderizzare le sezioni delle ricette che mostrano lo stato dei like.
    window.refreshAllRecipeDisplays = function() {
        console.log("Global sync: Notifica di cambiamento like ricevuta. Aggiorno le UI.");

        // Aggiorna la pagina del profilo se è presente e ha la funzione globale
        if (typeof window.loadLikedRecipes === 'function') {
            console.log("Global sync: Chiamando window.loadLikedRecipes()");
            window.loadLikedRecipes();
        }

        // Aggiorna le pagine di categoria se sono presenti e hanno la funzione globale
        if (typeof window.loadAndDisplayRecipes === 'function') {
            console.log("Global sync: Chiamando window.loadAndDisplayRecipes()");
            window.loadAndDisplayRecipes();
        }

        // Aggiorna la pagina dei dettagli se è presente e ha la funzione globale
        if (typeof window.refreshDetailsPage === 'function') {
            console.log("Global sync: Chiamando window.refreshDetailsPage()");
            window.refreshDetailsPage();
        }
    };

    // Aggiungi un listener per gli eventi di `storage`
    // Questo cattura i cambiamenti a localStorage che avvengono in *altre* tab/finestre.
    window.addEventListener('storage', (event) => {
        // Controlla se la chiave 'users' è stata modificata
        if (event.key === 'users' && event.newValue !== event.oldValue) {
            console.log('Global sync: localStorage "users" cambiato da un\'altra tab/finestra.');
            // Un breve timeout per dare tempo al browser di processare completamente il cambiamento in localStorage
            setTimeout(() => {
                window.refreshAllRecipeDisplays();
            }, 50); // Piccolo ritardo per evitare race conditions
        }
    });

});