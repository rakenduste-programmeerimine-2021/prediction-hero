import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './views/Login';
import Home from './views/Home';
import Head from './components/Head';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {

  return ( 
    <>
      <Head/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
