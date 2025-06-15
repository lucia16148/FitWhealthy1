// comments-script.js (MODIFICATO per ricevere il titolo della ricetta e gestire l'avatar)

// Questa funzione sarà esposta globalmente per essere chiamata da recipe-script.js
// Ora accetta due argomenti: l'ID e il TITOLO della ricetta.
window.loadCommentsForRecipeModal = function(recipeId, recipeTitle) {
    const commentsList = document.getElementById('comments-list');
    const addCommentSection = document.getElementById('add-comment-section');
    const modalRecipeTitle = document.getElementById('modal-recipe-title'); // Riferimento al titolo nel modal

    let currentRecipeIdInComments = recipeId; // Riceve l'ID della ricetta da recipe-script.js
    let loggedInUser = null; // Variabile per memorizzare l'utente loggato

    // Recupera l'utente loggato dal sessionStorage all'avvio del modal
    const userString = sessionStorage.getItem('loggedInUser');
    if (userString) {
        loggedInUser = JSON.parse(userString);
    }

    // AGGIORNAMENTO: Usiamo il titolo passato come argomento
    if (modalRecipeTitle) {
        // Usa direttamente il `recipeTitle` passato, che sarà sempre quello corretto.
        modalRecipeTitle.textContent = `Commenti per Ricetta: ${recipeTitle || "Ricetta Sconosciuta"}`;
    }


    // Funzione per visualizzare i commenti
    function displayComments() {
        const allComments = JSON.parse(localStorage.getItem('recipeComments')) || {};
        const commentsForThisRecipe = allComments[currentRecipeIdInComments] || [];

        commentsList.innerHTML = ''; // Pulisci la lista

        if (commentsForThisRecipe.length === 0) {
            commentsList.innerHTML = '<p>Nessun commento ancora. Sii il primo ad aggiungerne uno!</p>';
        } else {
            // Ordina i commenti dal più recente al meno recente
            commentsForThisRecipe.sort((a, b) => b.timestamp - a.timestamp);

            commentsForThisRecipe.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');

                const commentDate = new Date(comment.timestamp).toLocaleString('it-IT', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });

                // Determina l'URL dell'avatar: usa quello salvato con il commento o un default
                const avatarSource = loggedInUser.avatar || '../image/default-avatar.png'; // Assicurati che questo percorso sia corretto

                commentItem.innerHTML = `
                    <img src="${avatarSource}" alt="${comment.author || 'Utente Anonimo'}'s avatar" class="comment-avatar">
                    <div class="comment-body">
                        <p class="comment-author"><strong>${comment.author || 'Utente Anonimo'}</strong> <span class="comment-date">(${commentDate})</span>:</p>
                        <p class="comment-text">${comment.text}</p>
                    </div>
                `;
                commentsList.appendChild(commentItem);
            });
        }
        updateCommentSectionUI(); // Aggiorna lo stato della sezione per aggiungere commenti
    }

    // Funzione per salvare un nuovo commento
    // AGGIUNTO: parametro avatarUrl
    function saveComment(recipeId, author, text, avatar) {
        let allComments = JSON.parse(localStorage.getItem('recipeComments')) || {};
        if (!allComments[recipeId]) {
            allComments[recipeId] = [];
        }
        // AGGIUNTO: salvataggio di avatarUrl nel commento
        allComments[recipeId].push({ author: author, text: text, timestamp: Date.now(), avatar: avatar });
        localStorage.setItem('recipeComments', JSON.stringify(allComments));
    }

    // Funzione per aggiornare la UI della sezione commenti in base allo stato del login
    function updateCommentSectionUI() {
        if (loggedInUser && loggedInUser.name) { // Assicurati che loggedInUser e il suo nome esistano
            addCommentSection.innerHTML = `
                <h3>Aggiungi un commento come ${loggedInUser.name}</h3>
                <div class="comment-input-area">
                    <textarea id="new-comment-text" placeholder="Scrivi il tuo commento qui..." rows="4"></textarea>
                    <button id="submit-comment-button" class="submit-comment-button">Invia Commento</button>
                </div>
            `;
            const newCommentTextRef = document.getElementById('new-comment-text');
            const submitCommentButtonRef = document.getElementById('submit-comment-button');

            if (submitCommentButtonRef) {
                // Rimuovi eventuali listener precedenti per evitare duplicazioni
                submitCommentButtonRef.removeEventListener('click', handleSubmitComment);
                submitCommentButtonRef.addEventListener('click', handleSubmitComment);
            }
        } else {
            addCommentSection.innerHTML = `
                <p>Devi effettuare il <a href="login.html" class="login-link-in-comments">login</a> per poter commentare.</p>
            `;
        }
    }

    // Handler per l'invio del commento
    function handleSubmitComment() {
        const currentNewCommentText = document.getElementById('new-comment-text');

        if (!loggedInUser || !loggedInUser.name) {
            alert('Devi effettuare il login per poter commentare.');
            return;
        }

        if (!currentNewCommentText) {
            console.error("Textarea del commento non trovata.");
            return;
        }

        const commentText = currentNewCommentText.value.trim();
        const authorName = loggedInUser.name;
        // Recupera l'URL dell'avatar dell'utente loggato. Assicurati che 'avatarUrl' esista nell'oggetto utente.
        const authorAvatarUrl = loggedInUser.avatar || '../image/default-avatar.png'; // Fallback

        if (commentText === '') {
            alert('Per favore, scrivi un commento prima di inviare.');
            return;
        }

        if (currentRecipeIdInComments) {
            // AGGIUNTO: passaggio di authorAvatarUrl alla funzione saveComment
            saveComment(currentRecipeIdInComments, authorName, commentText, authorAvatarUrl);
            currentNewCommentText.value = ''; // Pulisci il campo
            displayComments(); // Ricarica la lista dei commenti
        } else {
            alert('Errore: ID ricetta non disponibile per salvare il commento.');
            console.error("ID ricetta corrente non impostato in comments-script.js:", currentRecipeIdInComments);
        }
    }

    // Inizializza la visualizzazione dei commenti quando il modal viene caricato
    displayComments();
};