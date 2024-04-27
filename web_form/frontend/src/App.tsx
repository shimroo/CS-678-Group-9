import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Browse from './components/Browse';


import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';

function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ !user ? <Signup /> : <Navigate to={'/home'} /> }/>
        <Route path="/signup" element={ !user ? <Signup /> : <Navigate to={'/home'} /> }/>
        <Route path="/login" element={ !user ? <Login /> : <Navigate to={'/home'} /> }/>
        <Route path="/home" element={ user ? <Home /> : <Navigate to={'/'} /> }/>
        <Route path="/browse" element={ user ? <Browse /> : <Navigate to={'/home'} /> }/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
