function toggleHeart(el) {
    const item = el.closest('.exercise-item');
    const exerciseName = item.querySelector('.exercise-name').textContent.trim();
    let likedExercises = JSON.parse(localStorage.getItem('likedExercises')) || [];

    if (likedExercises.includes(exerciseName)) {
        // Rimuovi dai preferiti
        likedExercises = likedExercises.filter(name => name !== exerciseName);
        el.textContent = '🖤';
    } else {
        // Aggiungi ai preferiti
        likedExercises.push(exerciseName);
        el.textContent = '❤️';
    }

    localStorage.setItem('likedExercises', JSON.stringify(likedExercises));

    // Forza sync con altre tab o componenti
    localStorage.setItem('sync-exercises', new Date().toISOString());

    if (typeof window.refreshAllRecipeDisplays === 'function') {
        window.refreshAllRecipeDisplays();
    }
}

// Quando la pagina si carica, rendi rossi i cuori già piaciuti
document.addEventListener('DOMContentLoaded', () => {
    const likedExercises = JSON.parse(localStorage.getItem('likedExercises')) || [];

    document.querySelectorAll('.exercise-item').forEach(item => {
        const name = item.querySelector('.exercise-name').textContent.trim();
        const heart = item.querySelector('.heart');

        if (likedExercises.includes(name)) {
            heart.textContent = '❤️';
        } else {
            heart.textContent = '🖤';
        }
    });
});





document.addEventListener('DOMContentLoaded', () => {
    // Recupera i dati utente da sessionStorage (assumendo che siano in JSON)
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));


    if (user) {
        // Funzione che decide se mostrare la fiamma
        function shouldShowFlame(difficolta, user) {
            if (difficolta === 'alta') {
                return user.weight >= 70 && user.age >= 20 && user.age <= 40 && user.height >= 170;
            }
            if (difficolta === 'media') {
                return user.weight >= 65 && user.age >= 18 && user.height >= 165;
            }
            if (difficolta === 'bassa') {
                return user.weight >= 65 && user.age >= 50 && user.height >= 165;
            }
            return false;
        }

        // Cicla sugli esercizi e inserisce la fiamma
        document.querySelectorAll('.exercise-item').forEach(item => {
            const difficolta = item.getAttribute('data-difficolta');
            if (shouldShowFlame(difficolta, user)) {
                const heart = item.querySelector('.heart');
                if (heart) {
                    const hotHeart = document.createElement('span');
                    hotHeart.classList.add('hot-heart');
                    hotHeart.innerHTML = `<i class="fas fa-fire" style="color:#e25822; margin-right:5px;"></i>`;
                    heart.parentNode.insertBefore(hotHeart, heart);
                }
            }
        });
    } else {
        console.warn('Dati utente non trovati in sessionStorage.');
    }
});