import React, { useContext, useState } from 'react';
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
import { Link } from "react-router-dom";
import { Context } from "../store";
import { loginUser } from "../store/actions";
import { useNavigate } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

function Head() {
    const [state, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const logOut = () => {
        dispatch(loginUser({token:"",user : ""}));
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
      "Seaded": <SettingsIcon/>
    }

    const navigationMapping = {
      "Avaleht": "/",
      "Alagrupid": "/",
      "Edetabel":  "/leaderboard",
      "Minu andmed":  "/",
      "Seaded":  "/",
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
              {['Avaleht', 'Alagrupid', 'Edetabel'].map((text) => (
                <ListItem button key={text} onClick={() => {navigate(navigationMapping[text])}} disabled={window.location.pathname === navigationMapping[text] ? true : false}>
                  <ListItemIcon>
                    {iconsMapping[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Minu andmed', 'Seaded'].map((text) => (
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
            {state.auth.user
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
  }
}

export default Head;
