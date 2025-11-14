// Amazon Clone - Shopping Cart Management

class ShoppingCart {
    constructor() {
        this.items = [];
        this.savedForLater = [];
        this.subtotal = 0;
        this.itemCount = 0;
        this.estimatedTax = 0;
        this.shipping = 0;
        this.estimatedTotal = 0;

        // Load cart from localStorage on initialization
        this.loadFromLocalStorage();
        this.calculateTotals();
    }

    // Add item to cart
    addToCart(product, quantity = 1) {
        // Validate product
        if (!product || !product.id) {
            throw new Error('Invalid product data');
        }

        // Validate quantity
        if (!quantity || quantity < 1) {
            quantity = 1;
        }

        // Check if product is already in cart
        const existingItemIndex = this.items.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            // Update quantity of existing item
            const existingItem = this.items[existingItemIndex];
            const newQuantity = existingItem.quantity + quantity;

            // Check stock availability
            if (product.stock && newQuantity > product.stock) {
                throw new Error(`Only ${product.stock} items available in stock`);
            }

            this.items[existingItemIndex].quantity = newQuantity;
        } else {
            // Add new item to cart
            const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                originalPrice: product.originalPrice,
                quantity: quantity,
                image: product.images ? product.images[0] : 'placeholder.jpg',
                prime: product.prime || false,
                category: product.category,
                stock: product.stock || 999
            };

