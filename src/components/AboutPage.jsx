import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Icon for back button

/**
 * AboutPage Component
 * A simple static page providing information about the e-commerce marketplace.
 */
const AboutPage = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-3 p-4 p-md-5">
        <h1 className="display-4 fw-bold text-center text-primary mb-4">About ShopVista</h1>
        <p className="lead text-center mb-5">
          Your trusted partner for all your shopping needs, delivered with convenience and care.
        </p>

        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <h3 className="h4 fw-bold text-dark mb-3">Our Mission</h3>
            <p className="text-muted">
              At ShopVista, our mission is to provide an unparalleled online shopping experience
              by offering a vast selection of high-quality products at competitive prices,
              backed by exceptional customer service. We strive to make shopping easy, enjoyable,
              and accessible for everyone.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h3 className="h4 fw-bold text-dark mb-3">Our Vision</h3>
            <p className="text-muted">
              We envision a future where online shopping is seamless, sustainable, and truly
              customer-centric. We are committed to continuous innovation, expanding our product
              range, and building lasting relationships with our customers and partners.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="btn btn-secondary btn-lg d-inline-flex align-items-center">
            <ArrowLeft size={20} className="me-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
