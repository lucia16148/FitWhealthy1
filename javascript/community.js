document.addEventListener("DOMContentLoaded", function () {

    // Selezioniamo gli elementi necessari
    const discussionForm = document.getElementById('discussion-form');
    const discussionTitle = document.getElementById('discussion-title');
    const discussionContent = document.getElementById('discussion-content');
    const discussionList = document.getElementById('discussion-list');

    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Devi essere loggato per aggiungere una ricetta!');
        window.location.href = 'login.html';
        return;
    }

    function saveComment(id, author, text) {
        let allComments = JSON.parse(sessionStorage.getItem('CommunityComments')) || {};
        if (!allComments[id]) {
            allComments[id] = [];
        }
        allComments[id].push({ author: author, text: text, timestamp: Date.now() });
        sessionStorage.setItem('CommunityComments', JSON.stringify(allComments));
    }

    function displayCommentsForDiscussion(discussionId, commentSectionElement) {
        const allComments = JSON.parse(sessionStorage.getItem('CommunityComments')) || {};
        const commentsForThisDiscussion = allComments[discussionId] || [];

        commentSectionElement.innerHTML = ''; //

        if (commentsForThisDiscussion.length > 0) {
            commentsForThisDiscussion.sort((a, b) => b.timestamp - a.timestamp);

            commentsForThisDiscussion.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('comment');

                const commentHeader = document.createElement('div');
                commentHeader.classList.add('comment-header');

                const commentAuthor = document.createElement('span');
                commentAuthor.classList.add('comment-author');
                commentAuthor.innerText = `${comment.author}: `;
                commentHeader.appendChild(commentAuthor);

                const commentText = document.createElement('span');
                commentText.classList.add('comment-text');
                commentText.innerText = comment.text;
                commentHeader.appendChild(commentText);

                commentItem.appendChild(commentHeader); // Aggiungi il contenitore al commentItem

                commentSectionElement.appendChild(commentItem);
            });
        }
    }


    // Funzione per aggiungere una discussione
    function addDiscussion(id, title, content, author) {
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

        const closeCommentButton = document.createElement('button');
        closeCommentButton.innerText = 'Chiudi Commenti';
        closeCommentButton.style.display = 'none'
        discussionItem.appendChild(closeCommentButton);

        // Creiamo un'area per inserire i commenti
        const commentInput = document.createElement('textarea');
        commentInput.placeholder = 'Scrivi un commento...';
        commentInput.style.display = 'none'; // inizialmente nascosto
        discussionItem.appendChild(commentInput);

        const commentButton = document.createElement('button');
        commentButton.innerText = 'Pubblica commento';
        commentButton.style.display = 'none'; // inizialmente nascosto
        discussionItem.appendChild(commentButton);

        displayCommentsForDiscussion(id, commentSection);

        addCommentButton.addEventListener('click', function () {
            commentInput.style.display = 'block';
            commentButton.style.display = 'block';
            closeCommentButton.style.display = 'block'
            addCommentButton.style.display= 'none';
        });

        closeCommentButton.addEventListener('click', function () {
            commentInput.style.display = 'none';
            commentButton.style.display = 'none';
            closeCommentButton.style.display = 'none'
            addCommentButton.style.display= 'block';
        });

        commentButton.addEventListener('click', function () {
            if (!loggedInUser || !loggedInUser.name) {
                alert('Devi effettuare il login per poter commentare.');
                return;
            }
            const authorName = loggedInUser.name;
            const commentText = commentInput.value.trim();

            if (commentText === '') {
                alert('Per favore, scrivi un commento prima di inviare.');
                return;
            }

            if (id) {
                saveComment(id, authorName, commentText);
                commentInput.value = '';
                displayCommentsForDiscussion(id, commentSection);
            } else {
                alert('Errore: ID discussione non disponibile per salvare il commento.');
            }
        });

        // Inseriamo la discussione in cima alla lista
        discussionList.prepend(discussionItem);
    }

    // Creiamo 5 discussioni di esempio
    const exampleDiscussions = [
        {
            id: "1",
            title: "Ricette leggere per cena?",
            content: "Ciao a tutti! Sto cercando idee per cene leggere ma gustose. Qualcuno ha suggerimenti?",
            author: "Elena De Lucia"
        },
        {
            id: "2",
            title: "Meglio allenarsi al mattino o alla sera?",
            content: "Secondo voi è più efficace allenarsi al mattino presto o la sera dopo il lavoro? Voi quando vi allenate?",
            author: "Luca Ottorini"
        },
        {
            id: "3",
            title: "Ricetta fit: pancake alla banana",
            content: "Vi consiglio questa ricetta: 1 banana, 2 uova, un pizzico di cannella. Frullate tutto e cuocete in padella! Deliziosi e sani.",
            author: "Sofia Chef"
        },
        {
            id: "4",
            title: "Quanti giorni a settimana vi allenate?",
            content: "Sto cercando di trovare un buon ritmo. Voi quante volte vi allenate a settimana? E come alternate cardio e forza?",
            author: "Marco Wellness"
        },
        {
            id: "5",
            title: "Cibi sani da portare in ufficio",
            content: "Avete idee di spuntini o pranzi sani che si possono portare in ufficio senza problemi? Io mi sto stancando della solita insalata.",
            author: "Giulia Aversa"
        }
    ];

    exampleDiscussions.reverse().forEach(discussion => {
        addDiscussion(discussion.id, discussion.title, discussion.content, discussion.author);
    });

    window.loadAndDisplayDiscussion = function() {
        const costumCommunity = JSON.parse(sessionStorage.getItem('costumCommunity')) || [];
        // Filter out discussions that are already displayed to avoid duplicates
        const existingDiscussionIds = Array.from(discussionList.children).map(item => item.querySelector('p').innerText.replace('ID: ', ''));

        costumCommunity.forEach(community => {
            if (!existingDiscussionIds.includes(community.id)) {
                addDiscussion(community.id, community.title, community.content, community.author);
            }
        });
    }

    // Gestiamo la creazione di una discussione
    discussionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = discussionTitle.value.trim();
        const content = discussionContent.value.trim();
        const author = loggedInUser.name;

        if (!title || !content || !author) {
            alert('Per favore, compila tutti i campi.');
            return;
        }

        const newMess = {
            id: 'custom-' + Date.now(),
            title: title,
            content: content,
            author: author,
            creatorId: loggedInUser.email
        };

        let costumCommunity = JSON.parse(sessionStorage.getItem('costumCommunity')) || [];
        costumCommunity.push(newMess);
        sessionStorage.setItem('costumCommunity', JSON.stringify(costumCommunity));

        loggedInUser.costumCommunity = loggedInUser.costumCommunity || [];
        loggedInUser.costumCommunity.push(newMess.id);
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === loggedInUser.email);
        if (userIndex !== -1) {
            users[userIndex] = loggedInUser;
            localStorage.setItem('users', JSON.stringify(users));
        }

        addDiscussion(newMess.id, title, content, author);
        // Resettiamo il form
        discussionTitle.value = '';
        discussionContent.value = '';
    });

    // Initial load of custom discussions
    loadAndDisplayDiscussion();
});
