// Amazon Clone - Products Data and Search Logic

// Product Categories
const categories = [
    {
        id: 'electronics',
        name: 'Electronics',
        icon: '📱',
        description: 'Smartphones, laptops, and gadgets'
    },
    {
        id: 'books',
        name: 'Books',
        icon: '📚',
        description: 'Fiction, non-fiction, and textbooks'
    },
    {
        id: 'clothing',
        name: 'Clothing & Accessories',
        icon: '👔',
        description: 'Fashion for men and women'
    },
    {
        id: 'home',
        name: 'Home & Kitchen',
        icon: '🏠',
        description: 'Furniture, decor, and appliances'
    },
    {
        id: 'sports',
        name: 'Sports & Outdoors',
        icon: '⚽',
        description: 'Fitness equipment and outdoor gear'
    },
    {
        id: 'toys',
        name: 'Toys & Games',
        icon: '🎮',
        description: 'Games, puzzles, and toys for all ages'
    },
    {
        id: 'health',
        name: 'Health & Personal Care',
        icon: '💊',
        description: 'Vitamins, supplements, and personal care'
    },
    {
        id: 'automotive',
        name: 'Automotive',
        icon: '🚗',
        description: 'Car parts and accessories'
    }
];

// Sample Product Data (25 products as specified)
const products = [
    // Electronics
    {
        id: 'ELEC001',
        category: 'electronics',
        title: 'Wireless Bluetooth Headphones - Noise Cancelling',
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviewCount: 2341,
        prime: true,
        description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
        features: ['Bluetooth 5.0', '30-hour battery', 'Active noise cancellation', 'Comfortable over-ear design'],
        specifications: {
            'Brand': 'SoundMax Pro',
            'Model': 'WH-1000XM4',
            'Weight': '254g',
            'Battery Life': '30 hours',
            'Connectivity': 'Bluetooth 5.0, 3.5mm jack'
        },
        images: ['headphones1.jpg', 'headphones2.jpg', 'headphones3.jpg'],
        stock: 15
    },
    {
        id: 'ELEC002',
        category: 'electronics',
        title: 'Smartphone 128GB - 6.5" Display',
        price: 449.00,
        originalPrice: 599.00,
        rating: 4.3,
        reviewCount: 5678,
        prime: true,
        description: 'Latest smartphone with advanced camera system, powerful processor, and all-day battery life.',
        features: ['6.5" OLED display', '128GB storage', 'Triple camera system', '5G connectivity'],
        specifications: {
            'Brand': 'TechMobile',
            'Model': 'TM-2024',
            'Display': '6.5" OLED',
            'Storage': '128GB',
            'Camera': '48MP + 12MP + 8MP'
        },
        images: ['smartphone1.jpg', 'smartphone2.jpg', 'smartphone3.jpg'],
        stock: 23
    },
    {
        id: 'ELEC003',
        category: 'electronics',
        title: 'Laptop 15.6" - Intel Core i7, 16GB RAM',
        price: 899.99,
        originalPrice: 1199.99,
        rating: 4.7,
        reviewCount: 1892,
        prime: true,
        description: 'Powerful laptop for work and entertainment with fast processor and brilliant display.',
        features: ['Intel Core i7 processor', '16GB RAM', '512GB SSD', 'Backlit keyboard'],
        specifications: {
            'Brand': 'CompTech',
            'Model': 'CT-15-Pro',
            'Processor': 'Intel Core i7-11800H',
            'RAM': '16GB DDR4',
            'Storage': '512GB SSD'
        },
        images: ['laptop1.jpg', 'laptop2.jpg', 'laptop3.jpg'],
        stock: 8
    },
    {
        id: 'ELEC004',
        category: 'electronics',
        title: 'Smart Watch - Fitness Tracker, Heart Rate Monitor',
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.2,
        reviewCount: 3421,
        prime: false,
        description: 'Advanced fitness smartwatch with health monitoring, GPS, and smartphone integration.',
        features: ['Heart rate monitor', 'GPS tracking', 'Water resistant', '7-day battery'],
        specifications: {
            'Brand': 'FitTech',
            'Model': 'FT-Watch Pro',
            'Display': '1.4" AMOLED',
            'Battery Life': '7 days',
            'Water Resistance': '5ATM'
        },
        images: ['watch1.jpg', 'watch2.jpg', 'watch3.jpg'],
        stock: 31
    },
    {
        id: 'ELEC005',
        category: 'electronics',
        title: 'Tablet 10.9" - 64GB, Wi-Fi',
        price: 329.00,
        originalPrice: 429.00,
        rating: 4.6,
        reviewCount: 2987,
        prime: true,
        description: 'Versatile tablet perfect for work, study, and entertainment with crisp display.',
        features: ['10.9" display', '64GB storage', 'All-day battery', 'Supports stylus'],
        specifications: {
            'Brand': 'TabTech',
            'Model': 'TT-10-Pro',
            'Display': '10.9" Retina',
            'Storage': '64GB',
            'Battery': '10 hours video playback'
        },
        images: ['tablet1.jpg', 'tablet2.jpg', 'tablet3.jpg'],
        stock: 12
    },

    // Books
    {
        id: 'BOOK001',
        category: 'books',
        title: 'The Great Adventure - Hardcover Edition',
        price: 24.99,
        originalPrice: 34.99,
        rating: 4.8,
        reviewCount: 1234,
        prime: true,
        description: 'An epic tale of adventure and discovery that will captivate readers of all ages.',
        features: ['Hardcover edition', '432 pages', 'Award-winning author', 'Beautiful illustrations'],
        specifications: {
            'Author': 'John Adventure',
            'Publisher': 'Adventure Press',
            'Pages': '432',
            'Language': 'English',
            'Format': 'Hardcover'
        },
        images: ['book1.jpg', 'book2.jpg'],
        stock: 45
    },
    {
        id: 'BOOK002',
        category: 'books',
        title: 'Learn Programming: Complete Guide',
        price: 39.99,
        originalPrice: 54.99,
        rating: 4.6,
        reviewCount: 892,
        prime: true,
        description: 'Comprehensive programming guide covering multiple languages and best practices.',
        features: ['20+ programming languages', 'Step-by-step tutorials', 'Real-world projects', 'Free online resources'],
        specifications: {
            'Author': 'Tech Education',
            'Publisher': 'Code Books Inc',
            'Pages': '789',
            'Language': 'English',
            'Format': 'Paperback'
        },
        images: ['book3.jpg', 'book4.jpg'],
        stock: 22
    },
    {
        id: 'BOOK003',
        category: 'books',
        title: 'Healthy Living Cookbook - 100+ Recipes',
        price: 18.99,
        originalPrice: 26.99,
        rating: 4.4,
        reviewCount: 3421,
        prime: false,
        description: 'Delicious and healthy recipes with nutritional information and cooking tips.',
        features: ['100+ healthy recipes', 'Nutritional information', 'Cooking tips', 'Vegetarian options'],
        specifications: {
            'Author': 'Chef Healthy',
            'Publisher': 'Healthy Cooking Press',
            'Pages': '256',
            'Language': 'English',
            'Format': 'Paperback'
        },
        images: ['cookbook1.jpg', 'cookbook2.jpg'],
        stock: 67
    },

    // Clothing
    {
        id: 'CLOTH001',
        category: 'clothing',
        title: 'Premium Cotton T-Shirt - Classic Fit',
        price: 19.99,
        originalPrice: 29.99,
        rating: 4.3,
        reviewCount: 5432,
        prime: true,
        description: 'High-quality cotton t-shirt perfect for everyday wear with classic styling.',
        features: ['100% premium cotton', 'Classic fit', 'Machine washable', 'Available in 6 colors'],
        specifications: {
            'Brand': 'ComfortWear',
            'Material': '100% Cotton',
            'Fit': 'Classic',
            'Care': 'Machine washable',
            'Origin': 'Made in USA'
        },
        images: ['tshirt1.jpg', 'tshirt2.jpg'],
        stock: 120
    },
    {
        id: 'CLOTH002',
        category: 'clothing',
        title: 'Men\'s Leather Belt - Genuine Leather',
        price: 34.99,
        originalPrice: 49.99,
        rating: 4.7,
        reviewCount: 1876,
        prime: true,
        description: 'Genuine leather belt with stylish buckle, perfect for formal and casual wear.',
        features: ['Genuine leather', 'Metal buckle', 'Multiple sizes', 'Classic design'],
        specifications: {
            'Brand': 'LeatherPro',
            'Material': 'Genuine Leather',
            'Buckle': 'Metal alloy',
            'Width': '1.5 inches',
            'Sizes': 'S, M, L, XL'
        },
        images: ['belt1.jpg', 'belt2.jpg', 'belt3.jpg'],
        stock: 34
    },
    {
        id: 'CLOTH003',
        category: 'clothing',
        title: 'Women\'s Running Shoes - Athletic',
        price: 59.99,
        originalPrice: 89.99,
        rating: 4.5,
        reviewCount: 2341,
        prime: true,
        description: 'Comfortable and stylish running shoes perfect for workouts and casual wear.',
        features: ['Breathable mesh', 'Cushioned sole', 'Arch support', 'Non-slip outsole'],
        specifications: {
            'Brand': 'SportFlex',
            'Material': 'Mesh and rubber',
            'Sizes': '6-11',
            'Weight': '8oz per shoe',
            'Technology': 'CushionMax'
        },
        images: ['shoes1.jpg', 'shoes2.jpg', 'shoes3.jpg'],
        stock: 56
    },

    // Home & Kitchen
    {
        id: 'HOME001',
        category: 'home',
        title: 'Coffee Maker - 12-Cup Programmable',
        price: 44.99,
        originalPrice: 69.99,
        rating: 4.4,
        reviewCount: 4521,
        prime: true,
        description: 'Programmable coffee maker with thermal carafe and automatic brewing.',
        features: ['12-cup capacity', 'Programmable timer', 'Thermal carafe', 'Auto-shutoff'],
        specifications: {
            'Brand': 'BrewMaster',
            'Capacity': '12 cups',
            'Carafe': 'Thermal',
            'Programmable': 'Yes',
            'Warranty': '2 years'
        },
        images: ['coffee1.jpg', 'coffee2.jpg'],
        stock: 28
    },
    {
        id: 'HOME002',
        category: 'home',
        title: 'Air Purifier - HEPA Filter, 360° Coverage',
        price: 89.99,
        originalPrice: 139.99,
        rating: 4.6,
        reviewCount: 2987,
        prime: true,
        description: 'Advanced air purifier with HEPA filtration for clean, fresh air.',
        features: ['HEPA filter', '360° coverage', 'Quiet operation', 'Energy efficient'],
        specifications: {
            'Brand': 'AirPure',
            'Coverage': '360°',
            'Filter': 'True HEPA',
            'Noise Level': '< 30dB',
            'Room Size': 'Up to 500 sq ft'
        },
        images: ['purifier1.jpg', 'purifier2.jpg', 'purifier3.jpg'],
        stock: 19
    },
    {
        id: 'HOME003',
        category: 'home',
        title: 'Bed Sheet Set - 100% Egyptian Cotton',
        price: 59.99,
        originalPrice: 89.99,
        rating: 4.7,
        reviewCount: 3456,
        prime: false,
        description: 'Luxurious bed sheet set made from premium Egyptian cotton.',
        features: ['100% Egyptian cotton', '400 thread count', 'Deep pockets', 'Multiple sizes'],
        specifications: {
            'Brand': 'LuxSleep',
            'Material': '100% Egyptian Cotton',
            'Thread Count': '400',
            'Sizes': 'Twin, Queen, King',
            'Set Includes': '4 pieces'
        },
        images: ['sheets1.jpg', 'sheets2.jpg'],
        stock: 41
    },

    // Sports & Outdoors
    {
        id: 'SPORT001',
        category: 'sports',
        title: 'Yoga Mat - Non-Slip, 6mm Thick',
        price: 24.99,
        originalPrice: 39.99,
        rating: 4.5,
        reviewCount: 1876,
        prime: true,
        description: 'High-quality yoga mat with superior grip and cushioning for all yoga styles.',
        features: ['Non-slip surface', '6mm thickness', 'Eco-friendly', 'Carrying strap included'],
        specifications: {
            'Brand': 'YogaPro',
            'Thickness': '6mm',
            'Material': 'TPE Eco-friendly',
            'Dimensions': '72" x 24"',
            'Weight': '2.5 lbs'
        },
        images: ['yogamat1.jpg', 'yogamat2.jpg'],
        stock: 63
    },
    {
        id: 'SPORT002',
        category: 'sports',
        title: 'Dumbbell Set - Adjustable 5-50 lbs',
        price: 149.99,
        originalPrice: 249.99,
        rating: 4.8,
        reviewCount: 987,
        prime: true,
        description: 'Adjustable dumbbell set perfect for home workouts and strength training.',
        features: ['5-50 lbs adjustable', 'Quick-change system', 'Compact storage', 'Non-slip grips'],
        specifications: {
            'Brand': 'StrongFit',
            'Weight Range': '5-50 lbs',
            'System': 'Quick-change',
            'Storage': 'Compact stand',
            'Material': 'Cast iron'
        },
        images: ['dumbbell1.jpg', 'dumbbell2.jpg', 'dumbbell3.jpg'],
        stock: 15
    },
    {
        id: 'SPORT003',
        category: 'sports',
        title: 'Camping Tent - 4-Person, Weatherproof',
        price: 89.99,
        originalPrice: 139.99,
        rating: 4.6,
        reviewCount: 1432,
        prime: false,
        description: 'Spacious 4-person camping tent with weatherproof construction and easy setup.',
        features: ['4-person capacity', 'Weatherproof', 'Easy setup', 'Storage pockets'],
        specifications: {
            'Brand': 'CampPro',
            'Capacity': '4 persons',
            'Season': '3-season',
            'Setup Time': '10 minutes',
            'Weight': '12 lbs'
        },
        images: ['tent1.jpg', 'tent2.jpg', 'tent3.jpg'],
        stock: 27
    },

    // Toys & Games
    {
        id: 'TOY001',
        category: 'toys',
        title: 'Building Blocks Set - 500 Pieces',
        price: 34.99,
        originalPrice: 49.99,
        rating: 4.7,
        reviewCount: 2876,
        prime: true,
        description: 'Creative building blocks set with 500 pieces for endless building possibilities.',
        features: ['500 pieces', 'Multiple colors', 'Compatible sets', 'Storage container'],
        specifications: {
            'Brand': 'BuildFun',
            'Pieces': '500',
            'Ages': '5+',
            'Material': 'Plastic',
            'Safety': 'Non-toxic'
        },
        images: ['blocks1.jpg', 'blocks2.jpg'],
        stock: 54
    },
    {
        id: 'TOY002',
        category: 'toys',
        title: 'Board Game - Strategy Game for 2-6 Players',
        price: 29.99,
        originalPrice: 44.99,
        rating: 4.5,
        reviewCount: 1234,
        prime: true,
        description: 'Strategic board game perfect for family game nights and parties.',
        features: ['2-6 players', '45-60 minutes', 'Easy to learn', 'Replayable'],
        specifications: {
            'Brand': 'GameMaster',
            'Players': '2-6',
            'Play Time': '45-60 min',
            'Age': '8+',
            'Components': 'High quality'
        },
        images: ['boardgame1.jpg', 'boardgame2.jpg'],
        stock: 38
    },

    // Health & Personal Care
    {
        id: 'HEALTH001',
        category: 'health',
        title: 'Multivitamin Supplement - 30-Day Supply',
        price: 19.99,
        originalPrice: 29.99,
        rating: 4.4,
        reviewCount: 4532,
        prime: false,
        description: 'Complete daily multivitamin with essential vitamins and minerals.',
        features: ['30 vitamins/minerals', 'Once daily', 'No artificial colors', 'GMP certified'],
        specifications: {
            'Brand': 'HealthPlus',
            'Supply': '30 days',
            'Form': 'Tablets',
            'Servings': '1 per day',
            'Certification': 'GMP'
        },
        images: ['vitamins1.jpg', 'vitamins2.jpg'],
        stock: 89
    },
    {
        id: 'HEALTH002',
        category: 'health',
        title: 'Electric Toothbrush - Rechargeable',
        price: 39.99,
        originalPrice: 69.99,
        rating: 4.6,
        reviewCount: 2987,
        prime: true,
        description: 'Advanced electric toothbrush with multiple cleaning modes and timer.',
        features: ['5 cleaning modes', '2-minute timer', 'Rechargeable', '2 brush heads'],
        specifications: {
            'Brand': 'DentalPro',
            'Modes': '5',
            'Battery Life': '2 weeks',
            'Timer': '2 minutes',
            'Accessories': '2 brush heads'
        },
        images: ['toothbrush1.jpg', 'toothbrush2.jpg'],
        stock: 46
    },

    // Automotive
    {
        id: 'AUTO001',
        category: 'automotive',
        title: 'Car Phone Mount - Dashboard & Vent',
        price: 14.99,
        originalPrice: 24.99,
        rating: 4.3,
        reviewCount: 3421,
        prime: true,
        description: 'Versatile phone mount that fits dashboard and air vent, compatible with all phones.',
        features: ['Universal compatibility', 'Dashboard & vent mount', '360° rotation', 'Easy installation'],
        specifications: {
            'Brand': 'AutoGear',
            'Compatibility': 'All smartphones',
            'Mount Type': 'Dashboard/Vent',
            'Rotation': '360°',
            'Material': 'ABS plastic'
        },
        images: ['phonemount1.jpg', 'phonemount2.jpg'],
        stock: 78
    },
    {
        id: 'AUTO002',
        category: 'automotive',
        title: 'Emergency Car Kit - jumper cables, tools, first aid',
        price: 49.99,
        originalPrice: 79.99,
        rating: 4.7,
        reviewCount: 1567,
        prime: true,
        description: 'Complete emergency car kit with essential tools and first aid supplies.',
        features: ['Jumper cables', 'First aid kit', 'Basic tools', 'Storage bag'],
        specifications: {
            'Brand': 'SafeDrive',
            'Includes': '20+ items',
            'Bag': 'Durable storage',
            'Warranty': '1 year',
            'Certification': 'ANSI Z308.1'
        },
        images: ['carkit1.jpg', 'carkit2.jpg', 'carkit3.jpg'],
        stock: 23
    }
];

