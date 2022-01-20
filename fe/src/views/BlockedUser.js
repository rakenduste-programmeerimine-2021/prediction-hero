import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function Blockeduser() {
    
    return (
        <div style={styles.root}>
                    
            <Typography variant="h2" sx={{color: "#d32f2f"}}>
                <ErrorOutlineIcon sx={{fontSize: "40px"}} color="error" style={{marginRight: 10}}/>Sinu kasutaja on blokeeritud
            </Typography>
            <Typography variant="body1">Küsimuste tekkimisel palun võta ühendust administraatoriga.</Typography>

        </div>
    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    }
}

export default Blockeduser;
