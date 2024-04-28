import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Browse from './components/Browse';
import Profile from './components/Profile';
import QuestionPage from './components/FormPage';
import CreateAuction from './components/CreateQuestion';
import SpecificAuction from './components/SpecificAuction';
import CreateAd from './components/CreateAd';
import Inter from './components/inter';

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

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
        <Route path="/profile" element={ user ? <Profile /> : <Navigate to={'/home'} /> }/>
        <Route path="/create" element={ <CreateAuction /> }/>
        <Route path="/test" element={ <SpecificAuction /> }/>
        <Route path="/Ad" element={ <CreateAd /> }/>
        <Route path="/inter" element={ <Inter /> }/>
        <Route path="/section1" element={<QuestionPage section="1"/>}/>
        <Route path="/section2" element={<QuestionPage section="2"/>}/>
        <Route path="/section3" element={<QuestionPage section="3"/>}/>
        <Route path="/section4" element={<QuestionPage section="4"/>}/>
        <Route path="/section5" element={<QuestionPage section="5"/>}/>
        <Route path="/section6" element={<QuestionPage section="6"/>}/>
        <Route path="/section7" element={<QuestionPage section="7"/>}/>
        <Route path="/section8" element={<QuestionPage section="8"/>}/>
        <Route path="/section9" element={<QuestionPage section="9"/>}/>
        <Route path="/section10" element={<QuestionPage section="10"/>}/>
        <Route path="/section11" element={<QuestionPage section="11"/>}/> 
        <Route path="/section12" element={<QuestionPage section="12"/>}/>
        <Route path="/section13" element={<QuestionPage section="13"/>}/>
        <Route path="/section14" element={<QuestionPage section="14"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
