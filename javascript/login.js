document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutLink = document.getElementById('logout-link');

    const initialStaticUsers = [
        {
            email: 'user@example.com',
            password: 'password123',
            name: 'Utente Esempio',
            weight: null, height: null, age: null, phone: null, avatar: null,
            likedRecipeIds: [], createdRecipeIds: []
        },
        {
            email: 'laura@example.com',
            password: 'password',
            name: 'Laura',
            weight: 60, height: 165, age: 30, phone: '3331234567', avatar: null,
            likedRecipeIds: ['spaghetti-pomodoro', 'tiramisu'],
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
            likedRecipeIds: [], createdRecipeIds: []
        },
        {
            email: 'lucas@example.com',
            password: 'password',
            name: 'Lucas',
            weight: 70, height: 170, age: 35, phone: '3475566778', avatar: null,
            likedRecipeIds: ['risotto-funghi'], createdRecipeIds: []
        }
    ];

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        users = initialStaticUsers;
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Utenti statici inizializzati nel localStorage.");
    }

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

            const foundUser = users.find(user => user.email === email && user.password === password);

            if (foundUser) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                Swal.fire({
                    icon: 'success',
                    title: 'Login riuscito!',
                    text: `Benvenuto, ${foundUser.name || foundUser.email}!`,
                    confirmButtonText: 'Continua'
                }).then(() => {
                    window.location.href = 'mainpageloggato.html';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Errore di login',
                    text: 'Email o password non validi. Riprova.',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const registerEmail = document.getElementById('register-email').value;
            const registerPassword = document.getElementById('register-password').value;
            const registerName = document.getElementById('register-name').value;

            if (users.some(user => user.email === registerEmail)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Email già registrata',
                    text: 'Questa email è già in uso. Usa un\'altra o effettua il login.',
                    confirmButtonText: 'OK'
                });
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
            localStorage.setItem('users', JSON.stringify(users));

            // Pop-up per confermare la registrazione
            Swal.fire({
                icon: 'success',
                title: 'Registrazione completata!',
                text: 'Puoi ora effettuare il login.',
                confirmButtonText: 'OK'
            }).then(() => {
                // Quando l'utente chiude il pop-up, lo reindirizzi alla pagina di login
                window.location.href = 'login.html';
            });

            registerForm.reset();
        });
    }


    function handleLogout(event) {
        event.preventDefault();

        Swal.fire({
            title: 'Sei sicuro di voler uscire?',
            text: 'La sessione verrà chiusa.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sì, esci',
            cancelButtonText: 'Annulla'
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('loggedInUser');

                Swal.fire({
                    icon: 'info',
                    title: 'Logout effettuato',
                    text: 'Sei stato disconnesso con successo.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    updateLoginLogoutLink();
                    window.location.href = 'mainpage.html'; // <- Vai a mainpage.html
                });
            }
        });
    }

    updateLoginLogoutLink();
});
