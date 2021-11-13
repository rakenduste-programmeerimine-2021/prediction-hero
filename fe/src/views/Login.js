import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Button, Typography } from 'antd';

const { Paragraph } = Typography;

function Login() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {  
        setLoading(true)
        const test = JSON.stringify({ 
            "username": username,
            "pwhash": password 
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: test
        };
        fetch('http://localhost:3001/login',requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            setLoading(false)
        })
    }

    return (
        <div>
            
            <input type="text" placeholder="Kasutajanimi" onChange={(v) => {setUsername(v)}}/>
            <input type="password" placeholder="Parool"  onChange={(v) => {setPassword(v)}}/>
            <button onClick={submit} disabled={loading ? true : false}>Logi sisse</button>
        </div>
    )
}

export default Login;
