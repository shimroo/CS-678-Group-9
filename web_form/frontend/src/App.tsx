import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import Browse from './components/Browse';
import CreateAuction from './components/CreateAuction';
import SpecificAuction from './components/SpecificAuction';
import PasswordChange from './components/password';

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';

function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ !user ? <Signup /> : <Navigate to={'/home'} /> }/>
        <Route path="/login" element={ !user ? <Login /> : <Navigate to={'/home'} /> }/>
        <Route path="/home" element={ user ? <Home /> : <Navigate to={'/'} /> }/>
        <Route path="/profile" element={ user ? <Profile /> : <Navigate to={'/home'} /> }/>
        <Route path="/browse" element={ user ? <Browse /> : <Navigate to={'/home'} /> }/>
        <Route path="/create" element={ user ? <CreateAuction /> : <Navigate to={'/home'} /> }/>
        <Route path="/auction/:id" element={ user ? <SpecificAuction /> : <Navigate to={'/home'} /> }/>
        <Route path="/password" element={ user ? <PasswordChange /> : <Navigate to={'/home'} /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
