// Ottieni il nome file corrente (es: "mainpage.html")
const currentPage = window.location.pathname.split("/").pop();

// Seleziona il container dove inserire i bottoni
const nav = document.getElementById("navButtons");

if (currentPage === "/html/mainpage.html") {
    // Solo Login e Registrati
    nav.innerHTML = `
    <a href="/html/login.html"><button class="btn-login">Login</button></a>
    <a href="/html/signin.html"><button class="btn-register">Registrati</button></a>
  `;
} else {
    // Menu completo per utenti loggati
    nav.innerHTML = `
    <a href="/html/EserciziGenerale.html"><button class="btn-login">Esercizi</button></a>
    <a href="/html/profilo.html"><button class="btn-login">Profilo</button></a>
    <a href="/html/ricette.html"><button class="btn-login">Ricette</button></a>
    <a href="/html/Miglioramenti.html"><button class="btn-login">Miglioramenti</button></a>
    <a href="/html/Community.html"><button class="btn-login">Community</button></a>
  `;
}
