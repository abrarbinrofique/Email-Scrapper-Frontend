import './App.css';
import React, { Component } from 'react'
import NabVar from './components/NabVar';
import Home from './Home';
import LogIn from './components/LogIn';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
      <Router>
      <NabVar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
       
      </Routes>
   
      
      <div>
      
      </div>
      </Router>
      </AuthProvider>
    )
  }
}
