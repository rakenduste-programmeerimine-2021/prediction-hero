import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Groups() {
    const [teams, setAllTeams] = useState({})
    let rows = {}

    const columns = [
        { field: 'Meeskond', headerName: 'Meeskond', width: 300 },
        { field: 'Mänge', headerName: 'Mänge ', width: 150 },
        { field: 'Väravatevahe', headerName: 'Väravatevahe', width: 150 },
        { field: 'Punktid', headerName: 'Punktid', width: 150 },
      ];
    
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/getallteams', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            console.log(data.length)
            // setAllTeams(data)

            data.map((row,index) => {
                if(row.group && (!Object.keys(rows).length || !Object.keys(rows).includes(row.group))){

                    console.log("loon uue "+row.group)
                    rows[row.group]={key: row.group, data: [row]}

                }else{

                    console.log("lisan olemasolevasse")
                    rows[row.group].data.push(row)

                }
            })
            console.log(rows)
            setAllTeams({...rows})
        })
    },[])

      const testElement = (url, name) => {
          return <div> <img src={url} width = "25" height="15" /> {name}</div>
      }

  const alagrupp = () => {
         console.log("HERR")
         console.log(teams)
          const tables = Object.keys(teams).map((element, index) => {  
              console.log(`MAP ${index}`)
              console.log(element)

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
                                {teams[element]?.data.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    hover={true}
                                    
                                    >
                                    <TableCell component="th" scope="row" size="small">
                                        {testElement(row.flag, row.team)}
                                    </TableCell>
                                    <TableCell align="right" size="small">{row.played}</TableCell>
                                    <TableCell align="right" size="small">{row.difference}</TableCell>
                                    <TableCell align="right" size="small">{row.points}</TableCell>
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
            <Typography variant="h2">Alagrupid</Typography>
            <div style={{ height: 400, width: '100%' }}>
                { rows && alagrupp() }
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

export default Groups;
