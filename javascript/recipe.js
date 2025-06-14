// document.addEventListener('DOMContentLoaded', () => {
//     const recipeTypeToPageMap = {
//         'primo': 'RicettePrimi.html',
//         'secondo': 'RicetteSecondi.html',
//         'dolce': 'RicetteDolci.html',
//         'contorno': 'RicetteContorni.html'
//         // Aggiungi altri tipi se necessario
//     };
//
//     const likeButton = document.getElementById('details-like-button'); // Assumi un ID per il cuore nella pagina dettagli
//     const urlParams = new URLSearchParams(window.location.search);
//     const recipeId = urlParams.get('id');
//
//     const staticRecipes = {
//         'spaghetti-pomodoro': {
//             title: 'Spaghetti al Pomodoro',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Spaghetti+Grande',
//             ingredients: `<h3>Per 2 persone:</h3><ul><li>200g Spaghetti</li><li>400g Pomodori pelati</li><li>1 spicchio Aglio</li><li>Olio EVO q.b.</li><li>Basilico fresco q.b.</li></ul>`,
//             instructions: `<li>Far soffriggere l'aglio in olio.</li><li>Aggiungere i pomodori e cuocere per 20 minuti.</li><li>Cuocere gli spaghetti.</li><li>Scolare e unire al sugo.</li><li>Guarnire con basilico.</li>`,
//             type: 'primo' // AGGIUNTO IL TIPO!
//         },
//         'risotto-funghi': {
//             title: 'Risotto ai Funghi',
//             imageUrl: 'https://via.placeholder.com/400x250/FFD700?text=Risotto+Funghi+Grande',
//             ingredients: `<h3>Per 2 persone:</h3><ul><li>160g Riso Carnaroli</li><li>200g Funghi misti</li><li>Brodo vegetale q.b.</li><li>1/2 Cipolla</li><li>Burro e Parmigiano q.b.</li></ul>`,
//             instructions: `<li>Soffriggere la cipolla, aggiungere il riso e tostare.</li><li>Aggiungere i funghi e sfumare con vino (opzionale).</li><li>Cuocere il riso aggiungendo brodo poco alla volta.</li><li>Mantecare con burro e parmigiano.</li>`,
//             type: 'primo' // AGGIUNTO IL TIPO!
//         },
//         'filetto-pesce': {
//             title: 'Filetto di pesce al forno',
//             imageUrl: '../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg',
//             ingredients: `<h3>Per il pesce:</h3><ul><li>filetto di pesce 1</li><li>brodo granulare di pesce 1 cucchiaino raso</li><li>limone 1</li><li>olio d'oliva extra vergine q.b.</li><li>paprica in polvere 1 cucchiaio</li><li>pepe q.b.</li></ul>`,
//             instructions: `<li>Prendete il filetto di pesce surgelato e ponetelo in una padella unta con un poco di olio.</li><li>Stemperate il dado di pesce in polvere in un bicchiere di acqua e aggiungetela in padella.</li><li>Profumate con una spolverata di paprica e portate a ebollizione, lasciate cuocere per una decina di minuti ponendo un coperchio sulla padella.</li><li>Se volete cucinare i filetti di pesce fresco veloce potete evitare di mettere l'acqua, ponete il filetto nella padella unta di olio e cuocete dieci minuti, girando a metà cottura.</li><li>Servite in tavola con qualche goccia di olio a crudo e un pizzico di pepe macinato al momento.</li>`,
//             type: 'secondo' // AGGIUNTO IL TIPO!
//         },
//         'pollo-limone': {
//             title: 'Pollo al Limone',
//             imageUrl: 'https://via.placeholder.com/400x250/ADD8E6?text=Pollo+Limone+Grande',
//             ingredients: `<h3>Per il pollo:</h3><ul><li>300g Petto di pollo</li><li>Succo di 1 limone</li><li>Farina q.b.</li><li>Olio EVO q.b.</li><li>Brodo vegetale q.b.</li></ul>`,
//             instructions: `<li>Tagliare il pollo a striscioline e infarinarlo.</li><li>Rosolare il pollo in padella con olio.</li><li>Aggiungere succo di limone e brodo, cuocere fino a che non si addensa la salsa.</li><li>Servire caldo.</li>`,
//             type: 'secondo' // AGGIUNTO IL TIPO!
//         },
//         'tiramisu': {
//             title: 'Tiramisù Classico',
//             imageUrl: 'https://via.placeholder.com/400x250/DAA520?text=Tiramisu+Grande',
//             ingredients: `<h3>Per 4 persone:</h3><ul><li>250g Mascarpone</li><li>3 Uova</li><li>80g Zucchero</li><li>Caffè q.b.</li><li>Savoiardi q.b.</li><li>Cacao amaro q.b.</li></ul>`,
//             instructions: `<li>Preparare il caffè e farlo raffreddare.</li><li>Montare i tuorli con lo zucchero, aggiungere il mascarpone.</li><li>Montare gli albumi a neve e incorporarli.</li><li>Bagnare i savoiardi nel caffè e alternare strati con la crema.</li><li>Spolverare con cacao e far riposare in frigo.</li>`,
//             type: 'dolce' // AGGIUNTO IL TIPO!
//         },
//         'patate-forno': {
//             title: 'Patate al Forno',
//             imageUrl: 'https://via.placeholder.com/400x250/FFA500?text=Patate+Forno+Grande',
//             ingredients: `<h3>Per 2 persone:</h3><ul><li>500g Patate</li><li>Rosmarino q.b.</li><li>Olio EVO q.b.</li><li>Sale e pepe q.b.</li></ul>`,
//             instructions: `<li>Tagliare le patate a cubetti.</li><li>Condirle con olio, rosmarino, sale e pepe.</li><li>Cuocere in forno a 200°C per 30-40 minuti.</li>`,
//             type: 'contorno' // AGGIUNTO IL TIPO!
//         },
//         // --- NUOVE RICETTE AGGIUNTE DI RECENTE (ASSICURATI CHE SIANO LE ULTIME VERSIONI COMPLETE) ---
//         'orata-cartoccio': {
//             title: 'Orata al cartoccio',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Orata+al+cartoccio+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Orata</li><li>Pomodorini</li><li>Limone</li><li>Prezzemolo</li><li>Olio EVO</li></ul>`,
//             instructions: `<li>Pulire l'orata.</li><li>Riempire con pomodorini, fette di limone e prezzemolo.</li><li>Chiudere nel cartoccio e cuocere in forno.</li>`,
//             type: 'secondo' // AGGIUNTO IL TIPO!
//         },
//         'insalata-pollo': {
//             title: 'Insalata di pollo',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Insalata+di+pollo+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Petto di pollo</li><li>Insalata mista</li><li>Pomodorini</li><li>Mais</li><li>Salsa yogurt</li></ul>`,
//             instructions: `<li>Bollire o grigliare il petto di pollo e tagliarlo a cubetti.</li><li>Unire tutti gli ingredienti e condire.</li>`,
//             type: 'secondo' // AGGIUNTO IL TIPO!
//         },
//         'carne-pizzaiola': {
//             title: 'Carne alla pizzaiola',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Carne+pizzaola+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Fettine di carne</li><li>Passata di pomodoro</li><li>Origano</li><li>Aglio</li></ul>`,
//             instructions: `<li>Soffriggere l'aglio.</li><li>Aggiungere la passata e l'origano, cuocere.</li><li>Aggiungere le fettine di carne e cuocere fino a che non sono tenere.</li>`,
//             type: 'secondo' // AGGIUNTO IL TIPO!
//         },
//         'calamari-limone': {
//             title: 'Calamari al limone',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Calamari+limone+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Calamari</li><li>Succo di limone</li><li>Prezzemolo</li><li>Aglio</li><li>Olio EVO</li></ul>`,
//             instructions: `<li>Pulire i calamari e tagliarli ad anelli.</li><li>Cuocere in padella con aglio e olio.</li><li>Sfumare con limone e aggiungere prezzemolo.</li>`,
//             type: 'secondo' // AGGIUNTO IL TIPO!
//         },
//         'pollo-curry': {
//             title: 'Pollo al curry',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Pollo+curry+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Petto di pollo</li><li>Latte di cocco</li><li>Curry in polvere</li><li>Cipolla</li></ul>`,
//             instructions: `<li>Soffriggere la cipolla, aggiungere il pollo e dorare.</li><li>Aggiungere curry e latte di cocco, cuocere.</li>`,
//             type: 'secondo' // AGGIUNTO IL TIPO!
//         },
//         'gnocchi-pesto': {
//             title: 'Gnocchi al pesto',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Gnocchi+pesto+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Gnocchi di patate</li><li>Pesto alla genovese</li><li>Parmigiano Reggiano</li></ul>`,
//             instructions: `<li>Lessare gli gnocchi in acqua salata.</li><li>Scolare e condire con il pesto.</li><li>Servire con parmigiano.</li>`,
//             type: 'primo' // AGGIUNTO IL TIPO!
//         },
//         'zuppa-lenticchie': {
//             title: 'Zuppa di lenticchie',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Zuppa+lenticchie+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Lenticchie</li><li>Carote</li><li>Sedano</li><li>Cipolla</li><li>Brodo vegetale</li></ul>`,
//             instructions: `<li>Preparare un soffritto con carote, sedano e cipolla.</li><li>Aggiungere le lenticchie e il brodo.</li><li>Cuocere fino a che le lenticchie non sono tenere.</li>`,
//             type: 'primo' // AGGIUNTO IL TIPO!
//         },
//         'torta-cioccolato': {
//             title: 'Torta al cioccolato',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Torta+cioccolato+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Farina</li><li>Zucchero</li><li>Cacao in polvere</li><li>Uova</li><li>Burro</li><li>Latte</li></ul>`,
//             instructions: `<li>Mescolare gli ingredienti secchi, poi aggiungere quelli liquidi.</li><li>Versare in uno stampo e cuocere in forno.</li>`,
//             type: 'dolce' // AGGIUNTO IL TIPO!
//         },
//         'fiori-zucca-forno': {
//             title: 'Fiori di zucca al forno',
//             imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Fiori+di+zucca+Grande',
//             ingredients: `<h3>Ingredienti:</h3><ul><li>Fiori di zucca</li><li>Farcitura (es. mozzarella e acciughe)</li><li>Olio EVO</li><li>Sale e pepe</li></ul>`,
//             instructions: `<li>Pulire i fiori di zucca.</li><li>Farcire e disporre su una teglia.</li><li>Cuocere in forno finché dorati.</li>`,
//             type: 'contorno' // AGGIUNTO IL TIPO!
//         }
//         // Aggiungi QUI TUTTE le tue ricette statiche rimanenti, una per una, usando il loro ID come chiave
//     };
//
//     const deleteButton = document.getElementById('delete-recipe-button');
//     const backButton = document.querySelector('.back-home'); // Seleziona il bottone della sidebar
//     let currentRecipeId = null;
//
//     const commentsModal = document.getElementById('comments-modal');
//     const closeButton = commentsModal.querySelector('.close-button');
//
//     function saveUserToLocalStorage(user) {
//         let users = JSON.parse(localStorage.getItem('users')) || [];
//         const userIndex = users.findIndex(u => u.email === user.email);
//         if (userIndex !== -1) {
//             users[userIndex] = user;
//             localStorage.setItem('users', JSON.stringify(users));
//         } else {
//             console.warn("Utente non trovato in localStorage per l'aggiornamento in category-page-script.js.");
//         }
//         sessionStorage.setItem('loggedInUser', JSON.stringify(user));
//     }
//
//     function toggleLikeStatus(recipeId) {
//         let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
//         if (!loggedInUser || !loggedInUser.email) {
//             alert('Devi effettuare il login per mettere Mi Piace o rimuoverlo.');
//             return false;
//         }
//
//         loggedInUser.likedRecipeIds = loggedInUser.likedRecipeIds || [];
//         const index = loggedInUser.likedRecipeIds.indexOf(recipeId);
//         let isLiked;
//
//         if (index === -1) {
//             loggedInUser.likedRecipeIds.push(recipeId);
//             isLiked = true;
//             console.log(`Ricetta '${recipeId}' aggiunta ai preferiti di '${loggedInUser.email}'.`);
//         } else {
//             loggedInUser.likedRecipeIds.splice(index, 1);
//             isLiked = false;
//             console.log(`Ricetta '${recipeId}' rimossa dai preferiti di '${loggedInUser.email}'.`);
//         }
//
//         saveUserToLocalStorage(loggedInUser);
//
//         // Notifica il sistema di sincronizzazione globale
//         if (typeof window.refreshAllRecipeDisplays === 'function') {
//             window.refreshAllRecipeDisplays();
//         }
//
//         return isLiked;
//     }
//
//     function isRecipeLiked(recipeId) {
//         const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
//         if (!loggedInUser || !loggedInUser.email) {
//             return false;
//         }
//         const likedRecipeIds = loggedInUser.likedRecipeIds || [];
//         return likedRecipeIds.includes(recipeId);
//     }
//
//     function updateHeartIcon(button, isLiked) {
//         if (isLiked) {
//             button.classList.add('liked');
//             button.innerHTML = '❤️';
//         } else {
//             button.classList.remove('liked');
//             button.innerHTML = '♡';
//         }
//     }
//
//     // Funzione per ottenere l'ID della ricetta dall'URL
//     function getRecipeIdFromUrl() {
//         // NUOVI CONSOLE.LOG PER DEBUGGING
//         const urlParams = new URLSearchParams(window.location.search);
//         const recipeId = urlParams.get('id');
//         return recipeId;
//     }
//
//     function getRecipeDetailsById(recipeId) {
//         let recipe = staticRecipes[recipeId];
//         if (!recipe) {
//             const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
//             recipe = customRecipes.find(r => r.id === recipeId);
//         }
//         return recipe;
//     }
//
//     // Funzione per caricare i dettagli della ricetta
//     function loadRecipeDetails() {
//         const recipeId = getRecipeIdFromUrl();
//         let recipe = null;
//
//         // 1. Cerca prima nelle ricette statiche
//         if (staticRecipes[recipeId]) {
//             recipe = staticRecipes[recipeId];
//         } else {
//             // 2. Se non trovata nelle statiche, cerca nelle ricette custom dal LocalStorage
//             const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
//             recipe = customRecipes.find(r => r.id === recipeId);
//         }
//
//
//
//         // Popola la pagina se la ricetta è stata trovata
//         if (recipe) {
//             document.title = `FitWhealty - ${recipe.title}`;
//             document.getElementById('recipe-title').textContent = recipe.title;
//             document.getElementById('recipe-image').src = recipe.imageUrl;
//             document.getElementById('recipe-image').alt = recipe.title;
//             // Assicurati che l'HTML degli ingredienti e delle istruzioni sia già formattato come vuoi (es. con <h3> o <ul>)
//             document.getElementById('ingredients-content').innerHTML = recipe.ingredients;
//             document.getElementById('instructions-content').innerHTML = recipe.instructions;
//
//             if (recipe.type && recipeTypeToPageMap[recipe.type]) {
//                 backButton.href = recipeTypeToPageMap[recipe.type]; // Imposta l'href
//                 // Capitalizza la prima lettera del tipo per il testo del bottone
//                 const typeDisplayName = recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1);
//                 backButton.innerHTML = `&lt; ${typeDisplayName}`; // Imposta il testo
//             } else {
//                 backButton.href = 'index.html'; // Fallback alla homepage
//                 backButton.innerHTML = `&lt; HomePage`;
//             }
//
//         } else {
//             // Messaggio di errore se la ricetta non viene trovata
//             document.getElementById('recipe-title').textContent = 'Ricetta non trovata!';
//             document.getElementById('ingredients-content').innerHTML = '<p>Spiacenti, questa ricetta non esiste o non è stata ancora pubblicata.</p>';
//             document.getElementById('instructions-content').innerHTML = '';
//             document.getElementById('recipe-image').src = ''; // Rimuovi l'immagine se non trovata
//             document.getElementById('recipe-image').alt = '';
//         }
//
//     }
//
//     // Carica i dettagli della ricetta quando la pagina è pronta
//     loadRecipeDetails();
//
//
//     // --- Listener per i bottoni "Like" (se presenti nella pagina ricetta) ---
//     document.querySelectorAll('.like-button').forEach(button => {
//         button.addEventListener('click', () => {
//             if (button.textContent === '♡') {
//                 button.textContent = '♥';
//                 button.style.color = '#FF6347'; // Rosso
//             } else {
//                 button.textContent = '♡';
//                 button.style.color = 'white'; // Colore per il cuore vuoto sul banner
//             }
//         });
//     });
//
//
//
//     // --- Listener per altri bottoni (es. "Add" o "Comment", se li hai) ---
//     const addButton = document.querySelector('.add-button'); // Se hai un bottone "Add" qui
//     if (addButton) {
//         addButton.addEventListener('click', () => {
//             window.location.href = 'AggiungiRicetta.html'; // Reindirizza alla pagina di aggiunta
//         });
//     }
//
//     // *** LOGICA PER L'APERTURA E CHIUSURA DEL MODAL COMMENTI ***
//     document.querySelectorAll('.comment-button').forEach(button => {
//         button.addEventListener('click', (event) => {
//             event.preventDefault();
//             event.stopPropagation();
//
//             commentsModal.style.display = 'flex'; // Mostra il modal
//             currentRecipeId=getRecipeIdFromUrl();
//             // Ottieni i dettagli completi della ricetta qui
//             const recipe = getRecipeDetailsById(currentRecipeId);
//             console.log(recipe);
//             let recipeTitleForComments = "Ricetta Sconosciuta";
//             if (recipe) {
//                 recipeTitleForComments = recipe.title;
//             }
//
//             // PASSAGGIO FONDAMENTALE: Chiamiamo la funzione di comments-script.js
//             // passando SIA l'ID della ricetta SIA il suo titolo.
//             if (typeof loadCommentsForRecipeModal === 'function') {
//                 loadCommentsForRecipeModal(currentRecipeId, recipeTitleForComments); // Passa ID e TITOLO
//             } else {
//                 console.error("Funzione 'loadCommentsForRecipeModal' non trovata in comments-script.js. Assicurati che sia definita e lo script sia caricato correttamente.");
//             }
//         });
//     });
//     // Listener per il pulsante di chiusura del modal
//     closeButton.addEventListener('click', () => {
//         commentsModal.style.display = 'none'; // Nasconde il modal
//     });
//
//     // Listener per chiudere il modal cliccando fuori dal contenuto
//     commentsModal.addEventListener('click', (event) => {
//         if (event.target === commentsModal) { // Se il click è sull'overlay stesso
//             commentsModal.style.display = 'none'; // Nasconde il modal
//         }
//     });
//
//     window.currentRecipeIdFromRecipePage = getRecipeIdFromUrl();
//
//
// });

