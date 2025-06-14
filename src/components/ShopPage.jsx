import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import { getProducts } from '../services/productApi';


/**
 * ShopPage Component
 * Fetches and displays a list of products, allowing users to filter them.
 * Now reads initial category filter from URL query parameters.
 *
 * @param {object} props - Component props.
 * @param {function} props.onAddToCart - Function to call when adding a product to the cart.
 */
const ShopPage = ({ onAddToCart }) => {
  const location = useLocation(); // Hook to access URL's location object
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All',
    searchTerm: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to read initial category from URL on component mount/location change
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlCategory = queryParams.get('category'); // Get 'category' parameter from URL

    // Update filters state based on URL, if present
    setFilters(prevFilters => ({
      ...prevFilters,
      category: urlCategory || 'All' // Set initial category from URL or default to 'All'
    }));

    // Fetch products. This part is already in the original useEffect, but we'll ensure
    // the filtering logic below runs immediately after products are set.
  }, [location.search]); // Re-run this effect if the URL search string changes

  // useEffect hook to fetch all products when the component mounts (runs once)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        setProducts(data);
        // Do NOT set filteredProducts here directly, let the filtering effect handle it
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please ensure JSON Server is running.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array: runs only once on mount

  // useEffect hook to apply filters whenever 'products' or 'filters' state changes
  // This effect ensures filters are applied correctly whether from URL or sidebar
  useEffect(() => {
    let currentProducts = [...products];

    // Filter by Search Term
    if (filters.searchTerm) {
      const lowerCaseSearchTerm = filters.searchTerm.toLowerCase();
      currentProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Filter by Category (Business Constraint: Meaningful filter 1)
    if (filters.category !== 'All') {
      currentProducts = currentProducts.filter(product =>
        // Case-insensitive comparison for robust filtering
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by Price Range (Business Constraint: Meaningful filter 2)
    if (filters.priceRange !== 'All') {
      currentProducts = currentProducts.filter(product => {
        const price = product.price;
        switch (filters.priceRange) {
          case '0-50': return price >= 0 && price <= 50;
          case '50-100': return price > 50 && price <= 100;
          case '100-200': return price > 100 && price <= 200;
          default: return price > 200; // '200+'
        }
      });
    }

    setFilteredProducts(currentProducts);
  }, [products, filters]); // Dependency array: re-run effect if 'products' or 'filters' change

  /**
   * handleFilterChange
   * Updates the filter state based on user selections from the sidebar.
   *
   * @param {object} newFilters - An object containing the new filter values to apply.
   */
  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  // --- Conditional Rendering based on loading/error state ---

  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  // Dynamically get categories from products for the filter sidebar, including the 'All' option
  const categories = ['All', ...new Set(products.map(p => p.category))].sort(); // Sort categories alphabetically
  const priceRanges = ['All', '0-50', '50-100', '100-200', '200+'];

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Filter Sidebar Section */}
        <div className="col-md-3">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            priceRanges={priceRanges}
          />
        </div>
        {/* Product Display Section */}
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))
            ) : (
              <div className="col-12 text-center">
                <p className="lead text-muted mt-5">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
