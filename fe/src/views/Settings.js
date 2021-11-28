import React, { useEffect, useState, useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context } from "../store";
import { loginUser } from "../store/actions";
import { Avatar, Grid, Paper, Stack, styled, Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Settings() {
    const [state, dispatch] = useContext(Context);
    const [logInData, setLogInData] = useState('')
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState(state.auth?.firstname)
    const [lastName, setLastName] = useState(state.auth?.lastname)
    const [email, setEmail] = useState(state.auth?.email)
    const [username, setUsername] = useState(state.auth?.user)

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
        // dispatch(loginUser({token: response, user: response.name}));
        // navigate('/settings', {state: response})
    }
    const fbLoginFail = () => {
        console.log("FB login failed");
    }

    const handleFormKeypress = (e) => {
        if (e.charCode == 13) {
            submit()
        }
    }
    
    const MouseOver = (event) => {
        event.target.style.filter = 'brightness(0.5)';
        event.target.style.cursor = 'pointer';
    }
    const MouseOut = (event) => {
        event.target.style.filter="";
    }

    return (
        <div style={styles.root}>
            
            <form onKeyPress={handleFormKeypress} style={styles.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">Minu andmed</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>
                            <div style={styles.row}>
                                <TextField id="outlined-basic" fullWidth label="Eesnimi" variant="outlined" value={firstName} onChange={(v) => {setFirstName(v.target.value)}}/>   
                            </div>
                            <div style={styles.row}>
                                <TextField id="outlined-basic" fullWidth label="Perekonnanimi" variant="outlined" value={lastName} onChange={(v) => {setLastName(v.target.value)}}/>   
                            </div>
                            <div style={styles.row}>
                                <TextField id="outlined-basic" fullWidth label="Kasutjanimi" variant="outlined" value={username} onChange={(v) => {setUsername(v.target.value)}}/>   
                            </div>
                            <div style={styles.row}>
                                <TextField id="outlined-basic" fullWidth label="E-mail" variant="outlined" value={email} onChange={(v) => {setEmail(v.target.value)}}/>   
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={4} style={styles.column}>
                        <div style={styles.avatar}>
                            <Avatar alt="Remy Sharp" src={state.auth?.profilePic} sx={{ width: 150, height: 150 }} style={styles.avatarImg} onMouseOver={MouseOver} onMouseOut={MouseOut}/>
                        </div>
                    </Grid>
                </Grid>
                
                
                <div style={styles.buttonRow}>
                    <Button onClick={submit} disabled={loading ? true : false} variant="contained" color="success" style={styles.btn}>Salvesta</Button>
                    <FacebookLogin
                        appId="289181049760112"
                        autoLoad={false}
                        fields="first_name,last_name,email,picture"
                        onClick={() => {console.log('clicked')}}
                        callback={responseFacebook}
                        onFailure={fbLoginFail}
                        textButton="Facebook"
                        size="small"
                        cssClass="btn"
                    />
                </div>
            </form>
            {/* {JSON.stringify(state.auth.token)} */}
        
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
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    buttonRow: {
        marginTop: 30,
        marginBottom: 30
    },
    avatar:{
        display: "flex",
        justifyContent: "center"
    },
    avatarImg: {
        transition: "all .5s"
    },
    form:{
        textAlign: "center",
        width: "80%",
        margin: "0 auto"
    },
    btn: {
        margin: 10,
        borderRadius: 4
    }
}

export default Settings;
