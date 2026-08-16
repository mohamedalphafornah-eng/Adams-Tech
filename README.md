# 🔧 Adam's Tech - E-Commerce Website

## Sierra Leone's Premier Electronics Store

A modern, fully-functional e-commerce website for Adam's Tech, specializing in electronics, smartphones, laptops, watches, accessories, and gaming products.

---

## 📋 Project Overview

Adam's Tech is a production-ready e-commerce platform designed specifically for the Sierra Leonean market. The website features:

- **81+ Products** across 20 categories
- **Complete Shopping System** with cart, wishlist, and checkout
- **Multi-step Checkout** with customer info, delivery, and payment options
- **Order Tracking** system
- **User Account Dashboard** with order history and wishlist
- **Admin Dashboard** for managing products, orders, and customers
- **Responsive Design** optimized for mobile and desktop
- **Fast Performance** with smooth animations and interactions
- **Product Search & Filtering** with multiple options
- **Pricing in Sierra Leonean Leone (Le) with USD Conversion**

---

## 🗂️ Project Structure

```
Adam's Tech/
├── index.html                 # Homepage
├── css/
│   └── styles.css            # Complete stylesheet
├── js/
│   ├── products.js           # 81+ product database
│   └── main.js               # Core JavaScript functionality
└── pages/
    ├── shop.html             # Shop with filters & sorting
    ├── product-detail.html   # Product detail page
    ├── cart.html             # Shopping cart
    ├── checkout.html         # Multi-step checkout
    ├── order-confirmation.html # Order confirmation
    ├── order-tracking.html   # Order tracking
    ├── account.html          # User dashboard
    ├── admin.html            # Admin dashboard
    ├── about.html            # About us page
    ├── contact.html          # Contact page
    └── deals.html            # Deals & offers page
```

---

## 🚀 Features

### **Homepage**

- Hero section with promotional messaging
- Popular categories display
- Featured products showcase
- Flash deals section
- Best sellers
- Product category sections (Smartphones, Laptops, Watches, Audio, Gaming)
- Customer testimonials
- Newsletter signup
- Sticky header navigation
- Footer with multiple sections

### **Shop Page**

- Advanced filtering by:
  - Category
  - Price range
  - Brand
  - Rating
  - Stock availability
- Sorting options:
  - Featured
  - Newest
  - Price (low to high / high to low)
  - Highest rated
  - Most popular
- Responsive product grid
- Product count display

### **Product Detail Page**

- Large product gallery
- Multiple product images
- Detailed specifications
- Customer ratings and reviews
- Stock status
- Color and storage variants
- Quantity selector
- Add to cart functionality
- Wishlist button
- Related products section

### **Shopping Cart**

- Product list with images
- Quantity controls
- Remove items
- Real-time price calculations
- Delivery fee calculation
- Free delivery threshold (Le 500,000+)
- Order summary sidebar

### **Multi-Step Checkout**

- **Step 1: Customer Information**
  - Full name, phone, email
  - Address, city, district
  - Delivery notes
- **Step 2: Delivery Method**
  - Home delivery
  - Store pickup
  - Multiple location options
- **Step 3: Payment Method**
  - Mobile Money
  - Bank Transfer
  - Cash on Delivery
- **Step 4: Order Review & Confirmation**
  - Order summary
  - Final total calculation
  - Order placement

### **Order Tracking**

- Search orders by number and phone
- Real-time status updates
- Delivery timeline
- Order item details
- Total cost display

### **User Account Dashboard**

- Profile management
- Order history with status
- Saved addresses
- Wishlist management
- Account settings
- Email/SMS preferences
- Logout functionality

### **Admin Dashboard**

- Sales statistics
- Order management
- Product management
- Inventory tracking
- Customer management
- Discount code creation
- Low stock alerts
- Recent orders overview

### **Additional Pages**

- About Us - Company story and values
- Contact Us - Contact form and support info
- Deals & Offers - Flash sales and promotions

---

## 💻 Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Grid, Flexbox, and animations
- **JavaScript (Vanilla)** - No frameworks, pure ES6+
- **Local Storage** - Data persistence for cart, wishlist, orders
- **Live Exchange Rate API** - Real-time currency conversion

---

## 💱 Currency System & Exchange Rates

### Primary Currency: Sierra Leone Leone (Le)

The website uses **SLE (Sierra Leone Leone)** as the primary currency, displayed as **"Le"** throughout the platform.

### Live USD Conversion

