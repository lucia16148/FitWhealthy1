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