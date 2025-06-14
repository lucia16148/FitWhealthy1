// auth-script.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutLink = document.getElementById('logout-link');

    // --- UTENTI STATICI INIZIALI ---
    // Questi utenti verranno aggiunti a localStorage solo se l'array 'users' è vuoto
    const initialStaticUsers = [
        {
            email: 'user@example.com',
            password: 'password123',
            name: 'Utente Esempio',
            weight: null, height: null, age: null, phone: null, avatar: null,
            likedRecipeIds: [],
            createdRecipeIds: []
        },
        {
            email: 'laura@example.com',
            password: 'password',
            name: 'Laura',
            weight: 60, height: 165, age: 30, phone: '3331234567', avatar: null,
            likedRecipeIds: ['spaghetti-pomodoro', 'tiramisu'], // Esempio di preferiti
            createdRecipeIds: []
        },
        {
            email: 'martin@example.com',
            password: 'password',
            name: 'Martin',
            weight: 80, height: 180, age: 45, phone: '3398765432', avatar: null,
            likedRecipeIds: ['filetto-pesce', 'patate-forno'],
            createdRecipeIds: []
        },
        {
            email: 'paolo@example.com',
            password: 'password',
            name: 'Paolo',
            weight: 75, height: 175, age: 28, phone: '3201122334', avatar: null,
            likedRecipeIds: [],
            createdRecipeIds: []
        },
        {
            email: 'lucas@example.com',
            password: 'password',
            name: 'Lucas',
            weight: 70, height: 170, age: 35, phone: '3475566778', avatar: null,
            likedRecipeIds: ['risotto-funghi'],
            createdRecipeIds: []
        }
    ];

    // Carica gli utenti da localStorage, o inizializza con quelli statici se non ci sono utenti salvati
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Se non ci sono utenti in localStorage, li aggiungiamo da 'initialStaticUsers'
    // Questo è un modo semplice per popolare il database all'avvio la prima volta.
    // In un'applicazione reale, questi utenti verrebbero da un database.
    if (users.length === 0) {
        users = initialStaticUsers;
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Utenti statici inizializzati nel localStorage.");
    }
    // --- FINE UTENTI STATICI INIZIALI ---


    // Funzione per aggiornare il testo del link Login/Logout
    function updateLoginLogoutLink() {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (logoutLink) {
            if (loggedInUser) {
                logoutLink.textContent = 'Logout';
                logoutLink.href = '#';
                logoutLink.removeEventListener('click', handleLogout);
                logoutLink.addEventListener('click', handleLogout);
            } else {
                logoutLink.textContent = 'Login';
                logoutLink.href = 'login.html';
                logoutLink.removeEventListener('click', handleLogout);
            }
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Recupera gli utenti da localStorage (già caricati all'inizio dello script)
            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                alert(`Benvenuto, ${foundUser.name || foundUser.email}! Login riuscito.`);
                window.location.href = 'index.html';
            } else {
                alert('Email o password non validi. Riprova.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const registerEmail = document.getElementById('register-email').value;
            const registerPassword = document.getElementById('register-password').value;
            const registerName = document.getElementById('register-name').value;

            // Controlla se l'email esiste già
            if (users.some(user => user.email === registerEmail)) {
                alert('Questa email è già registrata.');
                return;
            }

            const newUser = {
                email: registerEmail,
                password: registerPassword,
                name: registerName,
                weight: null,
                height: null,
                age: null,
                phone: null,
                avatar: null,
                likedRecipeIds: [],
                createdRecipeIds: []
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users)); // Salva i nuovi utenti in localStorage
            alert('Registrazione avvenuta con successo! Puoi ora effettuare il login.');
            registerForm.reset();
        });
    }

    function handleLogout(event) {
        event.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        alert('Logout effettuato.');
        updateLoginLogoutLink();
        window.location.href = 'index.html';
    }

    updateLoginLogoutLink();
});