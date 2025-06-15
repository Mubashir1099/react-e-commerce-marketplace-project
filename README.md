# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# E-Commerce Marketplace

This is a React-based e-commerce marketplace project, simulating product Browse, filtering, and cart functionality using a mock REST API with JSON Server.

**Student Information**

Name: Muhammad Mubashir

Roll Number: F23BDOCS1M01051

Section: 3M

**Project Overview**

This project is a React-based Single-Page Application (SPA) designed to simulate the core functionalities of an online e-commerce store. It allows users to browse a product catalog, add items to a shopping cart, proceed through a simulated checkout process, manage user accounts, and interact with products by leaving reviews.
The backend is simulated using json-server, which provides a quick and easy way to mock a REST API for data persistence in a local db.json file. User authentication is also simulated using localStorage.


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

   **Create (C):**
1.User Registration: Creating new user accounts (localStorage).
2.Add to Cart: Adding new items to the shopping cart (cartItems state).
3.Place Order: Creating new order records (orders in db.json).
4.Add Product: Adding new products to the main catalog (products in db.json via productApi.js).
5.Add Review: Adding new reviews to a product (reviews array within products in db.json).

**Read (R):**
1.Browse Products: Displaying all products on ShopPage.
2.View Product Details: Fetching and displaying a single product on ProductDetail.jsx.
3.View Cart: Displaying items in the Cart.jsx.
4.User Login: Reading user credentials from localStorage.
5.View Profile: Reading user profile data from localStorage.
6.View Order History: Fetching and displaying past orders from db.json.
7.View Product Reviews: Displaying all reviews for a specific product.
8.View Notifications: Displaying messages in the user's inbox.

**Update (U):**
1.Update Cart Quantity: Modifying the quantity of items in the cart.
2.Update User Profile: Changing personal information (userProfiles in localStorage).
3.Change Password: Updating user passwords (users in localStorage).
4.Edit Product: Modifying existing product details (products in db.json via productApi.js).
5.Edit Review: Updating an existing review (reviews array within products in db.json).
6.Mark Notification as Read: Changing the status of a notification (notifications in localStorage).

**Delete (D):**
1.Remove from Cart: Deleting items from the shopping cart.
2.Delete Product: Removing products from the main catalog (products in db.json via productApi.js).
3.Clear Notifications: Removing all notifications from the inbox.
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
4.    **Password Policy:** User registration/password change requires a minimum password length (e.g., 6 characters).
5.    **Unique Email:** Registration prevents creating accounts with already registered email addresses.
6.   **Owner-Only Editing/Deletion:** Product editing and deletion functionalities are restricted to the ownerEmail associated with the product.

7.   **Login for Interaction:** Users must be logged in to add products, place orders, rate products, or submit reviews.
## Suggested Folder Structure
e-commerce-marketplace/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components and page-level components
│   │   ├── AccountPage.jsx
│   │   ├── AddProductPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── Cart.jsx
│   │   ├── EditProductPage.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── HomePage.jsx
│   │   ├── Navbar.jsx
│   │   ├── OrderHistoryPage.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProfileSettingsPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── SignUpSection.jsx
│   │   └── ... (other components)
│   ├── services/           # API integration logic
│   │   └── productApi.js   # Functions for interacting with JSON Server
│   ├── App.jsx             # Main application component, sets up routing and global state
│   ├── index.css           # Global stylesheets
│   └── main.jsx            # Entry point for the React app (Vite)
├── db.json                 # JSON Server database file
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation

## Setup Instructions

To get this project up and running on your local machine, follow these steps:

**Clone the Repository:**

