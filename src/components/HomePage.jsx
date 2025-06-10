import React from 'react';
import { Link } from 'react-router-dom';
import SignUpSection from './SignUpSection'; // Import SignUpSection
import { ArrowRight } from 'lucide-react'; // Icon for the 'Start Shopping' button

/**
 * HomePage Component
 * This is the main landing page of the e-commerce application.
 * It includes a welcome message, a call to action for shopping,
 * and the sign-up section for free trial.
 *
 * @param {object} props - Component props.
 * @param {function} props.onSignUp - Function to handle user sign-up.
 */
const HomePage = ({ onSignUp }) => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm text-center">
        <div className="container-fluid py-5">
          <h1 className="display-4 fw-bold text-dark">Welcome to ShopVista!</h1>
          <p className="col-md-8 fs-5 mx-auto text-muted">
            Your ultimate destination for quality products at unbeatable prices.
            Discover a world of convenience and amazing deals.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg mt-3">
            Start Shopping <ArrowRight size={20} className="ms-2" />
          </Link>
        </div>
      </div>

      {/* Sign-Up Section */}
      <SignUpSection onSignUp={onSignUp} />

      {/* Optional: Add more sections here like featured products, categories, etc. */}
      <div className="row my-5">
        <div className="col-md-6 mb-4">
          <div className="card h-100 p-4 shadow-sm border-0">
            <h3 className="card-title text-center text-primary mb-3">Wide Selection</h3>
            <p className="card-text text-center text-muted">
              Explore thousands of products across various categories, from electronics to apparel.
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 p-4 shadow-sm border-0">
            <h3 className="card-title text-center text-success mb-3">Great Deals</h3>
            <p className="card-text text-center text-muted">
              Don't miss out on our daily deals and exclusive offers, always designed to save you money.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
