let products = [
    {
        "id": 1,
        "name": "Wireless Noise-Canceling Headphones",
        "category": "Electronics",
        "price": 299.99,
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "description": "Premium over-ear headphones with active noise cancellation and 30-hour battery life."
    },
    {
        "id": 2,
        "name": "Smart Fitness Watch",
        "category": "Electronics",
        "price": 199.99,
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        "description": "Track your health metrics with GPS, heart rate monitor, and sleep analysis."
    },
    {
        "id": 3,
        "name": "Premium Cotton T-Shirt",
        "category": "Clothing",
        "price": 39.99,
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        "description": "Soft, breathable organic cotton t-shirt in classic fit."
    },
    {
        "id": 4,
        "name": "Leather Crossbody Bag",
        "category": "Clothing",
        "price": 149.99,
        "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        "description": "Genuine leather bag with adjustable strap and multiple compartments."
    },
    {
        "id": 5,
        "name": "Minimalist Desk Lamp",
        "category": "Home",
        "price": 89.99,
        "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        "description": "Modern LED lamp with touch dimmer and USB charging port."
    },
    {
        "id": 6,
        "name": "Ceramic Vase Set",
        "category": "Home",
        "price": 59.99,
        "image": "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop",
        "description": "Set of 3 handcrafted ceramic vases in neutral tones."
    },
    {
        "id": 7,
        "name": "Professional Yoga Mat",
        "category": "Sports",
        "price": 79.99,
        "image": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
        "description": "Extra-thick, non-slip mat with alignment lines and carrying strap."
    },
    {
        "id": 8,
        "name": "Adjustable Dumbbells Set",
        "category": "Sports",
        "price": 349.99,
        "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
        "description": "Space-saving weight set with 5-52.5 lb range per dumbbell."
    },
    {
        "id": 9,
        "name": "Portable Bluetooth Speaker",
        "category": "Electronics",
        "price": 129.99,
        "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        "description": "Waterproof speaker with 360-degree sound and 24-hour battery."
    },
    {
        "id": 10,
        "name": "Wool Blend Winter Coat",
        "category": "Clothing",
        "price": 289.99,
        "image": "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop",
        "description": "Classic wool blend coat with quilted lining and hidden buttons."
    },
    {
        "id": 11,
        "name": "Indoor Plant Pot Set",
        "category": "Home",
        "price": 44.99,
        "image": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
        "description": "Set of 4 geometric planters with drainage holes and saucers."
    },
    {
        "id": 12,
        "name": "Running Shoes Pro",
        "category": "Sports",
        "price": 159.99,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "description": "Lightweight running shoes with responsive cushioning and breathable mesh."
    }
];
let cart = [];
let activeCategories = [];
let minPriceFilter = null;
let maxPriceFilter = null;
let searchQuery = '';

