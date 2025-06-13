import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react'; // Icons

/**
 * SignUpSection Component
 * A reusable component for a call-to-action sign-up form.
 * It now focuses on a simple registration process rather than a "free trial."
 *
 * @param {object} props - Component props.
 * @param {function} props.onSignUp - Function to call when the user submits the sign-up form.
 */
const SignUpSection = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSignUp(email); // Call the parent's sign-up handler
      setSubmitted(true);
      setEmail(''); // Clear the input field
      // Reset submitted state after a short delay to allow for new sign-ups
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="bg-light p-4 p-md-5 rounded-3 shadow-sm text-center my-5">
      <h2 className="mb-3 fw-bold text-dark">Join Our Community!</h2>
      <p className="lead text-muted mb-4">
        Sign up to get exclusive offers, product updates, and personalized recommendations.
      </p>

      {submitted ? (
        <div className="alert alert-success d-flex align-items-center justify-content-center" role="alert">
          <CheckCircle size={24} className="me-2" />
          <span>Thanks for signing up! Check your inbox for details.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="d-flex flex-column flex-md-row justify-content-center align-items-center">
          <div className="input-group mb-3 mb-md-0 me-md-2" style={{ maxWidth: '400px' }}>
            <span className="input-group-text"><Mail size={20} /></span>
            <input
              type="email"
              className="form-control form-control-lg rounded-start"
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg rounded">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default SignUpSection;
