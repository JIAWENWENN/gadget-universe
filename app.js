// App State
let currentPage = 'home';
let selectedProductId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Render initial page
    renderPage();
});

// Navigation function
function navigateTo(page) {
    currentPage = page;
    selectedProductId = null;
    window.scrollTo(0, 0);
    renderPage();
}

// Navigate to product detail
function viewProduct(productId) {
    selectedProductId = productId;
    currentPage = 'detail';
    window.scrollTo(0, 0);
    renderPage();
}

// Main render function
function renderPage() {
    const mainContent = document.getElementById('main-content');
    
    switch (currentPage) {
        case 'home':
            mainContent.innerHTML = renderHomePage();
            break;
        case 'products':
            mainContent.innerHTML = renderProductsPage();
            break;
        case 'detail':
            mainContent.innerHTML = renderProductDetailPage();
            break;
        default:
            mainContent.innerHTML = renderHomePage();
    }
}

// Render Home Page
function renderHomePage() {
    return `
        <div class="home-page">
            <div class="hero-section">
                <div class="hero-bg" style="background-image: url('https://picsum.photos/seed/techbg/1200/800')"></div>
                <div class="hero-content">
                    <h1 class="hero-title">Discover the Future of Tech</h1>
                    <p class="hero-subtitle">
                        Explore our curated collection of cutting-edge gadgets designed to elevate your life.
                    </p>
                    <button onclick="navigateTo('products')" class="hero-button">
                        Explore Products
                    </button>
                </div>
            </div>

            <section class="features-section">
                <h2 class="features-title">Why Choose Us?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <h3>Innovation First</h3>
                        <p>We source only the most innovative and groundbreaking technology.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Quality Guaranteed</h3>
                        <p>Every product is rigorously tested to ensure the highest quality and reliability.</p>
                    </div>
                    <div class="feature-card">
                        <h3>Customer Focused</h3>
                        <p>Our support team is dedicated to providing you with an exceptional experience.</p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Render Products Page
function renderProductsPage() {
    const categorySections = categories.map((category, index) => `
        <section class="category-section" style="animation-delay: ${index * 0.15}s">
            <div class="category-container">
                <h2 class="category-title">${category.name}</h2>
                <p class="category-description">${category.description}</p>
                <div class="products-grid">
                    ${category.products.map(product => `
                        <div class="product-card" onclick="viewProduct('${product.id}')">
                            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <p class="product-price">$${product.price.toFixed(2)}</p>
                                <button class="product-button">View Details</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `).join('');

    return `
        <div class="products-page">
            <div class="products-header">
                <h1 class="products-title">Product Catalog</h1>
                <p class="products-subtitle">Browse our collection by category</p>
            </div>
            ${categorySections}
        </div>
    `;
}

// Render Product Detail Page
function renderProductDetailPage() {
    const product = products.find(p => p.id === selectedProductId);
    
    if (!product) {
        return `
            <div class="error-page">
                <h2 class="error-title">Product Not Found</h2>
                <p class="error-message">The product you are looking for does not exist.</p>
                <button onclick="navigateTo('products')" class="error-button">
                    ← Back to Products
                </button>
            </div>
        `;
    }

    const statusClass = product.status === 'In Stock' ? 'status-in-stock' : 
                       product.status === 'Out of Stock' ? 'status-out-of-stock' : 
                       'status-pre-order';

    return `
        <div class="detail-page">
            <button onclick="navigateTo('products')" class="back-button">
                <span class="back-arrow">←</span> Back to Products
            </button>

            <div class="detail-container">
                <div class="detail-grid">
                    <div class="detail-image-container">
                        <img src="${product.imageUrl}" alt="${product.name}" class="detail-image">
                    </div>
                    
                    <div class="detail-content">
                        <h1 class="detail-name">${product.name}</h1>
                        <p class="detail-price">$${product.price.toFixed(2)}</p>
                        
                        <div class="detail-meta">
                            <span class="status-badge ${statusClass}">${product.status}</span>
                            <span class="detail-meta-text">Quantity: ${product.quantity}</span>
                            <span class="detail-meta-text">Code: ${product.code}</span>
                        </div>

                        <p class="detail-description">${product.description}</p>
                        
                        <div class="features-container">
                            <h3 class="features-heading">Key Features:</h3>
                            <ul class="features-list">
                                ${product.features.map(feature => `
                                    <li class="feature-item">
                                        <svg class="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>${feature}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <button 
                            class="add-to-cart-button" 
                            ${product.status === 'Out of Stock' ? 'disabled' : ''}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
