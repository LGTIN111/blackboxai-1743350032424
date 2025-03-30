const app = document.getElementById('app');
const pages = {
    home: 'home.html',
    login: 'login-new.html',
    register: 'register-new.html',  // Sử dụng file đăng ký mới
    input: 'input.html',
    analysis: 'analysis.html'
};

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
        try {
            currentUser = JSON.parse(user);
            if (currentUser && currentUser.email) {
                userTrees = JSON.parse(localStorage.getItem(`trees_${currentUser.email}`)) || [];
                loadPage('input');
            }
        } catch (e) {
            console.error('Error parsing user data:', e);
            localStorage.removeItem('treeHealthUser');
        }
    }
}

// Navigation function
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
    navigateTo: navigateTo,
    currentUser: null,
    userTrees: []
};