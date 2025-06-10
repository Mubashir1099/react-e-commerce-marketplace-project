import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, price, imageUrl, stock } = product;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={imageUrl} className="card-img-top" alt={name} style={{ height: '200px', objectFit: 'cover' }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Price: ${price.toFixed(2)}</p>
          <p className="card-text">Stock: {stock > 0 ? stock : 'Out of Stock'}</p>
          <div className="mt-auto"> {/* Pushes buttons to the bottom */}
            <Link to={`/product/${id}`} className="btn btn-info btn-sm me-2">View Details</Link>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onAddToCart(product)}
              disabled={stock <= 0} // Business Constraint 1: Disable if out of stock
            >
              {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;