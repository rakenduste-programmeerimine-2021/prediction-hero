import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Matches() {

    const columns = [
        { field: 'Meeskond', headerName: 'Meeskond', width: 300 },
        { field: 'Mänge', headerName: 'Mänge ', width: 150 },
        { field: 'Väravatevahe', headerName: 'Väravatevahe', width: 150 },
        { field: 'Punktid', headerName: 'Punktid', width: 150 },
      ];
      
      const testElement = (url, name) => {
          return <div> <img src={url} width = "25" height="15" /> {name}</div>
      }
      const rows = [
        { key: 1,
          data: [
              { id: 1, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg", "Argentiina"), Mänge: 0, Väravatevahe: 35, Punktid: 1, Alagrupp: 1 },
              { id: 2, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg", "Brasiilia"), Mänge: 0, Väravatevahe: 42, Punktid: 1, Alagrupp: 1 },
              { id: 3, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", "Prantsusmaa"), Mänge: 0, Väravatevahe: 45, Punktid: 3, Alagrupp: 1 },
              { id: 4, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg", "Portugal"), Mänge: 0, Väravatevahe: 16, Punktid: 4, Alagrupp: 1 },
              { id: 5, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/7/7d/Flag_of_Spain_%281785%E2%80%931873%2C_1875%E2%80%931931%29.svg", "Hispaania"), Mänge: 0, Väravatevahe: 0, Punktid: 5, Alagrupp: 1 }
          ]
      },
      {   key: 2,
          data: [
              { id: 6, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", "Jaapan"), Mänge: 0, Väravatevahe: 150, Punktid: 6, Alagrupp: 2 },
              { id: 7, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg", "Rootsi"), Mänge: 0, Väravatevahe: 44, Punktid: 7, Alagrupp: 2 },
              { id: 8, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Mexico.png", "Mehhiko"), Mänge: 0, Väravatevahe: 36,  Punktid: 8, Alagrupp: 2 },
              { id: 9, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg", "Egiptus"), Mänge: 0, Väravatevahe: 65, Punktid: 9, Alagrupp: 2 },
              { id: 10, Meeskond: testElement("https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Estonia_%28bordered%29.svg", "Eesti"), Mänge: 0, Väravatevahe: -18, Punktid: 9, Alagrupp: 2 }
          ]
      }
    ];

  const alagrupp = () => {
         console.log("HERR")
          const tables = rows.map((element, index) => {  
              console.log(`MAP ${index}`)
              console.log(rows)

              return   <TableContainer key={index} component={Paper} sx={styles.tableContainer}>
                            <Table key={index}  sx={[styles.table, { minWidth: 650 }]} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 400 }} size="small">Meeskond</TableCell>
                                    <TableCell align="right" size="small">Mänge</TableCell>
                                    <TableCell align="right" size="small">Väravatevahe</TableCell>
                                    <TableCell align="right" size="small">Punktid</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {element.data.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    hover={true}
                                    
                                    >
                                    <TableCell component="th" scope="row" size="small">
                                        {row.Meeskond}
                                    </TableCell>
                                    <TableCell align="right" size="small">{row.Mänge}</TableCell>
                                    <TableCell align="right" size="small">{row.Väravatevahe}</TableCell>
                                    <TableCell align="right" size="small">{row.Punktid}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
          })

      return tables
  }   
    
    return (
        <div style={styles.root}>
            <Typography variant="h2">Mängud</Typography>
            <div style={{ height: 400, width: '100%' }}>
                { alagrupp() }
            </div>
        </div>

    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    },
    table: {
    },
    tableContainer: {
        marginTop: "30px",
        backgroundColor: "#f3f3f3",
        borderRadius: "5px"
    }
}

export default Matches;
