import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Calendar, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { getOrders } from '../services/productApi'; // Import getOrders from productApi

/**
 * OrderHistoryPage Component
 * Displays a user's order history by fetching orders from the API
 * and filtering them based on the currentUserEmail.
 *
 * @param {object} props - Component props.
 * @param {string} props.currentUserEmail - The email of the currently logged-in user.
 */
const OrderHistoryPage = ({ currentUserEmail }) => {
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUserEmail) {
      toast.error("Please log in to view your order history.");
      navigate('/account');
    }
  }, [currentUserEmail, navigate]);

  // Effect to fetch orders and filter by user ID
  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!currentUserEmail) { // Don't fetch if not logged in
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const allOrders = await getOrders(); // Fetch all orders
        // Filter orders by the current logged-in user's email (userId)
        const userOrders = allOrders.filter(order => order.userId === currentUserEmail);
        setMyOrders(userOrders);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError("Failed to load your order history. Please ensure JSON Server is running.");
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, [currentUserEmail]); // Re-fetch if logged-in user changes

  // --- Conditional Rendering ---
  if (!currentUserEmail) {
    return <div className="text-center mt-5 alert alert-warning">Please log in to view your order history. Redirecting...</div>;
  }

  if (loading) {
    return <div className="text-center mt-5">Loading your order history...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-3 p-4 p-md-5">
        <h1 className="display-4 fw-bold text-center text-success mb-4">
          <ShoppingBag size={40} className="me-3" /> Order History
        </h1>
        <p className="lead text-center mb-5 text-muted">
          Review your past purchases.
        </p>

        {myOrders.length === 0 ? (
          <div className="alert alert-info text-center">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="table-responsive mb-5">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Items Count</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td><Calendar size={16} className="me-1" />{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-primary'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {/* Calculate total quantity of items in this order */}
                      {order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 0}{' '}
                      item(s)
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          // Display order details in a toast or custom modal
                          const itemDetails = order.items && order.items.length > 0
                            ? order.items.map(item => `- ${item.name} (x${item.quantity}) - $${item.price.toFixed(2)}`).join('\n')
                            : 'No items found.';
                          toast.info(
                            `Order Details for ${order.id}:\n` +
                            `${itemDetails}\n` +
                            `Total: $${order.total.toFixed(2)}`,
                            { autoClose: 8000 } // Keep toast open longer for details
                          );
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/account" className="btn btn-secondary btn-lg d-inline-flex align-items-center">
            <ArrowLeft size={20} className="me-2" /> Back to Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;

