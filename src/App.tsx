import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './customroutes/ProtectedRoute';
import Home from './pages/Home';

const App: React.FC = () => {
  const {isAuthenticated} = useAuth();

  return(
    <Router>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home />}/> {/* Home page route */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}/> {/* Dashboard page route */}
        </Route>

        <Route path="/signin" element={<Signin />} /> {/* Singin page route */}
        <Route path="/signup" element={<Signup />} /> {/* Singup page route */}
      </Routes>
    </Router>
  );
};

export default App;
