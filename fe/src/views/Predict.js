//import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Fade, FormControlLabel, Grid, Paper, Snackbar, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { Context } from '../store';
import { updateTeams } from '../store/actions';
import { adminCheckStore } from "../store/actions";

function Predict() {
    const [rows, setAllMatches] = useState([])
    const [mappedTeams, setMappedTeams] = useState({})
    const [allTeams, setAllTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [curretUserID, setCurretUserID] = useState()
    const [currentMatchID, setCurrentMatchID] = useState(null)
    const [state, dispatch] = useContext(Context);
    const [scores, setScores] = useState({0:{1:'',2:''}})
    const [matchScores, setMatchScores] = useState({0:{1:0,2:0}})
    const [open, setOpen] = useState(false);
    const [snacbarType, setSnackbarType] = useState("success")
    const [snacMessage, setSnacMessage] = useState("")
    const [adminCheck, setAdminCheck] = useState(false)

    useEffect(()=>{
        setAdminCheck(state.adminCheck)
    },[state.adminCheck])

    useEffect(() => {
        setCurretUserID(state.auth.id)
        getAllTeams()
    },[state.auth.id])

    useEffect(() => {
        makeTable()
    },[state.teams.data])

    const openSnacbar = () => {
        setOpen(true);
    }

    const closeSnacbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    }

    const getAllTeams = () => {
        fetch('http://localhost:3001/getallteams', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // console.log("GET ALL TEAMS DATA:")
            // console.log(data)
            setAllTeams(data)
            // console.log(allTeams)
            dispatch(updateTeams(data))
        }).then(() => {
            // console.log("THEN allTeams should be set:")
            // console.log(allTeams)
            // makeTable()
        })
    }

    const makeTable = () => {
        console.log("allTeams")
        console.log(allTeams)

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/getallmatches', requestOptions)
        .then(response => response.json())
        .then(data => {
            // console.log(JSON.stringify(data))
            // console.log(data.length)
            setAllMatches(data);


            //TODO fetch past match scores
            // let tempObj={0:{1:0,2:0}}
            // Object.keys(data).map((index)=>{
            //     // console.log(data[index])
            //     // console.log({...permObj})
            //     tempObj[data[index].matchid] = {1: data[index].team1score, 2: data[index].team2score}
            // })
            // console.log("temp:")
            // console.log(tempObj)
            // setMatchScores(tempObj)

            
        }).then(()=>{
            fetch(`http://localhost:3001/getuserpredictions/${curretUserID}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // console.log(data.length)
                // setAllTeams(data)
                // dispatch(updateTeams(data))
                
                let tempObj={0:{1:'',2:''}}
                Object.keys(data).map((index)=>{
                    // console.log(data[index].matchid)
                    tempObj[data[index].matchid] = {1: data[index].team1score, 2: data[index].team2score}
                })

                setScores(tempObj)
                setLoading(false)
                //TODO destruct data into ROWS??? allteams????
            })
        }).then(()=>{
            // setAllTeams(state.teams.data)
            // console.log("starting to map:")
            // console.log(allTeams)
            let tempObj={}
            Object.keys(allTeams).map((index)=>{
                // console.log(allTeams[index])
                // console.log({...permObj})
                tempObj[allTeams[index].id] = {team: allTeams[index].team, flag:allTeams[index].flag}
                // setMappedTeams({...mappedTeams,[allTeams[index].id]:{team: allTeams[index].team, flag:allTeams[index].flag}})
            })

            setMappedTeams({...tempObj})

            // window.setTimeout(() => {
            //     console.log("MAPPED TEAMS:")
            //     console.log(mappedTeams)
            // },500)
            
        })
    }

        function stableSort(array) {
            const stabilizedThis = array.map((el, index) => [el, index]);
            // console.log("sorting?")
            // console.log(stabilizedThis)
            stabilizedThis.sort((a, b) => {
              return b[0].user_points - a[0].user_points;
            });
            return stabilizedThis.map((el) => el[0]);
        }

        
        const flagAndTeam = (url, name, no) => {
            return no != '2' ? <div> <img src={url} width = "25" height="15" /> {name}</div> : <div>{name} <img src={url} width = "25" height="15" /> </div>
        }

        const savePredictions = () => {
            setLoading(true)
            const data = JSON.stringify({ 
                "scores": scores
            })

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data
            };
            fetch(`http://localhost:3001/savepredictions/${state.auth.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // setSnackbarType("error") 
                setSnacMessage("Salvestatud!")
                openSnacbar()
                setLoading(false)
                
            }).catch(e=>{
                setSnackbarType("error") 
                setSnacMessage("Salvestamine ebaõnnestus, palun proovi uuesti")
                openSnacbar()
            })
        }

        const savePastMatchScores = () => {
            setLoading(true)
            console.log(matchScores)
            const data = JSON.stringify({ 
                matchScores
            })

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data
            };
            fetch(`http://localhost:3001/savematchscore`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // setSnackbarType("error") 
                setSnacMessage("Salvestatud!")
                openSnacbar()
                setLoading(false)
                
            }).catch(e=>{
                setSnackbarType("error") 
                setSnacMessage("Salvestamine ebaõnnestus, palun proovi uuesti")
                openSnacbar()
            })
        }

        const getMatchDateTime = (matchDate, matchTime) => {
            let date = new Date(matchDate)
            let day = date.getDate()
            let mon = date.getMonth()+1
            let time = getMatchTime(matchTime)

            return (<div style={{display: "flex"}}>
                        <Typography variant="body2" sx={{color: "gray", marginRight: "10px"}} gutterBottom={false}>
                            {`${day}.${mon}`}
                        </Typography>
                        <Typography variant="body2" sx={{color: "gray"}} gutterBottom={false}>
                            {time}
                        </Typography>
                    </div>)
        }
        const getMatchTime = (matchTime) => {
            let splittedTime = matchTime.split(":")
            let hours = splittedTime[0]
            let minutes = splittedTime[1]

            return (`${hours}:${minutes}`)
        }

        const matches = () => {
            // console.log("HERR")
   
                 return  <Grid item xs={12} sx={{textAlign: "start"}}>
                            <Card raised={false}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="200"
                                    image={"https://ak.picdn.net/shutterstock/videos/1024072910/thumb/12.jpg"}
                                    sx={{filter: "blur(30px)",marginBottom: -10}}
                                />
                                <CardContent
                                    sx={{filter: "blur(0px)"}}
                                >
                                <TableContainer component={Paper} sx={styles.tableContainer}>
                                        <Table sx={[styles.table]} aria-label="simple table">
                                            <TableBody>
                                            {stableSort(rows).map((row, index) => {
                                            //    console.log("SEE ON SEE")
                                            //    console.log(scores)
                                                return <TableRow
                                                        className="matchRow"
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        hover={true}
                                                        >
                                        
                                                        <TableCell scope="row" size="small" >{getMatchDateTime(rows[index]?.date, rows[index]?.time)}</TableCell>
                                                        <TableCell scope="row" size="small" sx={{}}>{mappedTeams && Object.keys(mappedTeams).length ? flagAndTeam(mappedTeams[row.team1id]?.flag,mappedTeams[row.team1id]?.team) : "-"}</TableCell>
                                                        <TableCell align="right" size="small" sx={{width: "150px", padding:"1px 5px", }}>
                                                        {/* {console.log(rows[row.team1id])} */}
                                                        {/* {console.log(rows[index].date)} */}
                                                        
                                                        { adminCheck
                                                            ?<div style={{display: "flex"}} className="realScore">
                                                                {Object.keys(matchScores).length && <TextField id="outlined-basic" label="" variant="outlined" sx={{marginRight:"2px", color:"red"}} value={matchScores[row.id] ? matchScores[row.id][1] : ""} 
                                                                    onChange={(v) => {setMatchScores({...matchScores,[row.id]:{...matchScores[row.id],1:v.target.value}})}}/>  }
                                                                    
                                                                :   {Object.keys(matchScores).length && <TextField id="outlined-basic" label="" variant="outlined" sx={{marginLeft:"2px"}} value={matchScores[row.id] ? matchScores[row.id][2] : ""}
                                                                    onChange={(v) => {setMatchScores({...matchScores,[row.id]:{...matchScores[row.id],2:v.target.value}})}}/>  }
                                                            </div>
                                                            :   <div style={{display: "flex"}}>
                                                                    {Object.keys(scores).length && <TextField id="outlined-basic" label="" variant="outlined" sx={{marginRight:"2px"}} value={scores[row.id] ? scores[row.id][1] : ""} 
                                                                        onChange={(v) => {setScores({...scores,[row.id]:{...scores[row.id],1:v.target.value}})}}/>  }
                                                                        
                                                                    :   {Object.keys(scores).length && <TextField id="outlined-basic" label="" variant="outlined" sx={{marginLeft:"2px"}} value={scores[row.id] ? scores[row.id][2] : ""}
                                                                        onChange={(v) => {setScores({...scores,[row.id]:{...scores[row.id],2:v.target.value}})}}/>  }
                                                                </div>
                                                        }
                                                        
                                                        </TableCell>
                                                        <TableCell align="right" size="small" sx={{}}>{mappedTeams && Object.keys(mappedTeams).length ? flagAndTeam(mappedTeams[row.team2id]?.flag,mappedTeams[row.team2id]?.team,"2") : "-"}</TableCell>
                                                        </TableRow>
                                            })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                                <CardActions sx={{justifyContent: "right"}}>
                                    {adminCheck
                                        ? <Button onClick={savePastMatchScores} disabled={loading ? true : false} variant="contained" color="error" style={styles.btn}>Salvesta tulemused</Button>
                                        : <Button onClick={savePredictions} disabled={loading ? true : false} variant="contained" color="success" style={styles.btn}>Salvesta</Button>
                                    }
                                </CardActions>
                            </Card>

                            <Snackbar open={open} autoHideDuration={15000} onClose={closeSnacbar} anchorOrigin={{ vertical: "top", horizontal:"center" }}>
                                <Alert onClose={closeSnacbar} severity={snacbarType} sx={{ width: '100%' }}>
                                    {snacMessage}
                                </Alert>
                            </Snackbar>
                            
                        </Grid>
       } 
  
    return (
        <div style={styles.root}>
            
            {adminCheck 
                ? <Typography variant="h2">Sisesta mängu tulemused</Typography>
                : <Typography variant="h2">Ennusta</Typography> }
            
            
            <Fade in={!loading} timeout={{ enter: 500, exit: 1000 }}>
            <div style={{ width: '100%' }}>
                { matches() }
            </div>
            </Fade>
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
    }
}

export default Predict;
