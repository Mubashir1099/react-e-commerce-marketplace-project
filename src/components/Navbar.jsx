import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home, Store, User, Search, Heart, Package, ChevronDown } from 'lucide-react';
// Removed 'toast' import from Navbar as it's no longer needed for these links' onClick actions

/**
 * Navbar Component
 * Displays the main navigation bar with brand logo, navigation links,
 * and clickable icons for e-commerce functions. Now includes category dropdowns
 * and fully functional navigation for About Us, Account, and Search.
 *
 * @param {object} props - Component props.
 * @param {number} props.cartItemCount - The number of items currently in the cart.
 */
const Navbar = ({ cartItemCount }) => {
  // Removed handleIconClick as links now navigate directly

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-lg w-100">
      <div className="container-fluid">
        {/* Brand Logo and Name */}
        <Link className="navbar-brand d-flex align-items-center me-4" to="/">
          <Package className="me-2" size={28} strokeWidth={2} />
          <span className="fw-bold fs-4">ShopVista</span>
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Icons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home Link */}
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" aria-current="page" to="/">
                <Home size={18} className="me-1" /> Home
              </Link>
            </li>

            {/* Shop Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownShop"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Store size={18} className="me-1" /> Shop <ChevronDown size={16} className="ms-1" />
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownShop">
                <li><Link className="dropdown-item" to="/shop">All Products</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/shop?category=Men%27s%20Apparel">Men's</Link></li>
                <li><Link className="dropdown-item" to="/shop?category=Women%27s%20Apparel">Women's</Link></li>
                <li><Link className="dropdown-item" to="/shop?category=Children%27s%20Toys">Children's Toys</Link></li>
                <li><Link className="dropdown-item" to="/shop?category=Children%27s%20Gear">Children's Gear</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/shop?category=Electronics">Electronics</Link></li>
              </ul>
            </li>

            {/* About Us Link (Now Navigates) */}
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/about"> {/* Changed to /about */}
                <Heart size={18} className="me-1" /> About Us
              </Link>
            </li>
          </ul>

          {/* Right-aligned Icons (Search, User, Cart) */}
          <ul className="navbar-nav d-flex flex-row align-items-center">
            {/* Search Icon (Now Navigates) */}
            <li className="nav-item me-3">
              <Link className="nav-link" to="/search"> {/* Changed to /search */}
                <Search size={20} />
              </Link>
            </li>
            {/* User/Account Icon (Now Navigates) */}
            <li className="nav-item me-3">
              <Link className="nav-link" to="/account"> {/* Changed to /account */}
                <User size={20} />
              </Link>
            </li>
            {/* Shopping Cart Icon with Item Count */}
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center position-relative" to="/cart">
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.65em', padding: '0.4em 0.6em' }}
                  >
                    {cartItemCount}
                    <span className="visually-hidden">cart items</span>
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





