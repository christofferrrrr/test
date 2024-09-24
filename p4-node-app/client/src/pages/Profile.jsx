import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        alert('Error loading profile');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <div>First Name: {user.firstname}</div>
      <div>Last Name: {user.lastname}</div>
      <div>Email: {user.email}</div>
      <div>Phone: {user.phone}</div>
      <div>Sex: {user.sex}</div>
      <div>Active: {user.isactive ? 'Yes' : 'No'}</div>
      <button>Edit Profile</button>
    </div>
  );
};

export default Profile;
