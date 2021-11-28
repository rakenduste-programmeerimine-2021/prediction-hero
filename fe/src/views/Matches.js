import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Matches() {
    
    return (
        <div style={styles.root}>
            <Typography variant="h2">Mängud</Typography>
        </div>
    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    }
}

export default Matches;
