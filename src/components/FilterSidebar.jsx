import React from 'react';

/**
 * FilterSidebar Component
 * Provides UI elements for filtering products by category, price range, and search term.
 *
 * @param {object} props - Component props.
 * @param {object} props.filters - Current filter selections (category, priceRange, searchTerm).
 * @param {function} props.onFilterChange - Callback function to update filters.
 * @param {Array<string>} props.categories - List of available categories for filtering.
 * @param {Array<string>} props.priceRanges - List of available price ranges for filtering.
 */
const FilterSidebar = ({ filters, onFilterChange, categories, priceRanges }) => {
  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handlePriceRangeChange = (e) => {
    onFilterChange({ priceRange: e.target.value });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ searchTerm: e.target.value });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-light fw-bold">
        Filters
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="searchTerm" className="form-label fw-bold">Search:</label>
          <input
            type="text"
            className="form-control rounded-pill"
            id="searchTerm"
            placeholder="Search products..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoryFilter" className="form-label fw-bold">Category:</label>
          <select
            className="form-select rounded-pill"
            id="categoryFilter"
            value={filters.category} // Value is controlled by filters state
            onChange={handleCategoryChange}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="priceRangeFilter" className="form-label fw-bold">Price Range:</label>
          <select
            className="form-select rounded-pill"
            id="priceRangeFilter"
            value={filters.priceRange} // Value is controlled by filters state
            onChange={handlePriceRangeChange}
          >
            {priceRanges.map(range => (
              <option key={range} value={range}>
                {range === 'All' ? 'All Prices' :
                 range === '0-50' ? '$0 - $50' :
                 range === '50-100' ? '$50 - $100' :
                 range === '100-200' ? '$100 - $200' :
                 '$200+'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