            this.items.push(cartItem);
        }

        // Update totals and save
        this.calculateTotals();
        this.saveToLocalStorage();

        return {
            success: true,
            message: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`,
            itemCount: this.itemCount
        };
    }

    // Update item quantity
    updateQuantity(itemId, newQuantity) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        // Validate new quantity
        if (!newQuantity || newQuantity < 0) {
            newQuantity = 0;
        }

        if (newQuantity === 0) {
            // Remove item if quantity is 0
            return this.removeFromCart(itemId);
        }

        // Check stock availability
        const item = this.items[itemIndex];
        if (item.stock && newQuantity > item.stock) {
            throw new Error(`Only ${item.stock} items available in stock`);
        }

        // Update quantity
        this.items[itemIndex].quantity = newQuantity;

        // Update totals and save
        this.calculateTotals();
        this.saveToLocalStorage();

        return {
            success: true,
            message: 'Cart updated',
            itemCount: this.itemCount
        };
    }

    // Remove item from cart
    removeFromCart(itemId) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        const removedItem = this.items[itemIndex];
        this.items.splice(itemIndex, 1);

        // Update totals and save
        this.calculateTotals();
        this.saveToLocalStorage();

        return {
            success: true,
            message: `${removedItem.title} removed from cart`,
            itemCount: this.itemCount
        };
    }

    // Save item for later
    saveForLater(itemId) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        const item = this.items[itemIndex];

        // Remove from cart and add to saved for later
        this.items.splice(itemIndex, 1);
        this.savedForLater.push(item);

        // Update totals and save
        this.calculateTotals();
        this.saveToLocalStorage();

        return {
            success: true,
            message: `${item.title} saved for later`,
            itemCount: this.itemCount
        };
    }

    // Move item back to cart from saved for later
    moveToCart(itemId) {
        const itemIndex = this.savedForLater.findIndex(item => item.id === itemId);

        if (itemIndex === -1) {
            throw new Error('Item not found in saved for later');
        }

        const item = this.savedForLater[itemIndex];

        // Remove from saved for later and add back to cart
        this.savedForLater.splice(itemIndex, 1);

        // Check if item already exists in cart
        const existingItemIndex = this.items.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex !== -1) {
            // Update quantity if item already in cart
            this.items[existingItemIndex].quantity += item.quantity;
        } else {
            this.items.push(item);
        }

        // Update totals and save
        this.calculateTotals();
        this.saveToLocalStorage();

        return {
            success: true,
            message: `${item.title} moved back to cart`,
            itemCount: this.itemCount
        };
    }

    // Remove saved item completely
    removeSavedItem(itemId) {
        const itemIndex = this.savedForLater.findIndex(item => item.id === itemId);

        if (itemIndex === -1) {
            throw new Error('Item not found in saved for later');
        }

        const removedItem = this.savedForLater[itemIndex];
        this.savedForLater.splice(itemIndex, 1);

        // Save changes
        this.saveToLocalStorage();

        return {
            success: true,
            message: `${removedItem.title} removed from saved items`
        };
    }

    // Clear cart completely
    clearCart() {
        this.items = [];
        this.calculateTotals();
        this.saveToLocalStorage();

        return {
            success: true,
            message: 'Cart cleared',
            itemCount: 0
        };
    }

    // Calculate cart totals
    calculateTotals() {
        // Calculate subtotal
        this.subtotal = this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        // Calculate item count
        this.itemCount = this.items.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        // Calculate estimated tax (8.25% typical tax rate)
        this.estimatedTax = this.subtotal * 0.0825;

        // Calculate shipping (free shipping over $25, otherwise $4.99)
        if (this.subtotal >= 25) {
            this.shipping = 0;
        } else {
            this.shipping = this.itemCount > 0 ? 4.99 : 0;
        }

        // Calculate estimated total
        this.estimatedTotal = this.subtotal + this.estimatedTax + this.shipping;
    }

    // Get cart summary
    getCartSummary() {
        return {
            subtotal: this.subtotal,
            estimatedTax: this.estimatedTax,
            shipping: this.shipping,
            estimatedTotal: this.estimatedTotal,
            itemCount: this.itemCount,
            items: this.items,
            savedForLater: this.savedForLater,
            hasItems: this.items.length > 0,
            hasSavedItems: this.savedForLater.length > 0,
            qualifiesForFreeShipping: this.subtotal >= 25,
            amountForFreeShipping: Math.max(0, 25 - this.subtotal)
        };
    }

    // Save cart to localStorage
    saveToLocalStorage() {
        try {
            const cartData = {
                items: this.items,
                savedForLater: this.savedForLater,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('amazonCart', JSON.stringify(cartData));
        } catch (error) {
            console.warn('Failed to save cart to localStorage:', error);
        }
    }

    // Load cart from localStorage
    loadFromLocalStorage() {
        try {
            const savedCart = localStorage.getItem('amazonCart');
            if (savedCart) {
                const cartData = JSON.parse(savedCart);

                // Validate and restore items
                if (cartData.items && Array.isArray(cartData.items)) {
                    this.items = cartData.items.filter(item =>
                        item && item.id && item.title && item.price && item.quantity > 0
                    );
                }

                // Validate and restore saved for later items
                if (cartData.savedForLater && Array.isArray(cartData.savedForLater)) {
                    this.savedForLater = cartData.savedForLater.filter(item =>
                        item && item.id && item.title && item.price && item.quantity > 0
                    );
                }

                // Check if data is older than 30 days
                if (cartData.lastUpdated) {
                    const lastUpdated = new Date(cartData.lastUpdated);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                    if (lastUpdated < thirtyDaysAgo) {
                        // Clear old cart data
                        this.items = [];
                        this.savedForLater = [];
                        console.log('Cleared old cart data (older than 30 days)');
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to load cart from localStorage:', error);
            // Clear corrupted data
            this.items = [];
            this.savedForLater = [];
        }
    }

    // Get item count for display
    getItemCount() {
        return this.itemCount;
    }

    // Check if item is in cart
    isItemInCart(itemId) {
        return this.items.some(item => item.id === itemId);
    }

    // Get item quantity
    getItemQuantity(itemId) {
        const item = this.items.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    }

    // Get cart item count for specific product
    getCartItemCount() {
        return this.items.length;
    }

    // Get recommendations based on cart items
    getRecommendations(productManager, limit = 4) {
        if (this.items.length === 0) {
            // Return featured products if cart is empty
            return productManager.getFeaturedProducts(limit);
        }

        // Get categories of items in cart
        const cartCategories = [...new Set(this.items.map(item => item.category))];
        const cartProductIds = this.items.map(item => item.id);

        // Find related products
        const recommendations = [];

        cartCategories.forEach(category => {
            const categoryProducts = productManager.getCategoryProducts(category, limit);
            categoryProducts.forEach(product => {
                if (!cartProductIds.includes(product.id) && recommendations.length < limit) {
                    recommendations.push(product);
                }
            });
        });

        // If we don't have enough recommendations, add highly rated products
        if (recommendations.length < limit) {
            const highlyRated = productManager.products
                .filter(p => p.rating >= 4.5 && !cartProductIds.includes(p.id))
                .sort((a, b) => b.rating - a.rating)
                .slice(0, limit - recommendations.length);

            recommendations.push(...highlyRated);
        }

        return recommendations.slice(0, limit);
    }

    // Apply discount code (placeholder for future functionality)
    applyDiscountCode(code) {
        // Basic discount codes for demo
        const discountCodes = {
            'SAVE10': { type: 'percentage', value: 0.10, minAmount: 25 },
            'SAVE20': { type: 'percentage', value: 0.20, minAmount: 50 },
            'FREESHIP': { type: 'shipping', value: 0, minAmount: 0 },
            'NEWUSER': { type: 'percentage', value: 0.15, minAmount: 10 }
        };

        const discount = discountCodes[code.toUpperCase()];

        if (!discount) {
            return {
                success: false,
                message: 'Invalid discount code'
            };
        }

        if (discount.minAmount && this.subtotal < discount.minAmount) {
            return {
                success: false,
                message: `Minimum order amount of $${discount.minAmount} required`
            };
        }

        let discountAmount = 0;
        let message = '';

        switch (discount.type) {
            case 'percentage':
                discountAmount = this.subtotal * discount.value;
                message = `${(discount.value * 100).toFixed(0)}% discount applied`;
                break;
            case 'shipping':
                discountAmount = this.shipping;
                message = 'Free shipping applied';
                break;
        }

        return {
            success: true,
            message,
            discountAmount,
            newTotal: this.estimatedTotal - discountAmount
        };
    }

    // Export cart for checkout
    exportForCheckout() {
        return {
            items: this.items,
            subtotal: this.subtotal,
            tax: this.estimatedTax,
            shipping: this.shipping,
            total: this.estimatedTotal,
            itemCount: this.itemCount
        };
    }
}

// Create global cart instance
const shoppingCart = new ShoppingCart();

// Helper functions for DOM operations
function updateCartDisplay() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = shoppingCart.getItemCount();
    });
}

function showCartMessage(message, type = 'success') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Add to page
    document.body.appendChild(messageDiv);

    // Remove after 3 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// Initialize cart display when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { shoppingCart, updateCartDisplay, showCartMessage };
}