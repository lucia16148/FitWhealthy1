document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE DELLE RICETTE ---
    // Questo è il "database" delle tue ricette.
    // Dovrai riempirlo con i dati completi di tutte le tue 10 ricette.
    const recipes = {
        'filetto-pesce': {
            title: 'Filetto di pesce al forno',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Filetto+Pesce+Reale', // Sostituisci con URL reale
            ingredients: `
                <h3>For the filling:</h3>
                <ul>
                    <li>filetto di pesce surgelato o fresco 1</li>
                    <li>brodo granulare di pesce 1 cucchiaino raso</li>
                    <li>limone 1</li>
                    <li>olio d'oliva extra vergine q.b.</li>
                    <li>paprica in polvere 1 cucchiaio</li>
                    <li>pepe q.b.</li>
                </ul>
            `,
            instructions: `
                <li>Prendete il filetto di pesce surgelato e ponetelo in una padella unta con un poco di olio.</li>
                <li>Stemperate il dado di pesce in polvere in un bicchiere di acqua e aggiungetela in padella.</li>
                <li>Profumate con una spolverata di paprica e portate a ebollizione, lasciate cuocere per una decina di minuti ponendo un coperchio sulla padella.</li>
                <li>Se volete cucinare i filetti di pesce fresco veloce potete evitare di mettere l'acqua, ponete il filetto nella padella unta di olio e cuocete dieci minuti, girando a metà cottura.</li>
                <li>Servite in tavola con qualche goccia di olio a crudo e un pizzico di pepe macinato al momento.</li>
            `
        },
        'orata-cartoccio': {
            title: 'Orata al cartoccio',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Orata+Reale',
            ingredients: `
                <h3>Per l'orata:</h3>
                <ul>
                    <li>orata fresca 1</li>
                    <li>pomodorini 100g</li>
                    <li>prezzemolo q.b.</li>
                    <li>olio d'oliva q.b.</li>
                </ul>
            `,
            instructions: `
                <li>Pulite l'orata e riempitela con pomodorini e prezzemolo.</li>
                <li>Condite con olio, sale e pepe.</li>
                <li>Chiudete nel cartoccio e cuocete in forno a 180°C per 20 minuti.</li>
            `
        },
        // Aggiungi qui tutte le altre 8 ricette con i loro ID e contenuti
        // Esempio per pollo-curry:
        'pollo-curry': {
            title: 'Pollo al curry',
            imageUrl: 'https://via.placeholder.com/400x250/4CAF50?text=Pollo+Curry+Reale',
            ingredients: `
                <h3>Per il pollo al curry:</h3>
                <ul>
                    <li>petto di pollo 300g</li>
                    <li>latte di cocco 200ml</li>
                    <li>curry in polvere 2 cucchiaini</li>
                    <li>cipolla 1</li>
                    <li>riso basmati per servire</li>
                </ul>
            `,
            instructions: `
                <li>Tagliate il pollo a cubetti.</li>
                <li>In una padella, soffriggete la cipolla tritata.</li>
                <li>Aggiungete il pollo e fatelo dorare.</li>
                <li>Aggiungete il curry e il latte di cocco, cuocete fino a quando il pollo è tenero.</li>
                <li>Servite con riso basmati.</li>
            `
        },
        // ... e così via per le altre ricette
    };

    // --- Funzione per ottenere l'ID della ricetta dall'URL ---
    function getRecipeIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // Ottiene il valore del parametro 'id'
    }

    // --- Funzione per caricare i dettagli della ricetta ---
    function loadRecipeDetails() {
        const recipeId = getRecipeIdFromUrl();
        const recipe = recipes[recipeId]; // Cerca la ricetta nel "database"

        if (recipe) {
            // Aggiorna il titolo della pagina nel browser
            document.title = `FitWhealty - ${recipe.title}`;

            // Popola gli elementi HTML
            document.getElementById('recipe-title').textContent = recipe.title;
            document.getElementById('recipe-image').src = recipe.imageUrl;
            document.getElementById('recipe-image').alt = recipe.title;
            document.getElementById('ingredients-content').innerHTML = recipe.ingredients;
            document.getElementById('instructions-content').innerHTML = recipe.instructions;
        } else {
            // Ricetta non trovata, puoi reindirizzare o mostrare un messaggio di errore
            document.getElementById('recipe-title').textContent = 'Ricetta non trovata!';
            document.getElementById('ingredients-content').innerHTML = '<p>Spiacenti, questa ricetta non esiste.</p>';
            document.getElementById('instructions-content').innerHTML = '';
            // Potresti anche reindirizzare a una pagina 404 o alla lista delle ricette
            // window.location.href = 'list.html';
        }
    }

    // Carica i dettagli della ricetta quando la pagina è pronta
    loadRecipeDetails();


    // --- Listener per i bottoni "Add", "Like", "Comment" (esistenti) ---

    // Listener per il bottone "Add"
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            alert('Hai cliccato il bottone "Aggiungi" dalla pagina ricetta!');
            // Qui puoi aggiungere la logica per aprire un modale, navigare, ecc.
        });
    }

    // Listener per i bottoni "Like"
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', () => {
            // Esempio: toggle del cuore da vuoto a pieno
            if (button.textContent === '♡') {
                button.textContent = '♥'; // Cuore pieno
                button.style.color = '#FF6347'; // Colore rosso
            } else {
                button.textContent = '♡'; // Cuore vuoto
                button.style.color = 'white'; // Torna bianco (o il colore originale)
            }
        });
    });

    // Listener per il bottone "Comment"
    document.querySelectorAll('.comment-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Hai cliccato il bottone "Commenta"!');
            // Qui puoi implementare la logica per mostrare i commenti, ecc.
        });
    });
});