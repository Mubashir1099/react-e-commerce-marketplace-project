import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AboutPage from './components/AboutPage';
import AccountPage from './components/AccountPage';
import SearchPage from './components/SearchPage';
import ProfileSettingsPage from './components/ProfileSettingsPage';
import OrderHistoryPage from './components/OrderHistoryPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('e-commerce-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('e-commerce-orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  // State to track the currently logged-in user's email across the app.
  // This value is read from localStorage and updated when login/logout happens in AccountPage.
  const [currentUserEmail, setCurrentUserEmail] = useState(() => {
    return localStorage.getItem('currentUserEmail') || '';
  });

  // Effect to keep currentUserEmail state in App.jsx in sync with localStorage.
  // This is crucial because AccountPage updates 'currentUserEmail' in localStorage,
  // and App.jsx needs to reflect that to correctly pass the prop to ProfileSettingsPage.
  useEffect(() => {
    const checkCurrentUser = () => {
      setCurrentUserEmail(localStorage.getItem('currentUserEmail') || '');
    };

    // Listen for changes to localStorage (e.g., from AccountPage login/logout)
    window.addEventListener('storage', checkCurrentUser);
    // Also check on mount
    checkCurrentUser();

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', checkCurrentUser);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount


  useEffect(() => {
    localStorage.setItem('e-commerce-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('e-commerce-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);


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
      toast.success(`Updated quantity of ${product.name} in cart!`);
    } else {
      if (quantity > product.stock) {
        toast.error(`Cannot add more than ${product.stock} of ${product.name} to cart.`);
        return;
      }
      setCartItems([...cartItems, { ...product, quantity }]);
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
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.info("Item removed from cart.");
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

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn("Your cart is empty. Add items before checking out!");
      return;
    }

    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'Processing',
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
      }))
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCartItems([]);

    const itemNames = newOrder.items.map(item => `${item.name} (x${item.quantity})`).join(', ');
    const notificationMessage = `Your order #${newOrder.id} for items: ${itemNames} has been placed successfully.`;

    toast.success(`Checkout successful! ${notificationMessage}`);
    addNotification(notificationMessage);
    console.log("New Order:", newOrder);
  };

  const handleSignUp = (email) => {
    console.log(`User signed up for free trial with email: ${email}`);
    toast.success(`Welcome! Free trial started for ${email}. Check your inbox!`);
    addNotification(`Thanks for signing up, ${email}! Enjoy your free trial.`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
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
            <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart
              cartItems={cartItems}
              onUpdateCartItem={handleUpdateCartItem}
              onRemoveFromCart={handleRemoveFromCart}
              onCheckout={handleCheckout}
            />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/account"
              element={
                <AccountPage
                  notifications={notifications}
                  addNotification={addNotification}
                  markNotificationAsRead={markNotificationAsRead}
                  clearNotifications={clearNotifications}
                />
              }
            />
            <Route path="/search" element={<SearchPage onAddToCart={handleAddToCart} />} />
            {/* Pass currentUserEmail to ProfileSettingsPage */}
            <Route path="/account/profile" element={<ProfileSettingsPage currentUserEmail={currentUserEmail} />} />
            <Route path="/account/orders" element={<OrderHistoryPage orders={orders} />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;