document.addEventListener('DOMContentLoaded', () => {
    const recipeTypeToPageMap = {
        'primo': 'RicettePrimi.html',
        'secondo': 'RicetteSecondi.html',
        'dolce': 'RicetteDolci.html',
        'contorno': 'RicetteContorni.html'
        // Aggiungi altri tipi se necessario
    };

    const likeButton = document.getElementById('details-like-button'); // Assumi un ID per il cuore nella pagina dettagli
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    const staticRecipes = {
        'spaghetti-pomodoro': {
            title: 'Spaghetti al Pomodoro',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Spaghetti+Grande',
            ingredients: `<h3>Per 2 persone:</h3><ul><li>200g Spaghetti</li><li>400g Pomodori pelati</li><li>1 spicchio Aglio</li><li>Olio EVO q.b.</li><li>Basilico fresco q.b.</li></ul>`,
            instructions: `<li>Far soffriggere l'aglio in olio.</li><li>Aggiungere i pomodori e cuocere per 20 minuti.</li><li>Cuocere gli spaghetti.</li><li>Scolare e unire al sugo.</li><li>Guarnire con basilico.</li>`,
            type: 'primo'
        },
        'risotto-funghi': {
            title: 'Risotto ai Funghi',
            imageUrl: 'https://via.placeholder.com/400x250/FFD700?text=Risotto+Funghi+Grande',
            ingredients: `<h3>Per 2 persone:</h3><ul><li>160g Riso Carnaroli</li><li>200g Funghi misti</li><li>Brodo vegetale q.b.</li><li>1/2 Cipolla</li><li>Burro e Parmigiano q.b.</li></ul>`,
            instructions: `<li>Soffriggere la cipolla, aggiungere il riso e tostare.</li><li>Aggiungere i funghi e sfumare con vino (opzionale).</li><li>Cuocere il riso aggiungendo brodo poco alla volta.</li><li>Mantecare con burro e parmigiano.</li>`,
            type: 'primo'
        },
        'filetto-pesce': {
            title: 'Filetto di pesce al forno',
            imageUrl: '../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg',
            ingredients: `<h3>Per il pesce:</h3><ul><li>filetto di pesce 1</li><li>brodo granulare di pesce 1 cucchiaino raso</li><li>limone 1</li><li>olio d'oliva extra vergine q.b.</li><li>paprica in polvere 1 cucchiaio</li><li>pepe q.b.</li></ul>`,
            instructions: `<li>Prendete il filetto di pesce surgelato e ponetelo in una padella unta con un poco di olio.</li><li>Stemperate il dado di pesce in polvere in un bicchiere di acqua e aggiungetela in padella.</li><li>Profumate con una spolverata di paprica e portate a ebollizione, lasciate cuocere per una decina di minuti ponendo un coperchio sulla padella.</li><li>Se volete cucinare i filetti di pesce fresco veloce potete evitare di mettere l'acqua, ponete il filetto nella padella unta di olio e cuocete dieci minuti, girando a metà cottura.</li><li>Servite in tavola con qualche goccia di olio a crudo e un pizzico di pepe macinato al momento.</li>`,
            type: 'secondo'
        },
        'pollo-limone': {
            title: 'Pollo al Limone',
            imageUrl: 'https://via.placeholder.com/400x250/ADD8E6?text=Pollo+Limone+Grande',
            ingredients: `<h3>Per il pollo:</h3><ul><li>300g Petto di pollo</li><li>Succo di 1 limone</li><li>Farina q.b.</li><li>Olio EVO q.b.</li><li>Brodo vegetale q.b.</li></ul>`,
            instructions: `<li>Tagliare il pollo a striscioline e infarinarlo.</li><li>Rosolare il pollo in padella con olio.</li><li>Aggiungere succo di limone e brodo, cuocere fino a che non si addensa la salsa.</li><li>Servire caldo.</li>`,
            type: 'secondo'
        },
        'tiramisu': {
            title: 'Tiramisù Classico',
            imageUrl: 'https://via.placeholder.com/400x250/DAA520?text=Tiramisu+Grande',
            ingredients: `<h3>Per 4 persone:</h3><ul><li>250g Mascarpone</li><li>3 Uova</li><li>80g Zucchero</li><li>Caffè q.b.</li><li>Savoiardi q.b.</li><li>Cacao amaro q.b.</li></ul>`,
            instructions: `<li>Preparare il caffè e farlo raffreddare.</li><li>Montare i tuorli con lo zucchero, aggiungere il mascarpone.</li><li>Montare gli albumi a neve e incorporarli.</li><li>Bagnare i savoiardi nel caffè e alternare strati con la crema.</li><li>Spolverare con cacao e far riposare in frigo.</li>`,
            type: 'dolce'
        },
        'patate-forno': {
            title: 'Patate al Forno',
            imageUrl: 'https://via.placeholder.com/400x250/FFA500?text=Patate+Forno+Grande',
            ingredients: `<h3>Per 2 persone:</h3><ul><li>500g Patate</li><li>Rosmarino q.b.</li><li>Olio EVO q.b.</li><li>Sale e pepe q.b.</li></ul>`,
            instructions: `<li>Tagliare le patate a cubetti.</li><li>Condirle con olio, rosmarino, sale e pepe.</li><li>Cuocere in forno a 200°C per 30-40 minuti.</li>`,
            type: 'contorno'
        },
        'orata-cartoccio': {
            title: 'Orata al cartoccio',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Orata+al+cartoccio+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Orata</li><li>Pomodorini</li><li>Limone</li><li>Prezzemolo</li><li>Olio EVO</li></ul>`,
            instructions: `<li>Pulire l'orata.</li><li>Riempire con pomodorini, fette di limone e prezzemolo.</li><li>Chiudere nel cartoccio e cuocere in forno.</li>`,
            type: 'secondo'
        },
        'insalata-pollo': {
            title: 'Insalata di pollo',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Insalata+di+pollo+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Petto di pollo</li><li>Insalata mista</li><li>Pomodorini</li><li>Mais</li><li>Salsa yogurt</li></ul>`,
            instructions: `<li>Bollire o grigliare il petto di pollo e tagliarlo a cubetti.</li><li>Unire tutti gli ingredienti e condire.</li>`,
            type: 'secondo'
        },
        'carne-pizzaiola': {
            title: 'Carne alla pizzaiola',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Carne+pizzaola+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Fettine di carne</li><li>Passata di pomodoro</li><li>Origano</li><li>Aglio</li></ul>`,
            instructions: `<li>Soffriggere l'aglio.</li><li>Aggiungere la passata e l'origano, cuocere.</li><li>Aggiungere le fettine di carne e cuocere fino a che non sono tenere.</li>`,
            type: 'secondo'
        },
        'calamari-limone': {
            title: 'Calamari al limone',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Calamari+limone+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Calamari</li><li>Succo di limone</li><li>Prezzemolo</li><li>Aglio</li><li>Olio EVO</li></ul>`,
            instructions: `<li>Pulire i calamari e tagliarli ad anelli.</li><li>Cuocere in padella con aglio e olio.</li><li>Sfumare con limone e aggiungere prezzemolo.</li>`,
            type: 'secondo'
        },
        'pollo-curry': {
            title: 'Pollo al curry',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Pollo+curry+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Petto di pollo</li><li>Latte di cocco</li><li>Curry in polvere</li><li>Cipolla</li></ul>`,
            instructions: `<li>Soffriggere la cipolla, aggiungere il pollo e dorare.</li><li>Aggiungere curry e latte di cocco, cuocere.</li>`,
            type: 'secondo'
        },
        'gnocchi-pesto': {
            title: 'Gnocchi al pesto',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Gnocchi+pesto+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Gnocchi di patate</li><li>Pesto alla genovese</li><li>Parmigiano Reggiano</li></ul>`,
            instructions: `<li>Lessare gli gnocchi in acqua salata.</li><li>Scolare e condire con il pesto.</li><li>Servire con parmigiano.</li>`,
            type: 'primo'
        },
        'zuppa-lenticchie': {
            title: 'Zuppa di lenticchie',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Zuppa+lenticchie+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Lenticchie</li><li>Carote</li><li>Sedano</li><li>Cipolla</li><li>Brodo vegetale</li></ul>`,
            instructions: `<li>Preparare un soffritto con carote, sedano e cipolla.</li><li>Aggiungere le lenticchie e il brodo.</li><li>Cuocere fino a che le lenticchie non sono tenere.</li>`,
            type: 'primo'
        },
        'torta-cioccolato': {
            title: 'Torta al cioccolato',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Torta+cioccolato+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Farina</li><li>Zucchero</li><li>Cacao in polvere</li><li>Uova</li><li>Burro</li><li>Latte</li></ul>`,
            instructions: `<li>Mescolare gli ingredienti secchi, poi aggiungere quelli liquidi.</li><li>Versare in uno stampo e cuocere in forno.</li>`,
            type: 'dolce'
        },
        'fiori-zucca-forno': {
            title: 'Fiori di zucca al forno',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Fiori+di+zucca+Grande',
            ingredients: `<h3>Ingredienti:</h3><ul><li>Fiori di zucca</li><li>Farcitura (es. mozzarella e acciughe)</li><li>Olio EVO</li><li>Sale e pepe</li></ul>`,
            instructions: `<li>Pulire i fiori di zucca.</li><li>Farcire e disporre su una teglia.</li><li>Cuocere in forno finché dorati.</li>`,
            type: 'contorno'
        }
    };

    const deleteButton = document.getElementById('delete-recipe-button');
    const backButton = document.querySelector('.back-home');
    let currentRecipeId = null;

    const commentsModal = document.getElementById('comments-modal');
    const closeButton = commentsModal ? commentsModal.querySelector('.close-button') : null; // Safe access

    // --- FUNZIONI DI UTILITY PER L'UTENTE E I DATI ---
    function saveUserToLocalStorage(user) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            console.warn("Utente non trovato in localStorage per l'aggiornamento in dettagli-ricetta-script.js.");
        }
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
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

        saveUserToLocalStorage(loggedInUser);

        // Notifica il sistema di sincronizzazione globale
        if (typeof window.refreshAllRecipeDisplays === 'function') {
            window.refreshAllRecipeDisplays();
        }

        return isLiked;
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
        if (button) { // Ensure button exists before trying to update
            if (isLiked) {
                button.classList.add('liked');
                button.innerHTML = '♥'; // Cuore pieno
            } else {
                button.classList.remove('liked');
                button.innerHTML = '♡'; // Cuore vuoto
            }
        }
    }

    // Funzione per ottenere l'ID della ricetta dall'URL
    function getRecipeIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    function getRecipeDetailsById(recipeIdToFind) {
        let recipe = staticRecipes[recipeIdToFind];
        if (!recipe) {
            const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];
            recipe = customRecipes.find(r => r.id === recipeIdToFind);
        }
        return recipe;
    }

    // Funzione per caricare i dettagli della ricetta e aggiornare lo stato del like
    function loadRecipeDetails() {
        currentRecipeId = getRecipeIdFromUrl(); // Imposta currentRecipeId qui
        let recipe = getRecipeDetailsById(currentRecipeId);

        if (recipe) {
            document.title = `FitWhealty - ${recipe.title}`;
            document.getElementById('recipe-title').textContent = recipe.title;
            document.getElementById('recipe-image').src = recipe.imageUrl;
            document.getElementById('recipe-image').alt = recipe.title;
            document.getElementById('ingredients-content').innerHTML = recipe.ingredients;
            document.getElementById('instructions-content').innerHTML = recipe.instructions;

            // Aggiorna lo stato iniziale del like button
            if (likeButton) {
                updateHeartIcon(likeButton, isRecipeLiked(currentRecipeId));
            }

            if (recipe.type && recipeTypeToPageMap[recipe.type]) {
                backButton.href = recipeTypeToPageMap[recipe.type];
                const typeDisplayName = recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1);
                backButton.innerHTML = `&lt; ${typeDisplayName}`;
            } else {
                backButton.href = 'index.html';
                backButton.innerHTML = `&lt; HomePage`;
            }


        } else {
            document.getElementById('recipe-title').textContent = 'Ricetta non trovata!';
            document.getElementById('ingredients-content').innerHTML = '<p>Spiacenti, questa ricetta non esiste o non è stata ancora pubblicata.</p>';
            document.getElementById('instructions-content').innerHTML = '';
            document.getElementById('recipe-image').src = '';
            document.getElementById('recipe-image').alt = '';
            if (likeButton) likeButton.style.display = 'none'; // Nasconde il like button se ricetta non trovata
            if (deleteButton) deleteButton.style.display = 'none'; // Nasconde il delete button
        }
    }

    // Carica i dettagli della ricetta all'avvio della pagina
    loadRecipeDetails();

    // Listener per il pulsante "Mi Piace"
    if (likeButton) {
        likeButton.addEventListener('click', () => {
            if (currentRecipeId) {
                const newLikedStatus = toggleLikeStatus(currentRecipeId);
                updateHeartIcon(likeButton, newLikedStatus);
            }
        });
    }

    // Funzione globale per aggiornare lo stato del like e altri elementi UI quando notificato da global-sync
    window.refreshDetailsPage = function() {
        console.log("Dettagli Ricetta: Ricevuto refresh da global-sync.");
        if (currentRecipeId) {
            updateHeartIcon(likeButton, isRecipeLiked(currentRecipeId));
            // Qui potresti aggiornare anche lo stato del pulsante elimina,
            // o ricaricare i commenti se la loro visibilità dipende dal login, ecc.
            const recipe = getRecipeDetailsById(currentRecipeId);
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            if (deleteButton && loggedInUser && loggedInUser.email === recipe.creatorId) {
                deleteButton.style.display = 'block';
            } else if (deleteButton) {
                deleteButton.style.display = 'none';
            }
        }
    };



    // Listener per il bottone "Add" (se presente, solitamente non nella pagina dettagli)
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            window.location.href = 'AggiungiRicetta.html';
        });
    }

    // Listener per il bottone "Comment" nella pagina dettagli
    const commentButton = document.getElementById('details-comment-button'); // Assumi questo ID per il bottone commenta
    if (commentButton) {
        commentButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (commentsModal) {
                commentsModal.style.display = 'flex';
            }

            // Ottieni i dettagli completi della ricetta qui
            const recipe = getRecipeDetailsById(currentRecipeId);
            let recipeTitleForComments = "Ricetta Sconosciuta";
            if (recipe) {
                recipeTitleForComments = recipe.title;
            }

            if (typeof window.loadCommentsForRecipeModal === 'function') {
                window.loadCommentsForRecipeModal(currentRecipeId, recipeTitleForComments);
            } else {
                console.error("Funzione 'loadCommentsForRecipeModal' non trovata in comments-script.js.");
            }
        });
    }

    // Listener per il pulsante di chiusura del modal commenti
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (commentsModal) commentsModal.style.display = 'none';
        });
    }

    // Listener per chiudere il modal cliccando fuori dal contenuto
    if (commentsModal) {
        commentsModal.addEventListener('click', (event) => {
            if (event.target === commentsModal) {
                commentsModal.style.display = 'none';
            }
        });
    }
});