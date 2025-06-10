import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productApi';
import { toast } from 'react-toastify'; // Used for displaying user feedback messages

/**
 * ProductDetail Component
 * Displays detailed information about a single product and allows users to add it to the cart.
 *
 * @param {object} props - Component props.
 * @param {function} props.onAddToCart - Function to call when adding a product to the cart.
 */
const ProductDetail = ({ onAddToCart }) => {
  // useParams hook to get the 'id' from the URL (e.g., /product/123 -> id = 123)
  const { id } = useParams();

  // --- DEBUGGING STEP ---
  // Log the ID to the console to verify what ID is being received from the URL
  console.log("ProductDetail component received ID:", id);
  // --- END DEBUGGING STEP ---

  // State variables for managing component data and UI status
  const [product, setProduct] = useState(null); // Stores the fetched product data
  const [loading, setLoading] = useState(true); // Indicates if data is currently being loaded
  const [error, setError] = useState(null);     // Stores any error messages during data fetching
  const [quantity, setQuantity] = useState(1);  // Stores the quantity selected by the user for adding to cart

  // useEffect hook to fetch product data when the component mounts or 'id' changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Set loading to true before fetching data
        setLoading(true);
        setError(null); // Clear any previous errors

        // Call the API service to get product details by ID
        const data = await getProductById(id);
        setProduct(data); // Update product state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        // Catch and handle any errors during the fetch operation
        console.error("Error fetching product details:", err); // Log the actual error for debugging
        setError("Failed to fetch product details. Please ensure JSON Server is running and product ID exists.");
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchProduct(); // Execute the fetch function
  }, [id]); // Dependency array: re-run effect if 'id' changes

  /**
   * handleQuantityChange
   * Handles changes to the quantity input field.
   * Implements business constraints for minimum and maximum quantity.
   *
   * @param {object} e - The event object from the input change.
   */
  const handleQuantityChange = (e) => {
    // Parse the input value to an integer. If empty or invalid, parseInt returns NaN.
    let value = parseInt(e.target.value);

    // Business Constraint: Quantity must be at least 1.
    // If the value is NaN (e.g., input cleared) or less than 1, set it to 1.
    if (isNaN(value) || value < 1) {
      value = 1;
      toast.warn("Quantity must be at least 1."); // Provide user feedback
    }

    // Business Constraint: Quantity cannot exceed available stock.
    // Only apply this if product data is available and the value exceeds stock.
    if (product && value > product.stock) {
      value = product.stock; // Cap the quantity at the available stock
      toast.warn(`Only ${product.stock} items left in stock.`); // Provide user feedback
    }

    // Update the quantity state
    setQuantity(value);
  };

  /**
   * handleAddToCartClick
   * Handles the click event for the "Add to Cart" button.
   * Implements business constraints related to stock and valid quantity.
   */
  const handleAddToCartClick = () => {
    // Check multiple conditions before allowing add to cart:
    // 1. Product must be in stock (stock > 0)
    // 2. Selected quantity must be positive (quantity > 0)
    // 3. Selected quantity must not exceed available stock (quantity <= product.stock)
    if (product.stock > 0 && quantity > 0 && quantity <= product.stock) {
      // If all conditions are met, call the onAddToCart function passed from parent (App.jsx)
      onAddToCart(product, quantity);
    } else if (product.stock === 0) {
      // If product is out of stock, show an error
      toast.error("This product is out of stock.");
    } else {
      // For any other invalid quantity scenario (e.g., quantity somehow became 0 or negative)
      toast.error("Please enter a valid quantity.");
    }
  };

  // --- Conditional Rendering based on loading/error/product state ---

  // Display loading message while data is being fetched
  if (loading) {
    return <div className="text-center mt-5">Loading product details...</div>;
  }

  // Display error message if fetching failed
  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  // Display "Product not found" if no product data is available after loading
  if (!product) {
    return <div className="alert alert-warning text-center mt-5">Product not found.</div>;
  }

  // --- Render the product details once data is available ---
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Product Image Section */}
        <div className="col-md-6">
          <img src={product.imageUrl} className="img-fluid rounded" alt={product.name} />
        </div>

        {/* Product Details Section */}
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <p className="lead">Category: {product.category}</p>
          <h3 className="mb-3">Price: ${product.price.toFixed(2)}</h3>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">
            Stock: {product.stock > 0 ? `${product.stock} in stock` : <span className="text-danger fw-bold">Out of Stock</span>}
          </p>

          {/* Quantity Selector */}
          <div className="d-flex align-items-center mb-4">
            <label htmlFor="quantity" className="form-label me-2 mb-0">Quantity:</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              style={{ width: '80px' }}
              value={quantity}
              onChange={handleQuantityChange}
              min="1" // HTML5 attribute for minimum value
              max={product.stock} // HTML5 attribute for maximum value (based on stock)
              disabled={product.stock <= 0} // Disable input if out of stock
            />
          </div>

          {/* Action Buttons */}
          <button
            className="btn btn-primary me-2"
            onClick={handleAddToCartClick}
            // Disable button if out of stock, or if quantity is invalid (0 or greater than stock)
            disabled={product.stock <= 0 || quantity <= 0 || quantity > product.stock}
          >
            Add to Cart
          </button>
          <Link to="/" className="btn btn-secondary">Back to Products</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
