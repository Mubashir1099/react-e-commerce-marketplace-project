import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react'; // Import Star icon

/**
 * ProductCard Component
 * Displays a single product with its image, name, price, and add-to-cart button.
 * Now also displays the average rating.
 *
 * @param {object} props - Component props.
 * @param {object} props.product - The product object to display.
 * @param {function} props.onAddToCart - Callback function to add the product to the cart.
 */
const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, imageUrl, price, stock, reviews } = product; // Destructure reviews

  // Calculate average rating
  const averageRating = reviews && reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'N/A'; // Show 'N/A' if no reviews

  const totalReviews = reviews ? reviews.length : 0;

  // Handler for adding to cart
  const handleAddToCartClick = () => {
    // Basic check: if stock is 0, don't allow adding to cart (further validation in App.jsx/ProductDetail)
    if (stock > 0) {
      onAddToCart(product, 1); // Add 1 quantity by default from card
    } else {
      // toast.error("Product is out of stock!"); // Toast handled by ProductDetail or App.jsx
    }
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={name}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/250x200/cccccc/333333?text=No+Image"; }}
        />
        <div className="card-body d-flex flex-column pb-3">
          <h5 className="card-title fw-bold text-dark mb-2">{name}</h5>
          <p className="card-text text-muted small mb-1">{product.category}</p>
          <h4 className="card-subtitle mb-2 text-primary fw-bold">${price.toFixed(2)}</h4>

          {/* Average Rating Display */}
          <div className="d-flex align-items-center mb-3 mt-auto">
            <Star size={18} className="me-1 text-warning" fill="currentColor" />
            <span className="fw-bold me-1">{averageRating}</span>
            <span className="text-muted small">({totalReviews} reviews)</span>
          </div>

          <div className="d-flex justify-content-between mt-auto pt-2">
            <Link to={`/product/${id}`} className="btn btn-outline-secondary btn-sm flex-grow-1 me-2">
              View Details
            </Link>
            <button
              className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
              onClick={handleAddToCartClick}
              disabled={stock <= 0} // Disable if out of stock
            >
              <ShoppingCart size={16} className="me-1" /> {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
