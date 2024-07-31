import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS for styling
import LoadingSpinner from '../components/Loading'; // Import the spinner component

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signOutLoading, setSignOutLoading] = useState(false); // State for sign-out loading

  useEffect(() => {
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    } else {
      // Redirect to login page if no user data found
      window.location.href = '/login';
    }
    
    setLoading(false);
  }, []);

  const handleSignOut = async () => {
    setSignOutLoading(true); // Show loading spinner

    // Simulate sign-out process
    setTimeout(() => {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }, 1000); // Simulate delay for demonstration

    // Replace setTimeout with actual API call if needed
  };

  if (loading || signOutLoading) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Welcome, {user ? user.user_firstname : 'User'}!</h1>
        <div className="user-info">
          <p><strong>First Name:</strong> {user?.user_firstname || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.user_email || 'N/A'}</p>
          <p><strong>Phone:</strong> {user?.user_phone || 'N/A'}</p>
        </div>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
