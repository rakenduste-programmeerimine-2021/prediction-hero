import React, { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, CardContent, CardMedia, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Context } from '../store/';
import BlockIcon from '@mui/icons-material/Block';



function Leaderboard() {
    const [rows, setAllUsers] = useState([])
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [state, dispatch] = useContext(Context);

    const [blockId, setBlockId] = useState("");
    const [blockFName, setBlockFName] = useState("");
    const [blockLName, setBlockLName] = useState("");
    const [blockUsername, setBlockUsername] = useState("");
    const [blockPoints, setBlockPoints] = useState("");

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
        getAllUsers()
    },[])

    const getAllUsers = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/getallusers', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            console.log(data.length)
            setAllUsers(data)
            setLoading(false)
        })
    }

    const handleDialogOpen = (id, fname, lname, username, points) => {
        setBlockId(id)
        setBlockFName(fname)
        setBlockLName(lname)
        setBlockUsername(username)
        setBlockPoints(points)

        setDialogOpen(true);
      };
    
      const handleDialogClose = () => {
        setDialogOpen(false);
      };

    const blockUser = (id) => {
        setLoading(true)
        const blockOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://localhost:3001/blockuser/${id}`, blockOptions)
        .then(response => response.json())
        .then(data => {
            console.log(JSON.stringify(data))
            console.log(data.length)
            getAllUsers()
            // setAllUsers(data)
            setLoading(false)
            setBlockId("")
            setBlockFName("")
            setBlockLName("")
            setBlockUsername("")
            setBlockPoints("")

            setDialogOpen(false);
        })
    }
 
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
    }

    const isSelected = (id) => selected.indexOf(id) !== -1

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

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

    const alagrupp = () => {
   
                 return   <TableContainer component={Paper} sx={styles.tableContainer}>
                               <Table sx={[styles.table, { minWidth: 650 }]} aria-label="simple table">
                                   <TableHead>
                                   <TableRow>
                                        {state?.auth.is_admin 
                                            && <TableCell sx={{ color: "red" }} size="small"></TableCell>
                                        }
                                        <TableCell align="left" size="small">#</TableCell>
                                        <TableCell align="left" size="small">Eesnimi</TableCell>
                                        <TableCell align="left" size="small">Perekonnanimi</TableCell>
                                        <TableCell align="left" size="small">Kasutajanimi</TableCell>
                                        <TableCell align="right" size="small">Punktid</TableCell>
                                   </TableRow>
                                   </TableHead>
                                   <TableBody>
                                   {stableSort(rows).map((row, rowIndex) => {
                                       return <TableRow
                                                key={row.id}
                                                sx={[{ '&:last-child td, &:last-child th': { border: 0 }}, state?.auth.id == row.id ? styles.currentUserRow : {}]}
                                                hover={state?.auth.id == row.id ? false : true}
                                                
                                                >
                                                {state?.auth.is_admin 
                                                    &&  <TableCell scope="row" size="small">
                                                        {state?.auth.id !== row.id &&
                                                            <Button onClick={() => {handleDialogOpen(row.id, row.firstname, row.lastname, row.username, row.user_points)}} size="small"><BlockIcon style={{color:"red"}}/></Button>
                                                        }
                                                            
                                                        </TableCell>}
                                                
                                                        <TableCell scope="row" size="small" sx={state?.auth.id == row.id ? styles.currentUser : {}}>{rowIndex+1}</TableCell>
                                                        <TableCell scope="row" size="small" sx={state?.auth.id == row.id ? styles.currentUser : {}}>{row.firstname || "-"}</TableCell>
                                                        <TableCell align="left" size="small" sx={state?.auth.id == row.id ? styles.currentUser : {}}>{row.lastname || "-"}</TableCell>
                                                        <TableCell align="left" size="small" sx={state?.auth.id == row.id ? styles.currentUser : {}}>{row.username || "-"}</TableCell>
                                                        <TableCell align="right" size="small" sx={state?.auth.id == row.id ? styles.currentUser : {}}>{row.user_points || "0"}</TableCell>
                                                </TableRow>
                                   })}
                                   </TableBody>
                               </Table>
                           </TableContainer>
       } 
  
    return (
        <div style={styles.root}>
            <Typography variant="h2">Edetabel</Typography>

            <div style={{ width: '100%' }}>
                <Fade in={!loading} timeout={{ enter: 500, exit: 1000 }}>
                    <Card >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="200"
                            image="https://i.pinimg.com/736x/56/6f/14/566f14057cde9bb7898d7f25d305528d.jpg"
                        />
                        <CardContent>
                            { alagrupp() }
                        </CardContent>
                    </Card>
                </Fade>
            </div>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {`Kas oled kindel et soovid kaustaja blokeerida?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Nimi: ${blockFName} ${blockLName}`}<br/>
                        {`Kasutaja: ${blockUsername}`}<br/>
                        {`Punktid: ${blockPoints}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} autoFocus>EI</Button>
                    <Button onClick={()=>{blockUser(blockId)}} color="error">Blokeeri</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    },
    tableContainer: {
        marginTop: "30px",
        backgroundColor: "#f3f3f3",
        borderRadius: "5px"
    },
    currentUser: {
        color: "dodgerblue",
        fontWeight: 600
    },
    currentUserRow: {
        backgroundColor: "#1e90ff2e"
    }
}

export default Leaderboard;
