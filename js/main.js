// ===== ADAM'S TECH - MAIN JAVASCRIPT FILE =====

// ===== CURRENCY EXCHANGE RATE MANAGER =====
const ExchangeRateManager = {
  exchangeRate: null,
  lastUpdateTime: null,
  cacheExpiry: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  
  // Fetch live exchange rate from API
  async fetchExchangeRate() {
    try {
      const now = Date.now();
      const cached = localStorage.getItem('exchangeRate');
      const cachedTime = localStorage.getItem('exchangeRateTime');
      
      // Return cached rate if still valid
      if (cached && cachedTime && (now - parseInt(cachedTime)) < this.cacheExpiry) {
        this.exchangeRate = parseFloat(cached);
        this.lastUpdateTime = parseInt(cachedTime);
        return this.exchangeRate;
      }
      
      // Fetch from free exchange rate API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/SLL');
      if (!response.ok) throw new Error('API call failed');
      
      const data = await response.json();
      const rate = data.rates.USD;
      
      // Cache the rate
      this.exchangeRate = rate;
      this.lastUpdateTime = now;
      localStorage.setItem('exchangeRate', rate.toString());
      localStorage.setItem('exchangeRateTime', now.toString());
      
      return rate;
    } catch (error) {
      console.warn('Could not fetch exchange rate, using fallback:', error);
      // Fallback rate (approx 1 SLE = 0.0408 USD) - this will be replaced by API
      this.exchangeRate = 0.0408;
      return this.exchangeRate;
    }
  },
  
  // Convert SLE to USD
  convertToUSD(amountSLE) {
    if (!this.exchangeRate) return null;
    return amountSLE * this.exchangeRate;
  },
  
  // Get current exchange rate
  getRate() {
    return this.exchangeRate;
  }
};

// Initialize exchange rate on page load
document.addEventListener('DOMContentLoaded', () => {
  ExchangeRateManager.fetchExchangeRate();
});

// Local Storage Management
const StorageManager = {
  getCart: () => JSON.parse(localStorage.getItem('cart')) || [],
  saveCart: (cart) => localStorage.setItem('cart', JSON.stringify(cart)),
  getWishlist: () => JSON.parse(localStorage.getItem('wishlist')) || [],
  saveWishlist: (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist)),
  getOrders: () => JSON.parse(localStorage.getItem('orders')) || [],
  saveOrders: (orders) => localStorage.setItem('orders', JSON.stringify(orders)),
  getUser: () => JSON.parse(localStorage.getItem('user')) || null,
  saveUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
};

// Cart Management
class CartManager {
  constructor() {
    this.cart = StorageManager.getCart();
  }

  addToCart(product, quantity = 1) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity
      });
    }
    
    this.save();
    this.updateBadge();
    this.showNotification(`${product.name} added to cart!`, 'success');
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.save();
    this.updateBadge();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.save();
      this.updateBadge();
    }
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  clear() {
    this.cart = [];
    this.save();
    this.updateBadge();
  }

  save() {
    StorageManager.saveCart(this.cart);
  }

  updateBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.textContent = this.getItemCount();
      badge.style.display = this.getItemCount() > 0 ? 'flex' : 'none';
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        ${message}
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

// Wishlist Management
class WishlistManager {
  constructor() {
    this.wishlist = StorageManager.getWishlist();
  }

  addToWishlist(product) {
    if (!this.wishlist.find(item => item.id === product.id)) {
      this.wishlist.push(product);
      this.save();
      this.updateBadge();
      return true;
    }
    return false;
  }

  removeFromWishlist(productId) {
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    this.save();
    this.updateBadge();
  }

  toggleWishlist(product) {
    const exists = this.wishlist.find(item => item.id === product.id);
    if (exists) {
      this.removeFromWishlist(product.id);
      return false;
    } else {
      this.addToWishlist(product);
      return true;
    }
  }

  isInWishlist(productId) {
    return this.wishlist.some(item => item.id === productId);
  }

  save() {
    StorageManager.saveWishlist(this.wishlist);
  }

  updateBadge() {
    const badge = document.querySelector('.wishlist-badge');
    if (badge) {
      badge.textContent = this.wishlist.length;
      badge.style.display = this.wishlist.length > 0 ? 'flex' : 'none';
    }
  }
}

// Initialize Managers
const cartManager = new CartManager();
const wishlistManager = new WishlistManager();