- **Real-time exchange rates** via [exchangerate-api.com](https://exchangerate-api.com)
- Exchange rate data is **cached locally for 24 hours** to optimize API calls
- **Never hardcoded** - rates update automatically
- Fallback rate available if API is unavailable

### Price Display Format

- **Primary:** Le 500,000 (Sierra Leone Leone)
- **Conversion:** ≈ $20.41 (Live USD equivalent)
- Example: `Le 500,000 ≈ $20.41`

### Example Exchange Rates (Current Live Rates)

| SLE Amount    | USD Equivalent |
| ------------- | -------------- |
| Le 100,000    | ≈ $4.08        |
| Le 500,000    | ≈ $20.41       |
| Le 1,000,000  | ≈ $40.82       |
| Le 5,000,000  | ≈ $204.08      |
| Le 10,000,000 | ≈ $408.16      |

_Note: All USD amounts are approximate and based on live exchange rates. Rates update automatically._

### How It Works

1. **On first page load**, the website fetches the latest SLE → USD exchange rate
2. **Rate is cached** in browser's local storage for 24 hours
3. **All prices displayed in Le** with optional USD conversion
4. **Automatic fallback** to ~0.0408 exchange rate if API is unavailable
5. **Cache expires after 24 hours** - fresh rate fetched on next page load

### API Integration

- **Endpoint:** `https://api.exchangerate-api.com/v4/latest/SLL`
- **No authentication required** for free tier
- **Cached locally** to minimize API requests
- **Graceful degradation** if API is unavailable

### Functions Available

- `ExchangeRateManager.fetchExchangeRate()` - Fetch live rate
- `ExchangeRateManager.convertToUSD(amountSLE)` - Convert SLE to USD
- `formatCurrency(amount)` - Format as "Le X,XXX"
- `formatCurrencyWithUSD(amount)` - Format as "Le X,XXX ≈ $Y.YY"

---

## 📦 Product Categories (20 Total)

1. Smartphones
2. Laptops
3. Tablets
4. Smartwatches
5. Earbuds
6. Headphones
7. Speakers
8. Phone Accessories
9. Chargers & Cables
10. Power Banks
11. Gaming
12. Computer Accessories
13. Storage
14. Cameras
15. TVs & Entertainment
16. Smart Home
17. Networking
18. Computer Components
19. Wearable Technology
20. Clearance

---

## 📱 Products Database

### Sample Products Include:

**Smartphones:**

- iPhone 17 Pro Max - Le 12,500,000
- Samsung Galaxy S25 Ultra - Le 11,200,000
- Google Pixel 9 Pro - Le 9,800,000
- Xiaomi Redmi Note 14 - Le 3,200,000
- Tecno Camon 20 - Le 2,500,000

**Laptops:**

- MacBook Pro 16" M3 Max - Le 28,000,000
- Dell XPS 15 - Le 16,800,000
- HP Spectre x360 - Le 14,200,000
- ASUS ROG Gaming Laptop - Le 15,600,000
- Acer Aspire 5 - Le 8,900,000

**And many more across all categories with realistic specifications and pricing!**

---

## 🎯 Key Functionality

### Cart Management

- Add/remove products
- Update quantities
- Calculate subtotals
- Apply delivery fees
- Auto-save to localStorage

### Wishlist

- Add products to wishlist
- Remove from wishlist
- View wishlist items
- Move to cart

### Search & Filter

- Real-time product search
- Multi-category filtering
- Price range filtering
- Brand selection
- Rating filters
- Stock availability filter

### Order Management

- Create orders
- Track order status
- View order history
- Generate order confirmations
- Store orders in localStorage

### User Authentication

- Simple user session management
- Save user preferences
- Persistent login state

---

## 🔐 Data Persistence

All data is stored locally using Browser's LocalStorage:

- **cart** - Shopping cart items
- **wishlist** - Wishlist items
- **orders** - Order history
- **user** - User session data

---

## 🎨 Design Features

### Color Scheme

- Primary: #1f2937 (Dark Blue-Gray)
- Secondary: #3b82f6 (Bright Blue)
- Accent: #f59e0b (Amber)
- Success: #10b981 (Green)
- Danger: #ef4444 (Red)

### Typography

- Clean, modern sans-serif font stack
- Excellent readability
- Proper hierarchy and spacing

### Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

### Animations

- Smooth hover effects
- Fade-in animations
- Slide transitions
- Loading states

---

## 🚀 Getting Started

### 1. **Opening the Website**

Simply open `index.html` in a web browser. The website will work completely offline without any server requirements.

### 2. **Shopping**

- Browse categories from the homepage
- Use the Shop page for advanced filtering
- Click products for detailed views
- Add items to cart
- Proceed to checkout

### 3. **Checkout Process**

- Enter customer information
- Select delivery method
- Choose payment option
- Review and confirm order

### 4. **Tracking Orders**

- Go to "Order Tracking" page
- Enter order number and phone
- View real-time status

### 5. **Admin Dashboard**

- Access at `pages/admin.html`
- View sales statistics
- Manage products and inventory
- View orders and customers
- Create discount codes

---

## 💰 Pricing & Currency

All prices are displayed in **Sierra Leonean Leone (Le) with live USD conversion**

**Sample Price Ranges:**

- Budget Smartphones: Le 2,200,000 - Le 3,200,000
- Mid-Range Smartphones: Le 5,900,000 - Le 8,900,000
- Premium Smartphones: Le 9,500,000 - Le 12,500,000
- Laptops: Le 8,900,000 - Le 28,000,000
- Accessories: Le 180,000 - Le 2,800,000

**Delivery:**

- Free delivery on orders over Le 500,000
- Standard delivery: Le 15,000
- Multiple location options available

---

## 🌍 Locations

Adam's Tech has stores in:

- **Freetown** (Main Store) - 123 Main Street
- **Bo** - Commerce Street
- **Kenema** - Market Street
- **Makeni** - City Center

---

## 📞 Customer Support

- **Phone:** +23278268113
- **Email:** mohamedalphafornah@gmail.com
- **WhatsApp:** +23278268113
- **Hours:** 8am - 8pm Daily

---

## ✨ Special Features

### Flash Sales

Special discounts marked with **⚡ Flash Sale** badge

### Best Sellers

Most popular products highlighted with **🏆 Best Seller** badge

### Limited Stock

Products with low stock show **⚠️ Limited Stock** badge

### Deals & Offers

- Daily deals
- Weekend specials
- Bundle offers
- Clearance items
- Countdown timers

---

## 📊 Admin Statistics

The admin dashboard displays:

- Total sales revenue
- Total orders
- Total customers
- Products sold
- Low stock alerts
- Best-selling products
- Recent order history

---

## 🔄 Order Status Flow

Orders progress through these statuses:

1. **Order Placed** 📋
2. **Confirmed** ✅
3. **Processing** ⚙️
4. **Shipped** 🚚
5. **Out for Delivery** 📍
6. **Delivered** ✓

---

## 📦 What's Included

✅ 81 products with detailed specifications
✅ 20 product categories
✅ Complete shopping system
✅ Multi-step checkout
✅ Order tracking
✅ User dashboard
✅ Admin panel
✅ Search functionality
✅ Advanced filtering
✅ Wishlist system
✅ Responsive design
✅ Mobile navigation
✅ Contact form
✅ About page
✅ Deals page
✅ Newsletter signup
✅ Product reviews
✅ Rating system

---

## 🎁 Future Enhancements

Potential additions for a production version:

- Real payment gateway integration (Stripe, PayPal)
- Email notifications
- SMS alerts
- Real product images
- Advanced analytics
- Customer reviews & ratings
- Live chat support
- Social media integration
- Mobile app
- Multi-language support
- Inventory management system
- Customer loyalty program

---

## 📝 Notes

- All data is stored locally in the browser (no backend required)
- This is a fully functional demo - no real payments are processed
- Products and pricing are for demonstration
- Suitable for showcasing as a portfolio project
- Can be easily customized for other markets/businesses

---

## 🤝 Support & Customization

To customize this website for your business:

1. **Update Company Info** - Modify store name, address, contact in all pages
2. **Change Colors** - Edit CSS variables in `css/styles.css`
3. **Update Products** - Modify `js/products.js` with your products
4. **Add Features** - Extend `js/main.js` with new functionality
5. **Deploy** - Host on any static hosting (GitHub Pages, Vercel, Netlify, etc.)

---

## 📄 License & Attribution

Created for demonstration purposes. Fully customizable for commercial use.

---

## ✅ Checklist

- ✅ Homepage with hero, categories, featured products
- ✅ Shop page with advanced filtering and sorting
- ✅ Product detail pages
- ✅ Shopping cart with calculations
- ✅ Multi-step checkout process
- ✅ Order confirmation page
- ✅ Order tracking system
- ✅ User account dashboard
- ✅ Admin dashboard with statistics
- ✅ About page
- ✅ Contact page with form
- ✅ Deals & offers page
- ✅ Responsive mobile design
- ✅ Search functionality
- ✅ Wishlist system
- ✅ 81 products database
- ✅ 20 categories
- ✅ Professional styling
- ✅ Smooth animations
- ✅ Local storage persistence

---

**Built with ❤️ for Adam's Tech - Sierra Leone**

_Your Trusted Electronics Store_
