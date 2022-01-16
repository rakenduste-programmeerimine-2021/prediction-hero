import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store";
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginUser } from "../store/actions";
import { Snackbar, Alert } from '@mui/material';


function LoginBtn() {

    const someFunc = () => {
      console.log("in someFunc")
    }

    return (
       <Button onClick={someFunc} disabled={false} variant="contained" color="success" id="login">Logi sisse</Button>
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
        marginBottom: 30,
        display: "flex",
        justifyContent: "space-between"
    }
}

export default LoginBtn;
