import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { Context } from "../store";
import { loginUser } from "../store/actions";
import { useNavigate } from "react-router-dom";

function Head() {
    const [state, dispatch] = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        dispatch(loginUser({token:"",user : ""}));
        navigate('/login');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" elevation="10">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
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

export default Head;
