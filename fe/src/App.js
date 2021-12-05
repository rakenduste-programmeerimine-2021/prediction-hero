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
import Leaderboard from './views/Leaderboard';
import Groups from './views/Groups';
import Settings from './views/Settings';
import Predict from './views/Predict';
import Rules from './views/Rules';


function App() {

  return ( 
    <div style={{minHeight: "100vh"}}>
      <Head/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
        <Route path="/rules" element={<Rules/>} />
        <Route path="/predict" element={<Predict/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/groups" element={<Groups/>} />
      </Routes>
    </div>
  );
}

export default App;
