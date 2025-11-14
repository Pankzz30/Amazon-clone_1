// Amazon Clone - Main JavaScript for Site-wide Interactions

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeSite();
});

function initializeSite() {
    setupMobileMenu();
    setupSearch();
    setupAccountDropdown();
    setupCartInteractions();
    setupSmoothScrolling();
    setupLoadingStates();
    setupErrorHandling();
    updateCartDisplay();
}

// Mobile Menu Setup
function setupMobileMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navBar = document.querySelector('.nav-bar');
    const navOverlay = document.createElement('div');
    const navClose = document.createElement('button');

    if (!hamburgerBtn || !navBar) return;

    // Add overlay
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    // Add close button to navigation
    navClose.className = 'nav-close';
    navClose.innerHTML = '×';
    navBar.insertBefore(navClose, navBar.firstChild);

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = navBar.classList.contains('active');
        navBar.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = isActive ? '' : 'hidden';
    }

    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    navClose.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', toggleMobileMenu);

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navBar.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

// Search Functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchCategory = document.querySelector('.search-category');
    let searchTimeout;

    if (!searchInput || !searchButton) return;

    // Handle search input with debouncing
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        searchTimeout = setTimeout(() => {
            if (query.length >= 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        }, 300);
    });

    // Handle search submission
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            const category = searchCategory ? searchCategory.value : 'all';
            const searchUrl = `products.html?q=${encodeURIComponent(query)}&category=${category}`;
            window.location.href = searchUrl;
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-bar')) {
            hideSearchSuggestions();
        }
    });
}

// Search Suggestions
function showSearchSuggestions(query) {
    hideSearchSuggestions();

    const suggestions = productManager.getSearchSuggestions(query, 5);
    if (suggestions.length === 0) return;

    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-suggestions';

    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'search-suggestion-item';
        item.textContent = suggestion;

        item.addEventListener('click', function() {
            searchInput.value = suggestion;
            searchInput.dispatchEvent(new Event('input'));
            const searchButton = document.querySelector('.search-button');
            searchButton.click();
        });

        searchContainer.appendChild(item);
    });

    // Position suggestions
    const searchBar = document.querySelector('.search-bar');
    const inputRect = searchInput.getBoundingClientRect();
    searchContainer.style.position = 'absolute';
    searchContainer.style.top = `${inputRect.bottom}px`;
    searchContainer.style.left = `${inputRect.left}px`;
    searchContainer.style.width = `${inputRect.width}px`;
    searchContainer.style.backgroundColor = '#fff';
    searchContainer.style.border = '1px solid #ddd';
    searchContainer.style.borderTop = 'none';
    searchContainer.style.zIndex = '1000';
    searchContainer.style.maxHeight = '200px';
    searchContainer.style.overflowY = 'auto';

    searchBar.appendChild(searchContainer);
}

function hideSearchSuggestions() {
    const suggestions = document.querySelector('.search-suggestions');
    if (suggestions) {
        suggestions.remove();
    }
}

// Account Dropdown
function setupAccountDropdown() {
    const accountLink = document.querySelector('.header-link[href="#account"]');
    if (!accountLink) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'account-dropdown';
    dropdown.innerHTML = `
        <ul>
            <li><a href="account.html">Your Account</a></li>
            <li><a href="orders.html">Your Orders</a></li>
            <li><a href="wishlist.html">Your Wishlist</a></li>
            <li><a href="recommendations.html">Recommendations</a></li>
            <li><a href="prime.html">Prime Membership</a></li>
            <li><a href="#" onclick="handleSignOut()">Sign Out</a></li>
        </ul>
    `;

    // Style dropdown
    dropdown.style.position = 'absolute';
    dropdown.style.top = '100%';
    dropdown.style.right = '0';
    dropdown.style.backgroundColor = '#fff';
    dropdown.style.border = '1px solid #ddd';
    dropdown.style.borderRadius = '4px';
    dropdown.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    dropdown.style.zIndex = '1000';
    dropdown.style.display = 'none';
    dropdown.style.minWidth = '200px';

    dropdown.querySelector('ul').style.listStyle = 'none';
    dropdown.querySelector('ul').style.margin = '0';
    dropdown.querySelector('ul').style.padding = '8px 0';

    const dropdownItems = dropdown.querySelectorAll('li a');
    dropdownItems.forEach(item => {
        item.style.display = 'block';
        item.style.padding = '8px 16px';
        item.style.color = '#333';
        item.style.textDecoration = 'none';
        item.style.fontSize = '14px';
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f3f3f3';
        });
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    accountLink.style.position = 'relative';
    accountLink.appendChild(dropdown);

    // Toggle dropdown
    let isDropdownOpen = false;

    function toggleDropdown(e) {
        e.preventDefault();
        isDropdownOpen = !isDropdownOpen;
        dropdown.style.display = isDropdownOpen ? 'block' : 'none';
    }

    accountLink.addEventListener('click', toggleDropdown);

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!accountLink.contains(e.target)) {
            isDropdownOpen = false;
            dropdown.style.display = 'none';
        }
    });
}

