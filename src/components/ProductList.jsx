import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import SignUpSection from './SignUpSection'; // Import the new SignUpSection
import { getProducts } from '../services/productApi';
import { toast } from 'react-toastify'; // Used for displaying user feedback messages

/**
 * ProductList Component
 * Fetches and displays a list of products, allowing users to filter them.
 * Now includes a prominent sign-up section at the top.
 *
 * @param {object} props - Component props.
 * @param {function} props.onAddToCart - Function to call when adding a product to the cart.
 */
const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All',
    searchTerm: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please ensure JSON Server is running.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // useEffect hook to apply filters whenever 'products' or 'filters' state changes
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
        product.category === filters.category
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
          case '200+': return price > 200;
          default: return true;
        }
      });
    }

    setFilteredProducts(currentProducts);
  }, [products, filters]);

  /**
   * handleFilterChange
   * Updates the filter state based on user selections.
   *
   * @param {object} newFilters - An object containing the new filter values to apply.
   */
  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  /**
   * handleSignUp
   * This function simulates a user signing up for a free trial.
   * In a real application, this would send data to a backend.
   *
   * @param {string} email - The email address entered by the user.
   */
  const handleSignUp = (email) => {
    console.log(`User signed up for free trial with email: ${email}`);
    toast.success(`Welcome! Free trial started for ${email}. Check your inbox!`);
    // Here you would typically send 'email' to a backend API
  };

  // --- Conditional Rendering based on loading/error state ---

  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const priceRanges = ['All', '0-50', '50-100', '100-200', '200+'];

  return (
    <div className="container-fluid mt-4">
      {/* Sign-Up Section at the top of the Product List */}
      <SignUpSection onSignUp={handleSignUp} />

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
                <p>No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
