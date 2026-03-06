#LuxeStore - Premium E-Commerce Experience
LuxeStore is a sophisticated, single-page e-commerce application designed for a premium shopping experience. Featuring a clean aesthetic and seamless interactions, it offers users a streamlined way to browse products, filter by preferences, and manage a real-time shopping cart.
##🚀 Key Features
###Dynamic Product Catalog: Renders a high-quality grid of products fetched from a JSON data source.
###Advanced Filtering:
Category Multi-select: Filter by Electronics, Clothing, Home, and Sports.
Price Range: Narrow down products by minimum and maximum price points.
Real-time Search: Instant product lookup via an expanding search bar.
###Interactive Shopping Cart:
Slide-out cart panel for a non-intrusive UI.
Real-time quantity adjustments and subtotal calculation.
Dynamic header badge showing live item counts.
###Fully Responsive: Optimised layouts for Desktop (4 columns), Tablet (3 columns), and Mobile (1–2 columns).
##🎨 Visual Identity
The project follows a "Deep Navy & Coral" theme to evoke a sense of luxury and urgency.
###Primary Colors: #1a1a2e (Deep Navy), #e94560 (Coral Red Accent).
###Typography:
Headings: Playfair Display (Elegant Serif).
Body: DM Sans (Clean Sans-Serif).
###Effects: Smooth 0.3s transitions, subtle elevation shadows, and scale transforms on hover.
##🛠 Tech Stack & Requirements
###Frontend: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript.
###Fonts: Google Fonts (Playfair Display & DM Sans).
###Icons: Standard Icon Library (e.g., FontAwesome or Lucide).
###Data: Local products.json file.
##📁 Project Structure
text
├── index.html          # Main application structure
├── assets/
│   ├── css/
│   │   └── style.css   # Custom styles & design tokens
│   ├── js/
│   │   ├── main.js     # Core logic (Filtering, Cart, UI)
│   │   └── data.js     # Product data fetcher
│   └── img/            # Product & lifestyle images
└── products.json       # Product database
Use code with caution.

##📝 Setup Instructions
Clone the repository:
``bash
git clone https://github.com
Use code with caution.

Navigate to the directory:
``bash
cd luxestore
Use code with caution.

##Run with Live Server:
Since the project fetches data from products.json, use a local server (like the VS Code "Live Server" extension) to avoid CORS issues.
##✅ Acceptance Criteria
Responsive grid layout across all breakpoints.
Functional real-time search and multi-category filtering.
Cart management (Add/Remove/Update Quantity).
Smooth slide-in animations and hover effects.
Subtotal and badge count accuracy.
