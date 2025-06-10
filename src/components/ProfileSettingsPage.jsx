import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, ArrowLeft, Mail, Phone, Home, Key, Lock, Edit } from 'lucide-react'; // Added Key, Lock, Edit icons
import { toast } from 'react-toastify';

/**
 * ProfileSettingsPage Component
 * Allows a logged-in user to view and update their profile information (name, address, phone)
 * and change their account password. Profile data and passwords are stored in localStorage.
 *
 * @param {object} props - Component props.
 * @param {string} props.currentUserEmail - The email of the currently logged-in user.
 */
const ProfileSettingsPage = ({ currentUserEmail }) => {
  const navigate = useNavigate(); // Hook for navigation

  // State for profile info fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true); // Loading state for profile data

  // State for password change fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false); // Loading state for password change

  // --- useEffect to load user profile data from localStorage ---
  useEffect(() => {
    // Redirect if no user is logged in
    if (!currentUserEmail) {
      toast.error("Please log in to manage your profile.");
      navigate('/account');
      return;
    }

    setLoadingProfile(true); // Start loading profile data
    const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    const currentUserProfile = userProfiles[currentUserEmail] || {};

    // Set form fields with existing profile data
    setName(currentUserProfile.name || '');
    setAddress(currentUserProfile.address || '');
    setPhone(currentUserProfile.phone || '');
    setLoadingProfile(false); // Done loading profile data
  }, [currentUserEmail, navigate]); // Re-run if currentUserEmail changes

  /**
   * handleProfileInfoUpdate
   * Handles the form submission to save updated profile information (name, address, phone).
   * @param {object} e - The event object from the form submission.
   */
  const handleProfileInfoUpdate = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!currentUserEmail) {
      toast.error("You must be logged in to update your profile.");
      navigate('/account');
      return;
    }

    // Basic validation for profile fields
    if (!name || !address || !phone) {
      toast.error("Please fill in all profile fields.");
      return;
    }

    const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    userProfiles[currentUserEmail] = {
      ...userProfiles[currentUserEmail], // Keep existing properties (like email if stored separately)
      name,
      address,
      phone
    };

    localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
    toast.success("Profile information updated successfully!");
    console.log("Profile information updated for:", currentUserEmail, userProfiles[currentUserEmail]);
  };

  /**
   * handlePasswordChange
   * Handles the form submission to change the user's password.
   * @param {object} e - The event object from the form submission.
   */
  const handlePasswordChange = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!currentUserEmail) {
      toast.error("You must be logged in to change your password.");
      navigate('/account');
      return;
    }

    setLoadingPasswordChange(true);

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const storedPassword = users[currentUserEmail];

    // Validation for password change
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill all password fields.");
      setLoadingPasswordChange(false);
      return;
    }
    if (currentPassword !== storedPassword) {
      toast.error("Current password is incorrect.");
      setLoadingPasswordChange(false);
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      setLoadingPasswordChange(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm new password do not match.");
      setLoadingPasswordChange(false);
      return;
    }
    if (currentPassword === newPassword) {
        toast.warn("New password cannot be the same as the current password.");
        setLoadingPasswordChange(false);
        return;
    }

    // Update the password in localStorage (simulated)
    users[currentUserEmail] = newPassword; // Store the new password (still plain for demo)
    localStorage.setItem('users', JSON.stringify(users));

    toast.success("Password changed successfully!");
    // Clear password fields after successful change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setLoadingPasswordChange(false);
    console.log("Password changed for:", currentUserEmail);
  };

  // If not logged in, show a message (handled by useEffect redirect)
  if (!currentUserEmail && !loadingProfile) {
      return <div className="text-center mt-5 alert alert-warning">Redirecting to login...</div>;
  }

  if (loadingProfile) {
    return <div className="text-center mt-5">Loading profile data...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-3 p-4 p-md-5">
        <h1 className="display-4 fw-bold text-center text-info mb-4">
          <Settings size={40} className="me-3" /> Profile Settings
        </h1>
        <p className="lead text-center mb-5 text-muted">
          Update your personal information and change your account password.
        </p>

        {/* Section 1: Profile Information Update */}
        <div className="mb-5 border p-4 rounded-3 bg-light">
          <h3 className="h5 fw-bold mb-4 d-flex align-items-center text-primary">
            <Edit size={20} className="me-2" /> Personal Information
          </h3>
          <form onSubmit={handleProfileInfoUpdate} className="mx-auto" style={{ maxWidth: '600px' }}>
            <div className="mb-3">
              <label htmlFor="profileName" className="form-label fw-bold">Full Name</label>
              <div className="input-group">
                <span className="input-group-text"><User size={18} /></span>
                <input
                  type="text"
                  className="form-control"
                  id="profileName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="profileEmail" className="form-label fw-bold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text"><Mail size={18} /></span>
                <input
                  type="email"
                  className="form-control"
                  id="profileEmail"
                  value={currentUserEmail}
                  disabled // Email is read-only as it's the identifier
                  title="Email cannot be changed here as it's your account identifier."
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="profileAddress" className="form-label fw-bold">Address</label>
              <div className="input-group">
                <span className="input-group-text"><Home size={18} /></span>
                <input
                  type="text"
                  className="form-control"
                  id="profileAddress"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full address"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="profilePhone" className="form-label fw-bold">Phone Number</label>
              <div className="input-group">
                <span className="input-group-text"><Phone size={18} /></span>
                <input
                  type="tel"
                  className="form-control"
                  id="profilePhone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +1234567890"
                  required
                />
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg d-flex align-items-center justify-content-center">
                <User size={20} className="me-2" /> Update Profile Info
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Password Change */}
        <div className="mb-5 border p-4 rounded-3 bg-light">
          <h3 className="h5 fw-bold mb-4 d-flex align-items-center text-secondary">
            <Lock size={20} className="me-2" /> Change Password
          </h3>
          <form onSubmit={handlePasswordChange} className="mx-auto" style={{ maxWidth: '600px' }}>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label fw-bold">Current Password</label>
              <div className="input-group">
                <span className="input-group-text"><Key size={18} /></span>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label fw-bold">New Password</label>
              <div className="input-group">
                <span className="input-group-text"><Lock size={18} /></span>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 chars)"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmNewPassword" className="form-label fw-bold">Confirm New Password</label>
              <div className="input-group">
                <span className="input-group-text"><Lock size={18} /></span>
                <input
                  type="password"
                  className="form-control"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-secondary btn-lg d-flex align-items-center justify-content-center" disabled={loadingPasswordChange}>
                {loadingPasswordChange ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <Key size={20} className="me-2" /> Change Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Back Button */}
        <div className="text-center mt-4">
          <Link to="/account" className="btn btn-outline-secondary btn-lg d-inline-flex align-items-center">
            <ArrowLeft size={20} className="me-2" /> Back to Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