// Review Data Structure
const reviews = [
    {
        id: 'REV001',
        productId: 'ELEC001',
        author: 'Sarah Johnson',
        rating: 5,
        title: 'Amazing sound quality!',
        content: 'These headphones exceeded my expectations. The noise cancellation is incredible and the battery lasts for days. Highly recommend!',
        date: '2024-01-15',
        helpful: 234
    },
    {
        id: 'REV002',
        productId: 'ELEC001',
        author: 'Mike Chen',
        rating: 4,
        title: 'Great headphones, one minor issue',
        content: 'Sound quality is excellent and they\'re very comfortable. Only issue is they\'re a bit heavy for long sessions, but overall very happy with purchase.',
        date: '2024-01-10',
        helpful: 156
    },
    {
        id: 'REV003',
        productId: 'ELEC002',
        author: 'Emma Wilson',
        rating: 5,
        title: 'Best phone I\'ve ever owned',
        content: 'The camera is amazing and the battery easily lasts all day. Display is beautiful and it\'s very fast. Worth every penny!',
        date: '2024-01-12',
        helpful: 189
    },
    {
        id: 'REV004',
        productId: 'CLOTH001',
        author: 'James Smith',
        rating: 4,
        title: 'Good quality t-shirt',
        content: 'Nice fabric and good fit. Holds up well after washing. Will buy in other colors.',
        date: '2024-01-08',
        helpful: 67
    },
    {
        id: 'REV005',
        productId: 'HOME001',
        author: 'Lisa Brown',
        rating: 5,
        title: 'Perfect coffee maker!',
        content: 'Makes great coffee and the programmable feature is so convenient. The thermal carafe keeps coffee hot for hours.',
        date: '2024-01-14',
        helpful: 298
    }
];