git clone [git clone https://github.com/Mubashir1099/react-e-commerce-marketplace-project.git]
cd e-commerce-marketplace

**Install Dependencies:**
Navigate to the project root directory and install the necessary Node.js packages:
npm install

**Start JSON Server (Backend Simulation):**
Open a new terminal window (keep the first one open for the React app) and run the JSON Server:
.npx json-server --watch db.json --port 5000

Ensure db.json is in the root directory. This command makes your mock API available at http://localhost:5000.

**Start the React Development Server:**
In your first terminal window, start the React application:
npm run dev

This will typically open the application in your browser at http://localhost:5173 (or another available port).

## Functional Demo

Here's a step-by-step functional demo to guide you through showcasing your E-Commerce Marketplace project. This is essentially how you can demonstrate its features to your teacher.

Before you start the demo, ensure both your JSON Server and React application are running:

**1.Open your terminal/command prompt.**
**2.Navigate to your project directory:**
Bash
cd D:\react-projects\e-commerce-marketplace

**3.Start JSON Server (in a new terminal window, or a new tab in your current terminal):**
Bash
npx json-server --watch db.json --port 5000
(Keep this terminal window open.)

**4.Start the React Development Server (in your original terminal window):**
Bash
npm run dev
(This will open the app in your browser, usually at http://localhost:5173).

**Functional Demo Steps:**

**1. Home Page & Initial Browsing**

.Action: Open your browser and navigate to http://localhost:5173.
.Demonstrate:
               .The HomePage with the welcome message and "Start Shopping" button.
               .The SignUpSection (now "Join Our Community!").
.Explain: This is the landing page designed to welcome users and invite them to explore.

**2. Product Catalog & Filtering (Shop Page)**

.Action: Click "Start Shopping" on the home page or "Shop" in the Navbar.
.Demonstrate:
              .All products displayed in a grid using ProductCard components.
              .Filtering: Use the "Category" dropdown in the FilterSidebar (e.g., select "Electronics"). Show how the product list updates.
              .Price Range Filtering: Select a price range (e.g., "$50 - $100"). Show how the list refines further.
              .Search: Type a keyword in the "Search" bar (e.g., "shirt"). Show results.
              .Average Ratings: Point out the average star rating displayed on each ProductCard.
.Explain: This page allows users to efficiently find products using various filters and search.

**3. Product Details & Review System**

.Action: Click on any ProductCard's "View Details" button.
.Demonstrate:
            .The ProductDetail page showing comprehensive information (larger image, full description, price, stock).
            .Quantity Selector: Change the quantity. Show how it's limited by stock. Try to enter a quantity higher than stock to trigger the toast error.
            ."Add to Cart" button: Click it. Observe the toast notification ("Product added to cart!") and the cart item count updating in the Navbar.
            .Review System: Scroll down to the "Rate & Review This Product" section.
.Action: Log in first (go to Account, register/login, then come back).
.Demonstrate: Select a star rating. Click "Add/Edit Review", type a comment, and click "Submit Review". Show the toast notification.
.Demonstrate: Show how your new review appears in the "All Reviews" list. If you submit another review for the same product, show that it updates your existing review.
.Demonstrate: Point out how the "Average Rating" for the product updates based on your review.
.Explain: This page provides in-depth product information and allows for crucial user interaction through ratings and reviews.

**4. Shopping Cart Management**

.Action: Click the "Shopping Cart" icon in the Navbar.
.Demonstrate:
            .List of items currently in the cart with their images, names, prices, and quantities.
            .Update Quantity: Change the quantity of an item directly in the cart. Show the total updating. Try to set quantity to 0 or negative to show the constraint.
            .Remove Item: Click the "Remove" button next to an item. Show it disappearing from the cart and the toast notification.
            .Total Price: Highlight the dynamically calculated total price.
.Explain: This is where users manage their selected items before purchase.

**5. Simulated Checkout**

.Action: Ensure you are logged in (via the Account Page) and have items in your cart. Then, on the Cart page, click "Proceed to Checkout."
.Demonstrate:
           .The cart clears.
           .A success toast notification appears: "Checkout successful! Your order #... placed successfully!"
.Explain: This simulates the final purchase process.

**6. User Account & Order History**

.Action: Click the "User" icon in the Navbar, or navigate to /account.
.Demonstrate:
             .Login/Registration: If not logged in, quickly show the registration/login forms. Log in with an existing user (e.g., test@example.com if you registered one, or create a new one).
             .Dashboard: Once logged in, show the "Welcome" message with the user's email.
             ."Order History": Click the "View Orders" button under "Order History".
.Demonstrate: Show how the order you just placed appears in the list. Point out the Order ID, date, total, and status. Click "View Details" to show the toast with item specifics.
             ."Profile Settings": Click "Manage Profile". Explain this is where users can update details (no live demo needed unless you built out that form).
             ."Inbox": Click "View Inbox". Show notifications for adding to cart, removing items, placing orders, and account actions (login/logout/signup). Demonstrate marking as read and clearing.
             .Logout: Click the "Logout" button. Show the toast message and how the account page reverts to login/registration.
.Explain: This section provides a personalized experience for the user, allowing them to manage their profile, track orders, and receive notifications.

**7. Product Management (Admin-like CRUD)**

.Action: Log in with any user account. Go to /add-product (you might need to type this in the URL if there isn't a direct link in the Navbar yet).
.Demonstrate:
            .Add Product: Fill out the form completely (Name, Category, Price, Description, Image URL, Stock). Click "Submit Product".
.Demonstrate: Go back to the /shop page. Show how your newly added product now appears in the main catalog.
           .Edit Product: Go to the detail page of the product you just added. You will see an "Edit Product" button. Click it, change a detail (e.g., price or stock), and save. Show how the detail page reflects the change.
           .Delete Product: On the detail page of your owned product, click the "Delete Product" button. Confirm the action.
.Demonstrate: Go back to the /shop page and confirm the product is now gone.
.Explain: This demonstrates the ability to manage the product catalog dynamically, showcasing full CRUD capabilities. You can mention that in a real application, this would typically be restricted to an admin user.
