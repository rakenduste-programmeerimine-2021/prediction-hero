import React, { useState, useContext, useEffect } from 'react';
import { Context } from "../store";
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginUser } from "../store/actions";
import { Snackbar, Alert } from '@mui/material';

export const noop = () => {}
function LoginBtn({responseFacebook, fbLoginFail}) {

    return (
        <FacebookLogin
            appId="289181049760112"
            autoLoad={false}
            fields="first_name,last_name,email,picture"
            onClick={noop}
            callback={responseFacebook}
            onFailure={fbLoginFail}
            icon="fa-facebook"
            textButton="Logi sisse Facebookiga"
            size="small"
        />
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
