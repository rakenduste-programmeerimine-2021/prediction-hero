import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TocIcon from '@mui/icons-material/Toc';
import HomeIcon from '@mui/icons-material/Home';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import GavelIcon from '@mui/icons-material/Gavel';
import { Link } from "react-router-dom";
import { Context } from "../store";
import { loginUser, logoutUser } from "../store/actions";
import { useNavigate } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material'

function Head() {
    const [storeState, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    let authUser;
    useEffect(()=>{
        console.log("SHOULD REFRESH SESSION")
        if(!storeState?.auth?.username){ 
          authUser = JSON.parse(window.localStorage.getItem("PHsess"))
          console.log("LEIDSIN LOCALIST KASUTAJA:")
          console.log(authUser)
          if((((new Date()).getTime() - authUser?.chk )/1000/60) < 120){ // sessioon justkui 2h (120min)
            console.log("leitud kasutaja sess < 60min")
            dispatch(loginUser(authUser.data));
          }else{
            logOut()
          }
        }else{
          window.localStorage.setItem("PHsess",JSON.stringify({"chk":(new Date()).getTime(),"data": storeState.auth}))
        }
    },[])

    useEffect(()=>{
      console.log(storeState.auth)
    },[storeState.auth,window.location])

    const logOut = () => {
      dispatch(logoutUser());
        navigate('/login');
    }

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setDrawerOpen(open);
    };

    const iconsMapping = {
      "Avaleht": <HomeIcon/>,
      "Alagrupid": <TocIcon/>,
      "Edetabel": <LeaderboardIcon/>,
      "Minu andmed": <PersonIcon/>,
      "Seaded": <SettingsIcon/>,
      "Reeglid": <GavelIcon/>,
      "Ennusta": <OnlinePredictionIcon/>,

    }

    const navigationMapping = {
      "Avaleht": "/",
      "Alagrupid": "/groups",
      "Edetabel":  "/leaderboard",
      "Minu andmed":  "/settings",
      "Seaded":  "/settings",
      "Reeglid":  "/rules",
      "Ennusta":  "/predict",
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          variant="temporary"
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {['Avaleht', 'Edetabel', 'Alagrupid', 'Ennusta'].map((text) => (
                <ListItem button key={text} onClick={() => {navigate(navigationMapping[text])}} disabled={window.location.pathname === navigationMapping[text] ? true : false}>
                  <ListItemIcon style={{color: text == 'Ennusta' ? "dodgerblue" : "black"}}>
                    {iconsMapping[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} style={{color: text == 'Ennusta' ? "dodgerblue" : "black"}}/>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Minu andmed', 'Reeglid'].map((text) => (
                <ListItem button key={text} onClick={() => {navigate(navigationMapping[text])}} disabled={window.location.pathname === navigationMapping[text] ? true : false}>
                  <ListItemIcon>
                    {iconsMapping[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <AppBar position="static" color="primary" elevation={10}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Prediction Hero
            </Typography>
            {storeState.auth?.token && 
              <div style={styles.row} onClick={() => {navigate(navigationMapping["Minu andmed"])}}>
                <div style={styles.column}>
                  <Typography style={styles.user} variant="subtitle2" component="div">
                    {storeState?.auth?.firstname && storeState.auth?.lastname 
                      ? (storeState.auth?.firstname+" "+storeState.auth?.lastname)
                      : storeState.auth?.user}
                  </Typography>
                  {storeState?.auth?.user_points>=0 && <Typography style={styles.user} variant="caption" component="div">
                        {storeState?.auth?.user_points + " punkti"} 
                      </Typography>
                  } 
                </div>
                <div style={styles.avatar}>
                      <Avatar alt="Remy Sharp" src={storeState.auth?.profilePic} sx={{ width: 40, height: 40 }}/>
                </div>
                
              </div>}
            {storeState.auth.user
                ? <Button color="inherit" onClick={logOut}>Logi välja</Button>
                : <Button color="inherit"><Link to="/login" style={{textDecoration:"none",color:"white"}}>Logi sisse</Link></Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
    )
}

const styles = {
  root:{
      padding: 50,
      overFlow: "hidden"
  },
  drawer:{
    width: "500px"
  },
  drawerItem: {
    width: "500px",
    margin: "10px 10px"
  },
  avatar: {
    margin: "0 10px 0 15px"
  },
  row: {
    display: "flex"
  },
  user: {
    margin: "auto 0"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }

}

export default Head;
