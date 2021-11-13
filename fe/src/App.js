import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './views/Login';
import Home from './views/Home';
import Head from './components/Head';


function App() {
  const [testData, setData] = useState("")

  return (
    <BrowserRouter>  
      <Head/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
