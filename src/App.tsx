import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import ModelDashboard from './pages/ModelDashboard';
import ModelProfile from './pages/profile/ModelProfile';

// Placeholder components for demonstration
const Users = () => <div>Users Management</div>;
const Documents = () => <div>Documents Section</div>;
const Reports = () => <div>Reports Analytics</div>;
const Settings = () => <div>Settings Panel</div>;

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<MainLayout />}>
            <Route index element={
              <ProtectedRoute>
                <ModelDashboard />
              </ProtectedRoute>
            } />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ModelProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={['admin']}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute roles={['admin', 'manager', 'editor']}>
                  <Documents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute roles={['admin', 'manager']}>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute roles={['admin']}>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}