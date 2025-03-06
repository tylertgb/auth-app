import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Signin />} /> {/* Singin page route */}
      <Route path="signup" element={<Signup />} /> {/* Singup page route */}
    </Routes>
  </Router>
);

export default App;
