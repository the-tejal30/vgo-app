// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.user.profile_details); // Check if user is authenticated

  return isAuthenticated ? <Navigate to="/home" /> : children; // Redirect if authenticated
};

export default ProtectedRoute;