import React, { useState, useEffect } from 'react';
import avatar from '../../../components/Assets/useravatar.png';
import { useAuth } from '../../../context/auth';
import './Profile.css';
import Layout from '../../../components/Layout/Layout';

function UserProfile() {
  const [auth] = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserDetails = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:44337/api/Auth/GetUserDetails/${userId}`, {
        headers: {
          Authorization: auth.token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      setError('Error fetching user details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`https://localhost:44337/api/Auth/UpdateUserDetails/${auth.user.userId}`, {
        method: 'PUT',
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
        setIsEditing(false);
        // Optionally, fetch updated user details after successful update
        // fetchUserDetails(auth.user.userId);
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  useEffect(() => {
    if (auth.user) {
      fetchUserDetails(auth.user.userId);
    }
  }, [auth]);

  return (
    <Layout>
      <div className="user-profile-container">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {userDetails && (
          <div>
            <h2>User Profile</h2>
            <div className="profile-details">
              <div className="avatar">
                <img src={avatar} alt="User Avatar" />
              </div>
              <div className="user-info">
                <p><strong>Name:</strong> {userDetails.fullName}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Username:</strong> {userDetails.userName}</p>
                <p><strong>Address:</strong> {userDetails.address}</p>
                <p><strong>Contact:</strong> {userDetails.contact}</p>
              </div>
            </div>
            {!isEditing && (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
            {isEditing && (
              <div className="edit-profile-form">
                <input
                  type="text"
                  value={userDetails.fullName}
                  onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })}
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={userDetails.userName}
                  onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  placeholder="Username"
                />
                <input
                  type="text"
                  value={userDetails.address}
                  onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                  placeholder="Address"
                />
                <input
                  type="text"
                  value={userDetails.contact}
                  onChange={(e) => setUserDetails({ ...userDetails, contact: e.target.value })}
                  placeholder="Contact"
                />
                <button onClick={handleUpdateProfile}>Save Changes</button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default UserProfile;
