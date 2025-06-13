// category-page-script.js (NUOVO)

document.addEventListener('DOMContentLoaded', () => {
    const recipeGrid = document.getElementById('category-recipe-grid');
    const addButton = document.querySelector('.add-button');

    // Funzione per determinare il tipo di ricetta basandosi sul nome del file HTML corrente
    function getPageRecipeType() {
        const path = window.location.pathname; // Es: /primi.html
        if (path.includes('RicettePrimi.html')) return 'primo';
        if (path.includes('RicetteSecondi.html')) return 'secondo';
        if (path.includes('dolci.html')) return 'dolce';
        if (path.includes('contorni.html')) return 'contorno';
        // Puoi aggiungere qui altri tipi se hai più pagine di categoria
        return null; // Caso di fallback, se il nome del file non corrisponde
    }

    const currentPageType = getPageRecipeType(); // Ottiene il tipo della pagina corrente


    // --- DATABASE DELLE RICETTE STATICHE PREIMPOSTATE ---
    // Definisci qui TUTTE le tue ricette preimpostate, raggruppate per tipo.
    // Ogni ricetta deve avere: id, title, imageUrl, ingredients, instructions.
    // Assicurati che gli ID siano univoci in tutto il tuo sito (anche rispetto alle ricette custom).
    const staticRecipes = {
        'primo': [
            {
                id: 'spaghetti-pomodoro',
                title: 'Spaghetti al Pomodoro',
                imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Spaghetti',
                ingredients: `<h3>Per 2 persone:</h3><ul><li>200g Spaghetti</li><li>400g Pomodori pelati</li><li>1 spicchio Aglio</li><li>Olio EVO q.b.</li><li>Basilico fresco q.b.</li></ul>`,
                instructions: `<li>Far soffriggere l'aglio in olio.</li><li>Aggiungere i pomodori e cuocere per 20 minuti.</li><li>Cuocere gli spaghetti.</li><li>Scolare e unire al sugo.</li><li>Guarnire con basilico.</li>`
            },
            {
                id: 'risotto-funghi',
                title: 'Risotto ai Funghi',
                imageUrl: 'https://via.placeholder.com/180x120/FFD700?text=Risotto+Funghi',
                ingredients: `<h3>Per 2 persone:</h3><ul><li>160g Riso Carnaroli</li><li>200g Funghi misti</li><li>Brodo vegetale q.b.</li><li>1/2 Cipolla</li><li>Burro e Parmigiano q.b.</li></ul>`,
                instructions: `<li>Soffriggere la cipolla, aggiungere il riso e tostare.</li><li>Aggiungere i funghi e sfumare con vino (opzionale).</li><li>Cuocere il riso aggiungendo brodo poco alla volta.</li><li>Mantecare con burro e parmigiano.</li>`
            }
            // Aggiungi qui tutte le altre tue ricette statiche di tipo 'primo'
        ],
        'secondo': [
            // Le tue ricette 'secondo' esistenti
            {
                id: 'filetto-pesce', // L'ID è già presente nel tuo markup
                title: 'Filetto di pesce al forno',
                imageUrl: '../image/Salmone-al-forno-04082023-buttalapasta.it_-1024x683.jpg', // Il tuo percorso immagine locale
                ingredients: `<h3>Per il pesce:</h3><ul><li>filetto di pesce 1</li><li>brodo granulare di pesce 1 cucchiaino raso</li><li>limone 1</li><li>olio d'oliva extra vergine q.b.</li><li>paprica in polvere 1 cucchiaio</li><li>pepe q.b.</li></ul>`,
                instructions: `<li>Prendete il filetto di pesce surgelato e ponetelo in una padella unta con un poco di olio.</li><li>Stemperate il dado di pesce in polvere in un bicchiere di acqua e aggiungetela in padella.</li><li>Profumate con una spolverata di paprica e portate a ebollizione, lasciate cuocere per una decina di minuti ponendo un coperchio sulla padella.</li><li>Se volete cucinare i filetti di pesce fresco veloce potete evitare di mettere l'acqua, ponete il filetto nella padella unta di olio e cuocete dieci minuti, girando a metà cottura.</li><li>Servite in tavola con qualche goccia di olio a crudo e un pizzico di pepe macinato al momento.</li>`
            },
            {
                id: 'pollo-limone',
                title: 'Pollo al Limone',
                imageUrl: 'https://via.placeholder.com/180x120/ADD8E6?text=Pollo+Limone',
                ingredients: `<h3>Per il pollo:</h3><ul><li>300g Petto di pollo</li><li>Succo di 1 limone</li><li>Farina q.b.</li><li>Olio EVO q.b.</li><li>Brodo vegetale q.b.</li></ul>`,
                instructions: `<li>Tagliare il pollo a striscioline e infarinarlo.</li><li>Rosolare il pollo in padella con olio.</li><li>Aggiungere succo di limone e brodo, cuocere fino a che non si addensa la salsa.</li><li>Servire caldo.</li>`
            },
            // TUE NUOVE RICETTE SECONDI
            {
                id: 'orata-cartoccio', // ID univoco
                title: 'Orata al cartoccio',
                imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Orata+al+cartoccio',
                ingredients: `<h3>Ingredienti:</h3><ul><li>Orata</li><li>Pomodorini</li><li>Limone</li><li>Prezzemolo</li><li>Olio EVO</li></ul>`, // *** COMPLETARE ***
                instructions: `<li>Pulire l'orata.</li><li>Riempire con pomodorini, fette di limone e prezzemolo.</li><li>Chiudere nel cartoccio e cuocere in forno.</li>` // *** COMPLETARE ***
            },
            {
                id: 'insalata-pollo', // ID univoco (non c'era data-recipe-id, ne ho creato uno)
                title: 'Insalata di pollo',
                imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Insalata+di+pollo',
                ingredients: `<h3>Ingredienti:</h3><ul><li>Petto di pollo</li><li>Insalata mista</li><li>Pomodorini</li><li>Mais</li><li>Salsa yogurt</li></ul>`, // *** COMPLETARE ***
                instructions: `<li>Bollire o grigliare il petto di pollo e tagliarlo a cubetti.</li><li>Unire tutti gli ingredienti e condire.</li>` // *** COMPLETARE ***
            },
            {
                id: 'carne-pizzaiola', // ID univoco
                title: 'Carne alla pizzaiola',
                imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Carne+pizzaola',
                ingredients: `<h3>Ingredienti:</h3><ul><li>Fettine di carne</li><li>Passata di pomodoro</li><li>Origano</li><li>Aglio</li></ul>`, // *** COMPLETARE ***
                instructions: `<li>Soffriggere l'aglio.</li><li>Aggiungere la passata e l'origano, cuocere.</li><li>Aggiungere le fettine di carne e cuocere fino a che non sono tenere.</li>` // *** COMPLETARE ***
            },
            {
                id: 'calamari-limone', // ID univoco
                title: 'Calamari al limone',
                imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Calamari+limone',
                ingredients: `<h3>Ingredienti:</h3><ul><li>Calamari</li><li>Succo di limone</li><li>Prezzemolo</li><li>Aglio</li><li>Olio EVO</li></ul>`, // *** COMPLETARE ***
                instructions: `<li>Pulire i calamari e tagliarli ad anelli.</li><li>Cuocere in padella con aglio e olio.</li><li>Sfumare con limone e aggiungere prezzemolo.</li>` // *** COMPLETARE ***
            },
            {
                id: 'pollo-curry', // ID univoco
                title: 'Pollo al curry',
                imageUrl: 'https://via.placeholder.com/180x120/4CAF50?text=Pollo+curry',
                ingredients: `<h3>Ingredienti:</h3><ul><li>Petto di pollo</li><li>Latte di cocco</li><li>Curry in polvere</li><li>Cipolla</li></ul>`, // *** COMPLETARE ***
                instructions: `<li>Soffriggere la cipolla, aggiungere il pollo e dorare.</li><li>Aggiungere curry e latte di cocco, cuocere.</li>` // *** COMPLETARE ***
            }
        ],
        'dolce': [
            {
                id: 'tiramisu',
                title: 'Tiramisù Classico',
                imageUrl: 'https://via.placeholder.com/180x120/DAA520?text=Tiramisu',
                ingredients: `<h3>Per 4 persone:</h3><ul><li>250g Mascarpone</li><li>3 Uova</li><li>80g Zucchero</li><li>Caffè q.b.</li><li>Savoiardi q.b.</li><li>Cacao amaro q.b.</li></ul>`,
                instructions: `<li>Preparare il caffè e farlo raffreddare.</li><li>Montare i tuorli con lo zucchero, aggiungere il mascarpone.</li><li>Montare gli albumi a neve e incorporarli.</li><li>Bagnare i savoiardi nel caffè e alternare strati con la crema.</li><li>Spolverare con cacao e far riposare in frigo.</li>`
            }
            // Aggiungi qui tutte le altre tue ricette statiche di tipo 'dolce'
        ],
        'contorno': [
            {
                id: 'patate-forno',
                title: 'Patate al Forno',
                imageUrl: 'https://via.placeholder.com/180x120/FFA500?text=Patate+Forno',
                ingredients: `<h3>Per 2 persone:</h3><ul><li>500g Patate</li><li>Rosmarino q.b.</li><li>Olio EVO q.b.</li><li>Sale e pepe q.b.</li></ul>`,
                instructions: `<li>Tagliare le patate a cubetti.</li><li>Condirle con olio, rosmarino, sale e pepe.</li><li>Cuocere in forno a 200°C per 30-40 minuti.</li>`
            }
            // Aggiungi qui tutte le altre tue ricette statiche di tipo 'contorno'
        ]
    };

    // Funzione per generare il markup HTML di una singola ricetta
    function generateRecipeHtml(recipe) {
        return `
            <div class="recipe-item" data-recipe-id="${recipe.id}">
                <a href="DettagliRicetta.html?id=${recipe.id}" class="recipe-link">
                    <div class="recipe-image-container">
                        <img src="${recipe.imageUrl}" alt="${recipe.title}">
                    </div>
                    <div class="recipe-details">
                        <p>${recipe.title}</p></a>
                        <div class="actions">
                        <button class="like-button">♡</button>
                        <button class="comment-button"><img src="../image/207-2078186_comment-icon-png.png" alt="Commenta"></button>  
                    </div>
                
            </div>
        `;
    }

    // Funzione per caricare e visualizzare tutte le ricette (statiche e custom)
    function loadAndDisplayRecipes() {
        // Pulisci la griglia corrente per evitare duplicati
        recipeGrid.innerHTML = '';

        // 1. Aggiungi le ricette statiche pertinenti per la pagina corrente
        if (currentPageType && staticRecipes[currentPageType]) {
            staticRecipes[currentPageType].forEach(recipe => {
                recipeGrid.insertAdjacentHTML('beforeend', generateRecipeHtml(recipe));
            });
        }

        // 2. Aggiungi le ricette custom dal LocalStorage che corrispondono al tipo della pagina
        const customRecipes = JSON.parse(sessionStorage.getItem('customRecipes')) || [];

        customRecipes.forEach(recipe => {
            if (recipe.type === currentPageType) { // Filtra per il tipo della pagina corrente
                recipeGrid.insertAdjacentHTML('beforeend', generateRecipeHtml(recipe));
            }
        });

        // Reinizializza i listener per i bottoni "Like" e "Comment"
        document.querySelectorAll('.recipe-grid .like-button').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                if (button.textContent === '♡') {
                    button.textContent = '♥'; // Cuore pieno
                    button.style.color = '#FF6347'; // Rosso
                } else {
                    button.textContent = '♡'; // Cuore vuoto
                    button.style.color = '#4CAF50'; // Colore default cuore
                }
            });
        });

        // NUOVO: Listener per i bottoni "Comment"
        document.querySelectorAll('.recipe-grid .comment-button').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation(); // Previene che il click sul bottone apra il link della ricetta

                // Recupera l'ID della ricetta dal suo contenitore padre
                const recipeItem = button.closest('.recipe-item');
                const recipeId = recipeItem ? recipeItem.dataset.recipeId : 'sconosciuto';

                alert(`Hai cliccato "Commenta" per la ricetta ID: ${recipeItem.title}! (Aggiungi qui la tua logica per i commenti)`);
                // Qui puoi implementare la logica per aprire un modale, reindirizzare a una pagina di commenti, ecc.
            });
        });
    }

    // Carica le ricette all'avvio della pagina
    loadAndDisplayRecipes();

    // Listener per il bottone "Add" (se presente nelle pagine di categoria)
    if (addButton) {
        addButton.addEventListener('click', () => {
            window.location.href = 'AggiungiRicetta.html';
        });
    }
});