import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";


function Login() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [logInData, setLogInData] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();


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

    const responseFacebook = (response) => {
        console.log(response);
        setLogInData(response);
        navigate('/', {state: response})
    }

    return (
        <div>
            {logInData && JSON.stringify(logInData)}
            <form>
                <input type="text" placeholder="Kasutajanimi" onChange={(v) => {setUsername(v.target.value)}}/>
                <input type="password" placeholder="Parool"  onChange={(v) => {setPassword(v.target.value)}}/>
                <button onClick={submit} type="submit" disabled={loading ? true : false}>Logi sisse</button>
            </form>

            <FacebookLogin
                appId="289181049760112"
                autoLoad={false}
                fields="name,email,picture"
                onClick={() => {console.log('clicked')}}
                callback={responseFacebook} />

            
            
        </div>
    )
}

export default Login;
