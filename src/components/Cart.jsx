import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Cart = ({ cartItems, onUpdateCartItem, onRemoveFromCart, onCheckout }) => {
  const [localCartItems, setLocalCartItems] = useState(cartItems);

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1; // Business Constraint: Quantity cannot be less than 1
      toast.warn("Quantity cannot be less than 1.");
    }
    if (newQuantity > item.stock) {
      newQuantity = item.stock; // Business Constraint: Quantity cannot exceed stock
      toast.warn(`Only ${item.stock} of "${item.name}" are in stock.`);
    }
    onUpdateCartItem(item.id, newQuantity);
  };

  const calculateTotal = () => {
    return localCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      {localCartItems.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Your cart is empty. Go add some products!
        </div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localCartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={{ width: '80px' }}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                      min="1"
                      max={item.stock}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-end align-items-center mt-4">
            <h4 className="me-3">Total: ${calculateTotal().toFixed(2)}</h4>
            <button className="btn btn-success btn-lg" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;