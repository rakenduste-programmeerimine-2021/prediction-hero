import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Button, Typography } from 'antd';

const { Paragraph } = Typography;

function Login() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [logInData, setLogInData] = useState('')
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
        fetch('http://localhost:3001/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            setLogInData(JSON.stringify(data))
            setLoading(false)
            //TODO parse json and check is OK or NOK
        })
    }

    return (
        <div>
            {logInData && logInData}
            <form>
                <input type="text" placeholder="Kasutajanimi" onChange={(v) => {setUsername(v.target.value)}}/>
                <input type="password" placeholder="Parool"  onChange={(v) => {setPassword(v.target.value)}}/>
                <button onClick={submit} type="submit" disabled={loading ? true : false}>Logi sisse</button>
            </form>
            
        </div>
    )
}

export default Login;
