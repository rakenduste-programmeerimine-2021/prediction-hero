import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Typography } from 'antd';

const { Paragraph } = Typography;

function App() {
  const [testData, setData] = useState("")

  fetch('http://localhost:3001/test')
  .then(response => response.json())
  .then(data => setData(JSON.stringify(data.data)))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Paragraph>
          Prediction Hero
        </Paragraph>
        <Paragraph>Data from BE:</Paragraph>
        <Paragraph>{testData ? testData : "Loading..."}</Paragraph>
        <div>
          <Button>ANTD Default Button</Button>
          <Button type="primary">ANTD Primary Button</Button>
          <Button danger>ANTD Danger Button</Button>
        </div>
        
        
      </header>
    </div>
  );
}

export default App;
