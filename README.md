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