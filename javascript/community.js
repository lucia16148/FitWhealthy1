document.addEventListener("DOMContentLoaded", function () {

    // Selezioniamo gli elementi necessari
    const discussionForm = document.getElementById('discussion-form');
    const discussionTitle = document.getElementById('discussion-title');
    const discussionContent = document.getElementById('discussion-content');
    const username = document.getElementById('username');
    const discussionList = document.getElementById('discussion-list');

    // Funzione per aggiungere una discussione
    function addDiscussion(title, content, author) {
        // Creiamo un elemento per la discussione
        const discussionItem = document.createElement('div');
        discussionItem.classList.add('discussion-item');

        const discussionHeader = document.createElement('h3');
        discussionHeader.innerText = title;
        discussionItem.appendChild(discussionHeader);

        const discussionBody = document.createElement('p');
        discussionBody.innerText = content;
        discussionItem.appendChild(discussionBody);

        // Nome dell'autore
        const authorInfo = document.createElement('p');
        authorInfo.classList.add('author-info');
        authorInfo.innerText = `Creato da: ${author}`;
        discussionItem.appendChild(authorInfo);

        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
        discussionItem.appendChild(commentSection);

        // Aggiungiamo un bottone per aggiungere commenti
        const addCommentButton = document.createElement('button');
        addCommentButton.innerText = 'Aggiungi commento';
        discussionItem.appendChild(addCommentButton);

        // Creiamo un'area per inserire i commenti
        const commentInput = document.createElement('textarea');
        commentInput.placeholder = 'Scrivi un commento...';
        commentInput.style.display = 'none'; // inizialmente nascosto
        discussionItem.appendChild(commentInput);

        const commentButton = document.createElement('button');
        commentButton.innerText = 'Pubblica commento';
        commentButton.style.display = 'none'; // inizialmente nascosto
        discussionItem.appendChild(commentButton);

        // Gestiamo la logica per aggiungere un commento
        addCommentButton.addEventListener('click', function () {
            commentInput.style.display = 'block';
            commentButton.style.display = 'block';
        });

        commentButton.addEventListener('click', function () {
            const commentText = commentInput.value.trim();
            if (commentText) {
                // Aggiungiamo il commento sotto la discussione
                const comment = document.createElement('div');
                comment.classList.add('comment');
                comment.innerText = commentText;
                commentSection.appendChild(comment);
                // Reset input dopo commento
                commentInput.value = '';
            }
        });

        // Inseriamo la discussione in cima alla lista
        discussionList.prepend(discussionItem);
    }

    // Creiamo 5 discussioni di esempio
    const exampleDiscussions = [
        {
            title: "Ricette leggere per cena?",
            content: "Ciao a tutti! Sto cercando idee per cene leggere ma gustose. Qualcuno ha suggerimenti?",
            author: "Elena De Lucia"
        },
        {
            title: "Meglio allenarsi al mattino o alla sera?",
            content: "Secondo voi è più efficace allenarsi al mattino presto o la sera dopo il lavoro? Voi quando vi allenate?",
            author: "Luca Ottorini"
        },
        {
            title: "Ricetta fit: pancake alla banana",
            content: "Vi consiglio questa ricetta: 1 banana, 2 uova, un pizzico di cannella. Frullate tutto e cuocete in padella! Deliziosi e sani.",
            author: "Sofia Chef"
        },
        {
            title: "Quanti giorni a settimana vi allenate?",
            content: "Sto cercando di trovare un buon ritmo. Voi quante volte vi allenate a settimana? E come alternate cardio e forza?",
            author: "Marco Wellness"
        },
        {
            title: "Cibi sani da portare in ufficio",
            content: "Avete idee di spuntini o pranzi sani che si possono portare in ufficio senza problemi? Io mi sto stancando della solita insalata.",
            author: "Giulia Aversa"
        }
    ];

    // Aggiungiamo le discussioni di esempio (in ordine dal più vecchio al più recente)
    exampleDiscussions.reverse().forEach(discussion => {
        addDiscussion(discussion.title, discussion.content, discussion.author);
    });

    // Gestiamo la creazione di una discussione
    discussionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = discussionTitle.value.trim();
        const content = discussionContent.value.trim();
        const author = username.value.trim();

        if (title && content && author) {
            addDiscussion(title, content, author);
            // Resettiamo il form
            discussionTitle.value = '';
            discussionContent.value = '';
            username.value = '';
        }
    });

});
