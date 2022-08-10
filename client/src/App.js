import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthenticationProcess from './apis/AuthenticationProcess';
import { ToastContainer } from 'react-toastify';
import { TripsContext, TripsContextProvider } from './context/tripsContext';
import 'react-toastify/dist/ReactToastify.css';


// components

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import Post from './components/Post';
import Home from './components/Home';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth(){
    try {
      const token = localStorage.getItem("token");
      const headers = { token: token };
      const response = await AuthenticationProcess.get("/auth/verify", {headers})
      
      //console.log(response)
       response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
   isAuth()
  },[])


  return (
    <Fragment>
      <TripsContextProvider>
      <Router>
        <div className='container'>
        <Routes>
          
        <Route exact path = "/" element={<Home/>} />
        <Route exact path = "/login" element={!isAuthenticated ? (<Login isAuth = {isAuthenticated} setAuth={setAuth}/>) : (<Navigate to ="/dashboard"/>)} />
        <Route exact path = "/register" element={!isAuthenticated ? (<Register isAuth = {isAuthenticated} setAuth={setAuth}/> ) : (<Navigate to="/login"/>) } /> 
        <Route exact path = "/dashboard" element={isAuthenticated ? <Dashboard isAuth = {isAuthenticated} setAuth={setAuth}/> : <Navigate to="/login"/>}  />
        <Route exact path = "/posts" element={isAuthenticated ? <Posts isAuth = {isAuthenticated} setAuth={setAuth}/> : <Navigate to="/login"/>}  />
        <Route exact path = "/post" element={isAuthenticated ? <Post isAuth = {isAuthenticated} setAuth={setAuth}/> : <Navigate to="/login"/>}  />

        </Routes>
        <ToastContainer autoClose={5000}/>
        </div>
     

      </Router>
      </TripsContextProvider>
      
    </Fragment>
  );
}

export default App;
