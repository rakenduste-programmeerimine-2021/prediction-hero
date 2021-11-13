import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

function Head() {

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
            <Button color="inherit"><Link to="/login" style={{textDecoration:"none",color:"white"}}>Logi sisse</Link></Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
}
const Styles = {
    navbar: {
        backgroundColor: "navy",
        height: 50,
        color: "white"
    }
}

export default Head;
