import React, { useEffect, useState, useContext } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useLocation, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context } from "../store";
import { loginUser, logoutUser } from "../store/actions";
import { Avatar, Card, CardActions, CardContent, CardMedia, Grid, Paper, Stack, styled, Typography } from '@mui/material';

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
    const [profile_pic, setImage] = useState(state.auth?.profilePic)

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        setFirstName(state?.auth?.firstname)
        setLastName(state?.auth?.lastname)
        setEmail(state?.auth?.email)
        setUsername(state?.auth?.user)
        setImage(state.auth?.profilePic)
    },[state.auth])

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
    
    const saveProfile = () => {
        setLoading(true)
        const data = JSON.stringify({ 
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "username": username,
            "profilePic": profile_pic
        })

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: data
        };
        fetch(`http://localhost:3001/changeuserdata/${state.auth.id}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setLogInData(data)
            setLoading(false)
            console.log("Now dispatching user")
            console.log(data.data.rows[0].username)
                let newUser = {
                    token: data, 
                    user: data.data.rows[0].username,
                    firstname: data.data.rows[0].firstname, 
                    lastname: data.data.rows[0].lastname,
                    email: data.data.rows[0].email,
                    profilePic: data.data.rows[0].profile_pic,
                    id: data.data.rows[0].id,
                    user_points: data.data.rows[0].user_points
                }
                dispatch(loginUser(newUser));
                window.localStorage.setItem("PHsess",JSON.stringify({"chk":(new Date()).getTime(),"data": newUser}))
                // navigate('/', {state: data})
        })
    }

    return (
        <div className="settingsView" style={styles.root}>
            
            <form onKeyPress={handleFormKeypress} style={styles.form}>

            <Grid item xs={12} sx={{textAlign: "start"}}>
                <Typography variant="h2">Minu andmed</Typography>
            </Grid>
            <Card >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    // image="https://wallpaperaccess.com/full/1808816.jpg"
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
                                    <TextField id="outlined-basic" fullWidth label="Kasutjanimi" variant="outlined" value={username} onChange={(v) => {setUsername(v.target.value)}}/>   
                                </div>
                                <div style={styles.row}>
                                    <TextField id="outlined-basic" fullWidth label="E-mail" variant="outlined" value={email} onChange={(v) => {setEmail(v.target.value)}}/>   
                                </div>
                        </Grid>
                        <Grid item xs={5} container direction='column'>
                                <div style={styles.avatar}>
                                    <Avatar alt="Remy Sharp" src={profile_pic} sx={{ width: 250, height: 250, marginTop: "-72px" }} style={styles.avatarImg}/>
                                </div>
                                <div style={{display: "flex"}}>
                                    <TextField id="outlined-basic" fullWidth label="URL" variant="outlined" value={profile_pic} onChange={(v) => {setImage(v.target.value)}}/>   
                                </div>
                        </Grid>
                    </Grid>

                    </CardContent>
                    <CardActions>
                        <Button onClick={saveProfile} disabled={loading ? true : false} variant="contained" color="success" style={styles.btn}>Salvesta</Button>
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
        width: "80%",
        margin: "0 auto"
    },
    btn: {
        margin: 10,
        borderRadius: 4
    }
}

export default Settings;
