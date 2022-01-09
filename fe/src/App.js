import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './views/Login';
import Home from './views/Home';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Leaderboard from './views/Leaderboard';
import Groups from './views/Groups';
import Settings from './views/Settings';
import Predict from './views/Predict';
import Rules from './views/Rules';
import { useNavigate } from "react-router-dom";
import { Context } from "./store";
import { adminCheckStore, loginUser, logoutUser } from "./store/actions";
import { Link } from "react-router-dom";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, FormControlLabel, Switch } from '@mui/material'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TocIcon from '@mui/icons-material/Toc';
import HomeIcon from '@mui/icons-material/Home';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import GavelIcon from '@mui/icons-material/Gavel';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: "#f3f3f3",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('all', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  backgroundColor: "#f3f3f3",
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


function App() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [adminCheckState, setAdminCheckState] = useState(false)
  const [storeState, dispatch] = useContext(Context);
  let authUser;
  useEffect(()=>{
    validateSession()
  },[])

  const validateSession = () => {
    if(!storeState?.auth?.username){ 
      authUser = JSON.parse(window.localStorage.getItem("PHsess"))
      // console.log("LEIDSIN LOCALIST KASUTAJA:")
      // console.log(authUser)
      if((((new Date()).getTime() - authUser?.chk )/1000/60) < 120){ // sessioon justkui 2h (120min)
        // console.log("leitud kasutaja sess < 60min")
        dispatch(loginUser(authUser.data));
      }else{
        console.log("leitud kasutaja sess > 60min --> LOGOUT")
        window.location.pathname !== "/settings" && logOut()
      }
    }else{
      window.localStorage.setItem("PHsess",JSON.stringify({"chk":(new Date()).getTime(),"data": storeState.auth}))
    }
  }

  useEffect(()=>{
    // console.log(storeState.auth)
    if(window.location.pathname.includes("/login")){
      dispatch(adminCheckStore(false))
    }
    if(!storeState.auth.is_admin){
      dispatch(adminCheckStore(false))
    }
    
  },[window.location])


  useEffect(()=>{
    setAdminCheckState(storeState.adminCheck)
  },[storeState.adminCheck])

  const logOut = () => {
    if(!window.location.pathname.includes("/login")){
      window.localStorage.setItem("PHlwp",window.location.pathname)
    }
    window.localStorage.removeItem("PHsess")
    dispatch(adminCheckStore(false))
    dispatch(logoutUser());
    navigate('/login');
  }


  const handleSwitchChange = (e) => {
    console.log(e.target.checked)
    dispatch(adminCheckStore(e.target.checked))
  }

  const navigation = (to, data) => {
    if(!to.includes("/login")){
      window.localStorage.setItem("PHlwp",to)
    }else{
      dispatch(adminCheckStore(false))
    }
    navigate(to, data)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
    <Box sx={{ display: 'flex' }} className={adminCheckState?"isAdminSelected":""}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{backgroundColor: adminCheckState ? "#b34545" : "#028288"}}>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2}}
              disabled={open ? true : false}
              onClick={handleDrawerOpen}
            >
              <MenuIcon sx={{ color: open ? '#028288' : 'white'}}/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Prediction Hero
            </Typography>
            {storeState.auth.is_admin
              && <FormControlLabel control={<Switch checked={adminCheckState}
              onChange={handleSwitchChange} color="default"/>} label="Admin" />
            }
            
            {storeState.auth?.token && 
              <div style={styles.row} onClick={() => {navigation(navigationMapping["Minu andmed"])}}>
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
      <Drawer variant="permanent" open={open} sx={{backgroundColor:"#f3f3f3",background: "red"}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {<ChevronLeftIcon/>}
          </IconButton>
        </DrawerHeader>
        <List>
          {['Avaleht', 'Edetabel', 'Alagrupid', 'Ennusta'].map((text, index) => (
            <ListItem button key={text} onClick={() => {navigation(navigationMapping[text])}} 
              disabled={(window.location.pathname === navigationMapping[text] || !storeState.auth.id) ? true : false}>
              <ListItemIcon style={{color: text == 'Ennusta' ? "#ff8888" : "#6f6f6f"}}>
                {iconsMapping[text]}
              </ListItemIcon>
              <ListItemText primary={text} style={{color: text == 'Ennusta' ? "#ff8888" : "#6f6f6f"}}/>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Minu andmed', 'Reeglid'].map((text, index) => (
            <ListItem button key={text} onClick={() => {navigation(navigationMapping[text])}} 
              disabled={(window.location.pathname === navigationMapping[text] || !storeState.auth.id) ? true : false}>
              <ListItemIcon style={{color: "#6f6f6f"}}>
                {iconsMapping[text]}
              </ListItemIcon>
              <ListItemText primary={text} style={{color: "#6f6f6f"}}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
          <Grid item xs={12} justifyContent="center" >
            <Grid item xs={12} lg={8} sx={{textAlign: "start", margin: "0 auto"}}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
              <Route path="/rules" element={<Rules/>} />
              <Route path="/predict" element={<Predict/>} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/groups" element={<Groups/>} />
            </Routes>
            </Grid>
          </Grid>
      </Box>
    </Box>
  );
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
  },
  paper: {
    background: "red"
  }

}

export default App;