document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    renderProducts();
});

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        products = data.products;
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const categoryCheckboxes = document.querySelectorAll('#categoryFilters input');
    const mobileCategoryCheckboxes = document.querySelectorAll('#mobileCategoryFilters input');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const mobileMinPriceInput = document.getElementById('mobileMinPrice');
    const mobileMaxPriceInput = document.getElementById('mobileMaxPrice');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const mobileClearFiltersBtn = document.getElementById('mobileClearFilters');
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const heroCta = document.getElementById('heroCta');
    const checkoutBtn = document.getElementById('checkoutBtn');

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        mobileSearchInput.value = e.target.value;
        renderProducts();
    });

    mobileSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        searchInput.value = e.target.value;
        renderProducts();
    });

    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            syncCategoryFilters();
            renderProducts();
        });
    });

    mobileCategoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            syncCategoryFilters();
            renderProducts();
        });
    });

    minPriceInput.addEventListener('input', (e) => {
        minPriceFilter = e.target.value ? parseFloat(e.target.value) : null;
        mobileMinPriceInput.value = e.target.value;
        renderProducts();
    });

    maxPriceInput.addEventListener('input', (e) => {
        maxPriceFilter = e.target.value ? parseFloat(e.target.value) : null;
        mobileMaxPriceInput.value = e.target.value;
        renderProducts();
    });

    mobileMinPriceInput.addEventListener('input', (e) => {
        minPriceFilter = e.target.value ? parseFloat(e.target.value) : null;
        minPriceInput.value = e.target.value;
        renderProducts();
    });

    mobileMaxPriceInput.addEventListener('input', (e) => {
        maxPriceFilter = e.target.value ? parseFloat(e.target.value) : null;
        maxPriceInput.value = e.target.value;
        renderProducts();
    });

    clearFiltersBtn.addEventListener('click', () => {
        clearAllFilters();
    });

    mobileClearFiltersBtn.addEventListener('click', () => {
        clearAllFilters();
    });

    cartBtn.addEventListener('click', () => {
        openCart();
    });

    closeCartBtn.addEventListener('click', () => {
        closeCart();
    });

    cartOverlay.addEventListener('click', () => {
        closeCart();
    });

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    heroCta.addEventListener('click', () => {
        document.querySelector('.products-grid').scrollIntoView({ behavior: 'smooth' });
    });

    checkoutBtn.addEventListener('click', () => {
        // Check if user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            showToast('Please login to checkout!', 'error');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return;
        }
        
        if (cart.length > 0) {
            showToast('Thank you for your order!');
            cart = [];
            updateCart();
            closeCart();
        }
    });
}

function syncCategoryFilters() {
    const desktopCheckboxes = document.querySelectorAll('#categoryFilters input');
    const mobileCheckboxes = document.querySelectorAll('#mobileCategoryFilters input');

    activeCategories = [];
    desktopCheckboxes.forEach((checkbox, index) => {
        checkbox.checked = mobileCheckboxes[index].checked;
        if (checkbox.checked) {
            activeCategories.push(checkbox.value);
        }
    });
}

function clearAllFilters() {
    const desktopCheckboxes = document.querySelectorAll('#categoryFilters input');
    const mobileCheckboxes = document.querySelectorAll('#mobileCategoryFilters input');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const mobileMinPriceInput = document.getElementById('mobileMinPrice');
    const mobileMaxPriceInput = document.getElementById('mobileMaxPrice');
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');

    desktopCheckboxes.forEach(cb => cb.checked = false);
    mobileCheckboxes.forEach(cb => cb.checked = false);
    minPriceInput.value = '';
    maxPriceInput.value = '';
    mobileMinPriceInput.value = '';
    mobileMaxPriceInput.value = '';
    searchInput.value = '';
    mobileSearchInput.value = '';

    activeCategories = [];
    minPriceFilter = null;
    maxPriceFilter = null;
    searchQuery = '';

    renderProducts();
}

function getFilteredProducts() {
    return products.filter(product => {
        const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.category);
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesMinPrice = minPriceFilter === null || product.price >= minPriceFilter;
        const matchesMaxPrice = maxPriceFilter === null || product.price <= maxPriceFilter;

        return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
    });
}

function renderProducts() {
    const filteredProducts = getFilteredProducts();
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');
    const noProducts = document.getElementById('noProducts');

    productCount.textContent = `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '';
        noProducts.classList.add('active');
        return;
    }

    noProducts.classList.remove('active');
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-category">${product.category}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="buy-now-btn" onclick="buyNow(${product.id})">Buy Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        showToast('Please login to add items to cart!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast(`${product.name} added to cart!`);
}

function buyNow(productId) {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        showToast('Please login to purchase!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Add to cart and open cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast(`${product.name} added! Proceeding to checkout...`);
    
    // Open cart for checkout
    setTimeout(() => {
        openCart();
    }, 1000);
}

function updateCart() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function openCart() {
    document.getElementById('cartModal').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 2500);
}

window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.buyNow = buyNow;
