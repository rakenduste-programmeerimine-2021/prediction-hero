import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Turniiritabel() {

    const columns = [
        { field: 'Meeskond', headerName: 'Meeskond', wPunktidth: 130 },
        { field: 'Mänge', headerName: 'Mänge ', wPunktidth: 130 },
        { field: 'Väravatevahe', headerName: 'Väravatevahe', wPunktidth: 130 },
        { field: 'Punktid', headerName: 'Punktid', wPunktidth: 90 },
      ];
      
      const rows = [
        { id: 1, Meeskond: 'Argentiina', Mänge: 0, Väravatevahe: 35, Punktid: 1, Alagrupp: 1 },
        { id: 2, Meeskond: 'Brasiilia', Mänge: 0, Väravatevahe: 42, Punktid: 1, Alagrupp: 1 },
        { id: 3, Meeskond: 'Prantsusmaa', Mänge: 0, Väravatevahe: 45, Punktid: 3, Alagrupp: 1 },
        { id: 4, Meeskond: 'Portugal', Mänge: 0, Väravatevahe: 16, Punktid: 4, Alagrupp: 1 },
        { id: 5, Meeskond: 'Hispaania', Mänge: 0, Väravatevahe: 0, Punktid: 5, Alagrupp: 1 },
        { id: 6, Meeskond: 'Jaapan', Mänge: 0, Väravatevahe: 150, Punktid: 6, Alagrupp: 2 },
        { id: 7, Meeskond: 'Rootsi', Mänge: 0, Väravatevahe: 44, Punktid: 7, Alagrupp: 2 },
        { id: 8, Meeskond: 'Mehhiko', Mänge: 0, Väravatevahe: 36,  Punktid: 8, Alagrupp: 2 },
        { id: 9, Meeskond: 'Egiptus', Mänge: 0, Väravatevahe: 65, Punktid: 9, Alagrupp: 2 },
        { id: 10, Meeskond: 'Eesti', Mänge: 0, Väravatevahe: -18, Punktid: 9, Alagrupp: 2 }

      ];

    const alagruppe = 0 
    

    const alagrupp = () => {
        return (        
            rows.map((element, index) => {  
                            
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}/> 
                
            })
        )           
    }  
    
    return (
        <div style={styles.root}>
            <Typography variant="h2">Mängud</Typography>
            <div style={{ height: 400, width: '100%' }}>
                { alagrupp }
            </div>
        </div>

    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    }
}

export default Turniiritabel;
