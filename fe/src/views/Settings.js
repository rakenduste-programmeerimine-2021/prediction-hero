import React, { useEffect, useState, useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
import { Context } from "../store";
import { loginUser, logoutUser } from "../store/actions";
import { Avatar, Card, CardActions, CardContent, CardMedia, Grid, Paper, Stack, styled, Typography, Snackbar, Alert, Fade } from '@mui/material';

function Settings() {
    const [state, dispatch] = useContext(Context);
    const [logInData, setLogInData] = useState({message:""})
    const [loading, setLoading] = useState(true)
    const [firstName, setFirstName] = useState(state.auth?.firstname)
    const [lastName, setLastName] = useState(state.auth?.lastname)
    const [email, setEmail] = useState(state.auth?.email)
    const [username, setUsername] = useState(state.auth?.user)
    const [password, setPassword] = useState("")
    const [profile_pic, setImage] = useState(state.auth?.profilePic)
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [snacbarType, setSnackbarType] = useState("success")
    const [snacbarAction, setSnackbarAction] = useState(<Button onClick={()=>{navigate('/login')}} style={styles.snacbarBtn} size="small">Logi sisse</Button>)

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        setFirstName(state?.auth?.firstname)
        setLastName(state?.auth?.lastname)
        setEmail(state?.auth?.email)
        setUsername(state?.auth?.user)
        setImage(state.auth?.profilePic)
        setLoading(false)

        !state.auth?.id && setSubmitDisabled(true)
    },[state.auth])

    const openSnacbar = () => {
        setOpen(true);
    }

    const closeSnacbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    }

    const validatePassword = (value) => {
        value === password ? setSubmitDisabled(false) : setSubmitDisabled(true)
    }

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
    
    const saveProfile = () => {
        setLoading(true)

        const url = state.auth?.id ? `changeuserdata/${state.auth.id}` : `signup`

        const data = JSON.stringify({ 
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "username": username,
            "profilePic": profile_pic,
            "pw": password
        })

        const requestOptions = {
            method: state.auth?.id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch(`http://localhost:3001/${url}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setLogInData(data)
            setLoading(false)
            
            if(state.auth?.id){
                setSnackbarType("error")
                
                let newUser = {
                    token: data, 
                    user: data?.data.rows[0].username,
                    firstname: data?.data.rows[0].firstname, 
                    lastname: data?.data.rows[0].lastname,
                    email: data?.data.rows[0].email,
                    profilePic: data?.data.rows[0].profile_pic,
                    id: data?.data.rows[0].id,
                    user_points: data?.data.rows[0].user_points,
                    is_admin: data?.data.rows[0].is_admin
                }

                setSnackbarType("success")
                openSnacbar()
                dispatch(loginUser(newUser));
                window.localStorage.setItem("PHsess",JSON.stringify({"chk":(new Date()).getTime(),"data": newUser}))
            }else{
                if(data.message){ 
                    setSnackbarType("error") 
                    openSnacbar()
                }else{
                    navigate('/login')
                }
                    // : setSnackbarType("success"); setLogInData({message:"Kasutaja on loodud!"})
                
            }
                
                // navigate('/', {state: data})
        }).catch(e => {
            console.log(e)
            setLoading(false)
        })
    }

    return (
        <div className="settingsView" style={styles.root}>
            
            <form onKeyPress={handleFormKeypress} style={styles.form}>

            <Grid item xs={12} sx={{textAlign: "start"}}>
                {state.auth?.id
                    ?<Typography variant="h2">Minu andmed</Typography>
                    :<Typography variant="h2">Registreeri</Typography>
                }
                
            </Grid>
            <Fade in={!loading} timeout={{ enter: 500, exit: 1000 }}>
                <Card >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={state.auth?.profilePic || "https://cdn.suwalls.com/wallpapers/abstract/lights-14769-1920x1200.jpg"}
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                        
                            <Grid item xs={7}>
                                    <div style={styles.row}>
                                        <TextField id="outlined-basic" fullWidth label="Eesnimi" variant="outlined" value={firstName} onChange={(v) => {setFirstName(v.target.value)}}/>   
                                    </div>
                                    <div style={styles.row}>
                                        <TextField id="outlined-basic" fullWidth label="Perekonnanimi" variant="outlined" value={lastName} onChange={(v) => {setLastName(v.target.value)}}/>   
                                    </div>
                                    <div style={styles.row}>
                                        <TextField id="outlined-basic" fullWidth label="E-mail" variant="outlined" value={email} onChange={(v) => {setEmail(v.target.value)}}/>   
                                    </div>
                                    <div style={styles.row}>
                                        <TextField id="outlined-basic" fullWidth label="Kasutajanimi" variant="outlined" value={username} onChange={(v) => {setUsername(v.target.value)}}/>   
                                    </div>
                                    {!state.auth?.id && 
                                        <>
                                            <div style={styles.row}>
                                                <TextField id="outlined-basic" fullWidth label="Parool" variant="outlined" value={password} onChange={(v) => {setPassword(v.target.value)}}/>   
                                            </div>
                                            <div style={styles.row}>
                                                <TextField id="outlined-basic" fullWidth label="Korda parooli" variant="outlined" onChange={(v) => {validatePassword(v.target.value)}}/>   
                                            </div>
                                        </>
                                    }
                                    
                            </Grid>
                            <Grid item xs={5} container direction='column'>
                                    <div style={styles.avatar}>
                                        <Avatar alt="Remy Sharp" src={profile_pic} sx={{ width: 250, height: 250, marginTop: "-72px" }} style={styles.avatarImg}/>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <TextField id="outlined-basic" fullWidth label="Profiilipildi link" variant="outlined" value={profile_pic} onChange={(v) => {setImage(v.target.value)}}/>   
                                    </div>
                            </Grid>
                        </Grid>

                        </CardContent>
                        <CardActions sx={{justifyContent: "right"}}>
                        {state.auth?.id
                            ?<Button onClick={saveProfile} disabled={loading} variant="contained" color="success" style={styles.btn}>Salvesta</Button>
                            :<Button onClick={saveProfile} disabled={loading || submitDisabled} variant="contained" color="success" style={styles.btn}>Registreeru</Button>
                        }
                            {/* <FacebookLogin
                                appId="289181049760112"
                                autoLoad={false}
                                fields="first_name,last_name,email,picture"
                                onClick={() => {console.log('clicked')}}
                                callback={responseFacebook}
                                onFailure={fbLoginFail}
                                textButton="Facebook"
                                size="small"
                                cssClass="btn"
                            /> */}
                        </CardActions>
                    </Card>
                </Fade>
            </form>
        
            <Snackbar open={open} autoHideDuration={15000} onClose={closeSnacbar} anchorOrigin={{ vertical: "top", horizontal:"center" }}>
                <Alert onClose={closeSnacbar} severity={snacbarType} sx={{ width: '100%' }} action={state.auth?.id ? "" : snacbarAction}>
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
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center"
    },
    buttonRow: {
        marginTop: 30,
        marginBottom: 30
    },
    avatar:{
        display: "flex",
        justifyContent: "center",
        marginBottom: 30
    },
    avatarImg: {
        transition: "all .5s"
    },
    form:{
        textAlign: "center",
        margin: "0 auto"
    },
    btn: {
        margin: 10,
        borderRadius: 4
    },
    snacbarBtn: {
        color: "white"
    }
}

export default Settings;
