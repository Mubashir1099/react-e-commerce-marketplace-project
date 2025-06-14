import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AboutPage from './components/AboutPage';
import AccountPage from './components/AccountPage'; // <--- THIS LINE IS CORRECTED
import SearchPage from './components/SearchPage';
import ProfileSettingsPage from './components/ProfileSettingsPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { addOrder } from './services/productApi';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('e-commerce-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [currentUserEmail, setCurrentUserEmail] = useState(() => {
    return localStorage.getItem('currentUserEmail') || '';
  });

  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  useEffect(() => {
    localStorage.setItem('e-commerce-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const checkCurrentUser = () => {
      setCurrentUserEmail(localStorage.getItem('currentUserEmail') || '');
    };
    window.addEventListener('storage', checkCurrentUser);
    checkCurrentUser();
    return () => {
      window.removeEventListener('storage', checkCurrentUser);
    };
  }, []);

  const handleAddToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        toast.error(`Cannot add more than ${product.stock} of ${product.name} to cart.`);
        return;
      }
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
      addNotification(`Updated quantity of "${product.name}" in your cart.`);
      toast.success(`Updated quantity of ${product.name} in cart!`);
    } else {
      if (quantity > product.stock) {
        toast.error(`Cannot add more than ${product.stock} of ${product.name} to cart.`);
        return;
      }
      setCartItems([...cartItems, { ...product, quantity }]);
      addNotification(`"${product.name}" added to your cart.`);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleUpdateCartItem = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    const removedItem = cartItems.find(item => item.id === productId);
    setCartItems(cartItems.filter(item => item.id !== productId));
    addNotification(`"${removedItem ? removedItem.name : 'An item'}" removed from your cart.`);
    toast.info("Item removed from cart.");
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      return;
    }

    if (!currentUserEmail) {
      toast.error("Please log in to complete your order.");
      return;
    }

    const orderTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const newOrder = {
      id: Date.now(),
      userId: currentUserEmail,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      total: orderTotal,
      status: 'Processing',
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      await addOrder(newOrder);
      setCartItems([]);
      toast.success("Checkout successful! Your order has been placed.");
      addNotification(`Order #${newOrder.id} placed successfully! Total: $${newOrder.total.toFixed(2)}.`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
      addNotification("Failed to place your order. Please try again.");
    }
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message: message,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const clearNotifications = () => {
    setNotifications([]);
    toast.info("All notifications cleared.");
  };

  const handleSignUp = (email) => {
    console.log(`User signed up for a service with email: ${email}`);
    toast.success(`Welcome! Thanks for signing up, ${email}. Check your inbox!`);
    addNotification(`Thanks for signing up, ${email}! Welcome to ShopVista.`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage onSignUp={handleSignUp} />} />
            <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} currentUserEmail={currentUserEmail} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} currentUserEmail={currentUserEmail} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateCartItem={handleUpdateCartItem}
                  onRemoveFromCart={handleRemoveFromCart}
                  onCheckout={handleCheckout}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/account"
              element={
                <AccountPage
                  currentUserEmail={currentUserEmail}
                  setCurrentUserEmail={setCurrentUserEmail}
                  notifications={notifications}
                  addNotification={addNotification}
                  markNotificationAsRead={markNotificationAsRead}
                  clearNotifications={clearNotifications}
                />
              }
            />
            <Route path="/search" element={<SearchPage onAddToCart={handleAddToCart} currentUserEmail={currentUserEmail} />} />
            <Route path="/account/profile" element={<ProfileSettingsPage currentUserEmail={currentUserEmail} />} />
            <Route path="/account/orders" element={<OrderHistoryPage currentUserEmail={currentUserEmail} />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;




