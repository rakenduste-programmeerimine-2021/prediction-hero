import { Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from '../store/';

function Home() {
    const [state, dispatch] = useContext(Context);

    return (
        <div style={styles.root}>
            <Grid item xs={12} justifyContent="center" >
                <Grid item xs={12} lg={8} sx={{textAlign: "start", margin: "0 auto"}}>
                    <Typography variant="h2">Avaleht</Typography>
                    <Typography variant="subtitle1">Siin viskame kasutajat mingi relevantse sissejuhatava infoga.</Typography>
                </Grid>
            </Grid>
        </div>
    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    }
}

export default Home;
