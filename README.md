# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# E-Commerce Marketplace

This is a React-based e-commerce marketplace project, simulating product Browse, filtering, and cart functionality using a mock REST API with JSON Server.

## Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Business Constraints Implemented](#business-constraints-implemented)
* [Suggested Folder Structure](#suggested-folder-structure)
* [Setup Instructions](#setup-instructions)
* [Functional Demo](#functional-demo)

## Features

This application includes the following core features:

* **Product Listing:** Displays a list of available products.
* **Product Details:** View detailed information for each product on a dedicated page.
* **Shopping Cart:** Users can add products to a cart, adjust quantities, and remove items.
* **CRUD Operations (Mocked):**
    * **Read:** Fetch and display products and cart items from `db.json` via JSON Server.
    * *(Note: Create, Update, Delete for products are implied for an admin panel but not fully implemented in the user-facing UI for this project. Cart operations (add, update quantity, remove) serve as CRUD on `cartItems` resource.)*
* **Filtering:**
    * **Category Filter:** Filter products by their categories (e.g., Electronics, Apparel, Books).
    * **Price Range Filter:** Filter products by predefined price ranges (e.g., $0-50, $50-100, etc.).
    * **Search Bar:** Search products by name or description.
* **State Management:** Utilizes React's `useState` and `useEffect` hooks for local and global (cart) state management.
* **Routing:** Implemented using React Router DOM for navigation between product list, product detail, and cart pages.
* **Responsive UI:** Uses Bootstrap 5 for a responsive and modern user interface.
* **Feedback Messages:** Uses React Toastify for user feedback (e.g., "Product added to cart!", "Out of Stock").

## Technology Stack

* **React 18:** Frontend JavaScript library for building user interfaces.
* **Vite:** Fast development build tool for React projects.
* **Bootstrap 5:** CSS framework for styling and responsive design.
* **JSON Server:** A full fake REST API that can be used to simulate a backend for development.
* **React Router DOM:** For declarative routing in React applications.
* **React Toastify:** For displaying customizable toast notifications.

## Business Constraints Implemented

1.  **Stock Quantity Limit:**
    * **Product Card:** The "Add to Cart" button is disabled if a product is out of stock (`stock <= 0`).
    * **Product Detail:** Users cannot add more items to the cart than the available `stock`. If they try to enter a quantity greater than `stock`, it automatically caps at the `stock` quantity, and a warning toast appears.
    * **Cart Page:** Users cannot update the quantity of a cart item beyond its available `stock`.
2.  **Minimum Quantity (Positive Input):**
    * **Product Detail & Cart Page:** Users cannot input a quantity less than 1. If they attempt to, the input automatically resets to 1, and a warning toast appears.
3.  **Meaningful Filters:** Implemented `Category` and `Price Range` filters, allowing users to narrow down product listings based on common e-commerce criteria.

## Suggested Folder Structure
e-commerce-marketplace/
├── public/                 # Public assets (e.g., index.html)
├── src/                    # Source code for the React application
│   ├── components/         # Reusable UI components and specific pages
│   │   ├── AccountPage.jsx       # User login/register, dashboard, inbox
│   │   ├── AboutPage.jsx         # Static "About Us" information
│   │   ├── Cart.jsx              # Shopping cart display and management
│   │   ├── FilterSidebar.jsx     # Filters for products (category, price, search)
│   │   ├── Footer.jsx            # Application footer
│   │   ├── HomePage.jsx          # Main landing page with sign-up call to action
│   │   ├── Navbar.jsx            # Top navigation bar with links and icons
│   │   ├── OrderHistoryPage.jsx  # Displays user's past orders
│   │   ├── ProductCard.jsx       # Individual product display card
│   │   ├── ProductDetail.jsx     # Detailed view of a single product
│   │   ├── ProfileSettingsPage.jsx # Update user profile info & password
│   │   ├── SearchPage.jsx        # Dedicated product search page
│   │   ├── ShopPage.jsx          # Main product listing page (previously ProductList)
│   │   └── SignUpSection.jsx     # Reusable sign-up form for home page
│   ├── services/           # Functions for interacting with the backend (JSON Server)
│   │   └── productApi.js         # API calls for products
│   ├── App.jsx             # Main application component, handles global state & routing
│   ├── main.jsx            # Entry point for the React application
│   └── index.css           # Global CSS styles
├── db.json                 # Mock database file for JSON Server (product data, etc.)
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite build configuration
└── README.md               # This file!

Setup Instructions
Follow these steps to get the project up and running on your local machine.

Navigate to your desired project directory:
Open your Command Prompt (or Git Bash/PowerShell) and change to the directory where you want to create the project. For example:

D:
cd D:\react-projects

**Create the React project**:
Use Vite to create the basic React project structure.

npm create vite@latest e-commerce-marketplace -- --template react

**Navigate into your new project folder**:

cd e-commerce-marketplace

**Install project dependencies**:
This installs React and other core dependencies.

npm install

**Install additional libraries**:
Install react-router-dom, bootstrap, json-server, react-toastify, and lucide-react.

npm install react-router-dom bootstrap json-server react-toastify lucide-react

**Create db.json**:
In the root of your e-commerce-marketplace folder, create a file named db.json and paste the following content into it:

{
  "products": [
    {
      "id": 1,
      "name": "Stylish Men's Shirt",
      "category": "Men's Apparel",
      "price": 45.00,
      "description": "A comfortable and stylish shirt for men, perfect for casual outings.",
      "imageUrl": "https://images.unsplash.com/photo-1596756619553-90d56c4295e2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 15
    },
    {
      "id": 2,
      "name": "Elegant Women's Dress",
      "category": "Women's Apparel",
      "price": 85.99,
      "description": "An elegant dress designed for comfort and style, suitable for any occasion.",
      "imageUrl": "https://images.unsplash.com/photo-1548967910-fe140882dd1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 10
    },
    {
      "id": 3,
      "name": "Kid's Adventure Backpack",
      "category": "Children's Gear",
      "price": 30.00,
      "description": "A durable and fun backpack for children, perfect for school or day trips.",
      "imageUrl": "https://images.unsplash.com/photo-1592683935269-e77a28b0f985?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 20
    },
    {
      "id": 4,
      "name": "Wireless Gaming Headset",
      "category": "Electronics",
      "price": 120.50,
      "description": "Immersive sound and comfort for long gaming sessions.",
      "imageUrl": "https://images.unsplash.com/photo-1616788225574-8b6564619d08?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 8
    },
    {
      "id": 5,
      "name": "Men's Running Shoes",
      "category": "Men's Apparel",
      "price": 95.00,
      "description": "Lightweight and supportive running shoes for optimal performance.",
      "imageUrl": "https://images.unsplash.com/photo-1560769629-9f2d87e2213e?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 12
    },
    {
      "id": 6,
      "name": "Women's Yoga Pants",
      "category": "Women's Apparel",
      "price": 40.00,
      "description": "Flexible and breathable yoga pants for comfortable workouts.",
      "imageUrl": "https://images.unsplash.com/photo-1589139268682-16e537d94f24?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 18
    },
    {
      "id": 7,
      "name": "Children's Building Blocks",
      "category": "Children's Toys",
      "price": 25.00,
      "description": "Colorful building blocks to foster creativity and fine motor skills in kids.",
      "imageUrl": "https://images.unsplash.com/photo-1534063855577-9875b42d5010?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 30
    },
    {
      "id": 8,
      "name": "Smart Watch",
      "category": "Electronics",
      "price": 199.99,
      "description": "Track your fitness, notifications, and more with this versatile smartwatch.",
      "imageUrl": "https://images.unsplash.com/photo-1579586326078-43890f576b92?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 10
    },
    {
      "id": 9,
      "name": "Children's Puzzle Set",
      "category": "Children's Toys",
      "price": 18.50,
      "description": "An engaging puzzle set designed to challenge young minds and enhance problem-solving skills.",
      "imageUrl": "https://images.unsplash.com/photo-1628045934149-a2e6b2b7b51b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "stock": 25
    }
  ],
  "cartItems": []
}

Create .gitignore:
In the root of your e-commerce-marketplace folder, create a file named .gitignore and paste the following content into it:

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
.report/

# Node.js
node_modules/
dist/
dist-ssr/
*.local
.env
.env.*
.npmrc
.yarn/
.vite/
npm-cache/
.eslintcache
.prettierignore
.vscode/

# macOS
.DS_Store

# Windows
Thumbs.db
ehthumbs.db
*.stackdump

# Editor directories and files
.idea/
.vs/
*.swp
*.swo
*.bak
*.tmp
*.iml
.project
.classpath
.settings/
.history

**Replace content of existing files**:

src/components/ShopPage.jsx (rename ProductList.jsx to ShopPage.jsx first)

src/components/ProductDetail.jsx

src/components/Navbar.jsx

src/components/Cart.jsx

src/App.jsx

src/index.css

src/components/HomePage.jsx (NEW FILE)

src/components/SignUpSection.jsx (NEW FILE)

src/components/AccountPage.jsx (Updated for login/register and inbox)

src/components/AboutPage.jsx (NEW FILE)

src/components/SearchPage.jsx (NEW FILE)

src/components/ProfileSettingsPage.jsx (NEW FILE - now functional)

src/components/OrderHistoryPage.jsx (NEW FILE - now dynamic)

src/components/Footer.jsx (NEW FILE)

(You will need to copy the latest code for each of these files from our conversation history and paste it into your respective files. The last provided versions for each component are the correct ones.)

**Start JSON Server**:
Open a new Command Prompt window, navigate to your e-commerce-marketplace project root, and run:

json-server --watch db.json --port 5000

Keep this terminal window open.

**Start the React development server**:
Open another new Command Prompt window, navigate to your e-commerce-marketplace project root, and run:

npm run dev

This will usually open your application in your default web browser at http://localhost:5173/.

How to Demo
When demonstrating the project, cover the following key functionalities:

Application Launch: Show the HomePage with the welcome message and sign-up section.

**Navigation**:

Click "Shop" in the Navbar to go to the product listing.

Use the "Shop" dropdown to filter products by "Men's", "Women's", "Children's", and "Electronics" categories.

Navigate to "About Us" and "Search" pages.

Shopping Experience:

Add various products to the cart from the "Shop" page.

Go to the "Cart" page:

Change product quantities.

Remove products.

Demonstrate stock and minimum quantity constraints.

Proceed to Checkout: Show the detailed toast notification that appears.

User Account Features:

Go to the "Account" page.

Register a new user with an email and password.

Log in with the newly created account.

Show the "Welcome" notification in the inbox.

Navigate to "Profile Settings":

Update personal information (name, address, phone).

Demonstrate saving changes.

Change the password and verify the new password by logging out and logging back in.

Navigate to "Order History":

Show the dynamically updated list of orders placed (from the checkout process).

Demonstrate logging out.

Search Functionality: Use the "Search" page to find specific products.

Responsiveness: Briefly show how the layout adapts on a smaller screen (e.g., by resizing the browser window).

**Additional Notes**
Data Persistence: User accounts, profiles, cart data, and order history are stored in the browser's localStorage. This is for demonstration purposes; a real-world application would use a secure backend database.

Authentication: The authentication system is simplified for demonstration; actual passwords are not hashed.

Scalability: For larger applications, consider a more robust state management solution (e.g., Redux, Zustand) and a proper backend API (e.g., Node.js, Python/Django).

Error Handling: Basic error handling for API fetches is in place.
