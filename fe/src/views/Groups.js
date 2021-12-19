import { Card, CardContent, CardMedia, Fade, Grid, Slide, Typography } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { updateTeams } from '../store/actions';
import { Context } from '../store';

function Groups() {
    const [teams, setAllTeams] = useState({})
    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useContext(Context);
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
            dispatch(updateTeams(data))

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

            setLoading(false)
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

              return (
                  <div key={"groupContainer"+index}>
                        <Typography key={"groupName"+index} variant="subtitle2" gutterBottom={false} sx={styles.tableGroupName}>Grupp {element.toUpperCase()}</Typography>
                        <TableContainer key={"groupTContainer"+index} component={Paper} sx={styles.tableContainer}>
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
                        </div>
                    )
          })

      return tables
    } 
    
    return (
        <div style={styles.root}>
            <Grid item xs={12} justifyContent="center" >
                <Grid item xs={12} lg={8} sx={{textAlign: "start", margin: "0 auto"}}>
                    <Typography variant="h2">Alagrupid</Typography>
                    <div style={{ height: 400, width: '100%' }}>

                        <Fade in={!loading} timeout={{ enter: 500, exit: 1000 }}>
                            <Card >
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    image={"https://png.pngtree.com/thumb_back/fh260/background/20200701/pngtree-versus-screen-in-neon-futuristic-style-image_340535.jpg"}
                                />
                                <CardContent>
                                    { rows && alagrupp() }
                                </CardContent>
                            </Card>
                        </Fade>
                    </div>
                </Grid>
            </Grid>
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
        backgroundColor: "#f3f3f3",
        borderRadius: "5px"
    },
    tableGroupName: {
        marginTop: "30px",
    }
}

export default Groups;
function dispatch(arg0) {
    throw new Error('Function not implemented.');
}

