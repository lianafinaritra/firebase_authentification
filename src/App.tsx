import React from 'react';
import './App.css';
import './style.scss'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
