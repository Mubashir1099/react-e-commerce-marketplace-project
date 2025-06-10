import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Mail } from 'lucide-react'; // Icon for email input

/**
 * SignUpSection Component
 * Displays a call-to-action section for users to sign up for a free trial
 * by entering their email address.
 *
 * @param {object} props - Component props.
 * @param {function} props.onSignUp - Function to call when the sign-up button is clicked.
 */
const SignUpSection = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // State for email validation feedback

  /**
   * handleEmailChange
   * Updates the email state as the user types and performs basic email validation.
   * @param {object} e - The event object from the input change.
   */
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(value) || value === ''); // Allow empty for initial state
  };

  /**
   * handleSignUpClick
   * Handles the click event for the "Start Free Trial" button.
   * Validates the email and calls the onSignUp prop function.
   */
  const handleSignUpClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
      toast.error('Please enter a valid email address.');
      return;
    }

    // Call the parent's sign-up handler
    onSignUp(email);
    setEmail(''); // Clear the input field after successful (simulated) sign-up
    setIsValidEmail(true); // Reset validation state
  };

  return (
    <div className="container my-5 p-5 bg-primary text-light rounded-3 shadow-lg">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-8 text-center">
          <h2 className="display-5 fw-bold mb-3">Unlock Exclusive Benefits!</h2>
          <p className="lead mb-4">
            Sign up for your **FREE trial** and get instant access to special discounts,
            early product launches, and personalized recommendations. No credit card required!
          </p>
          <div className="input-group mb-3 mx-auto" style={{ maxWidth: '400px' }}>
            <span className="input-group-text bg-light text-dark rounded-start border-0">
              <Mail size={20} />
            </span>
            <input
              type="email"
              className={`form-control form-control-lg ${!isValidEmail && email !== '' ? 'is-invalid' : ''}`}
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              aria-label="Email address for free trial"
            />
            <button
              className="btn btn-warning btn-lg rounded-end"
              type="button"
              onClick={handleSignUpClick}
              disabled={!isValidEmail || email === ''} // Disable if email is invalid or empty
            >
              Start Free Trial
            </button>
            {!isValidEmail && email !== '' && (
              <div className="invalid-feedback text-start w-100 mt-2">
                Please enter a valid email format (e.g., user@example.com).
              </div>
            )}
          </div>
          <small className="text-light-50">
            We'll never share your email with anyone else. You can unsubscribe at any time.
          </small>
        </div>
      </div>
    </div>
  );
};

export default SignUpSection;
