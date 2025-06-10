import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin } from 'lucide-react'; // Icons for contact info

/**
 * Footer Component
 * Displays a standard e-commerce footer with copyright, quick links, and contact information.
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto shadow-inner">
      <div className="container">
        <div className="row">
          {/* Brand Info */}
          <div className="col-md-4 mb-3">
            <Link className="text-light text-decoration-none d-flex align-items-center mb-2" to="/">
              <Package className="me-2" size={24} />
              <span className="fw-bold fs-5">ShopVista</span>
            </Link>
            <p className="text-muted small">Your one-stop shop for everything you need. Quality products, great prices.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="text-warning mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none hover-underline">Home</Link></li>
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none hover-underline">Shop All</Link></li>
              <li className="mb-2"><Link to="/cart" className="text-light text-decoration-none hover-underline">Cart</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none hover-underline">About Us</Link></li>
              <li className="mb-2"><Link to="#" className="text-light text-decoration-none hover-underline">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5 className="text-warning mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <Mail size={16} className="me-2 text-primary" /> support@shopvista.com
              </li>
              <li className="d-flex align-items-center mb-2">
                <Phone size={16} className="me-2 text-success" /> +1 234 567 8900
              </li>
              <li className="d-flex align-items-center mb-2">
                <MapPin size={16} className="me-2 text-info" /> 123 E-Commerce St, Marketplace City
              </li>
            </ul>
          </div>
        </div>

        <hr className="bg-secondary" />

        {/* Copyright */}
        <div className="row">
          <div className="col-12 text-center text-muted small">
            &copy; {new Date().getFullYear()} ShopVista. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
