import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Browse from './components/Browse';
import Profile from './components/Profile';
import QuestionPage from './components/FormPage';
import CreateAuction from './components/CreateQuestion';

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const { user } = useAuthContext();
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswerChange = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

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
        {/* <Route path="/section1" element={ user ? <QuestionPage section="1" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section2" element={ user ? <QuestionPage section="2" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section3" element={ user ? <QuestionPage section="3" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section4" element={ user ? <QuestionPage section="4" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section5" element={ user ? <QuestionPage section="5" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section6" element={ user ? <QuestionPage section="6" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section7" element={ user ? <QuestionPage section="7" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section8" element={ user ? <QuestionPage section="8" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section9" element={ user ? <QuestionPage section="9" /> : <Navigate to={'/home'} /> }/>
        <Route path="/section10" element={ user ? <QuestionPage section="10" /> : <Navigate to={'/home'} /> }/> */}
        <Route path="/section1" element={<QuestionPage section="1" Answers={answers} onAnswerChange={handleAnswerChange} />}/>
        <Route path="/section2" element={<QuestionPage section="2" Answers={answers} onAnswerChange={handleAnswerChange} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
