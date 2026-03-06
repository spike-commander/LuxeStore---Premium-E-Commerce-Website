// Admin Portal JavaScript

// Check admin authentication
function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Initialize admin
if (window.location.pathname.includes('admin.html')) {
    if (!checkAdminAuth()) {
        // Will redirect in checkAdminAuth
    } else {
        initializeAdmin();
    }
}

function initializeAdmin() {
    loadProductsForAdmin();
    setupNavListeners();
    updateAdminProfile();
}

function updateAdminProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const profileInfo = document.querySelector('.profile-info');
        if (profileInfo) {
            profileInfo.innerHTML = `
                <span>${currentUser.name}</span>
                <small>${currentUser.email}</small>
            `;
        }
    }
}

function setupNavListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageTitle = document.getElementById('pageTitle');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update section
            const sectionId = this.dataset.section;
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
            
            // Update title
            const titles = {
                'dashboard': 'Dashboard',
                'products': 'Product Management',
                'orders': 'Order Management',
                'users': 'User Management',
                'analytics': 'Analytics',
                'settings': 'Settings'
            };
            pageTitle.textContent = titles[sectionId] || 'Dashboard';
        });
    });
}

// Products data for admin
const adminProducts = [
    { id: 1, name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 299.99, stock: 45 },
    { id: 2, name: 'Smart Fitness Watch', category: 'Electronics', price: 199.99, stock: 32 },
    { id: 3, name: 'Premium Cotton T-Shirt', category: 'Clothing', price: 39.99, stock: 120 },
    { id: 4, name: 'Leather Crossbody Bag', category: 'Clothing', price: 149.99, stock: 28 },
    { id: 5, name: 'Minimalist Desk Lamp', category: 'Home', price: 89.99, stock: 56 },
    { id: 6, name: 'Ceramic Vase Set', category: 'Home', price: 59.99, stock: 67 },
    { id: 7, name: 'Professional Yoga Mat', category: 'Sports', price: 79.99, stock: 89 },
    { id: 8, name: 'Adjustable Dumbbells Set', category: 'Sports', price: 349.99, stock: 15 },
    { id: 9, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 129.99, stock: 73 },
    { id: 10, name: 'Wool Blend Winter Coat', category: 'Clothing', price: 289.99, stock: 22 },
    { id: 11, name: 'Indoor Plant Pot Set', category: 'Home', price: 44.99, stock: 95 },
    { id: 12, name: 'Running Shoes Pro', category: 'Sports', price: 159.99, stock: 41 }
];

function loadProductsForAdmin() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = adminProducts.map(product => `
        <tr>
            <td>#${product.id.toString().padStart(3, '0')}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="action-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="action-btn" onclick="deleteProduct(${product.id})" style="margin-left:4px;background:#dc3545;color:white;">Delete</button>
            </td>
        </tr>
    `).join('');
}

function editProduct(id) {
    const product = adminProducts.find(p => p.id === id);
    if (product) {
        alert(`Edit product: ${product.name}\n\nThis would open an edit modal in a full implementation.`);
    }
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = adminProducts.findIndex(p => p.id === id);
        if (index > -1) {
            adminProducts.splice(index, 1);
            loadProductsForAdmin();
            showAdminToast('Product deleted successfully');
        }
    }
}

function openProductModal() {
    alert('This would open a modal to add a new product in a full implementation.');
}

function showAdminToast(message) {
    // Simple alert for demo
    console.log(message);
}

// Filter buttons for orders
if (document.querySelector('.filter-btns')) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Settings save
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.querySelector('.save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            alert('Settings saved successfully!');
        });
    }
});
