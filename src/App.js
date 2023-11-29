import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyList from './CompanyList';
import JobList from './JobList'
import Company from './Company';
import Signup from './Signup';
import Login from './Login';
import UserProvider from './UserProvider';
import NavBar from './NavBar';
import Home from './Home';
import EditProfile from './EditProfile';

function App() {
  const handleLoginSuccess = (token) => {
    console.log('Login success! Token:', token);
  };

  const handleSignupSuccess = (token) => {
    console.log('Signup success! Token:', token);
  };
  return (
    <BrowserRouter>
    <UserProvider>
      <NavBar/>
        <div className="App">
        <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/companies" element={<CompanyList/>}/>
              <Route path="/jobs" element={<JobList/>}/>
              <Route path="/companies/:handle" element={<Company cantFind='/'/>}/>
              <Route path='/auth/register' element={<Signup onSignupSuccess={handleSignupSuccess}/>}/>
              <Route path='/auth/login' element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
              <Route path='/editprofile' element={<EditProfile/>}/>
        </Routes>  
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
