import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../services/productApi';
import ProductCard from './ProductCard';
import { Search, Frown } from 'lucide-react'; // Icons for search and no results

/**
 * SearchPage Component
 * Allows users to search for products and displays the results.
 * It fetches all products and filters them client-side based on the search term.
 *
 * @param {object} props - Component props.
 * @param {function} props.onAddToCart - Function to call when adding a product to the cart.
 */
const SearchPage = ({ onAddToCart }) => {
  const location = useLocation(); // To get initial search term if coming from URL
  const [allProducts, setAllProducts] = useState([]); // Stores all products once fetched
  const [searchResults, setSearchResults] = useState([]); // Stores products matching the search
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch all products initially (runs once)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        setAllProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching all products for search:", err);
        setError("Failed to load products for search. Please ensure JSON Server is running.");
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Effect to apply search filtering whenever allProducts or searchTerm changes
  useEffect(() => {
    if (allProducts.length > 0) {
      const queryParams = new URLSearchParams(location.search);
      const initialSearchQuery = queryParams.get('query') || '';
      setSearchTerm(initialSearchQuery); // Set initial search term from URL

      const lowerCaseSearchTerm = initialSearchQuery.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setSearchResults(filtered);
    }
  }, [allProducts, location.search]); // Depend on allProducts and URL query

  /**
   * handleInputChange
   * Updates the search term state as the user types.
   * @param {object} e - The event object from the input change.
   */
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * handleSearchSubmit
   * Filters products based on the current search term when the search button is clicked.
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setSearchResults(filtered);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading search capabilities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="display-5 fw-bold text-center text-dark mb-4">
        <Search size={40} className="me-3 text-secondary" /> Search Products
      </h1>
      <p className="lead text-center mb-5 text-muted">
        Find exactly what you're looking for across our wide range of products.
      </p>

      {/* Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="mb-5 d-flex justify-content-center">
        <div className="input-group" style={{ maxWidth: '600px' }}>
          <input
            type="text"
            className="form-control form-control-lg rounded-start-pill"
            placeholder="Enter keywords (e.g., laptop, dress, toy)"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary btn-lg rounded-end-pill" type="submit">
            Search
          </button>
        </div>
      </form>

      {/* Search Results Display */}
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))
        ) : (
          <div className="col-12 text-center my-5">
            <Frown size={60} className="text-muted mb-3" />
            <p className="lead text-muted">No products found matching your search. Try different keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
