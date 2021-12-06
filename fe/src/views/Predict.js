//import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Context } from '../store';
import { blue } from '@mui/material/colors';

function Predict() {
    const [rows, setAllUsers] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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

            setAllUsers([
                {"id":1,"team1id":1,"team2id":2,"difference":0,"points":0,"group":"a","flag":"https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg"},
                {"id":2,"team1id":2,"team2id":3,"difference":0,"points":0,"group":"a","flag":"https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_Estonia_%28bordered%29.svg"},
                {"id":3,"team1id":3,"team2id":4,"difference":0,"points":0,"group":"a","flag":"https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg"},
                {"id":4,"team1id":4,"team2id":5,"difference":0,"points":0,"group":"a","flag":"https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"},
                {"id":5,"team1id":5,"team2id":6,"difference":0,"points":0,"group":"a","flag":"https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg"},
                {"id":6,"team1id":6,"team2id":7,"difference":0,"points":0,"group":"b","flag":"https://upload.wikimedia.org/wikipedia/commons/7/7d/Flag_of_Spain_%281785%E2%80%931873%2C_1875%E2%80%931931%29.svg"},
                {"id":7,"team1id":7,"team2id":8,"difference":0,"points":0,"group":"b","flag":"https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg"},
                {"id":8,"team1id":8,"team2id":9,"difference":0,"points":0,"group":"b","flag":"https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg"},
                {"id":9,"team1id":9,"team2id":10,"difference":0,"points":0,"group":"b","flag":"https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Mexico.png"},
                {"id":10,"team1id":10,"team2id":1,"difference":0,"points":0,"group":"b","flag":"https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg"}])
    
    },[])

        const handleClick = (event, id) => {
            const selectedIndex = selected.indexOf(id);
            let newSelected = [];

            if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            }

            setSelected(newSelected);
        };

        const isSelected = (id) => selected.indexOf(id) !== -1;

        // Avoid a layout jump when reaching the last page with empty rows.
        const emptyRows =
            page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

        function descendingComparator(a, b, orderBy) {
            if (b[orderBy] < a[orderBy]) {
            return -1;
            }
            if (b[orderBy] > a[orderBy]) {
            return 1;
            }
            return 0;
        }

        function stableSort(array) {
            const stabilizedThis = array.map((el, index) => [el, index]);
            console.log("sorting?")
            console.log(stabilizedThis)
            stabilizedThis.sort((a, b) => {
              return b[0].user_points - a[0].user_points;
            });
            return stabilizedThis.map((el) => el[0]);
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
                                                <TableCell scope="row" size="small" sx={{}}>{row.team1id || "-"}</TableCell>
                                                <TableCell align="right" size="small" sx={{width: "50px", padding:"5px", }}>
                                                    <TextField id="outlined-basic" label="" variant="outlined" sx={{}}/>  
                                                </TableCell>
                                                <TableCell align="center" sx={{width:"10px", padding:"5px"}}>:</TableCell>
                                                <TableCell align="left" size="small" sx={{width: "50px", padding:"5px"}}>
                                                    <TextField id="outlined-basic" label="" variant="outlined" sx={{}}/>  
                                                </TableCell>
                                                <TableCell align="right" size="small" sx={{}}>{row.team2id || "0"}</TableCell>
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
