document.addEventListener('DOMContentLoaded', () => {
    // Listener per il bottone "Add"
    const addButton = document.querySelector('.add-button');
    if (addButton) {
        addButton.addEventListener('click', () => {
            alert('Hai cliccato il bottone "Aggiungi" dalla lista!');
            // Qui puoi aggiungere la logica per aprire un modale, navigare, ecc.
        });
    }

    // Listener per i bottoni "Like" e "Comment"
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', () => {
            // Esempio: toggle del colore del cuore
            if (button.textContent === '♡') {
                button.textContent = '♥'; // Cuore pieno
                button.style.color = '#FF6347'; // Rosso
            } else {
                button.textContent = '♡'; // Cuore vuoto
                button.style.color = '#4CAF50'; // Verde
            }
        });
    });

    document.querySelectorAll('.comment-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Hai cliccato il bottone "Commento"!');
            // Qui puoi implementare la logica per mostrare i commenti, ecc.
        });
    });
});