import React, { useEffect, useState, useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context } from "../store";
import { loginUser } from "../store/actions";
import { Avatar, Stack } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Settings() {
    const [state, dispatch] = useContext(Context);
    const [logInData, setLogInData] = useState('')
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState(state.auth?.token?.firstname)
    const [lastName, setLastName] = useState(state.auth?.token?.lastname)
    const [email, setEmail] = useState(state.auth?.token?.email)
    const [username, setUsername] = useState(state.auth?.token?.username)

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);


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
    }

    const responseFacebook = (response) => {
        console.log(response);
        setLogInData(response);
        dispatch(loginUser({token: response, user: response.name}));
        navigate('/settings', {state: response})
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
            {(logInData?.status == "NOK") && 
                <div></div>
            }

            <form onKeyPress={handleFormKeypress} style={{textAlign: "center"}}>
                <div style={styles.avatar}>
                    <Avatar alt="Remy Sharp" src={state.auth?.token?.profile_pic} sx={{ width: 80, height: 80 }}/>
                </div>
                <div style={styles.row}>
                    <TextField id="outlined-basic" label="Eesnimi" variant="outlined" value={firstName} onChange={(v) => {setFirstName(v.target.value)}}/>   
                </div>
                <div style={styles.row}>
                    <TextField id="outlined-basic" label="Perekonnanimi" variant="outlined" value={lastName} onChange={(v) => {setLastName(v.target.value)}}/>   
                </div>
                <div style={styles.row}>
                    <TextField id="outlined-basic" label="Kasutjanimi" variant="outlined" value={username} onChange={(v) => {setUsername(v.target.value)}}/>   
                </div>
                <div style={styles.row}>
                    <TextField id="outlined-basic" label="E-mail" variant="outlined" value={email} onChange={(v) => {setEmail(v.target.value)}}/>   
                </div>
                <div style={styles.buttonRow}>
                    <Button onClick={submit} disabled={loading ? true : false} variant="contained" color="success">Salvesta</Button>
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
                        textButton="Liida Facebook"
                        size="small"
                    />
                </div>
            </form>
            {JSON.stringify(state.auth.token)}
        
            <Snackbar open={open} autoHideDuration={1500} onClose={closeSnacbar} anchorOrigin={{ vertical: "top", horizontal:"center" }}>
                <Alert onClose={closeSnacbar} severity="error" sx={{ width: '100%' }}>
                    {logInData?.message}
                </Alert>
            </Snackbar>
            
        </div>
    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    },
    row: {
        marginTop: 10
    },
    buttonRow: {
        marginTop: 30,
        marginBottom: 30
    },
    avatar:{
        display: "flex",
        justifyContent: "center"
    }
}

export default Settings;
