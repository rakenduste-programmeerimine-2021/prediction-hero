//import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Context } from '../store';
import { blue } from '@mui/material/colors';

function Predict() {
    const [rows, setAllMatches] = useState([])
    const mappedTeams = {}
    const [allTeams, setAllTeams] = useState({})
    const [state, dispatch] = useContext(Context);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Name', width: 130 },
        { field: 'pwhash', headerName: 'pwhash', width: 130 },
        {
            field: 'points',
            headerName: 'Points',
            type: 'number',
            width: 150,
        }
      ];

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/getallmatches', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            console.log(data.length)
            setAllMatches(data);

            
        })
        setAllTeams(state.teams.data)

        teams()
    },[])

        function stableSort(array) {
            const stabilizedThis = array.map((el, index) => [el, index]);
            console.log("sorting?")
            console.log(stabilizedThis)
            stabilizedThis.sort((a, b) => {
              return b[0].user_points - a[0].user_points;
            });
            return stabilizedThis.map((el) => el[0]);
        }

        const teams = () => {
            
            Object.keys(allTeams).map((index)=>{
                console.log(allTeams[index])
                mappedTeams[allTeams[index].id] = {team: allTeams[index].team, flag:allTeams[index].flag}
            })
            return mappedTeams
        }
        const flagAndTeam = (url, name, no) => {
            return no != '2' ? <div> <img src={url} width = "25" height="15" /> {name}</div> : <div>{name} <img src={url} width = "25" height="15" /> </div>
        }

        const matches = () => {
            console.log("HERR")
   
                 return   <TableContainer component={Paper} sx={styles.tableContainer}>
                               <Table sx={[styles.table, { minWidth: 650 }]} aria-label="simple table">
                                   <TableBody>
                                   {stableSort(rows).map((row) => {
                                       return <TableRow
                                                className="matchRow"
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                hover={true}
                                                
                                                >
                                                <TableCell scope="row" size="small" sx={{}}>{allTeams && flagAndTeam((teams())[row.team1id].flag,(teams())[row.team1id].team)}</TableCell>
                                                <TableCell align="right" size="small" sx={{width: "50px", padding:"5px", }}>
                                                    <TextField id="outlined-basic" label="" variant="outlined" sx={{}}/>  
                                                </TableCell>
                                                <TableCell align="center" sx={{width:"10px", padding:"5px"}}>:</TableCell>
                                                <TableCell align="left" size="small" sx={{width: "50px", padding:"5px"}}>
                                                    <TextField id="outlined-basic" label="" variant="outlined" sx={{}}/>  
                                                </TableCell>
                                                <TableCell align="right" size="small" sx={{}}>{allTeams && flagAndTeam((teams())[row.team2id].flag,(teams())[row.team2id].team,"2")}</TableCell>
                                                </TableRow>
                                   })}
                                   </TableBody>
                               </Table>
                           </TableContainer>
       } 
  
    return (
        <div style={styles.root}>
            <Typography variant="h2">Ennusta</Typography>

            <div style={{ width: '100%' }}>
                { matches() }
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

export default Predict;
