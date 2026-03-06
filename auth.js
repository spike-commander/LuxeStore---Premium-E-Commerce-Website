// Authentication JavaScript

const users = JSON.parse(localStorage.getItem('users')) || [];
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toast.className = 'toast ' + type;
    toastMessage.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Login Form Handler
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check for admin
        if (email === 'admin@luxestore.com' && password === 'admin123') {
            const adminUser = {
                id: 'admin',
                email: email,
                name: 'Admin User',
                role: 'admin',
                isAdmin: true
            };
            setCurrentUser(adminUser);
            showToast('Welcome back, Admin!', 'success');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
            return;
        }
        
        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            setCurrentUser(user);
            showToast('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showToast('Invalid email or password', 'error');
        }
    });
}

// Register Form Handler
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Check if passwords match
        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }
        
        // Check if password is at least 8 characters
        if (password.length < 8) {
            showToast('Password must be at least 8 characters', 'error');
            return;
        }
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            showToast('Email already registered', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: 'USR-' + Date.now(),
            firstName,
            lastName,
            name: `${firstName} ${lastName}`,
            email,
            phone,
            password,
            role: 'user',
            isAdmin: false,
            joined: new Date().toISOString()
        };
        
        users.push(newUser);
        saveUsers();
        
        // Auto login
        setCurrentUser(newUser);
        showToast('Account created successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}

// Check auth status and update UI
function updateAuthUI() {
    const user = getCurrentUser();
    const authLinks = document.querySelectorAll('.auth-link');
    
    if (user) {
        authLinks.forEach(link => {
            if (link.textContent === 'Login') {
                link.innerHTML = `<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=random" style="width:24px;height:24px;border-radius:50%;vertical-align:middle;margin-right:4px;">${user.name || user.email}`;
                link.href = '#';
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (user.isAdmin) {
                        window.location.href = 'admin.html';
                    } else {
                        localStorage.removeItem('currentUser');
                        window.location.href = 'login.html';
                    }
                });
            }
        });
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    
    // Add header user menu to all pages
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('register.html') &&
        !window.location.pathname.includes('admin.html')) {
        addHeaderUserMenu();
    }
});

function addHeaderUserMenu() {
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginLink = document.querySelector('.mobile-links a[href="login.html"]');
    const currentUser = getCurrentUser();
    
    if (currentUser && loginBtn) {
        loginBtn.outerHTML = `
            <div class="user-menu" id="userMenu">
                <button class="user-btn" id="userBtn">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || currentUser.email)}&background=e94560&color=fff" alt="User" class="user-avatar">
                    <span class="user-name">${currentUser.name || currentUser.email}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <div class="user-dropdown" id="userDropdown">
                    <a href="#">My Profile</a>
                    <a href="#">My Orders</a>
                    <hr>
                    <a href="#" id="logoutBtn">Logout</a>
                </div>
            </div>
        `;
        
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
        
        document.getElementById('userBtn').addEventListener('click', function(e) {
            e.stopPropagation();
            document.getElementById('userDropdown').classList.toggle('show');
        });
    }
    
    if (currentUser && mobileLoginLink) {
        mobileLoginLink.innerHTML = `
            <div class="mobile-user-info">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name || currentUser.email)}&background=e94560&color=fff" alt="User" class="mobile-user-avatar">
                <span>${currentUser.name || currentUser.email}</span>
            </div>
        `;
    }
    
    document.addEventListener('click', function(e) {
        const userMenu = document.getElementById('userMenu');
        if (userMenu && !userMenu.contains(e.target)) {
            const dropdown = document.getElementById('userDropdown');
            if (dropdown) dropdown.classList.remove('show');
        }
    });
}