// Search and Filter Functions
class ProductManager {
    constructor() {
        this.products = products;
        this.categories = categories;
        this.reviews = reviews;
        this.filteredProducts = [...this.products];
        this.currentFilters = {
            category: 'all',
            priceMin: null,
            priceMax: null,
            rating: null,
            prime: null
        };
        this.currentSort = 'relevance';
        this.searchQuery = '';
    }

    // Search products by query
    searchProducts(query) {
        this.searchQuery = query.toLowerCase().trim();

        if (!this.searchQuery) {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => {
                const searchableText = [
                    product.title,
                    product.description,
                    product.category,
                    ...product.features,
                    ...Object.values(product.specifications)
                ].join(' ').toLowerCase();

                return searchableText.includes(this.searchQuery);
            });
        }

        this.applyFilters();
        this.sortProducts();
        return this.filteredProducts;
    }

    // Filter products
    filterByCategory(category) {
        this.currentFilters.category = category;
        this.applyFilters();
        this.sortProducts();
        return this.filteredProducts;
    }

    applyFilters() {
        let filtered = this.searchQuery ?
            this.products.filter(product => {
                const searchableText = [
                    product.title,
                    product.description,
                    product.category
                ].join(' ').toLowerCase();
                return searchableText.includes(this.searchQuery);
            }) :
            [...this.products];

        // Category filter
        if (this.currentFilters.category !== 'all') {
            filtered = filtered.filter(product =>
                product.category === this.currentFilters.category
            );
        }

        // Price range filter
        if (this.currentFilters.priceMin !== null) {
            filtered = filtered.filter(product =>
                product.price >= this.currentFilters.priceMin
            );
        }

        if (this.currentFilters.priceMax !== null) {
            filtered = filtered.filter(product =>
                product.price <= this.currentFilters.priceMax
            );
        }

        // Rating filter
        if (this.currentFilters.rating !== null) {
            filtered = filtered.filter(product =>
                product.rating >= this.currentFilters.rating
            );
        }

        // Prime filter
        if (this.currentFilters.prime !== null) {
            filtered = filtered.filter(product =>
                product.prime === this.currentFilters.prime
            );
        }

        this.filteredProducts = filtered;
    }

    // Set price filter
    setPriceFilter(minPrice, maxPrice) {
        this.currentFilters.priceMin = minPrice;
        this.currentFilters.priceMax = maxPrice;
        this.applyFilters();
        this.sortProducts();
        return this.filteredProducts;
    }

    // Set rating filter
    setRatingFilter(minRating) {
        this.currentFilters.rating = minRating;
        this.applyFilters();
        this.sortProducts();
        return this.filteredProducts;
    }

    // Set prime filter
    setPrimeFilter(primeOnly) {
        this.currentFilters.prime = primeOnly;
        this.applyFilters();
        this.sortProducts();
        return this.filteredProducts;
    }

    // Clear all filters
    clearFilters() {
        this.currentFilters = {
            category: 'all',
            priceMin: null,
            priceMax: null,
            rating: null,
            prime: null
        };
        this.searchQuery = '';
        this.filteredProducts = [...this.products];
        this.sortProducts();
        return this.filteredProducts;
    }

    // Sort products
    sortProducts(sortType = this.currentSort) {
        this.currentSort = sortType;

        switch (sortType) {
            case 'price-low-high':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'reviews':
                this.filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case 'relevance':
            default:
                // Default sort: higher relevance (rating + reviews)
                this.filteredProducts.sort((a, b) => {
                    const relevanceA = a.rating * Math.log10(a.reviewCount + 1);
                    const relevanceB = b.rating * Math.log10(b.reviewCount + 1);
                    return relevanceB - relevanceA;
                });
                break;
        }

        return this.filteredProducts;
    }

    // Get product by ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Get related products
    getRelatedProducts(productId, limit = 4) {
        const product = this.getProductById(productId);
        if (!product) return [];

        // Find products in same category, sorted by rating
        const related = this.products
            .filter(p => p.category === product.category && p.id !== productId)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);

        // If we don't have enough from same category, add highly rated products
        if (related.length < limit) {
            const additional = this.products
                .filter(p => p.id !== productId && !related.some(r => r.id === p.id))
                .sort((a, b) => b.rating - a.rating)
                .slice(0, limit - related.length);

            related.push(...additional);
        }

        return related;
    }

    // Get products by category
    getCategoryProducts(category, limit = 8) {
        return this.products
            .filter(product => product.category === category)
            .slice(0, limit);
    }

    // Get categories
    getCategories() {
        return this.categories;
    }

    // Get products for homepage (featured)
    getFeaturedProducts(limit = 8) {
        return this.products
            .filter(product => product.rating >= 4.5 && product.prime)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    // Get products on sale
    getSaleProducts(limit = 8) {
        return this.products
            .filter(product => product.originalPrice > product.price)
            .sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price))
            .slice(0, limit);
    }

    // Get reviews for product
    getProductReviews(productId) {
        return this.reviews.filter(review => review.productId === productId);
    }

    // Add review
    addReview(review) {
        const newReview = {
            id: `REV${String(this.reviews.length + 1).padStart(3, '0')}`,
            ...review,
            date: new Date().toISOString().split('T')[0],
            helpful: 0
        };
        this.reviews.push(newReview);
        return newReview;
    }

    // Get search suggestions
    getSearchSuggestions(query, limit = 5) {
        if (!query.trim()) return [];

        const lowerQuery = query.toLowerCase();
        const suggestions = new Set();

        this.products.forEach(product => {
            // Check title matches
            if (product.title.toLowerCase().includes(lowerQuery)) {
                suggestions.add(product.title);
            }

            // Check category matches
            if (product.category.toLowerCase().includes(lowerQuery)) {
                const category = this.categories.find(c => c.id === product.category);
                if (category) {
                    suggestions.add(category.name);
                }
            }
        });

        return Array.from(suggestions).slice(0, limit);
    }
}

// Create global product manager instance
const productManager = new ProductManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productManager, products, categories, reviews };
}