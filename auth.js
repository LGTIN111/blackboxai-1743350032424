// Authentication module
const auth = {
    // Register new user
    register: (email, password) => {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        if (!email.includes('@') || !email.includes('.')) {
            throw new Error('Invalid email format');
        }

        // Get existing users or create new array
        const users = JSON.parse(localStorage.getItem('treeHealthUsers') || '[]');
        
        // Check if user exists
        if (users.some(user => user.email === email)) {
            throw new Error('Email already registered');
        }

        // Add new user
        users.push({ email, password });
        localStorage.setItem('treeHealthUsers', JSON.stringify(users));
        
        // Set as current user
        localStorage.setItem('treeHealthUser', JSON.stringify({ email }));
        return true;
    },

    // Login user
    login: (email, password) => {
        const users = JSON.parse(localStorage.getItem('treeHealthUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Invalid email or password');
        }

        localStorage.setItem('treeHealthUser', JSON.stringify({ email }));
        return true;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('treeHealthUser');
    },

    // Check if user is logged in
    isAuthenticated: () => {
        return !!localStorage.getItem('treeHealthUser');
    },

    // Get current user
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('treeHealthUser'));
    }
};

window.auth = auth;