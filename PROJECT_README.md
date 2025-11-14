# Amazon Clone

A comprehensive Amazon.com clone built with simple HTML, CSS, and vanilla JavaScript. This project demonstrates modern web development practices with responsive design, e-commerce functionality, and user experience features.

## Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse 25+ products across 8 categories
- **Advanced Search**: Real-time search with suggestions and filters
- **Product Details**: Detailed product pages with reviews and specifications
- **Shopping Cart**: Full cart functionality with persistence using localStorage
- **Wishlist**: Save items for later

### 📱 Responsive Design
- **Mobile First**: Optimized for all screen sizes (320px to 1440px+)
- **Touch Friendly**: Mobile navigation with hamburger menu
- **Adaptive Layout**: Grid systems that adapt to screen size

### 🎨 Amazon-Style UI
- **Authentic Design**: Matches Amazon's color scheme and layout
- **Interactive Elements**: Hover states, transitions, and micro-animations
- **Accessibility**: Semantic HTML5, ARIA labels, keyboard navigation
- **Performance**: Lazy loading, debounced search, optimized rendering

### 🛒 E-commerce Features
- **Product Management**: 25 sample products with realistic data
- **Category Filtering**: Filter by category, price, rating, Prime eligibility
- **Sorting Options**: Sort by relevance, price, rating, reviews
- **Cart Operations**: Add, update quantity, remove items
- **Recommendations**: Smart product recommendations

## Project Structure

```
Amazon-clone_1/
├── index.html              # Homepage with categories and featured products
├── products.html            # Product listing with search and filters
├── product-detail.html      # Individual product page with reviews
├── cart.html               # Shopping cart with checkout
├── styles/
│   ├── main.css           # Core Amazon styling and colors
│   └── responsive.css     # Mobile and tablet breakpoints
├── js/
│   ├── products.js        # Product data, search, and filtering
│   ├── cart.js           # Shopping cart functionality
│   └── main.js           # Site-wide interactions
├── assets/
│   └── images/          # Product images and assets
├── sw.js                # Service worker for offline support
└── README.md           # This file
```

## Technology Stack

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Modern layout with Grid and Flexbox
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **LocalStorage**: Cart persistence and user preferences
- **Service Worker**: Offline support and caching

## Getting Started

1. **Download or clone** the project files
2. **Open `index.html`** in your web browser
3. **Start shopping!** No build process or server required

### Quick Start

```bash
# If using a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

Or simply open `index.html` directly in your browser.

## Key Features Explained

### 🔍 Search & Discovery
- **Real-time Search**: As-you-type search with 300ms debounce
- **Smart Filters**: Category, price range, rating, Prime eligibility
- **Search Suggestions**: Auto-complete suggestions based on products
- **URL Parameters**: Shareable search results and filtered views

### 🛒 Shopping Cart
- **Persistent Cart**: Cart survives page refreshes and browser restarts
- **Quantity Controls**: Increment/decrement with stock validation
- **Save for Later**: Keep items for future consideration
- **Price Calculation**: Real-time totals with tax and shipping estimates
- **Free Shipping**: Automatic calculation and messaging

### 📱 Mobile Experience
- **Responsive Grid**: Adaptive product grids (1-4 columns)
- **Touch Gestures**: Swipe-friendly navigation
- **Mobile Menu**: Slide-out navigation with overlay
- **Optimized Images**: Placeholder system for missing images

### 🎨 Visual Design
- **Amazon Colors**: Authentic Amazon color palette
- **Micro-interactions**: Smooth transitions and hover states
- **Loading States**: Visual feedback for user actions
- **Error Handling**: Graceful degradation for missing content

## Product Catalog

The clone includes **25 sample products** across **8 categories**:

- **Electronics**: Headphones, smartphones, laptops, smartwatches
- **Books**: Fiction, technical guides, cookbooks
- **Clothing**: T-shirts, belts, shoes
- **Home & Kitchen**: Coffee makers, air purifiers, bedding
- **Sports & Outdoors**: Yoga mats, dumbbells, camping gear
- **Toys & Games**: Building blocks, board games
- **Health & Personal Care**: Vitamins, electric toothbrushes
- **Automotive**: Phone mounts, emergency kits

Each product includes:
- Multiple images with gallery view
- Detailed specifications
- Customer reviews and ratings
- Prime eligibility indicators
- Stock availability tracking

## Browser Compatibility

✅ **Modern Browsers** (Recommended)
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

⚠️ **Legacy Support**
- Basic functionality works in older browsers
- Graceful degradation for unsupported features

## Performance Features

- **Lazy Loading**: Images load as needed
- **Debounced Search**: Reduces unnecessary API calls
- **Event Delegation**: Efficient DOM event handling
- **LocalStorage Caching**: Faster page loads with saved data
- **Service Worker**: Offline support and resource caching

## Security & Best Practices

- **XSS Protection**: Safe HTML generation
- **Input Validation**: Form validation and sanitization
- **HTTPS Ready**: Production-ready security headers
- **Semantic HTML**: Screen reader compatible
- **Keyboard Navigation**: Full keyboard accessibility

## Development Notes

### Customization
- **Colors**: Modify CSS variables in `main.css`
- **Products**: Update `products.js` data structure
- **Categories**: Add new categories in `products.js`
- **Styling**: Component-based CSS organization

### Extension Ideas
- User authentication system
- Backend API integration
- Payment processing
- Order history
- Product comparison
- Wish lists
- Review submission
- Multi-language support

## Acknowledgments

This is an **educational project** created to demonstrate web development skills. Amazon® is a registered trademark of Amazon.com, Inc. This project is not affiliated with, endorsed by, or sponsored by Amazon.

---

**Built with ❤️ using HTML, CSS, and JavaScript**