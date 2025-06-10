import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, ArrowLeft } from 'lucide-react';

/**
 * OrderHistoryPage Component
 * Displays a user's order history, which is passed as a prop.
 *
 * @param {object} props - Component props.
 * @param {Array<Object>} props.orders - An array of order objects to display.
 */
const OrderHistoryPage = ({ orders }) => { // Receive 'orders' as a prop

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-3 p-4 p-md-5">
        <h1 className="display-4 fw-bold text-center text-success mb-4">
          <ShoppingBag size={40} className="me-3" /> Order History
        </h1>
        <p className="lead text-center mb-5 text-muted">
          Review your past purchases and track the status of your recent orders.
        </p>

        {/* Check if there are any orders to display */}
        {orders.length === 0 ? (
          <div className="alert alert-info text-center">
            You haven't placed any orders yet. Start shopping!
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
                  <th scope="col">Items</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through the 'orders' prop to display each order */}
                {orders.map(order => (
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
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)}{' '}
                      item(s)
                    </td>
                    <td>
                      {/* You can expand this to a full order details page later */}
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          // Simple alert for demo, in a real app this would navigate to OrderDetailsPage
                          alert(`Order Details for ${order.id}:\n` +
                                order.items.map(item => `- ${item.name} (x${item.quantity}) - $${item.price.toFixed(2)}`).join('\n') +
                                `\nTotal: $${order.total.toFixed(2)}`);
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

