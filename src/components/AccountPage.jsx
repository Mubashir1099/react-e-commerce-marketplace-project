import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, ShoppingBag, ArrowLeft, LogIn, UserPlus, Inbox, Bell, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

/**
 * AccountPage Component
 * Provides user account functionalities including registration, login,
 * a simulated user dashboard, and an inbox for notifications.
 * Notifications and their handlers are now passed as props.
 *
 * @param {object} props - Component props.
 * @param {Array<Object>} props.notifications - Array of notification objects.
 * @param {function} props.addNotification - Function to add a new notification.
 * @param {function} props.markNotificationAsRead - Function to mark a notification as read.
 * @param {function} props.clearNotifications - Function to clear all notifications.
 */
const AccountPage = ({ notifications, addNotification, markNotificationAsRead, clearNotifications }) => {
  // State to manage user login status and current user's email
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  // State for registration form fields
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for login form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State to control which form (login/register) is currently shown
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // --- useEffect to load user data from localStorage on component mount ---
  // Notifications are now loaded/saved in App.jsx
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUserEmail');
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUserEmail(storedUser);
    }
  }, []);

  // --- Registration Handlers ---
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation
    if (!regEmail || !regPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (regPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (regPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Simulate saving user to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[regEmail]) {
      toast.error("An account with this email already exists.");
      return;
    }

    users[regEmail] = regPassword; // Storing plain password for demo purposes ONLY
    localStorage.setItem('users', JSON.stringify(users));

    toast.success("Registration successful! Please log in.");
    setRegEmail('');
    setRegPassword('');
    setConfirmPassword('');
    setShowRegisterForm(false);
  };

  // --- Login Handlers ---
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!loginEmail || !loginPassword) {
      toast.error("Please enter both email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[loginEmail] === loginPassword) {
      setIsLoggedIn(true);
      setCurrentUserEmail(loginEmail);
      localStorage.setItem('currentUserEmail', loginEmail);
      toast.success(`Welcome back, ${loginEmail}!`);

      // Add a welcome notification to the inbox via prop
      addNotification(`Welcome back, ${loginEmail}! Check out our new arrivals.`);
    } else {
      toast.error("Invalid email or password.");
    }
  };

  // --- Logout Handler ---
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail('');
    localStorage.removeItem('currentUserEmail');
    toast.info("You have been logged out.");
  };

  // --- Conditional Rendering based on login status ---
  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-3 p-4 p-md-5">
        <h1 className="display-4 fw-bold text-center text-dark mb-4">
          <User size={40} className="me-3 text-primary" /> My Account
        </h1>

        {!isLoggedIn ? (
          // --- User is NOT logged in: Show Login/Register Forms ---
          <>
            <p className="lead text-center mb-5 text-muted">
              {showRegisterForm ? "Create your ShopVista account" : "Login to your ShopVista account"}
            </p>

            {showRegisterForm ? (
              // Registration Form
              <form onSubmit={handleRegister} className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                  <label htmlFor="regEmail" className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text"><Mail size={18} /></span>
                    <input
                      type="email"
                      className="form-control"
                      id="regEmail"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="regPassword" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><LogIn size={18} /></span>
                    <input
                      type="password"
                      className="form-control"
                      id="regPassword"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><LogIn size={18} /></span>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <UserPlus size={20} className="me-2" /> Register
                  </button>
                </div>
                <p className="text-center">
                  Already have an account? <a href="#" onClick={() => setShowRegisterForm(false)}>Login here</a>
                </p>
              </form>
            ) : (
              // Login Form
              <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">Email address</label>
                  <div className="input-group">
                    <span className="input-group-text"><Mail size={18} /></span>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text"><LogIn size={18} /></span>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Your password"
                      required
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-success btn-lg">
                    <LogIn size={20} className="me-2" /> Login
                  </button>
                </div>
                <p className="text-center">
                  Don't have an account? <a href="#" onClick={() => setShowRegisterForm(true)}>Register now</a>
                </p>
              </form>
            )}
          </>
        ) : (
          // --- User IS logged in: Show Dashboard and Inbox ---
          <>
            <p className="lead text-center mb-5 text-muted">
              Welcome, <span className="fw-bold text-primary">{currentUserEmail}</span>!
            </p>

            <div className="row text-center mb-5">
              <div className="col-md-4 mb-4">
                <div className="card h-100 p-3 shadow-sm border-0">
                  <div className="card-body">
                    <Settings size={50} className="text-info mb-3" />
                    <h5 className="card-title fw-bold">Profile Settings</h5>
                    <p className="card-text text-muted">Update your personal information and preferences.</p>
                    <Link to="/account/profile" className="btn btn-outline-info btn-sm">Manage Profile</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100 p-3 shadow-sm border-0">
                  <div className="card-body">
                    <ShoppingBag size={50} className="text-success mb-3" />
                    <h5 className="card-title fw-bold">Order History</h5>
                    <p className="card-text text-muted">View past orders and track current shipments.</p>
                    <Link to="/account/orders" className="btn btn-outline-success btn-sm">View Orders</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100 p-3 shadow-sm border-0">
                  <div className="card-body">
                    <Bell size={50} className="text-warning mb-3" />
                    <h5 className="card-title fw-bold">Notifications</h5>
                    <p className="card-text text-muted">You have {notifications.filter(n => !n.read).length} unread messages.</p>
                    <button onClick={() => {
                        document.getElementById('inbox-section')?.scrollIntoView({ behavior: 'smooth' });
                      }} className="btn btn-outline-warning btn-sm">View Inbox</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Inbox Section */}
            <div id="inbox-section" className="mb-5 p-4 border rounded-3 bg-light">
              <h3 className="h4 fw-bold mb-4 d-flex align-items-center">
                <Inbox size={24} className="me-2" /> Your Inbox
                <span className="badge bg-primary ms-2">{notifications.filter(n => !n.read).length} Unread</span>
              </h3>
              {notifications.length === 0 ? (
                <p className="text-muted text-center">Your inbox is empty.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {notifications.map(notif => (
                    <li
                      key={notif.id}
                      className={`list-group-item d-flex justify-content-between align-items-center ${!notif.read ? 'bg-info bg-opacity-10' : 'text-muted'}`}
                    >
                      <div>
                        <span className="badge bg-secondary me-2">{notif.date}</span>
                        <span className="badge bg-secondary me-2">{notif.time}</span>
                        <strong className={!notif.read ? 'text-dark' : 'text-muted'}>{notif.message}</strong>
                      </div>
                      {!notif.read && (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => markNotificationAsRead(notif.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={clearNotifications}
                  disabled={notifications.length === 0}
                >
                  Clear All Notifications
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={() => addNotification(`Test notification added from inbox: ${new Date().toLocaleTimeString()}`)}
                >
                  Add Test Notification
                </button>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
              <button onClick={handleLogout} className="btn btn-danger btn-lg">
                Logout
              </button>
              <Link to="/" className="btn btn-secondary btn-lg d-inline-flex align-items-center">
                <ArrowLeft size={20} className="me-2" /> Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;



