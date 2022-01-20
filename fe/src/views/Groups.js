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
          return <div style={{whiteSpace: "nowrap"}}> <img src={url} width = "25" height="15" /> {name}</div>
      }

      function stableSort(array) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        // console.log("sorting?")
        // console.log(stabilizedThis)
        stabilizedThis.sort((a, b) => {
          return b[0].points - a[0].points;
        });
        return stabilizedThis.map((el) => el[0]);
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
                            <Table key={index}  sx={[styles.table]} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell sx={{ }} size="small">Meeskond</TableCell>
                                    <TableCell align="right" size="small">Mänge</TableCell>
                                    <TableCell align="right" size="small">Väravatevahe</TableCell>
                                    <TableCell align="right" size="small">Punktid</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {stableSort(teams[element]?.data).map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    hover={true}
                                    
                                    >
                                    <TableCell component="th" scope="row" size="small">
                                        {testElement(row.flag, row.team)}
                                    </TableCell>
                                    <TableCell align="right" size="small" sx={{width:100}}>{row.played}</TableCell>
                                    <TableCell align="right" size="small" sx={{width:100}}>{row.difference}</TableCell>
                                    <TableCell align="right" size="small" sx={{width:100}}>{row.points}</TableCell>
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
            <Typography variant="h2">Alagrupid</Typography>
            <div style={{ height: 400, width: '100%' }}>

                <Fade in={!loading} timeout={{ enter: 500, exit: 1000 }}>
                    <Card >
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="200"
                            image={"https://png.pngtree.com/background/20210714/original/pngtree-versus-vs-battle-screen-background-picture-image_1200091.jpg"}
                            // image={"https://png.pngtree.com/thumb_back/fh260/background/20200701/pngtree-versus-screen-in-neon-futuristic-style-image_340535.jpg"}
                        />
                        <CardContent
                                    sx={{filter: "blur(0px)"}}
                                >
                            { rows && alagrupp() }
                        </CardContent>
                    </Card>
                </Fade>
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
        backgroundColor: "#f3f3f3",
        borderRadius: "5px"
    },
    tableGroupName: {
        marginTop: "30px",
        color: "#b6b6b6"
    }
}

export default Groups;

