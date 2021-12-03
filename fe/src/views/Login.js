import React, { useState, useContext, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context } from "../store";
import { loginUser } from "../store/actions";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [logInData, setLogInData] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [state, dispatch] = useContext(Context);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        if(state.auth.username) navigate('/settings', {state: state.auth})
        console.log(state.auth)
    },[])

    const openSnacbar = () => {
        setOpen(true);
    };


    const closeSnacbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    


    const submit = () => {  
        closeSnacbar()
        setLoading(true)
        const data = JSON.stringify({ 
            "username": username,
            "pwhash": password 
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch('http://localhost:3001/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            setLogInData(data)
            setLoading(false)

            if(data.status == "NOK"){
                openSnacbar()
            }else{
                console.log("LOGGING IN.... data:")
                console.log(data)
                finishLogin(data)
            }
        })
    }

    const responseFacebook = (response) => {
        console.log(response);
        setLogInData(response);

        closeSnacbar()
        setLoading(true)
        const data = JSON.stringify({ 
            "username": response.first_name+"_"+response.last_name,
            "pwhash": response.userID,
            "email": response.email,
            "firstname": response.first_name,
            "lastname": response.last_name,
            "social_id": response.userID,
            "social_platform": "FB",
            "profile_pic": response.picture.data.url
        })
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch('http://localhost:3001/loginFB', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setLogInData(data)
            setLoading(false)
            console.log("Now dispatching user")
            console.log(data.data.rows[0].username)

            finishLogin(data)
        })
        
    }
    const finishLogin = (data) => {
        window.localStorage.setItem("PHsess",JSON.stringify({"chk":(new Date()).getTime(),"data": state.auth}))
        let user = {
            token: data, 
            user: data.data.rows[0].username,
            firstname: data.data.rows[0].firstname, 
            lastname: data.data.rows[0].lastname,
            email: data.data.rows[0].email,
            profilePic: data.data.rows[0].profile_pic,
            id: data.data.rows[0].id
        }
        dispatch(loginUser(user));
        window.localStorage.setItem("PHsess",JSON.stringify({"chk":(new Date()).getTime(),"data": user}))
        navigate('/settings', {state: data}) 
    }

    const fbLoginFail = () => {
        console.log("FB login failed");
    }

    const handleFormKeypress = (e) => {
        if (e.charCode == 13) {
            submit()
        }
      }

    return (
        <div style={styles.root}>
            <form onKeyPress={handleFormKeypress} style={{textAlign: "center"}}>
                <div style={styles.row}>
                    <TextField id="outlined-basic" label="Kasutajanimi" variant="outlined" onChange={(v) => {setUsername(v.target.value)}}/>   
                </div>
                <div style={styles.row}>
                    <TextField id="outlined-basic" label="Parool" variant="outlined" type="password" onChange={(v) => {setPassword(v.target.value)}}/>   
                </div>
                <div style={styles.buttonRow}>
                    <Button onClick={submit} disabled={loading ? true : false} variant="contained" color="success">Logi sisse</Button>
                </div>
                <div style={styles.row}>
                    <FacebookLogin
                        appId="289181049760112"
                        autoLoad={false}
                        fields="first_name,last_name,email,picture"
                        onClick={() => {console.log('clicked')}}
                        callback={responseFacebook}
                        onFailure={fbLoginFail}
                        icon="fa-facebook"
                        textButton="Logi sisse Facebookiga"
                        size="small"
                    />
                </div>
            </form>
        
            <Snackbar open={open} autoHideDuration={1500} onClose={closeSnacbar} anchorOrigin={{ vertical: "top", horizontal:"center" }}>
                <Alert onClose={closeSnacbar} severity="error" sx={{ width: '100%' }}>
                    {logInData?.message}
                </Alert>
            </Snackbar>
            
        </div>
    )
}
const styles = {
    root: {
        display: "flex",
        justifyContent: "center",
        padding: 50,
        overFlow: "hidden"
    },
    row: {
        marginTop: 10
    }
    ,
    buttonRow: {
        marginTop: 30,
        marginBottom: 30
    }
}

export default Login;