// Cart Interactions
function setupCartInteractions() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            handleAddToCart(e.target);
        }
    });

    // Quantity controls
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-increase')) {
            handleQuantityChange(e.target, 1);
        } else if (e.target.classList.contains('quantity-decrease')) {
            handleQuantityChange(e.target, -1);
        }
    });

    // Remove from cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            handleRemoveFromCart(e.target);
        }
    });

    // Save for later buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('save-for-later')) {
            handleSaveForLater(e.target);
        }
    });
}

// Handle Add to Cart
function handleAddToCart(button) {
    const productId = button.dataset.productId;
    if (!productId) return;

    const product = productManager.getProductById(productId);
    if (!product) {
        showCartMessage('Product not found', 'error');
        return;
    }

    // Show loading state
    const originalText = button.textContent;
    button.textContent = 'Adding...';
    button.disabled = true;

    setTimeout(() => {
        try {
            const result = shoppingCart.addToCart(product, 1);
            if (result.success) {
                updateCartDisplay();
                showCartMessage(result.message, 'success');

                // Update button text if on product detail page
                if (button.classList.contains('add-to-cart-btn-detail')) {
                    button.textContent = 'Added to Cart';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                    }, 2000);
                } else {
                    button.textContent = originalText;
                    button.disabled = false;
                }
            }
        } catch (error) {
            showCartMessage(error.message, 'error');
            button.textContent = originalText;
            button.disabled = false;
        }
    }, 500); // Simulate network delay
}

// Handle Quantity Changes
function handleQuantityChange(button, change) {
    const cartItem = button.closest('.cart-item');
    if (!cartItem) return;

    const productId = cartItem.dataset.productId;
    const quantityDisplay = cartItem.querySelector('.quantity-display');
    if (!productId || !quantityDisplay) return;

    const currentQuantity = parseInt(quantityDisplay.textContent) || 0;
    const newQuantity = Math.max(0, currentQuantity + change);

    try {
        const result = shoppingCart.updateQuantity(productId, newQuantity);
        if (result.success) {
            quantityDisplay.textContent = newQuantity;
            updateCartTotals();
            updateCartDisplay();

            if (newQuantity === 0) {
                // Remove item from DOM if quantity is 0
                cartItem.remove();
            }
        }
    } catch (error) {
        showCartMessage(error.message, 'error');
    }
}

// Handle Remove from Cart
function handleRemoveFromCart(button) {
    const cartItem = button.closest('.cart-item');
    if (!cartItem) return;

    const productId = cartItem.dataset.productId;
    if (!productId) return;

    if (confirm('Remove this item from your cart?')) {
        try {
            const result = shoppingCart.removeFromCart(productId);
            if (result.success) {
                cartItem.remove();
                updateCartTotals();
                updateCartDisplay();
                showCartMessage(result.message, 'success');

                // Check if cart is empty
                const remainingItems = document.querySelectorAll('.cart-item');
                if (remainingItems.length === 0) {
                    location.reload(); // Reload to show empty cart message
                }
            }
        } catch (error) {
            showCartMessage(error.message, 'error');
        }
    }
}

// Handle Save for Later
function handleSaveForLater(button) {
    const cartItem = button.closest('.cart-item');
    if (!cartItem) return;

    const productId = cartItem.dataset.productId;
    if (!productId) return;

    try {
        const result = shoppingCart.saveForLater(productId);
        if (result.success) {
            cartItem.remove();
            updateCartTotals();
            updateCartDisplay();
            showCartMessage(result.message, 'success');
        }
    } catch (error) {
        showCartMessage(error.message, 'error');
    }
}

// Update Cart Totals (for cart page)
function updateCartTotals() {
    const summary = shoppingCart.getCartSummary();

    // Update summary elements if they exist
    const subtotalElement = document.querySelector('.summary-subtotal');
    const taxElement = document.querySelector('.summary-tax');
    const shippingElement = document.querySelector('.summary-shipping');
    const totalElement = document.querySelector('.summary-total');

    if (subtotalElement) subtotalElement.textContent = `$${summary.subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${summary.estimatedTax.toFixed(2)}`;
    if (shippingElement) {
        shippingElement.textContent = summary.shipping === 0 ? 'FREE' : `$${summary.shipping.toFixed(2)}`;
    }
    if (totalElement) totalElement.textContent = `$${summary.estimatedTotal.toFixed(2)}`;
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Loading States
function setupLoadingStates() {
    // Add loading state to buttons
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button');
        if (button && button.dataset.loading) {
            const originalText = button.textContent;
            button.innerHTML = '<span class="loading"></span> Loading...';
            button.disabled = true;

            // Reset after simulated delay
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        }
    });
}

// Error Handling
function setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        showCartMessage('Something went wrong. Please try again.', 'error');
    });

    // Handle fetch errors
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        showCartMessage('Network error. Please check your connection.', 'error');
    });
}

// Sign Out Handler
function handleSignOut() {
    if (confirm('Are you sure you want to sign out?')) {
        // Clear user session (placeholder)
        localStorage.removeItem('userSession');
        showCartMessage('You have been signed out', 'success');

        // Redirect to home after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Analytics (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Track event:', eventName, properties);
    // In a real implementation, this would send data to analytics service
}

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    trackEvent('page_load', { loadTime });
});

// Service Worker registration (placeholder)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('SW registered:', registration);
        })
        .catch(error => {
            console.log('SW registration failed:', error);
        });
}