// Main application logic
const app = document.getElementById('app');
const pages = {
    home: 'home.html',
    login: 'login.html', 
    register: 'register.html',
    input: 'input.html',
    analysis: 'analysis.html'
};

// User state
let currentUser = null;
let userTrees = [];

// Initialize app
function init() {
    loadPage('home');
    checkAuthState();
}

// Load page content
async function loadPage(page) {
    const response = await fetch(pages[page]);
    const html = await response.text();
    app.innerHTML = html;
    
    // Initialize page-specific scripts
    if (page === 'home') initHome();
    if (page === 'login') initLogin();
    if (page === 'register') initRegister();
    if (page === 'input') initInput();
    if (page === 'analysis') initAnalysis();
}

// Check authentication state
function checkAuthState() {
    const user = localStorage.getItem('treeHealthUser');
    if (user) {
        currentUser = JSON.parse(user);
        userTrees = JSON.parse(localStorage.getItem(`trees_${currentUser.email}`)) || [];
        if (window.location.hash !== '#input') {
            loadPage('input');
        }
    }
}

// Navigation functions
function navigateTo(page) {
    window.location.hash = page;
    loadPage(page);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('hashchange', () => {
    const page = window.location.hash.substring(1);
    if (pages[page]) loadPage(page);
});

// Export functions for other pages
window.app = {
    navigateTo,
    currentUser,
    userTrees
};