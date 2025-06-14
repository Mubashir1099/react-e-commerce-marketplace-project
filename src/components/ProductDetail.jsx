import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addReviewToProduct } from '../services/productApi'; // Import addReviewToProduct
import { toast } from 'react-toastify';
import { Star, MessageSquare } from 'lucide-react'; // Import Star and MessageSquare icons

/**
 * ProductDetail Component
 * Displays detailed information about a single product and allows users to add it to the cart.
 * Now includes functionality for users to rate and review the product.
 *
 * @param {object} props - Component props.
 * @param {function} props.onAddToCart - Function to call when adding a product to the cart.
 * @param {string} props.currentUserEmail - Email of the currently logged-in user (for review submission).
 */
const ProductDetail = ({ onAddToCart, currentUserEmail }) => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // States for Rating and Review
  const [userRating, setUserRating] = useState(0); // The rating the current user wants to submit
  const [userComment, setUserComment] = useState(''); // The comment the current user wants to submit
  const [showReviewForm, setShowReviewForm] = useState(false); // To toggle review form visibility

  // Function to re-fetch product details (useful after submitting a review)
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);

      // Pre-fill user's existing rating/review if logged in
      if (currentUserEmail && data.reviews) {
        const existingReview = data.reviews.find(r => r.userId === currentUserEmail);
        if (existingReview) {
          setUserRating(existingReview.rating);
          setUserComment(existingReview.comment);
        } else {
          // Reset if no existing review from current user
          setUserRating(0);
          setUserComment('');
        }
      } else {
         // Reset if no user logged in or no reviews exist
        setUserRating(0);
        setUserComment('');
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to fetch product details. Please ensure JSON Server is running and product ID exists.");
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProductDetails(); // Initial fetch
  }, [id, currentUserEmail]); // Re-fetch if product ID or logged-in user changes

  /**
   * handleQuantityChange
   * Handles changes to the quantity input field.
   */
  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      value = 1;
      toast.warn("Quantity must be at least 1.");
    }
    if (product && value > product.stock) {
      value = product.stock;
      toast.warn(`Only ${product.stock} items left in stock.`);
    }
    setQuantity(value);
  };

  /**
   * handleAddToCartClick
   * Handles the click event for the "Add to Cart" button.
   */
  const handleAddToCartClick = () => {
    if (product.stock > 0 && quantity > 0 && quantity <= product.stock) {
      onAddToCart(product, quantity);
    } else if (product.stock === 0) {
      toast.error("This product is out of stock.");
    } else {
      toast.error("Please enter a valid quantity.");
    }
  };

  /**
   * handleRatingChange
   * Sets the user's selected rating.
   */
  const handleRatingChange = (value) => {
    if (!currentUserEmail) {
      toast.error("Please log in to rate this product.");
      return;
    }
    setUserRating(value);
  };

  /**
   * handleReviewSubmit
   * Handles the submission of a user's rating and comment.
   */
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUserEmail) {
      toast.error("Please log in to submit a review.");
      return;
    }
    if (userRating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!userComment.trim()) {
      toast.error("Review comment cannot be empty.");
      return;
    }

    const reviewData = {
      userId: currentUserEmail,
      rating: userRating,
      comment: userComment.trim(),
      date: new Date().toISOString().slice(0, 10) // YYYY-MM-DD format
    };

    try {
      await addReviewToProduct(id, reviewData);
      toast.success("Your review has been submitted!");
      setShowReviewForm(false); // Hide form after submission
      fetchProductDetails(); // Re-fetch product to update reviews list and average rating
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    }
  };

  // Calculate average rating for display
  const averageRating = product && product.reviews && product.reviews.length > 0
    ? (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1)
    : 'N/A';
  const totalReviews = product && product.reviews ? product.reviews.length : 0;


  // --- Conditional Rendering based on loading/error/product state ---
  if (loading) {
    return <div className="text-center mt-5">Loading product details...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  if (!product) {
    return <div className="alert alert-warning text-center mt-5">Product not found.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Product Image Section */}
        <div className="col-md-6 mb-4">
          <img src={product.imageUrl} className="img-fluid rounded shadow-lg" alt={product.name} />
        </div>

        {/* Product Details Section */}
        <div className="col-md-6 mb-4">
          <h1 className="mb-3 display-4 fw-bold text-dark">{product.name}</h1>
          <p className="lead text-muted mb-2">Category: <span className="fw-bold">{product.category}</span></p>
          <h3 className="mb-3 text-primary">Price: ${product.price.toFixed(2)}</h3>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4 fw-bold">
            Stock: {product.stock > 0 ? (
              <span className="text-success">{product.stock} in stock</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </p>

          {/* Average Rating Display */}
          <div className="d-flex align-items-center mb-3">
            <Star size={24} className="me-2 text-warning" fill="currentColor" />
            <span className="fs-5 fw-bold text-dark">{averageRating}</span>
            <span className="text-muted ms-2">({totalReviews} reviews)</span>
          </div>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center mb-4">
            <label htmlFor="quantity" className="form-label me-2 mb-0 fw-bold">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="form-control rounded"
              style={{ width: '80px' }}
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.stock}
              disabled={product.stock <= 0}
            />
          </div>

          {/* Action Buttons */}
          <button
            className="btn btn-primary btn-lg me-2"
            onClick={handleAddToCartClick}
            disabled={product.stock <= 0 || quantity <= 0 || quantity > product.stock}
          >
            Add to Cart
          </button>
          <Link to="/shop" className="btn btn-secondary btn-lg">Back to Shop</Link>
        </div>
      </div>

      {/* Review Section */}
      <div className="card shadow-sm border-0 rounded-3 p-4 my-5">
        <h2 className="h4 fw-bold text-primary mb-3">Rate & Review This Product</h2>
        {!currentUserEmail ? (
          <p className="text-muted text-center">Please <Link to="/account">log in</Link> to rate or review this product.</p>
        ) : (
          <>
            {/* Rating Stars */}
            <div className="mb-4 text-center">
              <p className="fw-bold mb-2">Your Rating:</p>
              {[1, 2, 3, 4, 5].map((starValue) => (
                <Star
                  key={starValue}
                  size={30}
                  className={`cursor-pointer mx-1 ${starValue <= userRating ? 'text-warning' : 'text-muted'}`}
                  fill={starValue <= userRating ? 'currentColor' : 'none'}
                  onClick={() => handleRatingChange(starValue)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>

            {/* Review Form */}
            <h3 className="h5 fw-bold mb-3 d-flex align-items-center text-primary">
              <MessageSquare size={20} className="me-2" /> Your Review
              <button
                className="btn btn-sm btn-outline-secondary ms-auto"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? 'Hide Form' : 'Add/Edit Review'}
              </button>
            </h3>
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="mt-3">
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your review here..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success">Submit Review</button>
              </form>
            )}
          </>
        )}

        {/* Existing Reviews */}
        <h3 className="h5 fw-bold mt-5 mb-3 d-flex align-items-center text-primary">
          <MessageSquare size={20} className="me-2" /> All Reviews ({totalReviews})
        </h3>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="list-group list-group-flush">
            {product.reviews.map((review, index) => (
              <li key={index} className="list-group-item">
                <p className="mb-1 d-flex align-items-center">
                  <strong className="text-dark me-2">{review.userId.split('@')[0]}</strong> {/* Display username */}
                  <span className="text-muted small me-2">{review.date}</span> {/* Display date */}
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <Star
                      key={starValue}
                      size={12}
                      className={`${starValue <= review.rating ? 'text-warning' : 'text-muted'}`}
                      fill={starValue <= review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </p>
                <p className="text-dark">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted text-center">No reviews yet. Be the first to review!</p>
        )}
      </div>

    </div>
  );
};

export default ProductDetail;