// Product Rendering
function renderProductCard(product) {
  const isInWishlist = wishlistManager.isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  const stockClass = product.stock > 20 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';
  const stockText = product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';

  return `
    <div class="product-card" onclick="openProductDetail(${product.id})">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.badge ? `<span class="badge badge-${product.badge.toLowerCase().replace(/\s+/g, '')}">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
          <span class="review-count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="current-price">Le ${product.price.toLocaleString()}</span>
          ${product.originalPrice ? `<span class="original-price">Le ${product.originalPrice.toLocaleString()}</span>` : ''}
          ${discount > 0 ? `<span class="discount-percent">-${discount}%</span>` : ''}
        </div>
        <div class="stock-status ${stockClass}">${stockText}</div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="event.stopPropagation(); cartManager.addToCart(products[${products.findIndex(p => p.id === product.id)}], 1)">Add</button>
          <button class="btn-wishlist ${isInWishlist ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlistBtn(this, ${product.id})" title="Add to Wishlist">♡</button>
        </div>
      </div>
    </div>
  `;
}

function openProductDetail(productId) {
  window.location.href = `pages/product-detail.html?id=${productId}`;
}

function toggleWishlistBtn(btn, productId) {
  const product = products.find(p => p.id === productId);
  const isAdded = wishlistManager.toggleWishlist(product);
  btn.classList.toggle('active');
  if (isAdded) {
    cartManager.showNotification('Added to Wishlist!', 'success');
  } else {
    cartManager.showNotification('Removed from Wishlist', 'info');
  }
}

// Product Display
function displayProducts(productList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = productList.map(product => renderProductCard(product)).join('');
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
  cartManager.updateBadge();
  wishlistManager.updateBadge();
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
  const navMain = document.querySelector('.nav-main');
  
  if (mobileMenuBtn && navMain) {
    mobileMenuBtn.addEventListener('click', () => {
      navMain.classList.toggle('active');
    });
    
    navMain.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMain.classList.remove('active');
      });
    });
  }
});

// Search Functionality
function searchProducts(query) {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  );
}

function handleSearch(query) {
  const results = searchProducts(query);
  if (results.length === 0) {
    alert('No products found matching: ' + query);
    return;
  }
  
  // Store results and redirect to shop page
  sessionStorage.setItem('searchResults', JSON.stringify(results));
  sessionStorage.setItem('searchQuery', query);
  window.location.href = 'pages/shop.html';
}

// Filter Products
function filterProducts(filters) {
  let filtered = [...products];
  
  if (filters.category && filters.category.length > 0) {
    filtered = filtered.filter(p => filters.category.includes(p.category));
  }
  
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice);
  }
  
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice);
  }
  
  if (filters.brand && filters.brand.length > 0) {
    filtered = filtered.filter(p => filters.brand.includes(p.brand));
  }
  
  if (filters.minRating !== undefined) {
    filtered = filtered.filter(p => p.rating >= filters.minRating);
  }
  
  if (filters.inStockOnly) {
    filtered = filtered.filter(p => p.stock > 0);
  }
  
  return filtered;
}

// Sort Products
function sortProducts(productList, sortBy) {
  const sorted = [...productList];
  
  switch(sortBy) {
    case 'newest':
      return sorted.reverse();
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'popular':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
}

// Format Currency - Primary SLE format
function formatCurrency(amount) {
  return `Le ${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
}

// Format with USD Conversion
function formatCurrencyWithUSD(amount) {
  const sleFormatted = formatCurrency(amount);
  const usdAmount = ExchangeRateManager.convertToUSD(amount);
  
  if (usdAmount === null) {
    return sleFormatted; // Return only SLE if USD conversion not available
  }
  
  const usdFormatted = `$${usdAmount.toFixed(2)}`;
  return `${sleFormatted} ≈ ${usdFormatted}`;
}

// Checkout Process
class CheckoutProcess {
  constructor() {
    this.currentStep = 1;
    this.orderData = {};
  }

  setStep(step) {
    this.currentStep = step;
  }

  saveCustomerInfo(data) {
    this.orderData.customer = data;
  }

  saveDeliveryMethod(method, location) {
    this.orderData.delivery = { method, location };
  }

  savePaymentMethod(method) {
    this.orderData.payment = method;
  }

  createOrder() {
    const order = {
      orderNumber: 'ORD-' + Date.now(),
      date: new Date().toISOString(),
      items: cartManager.cart,
      customer: this.orderData.customer,
      delivery: this.orderData.delivery,
      payment: this.orderData.payment,
      total: cartManager.getTotal(),
      status: 'Confirmed',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    const orders = StorageManager.getOrders();
    orders.push(order);
    StorageManager.saveOrders(orders);
    
    cartManager.clear();
    
    return order;
  }
}

// Newsletter Signup
function subscribeNewsletter(email) {
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address');
    return false;
  }
  
  alert('Thank you for subscribing! Check your email for exclusive offers.');
  return true;
}

// Notification Styles
const notificationStyles = `
<style>
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 2000;
    animation: slideInUp 0.3s ease-out;
  }

  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .notification-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #6b7280;
  }

  .notification-success {
    border-left: 4px solid #10b981;
  }

  .notification-success::before {
    content: '✓';
    color: #10b981;
    margin-right: 0.5rem;
    font-weight: bold;
  }

  .notification-danger {
    border-left: 4px solid #ef4444;
  }

  .notification-info {
    border-left: 4px solid #3b82f6;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
`;

// Inject notification styles
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.head.insertAdjacentHTML('beforeend', notificationStyles);
  });
} else {
  document.head.insertAdjacentHTML('beforeend', notificationStyles);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CartManager, WishlistManager, CheckoutProcess };
}
