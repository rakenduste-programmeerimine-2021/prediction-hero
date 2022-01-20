import express from 'express';
var app = express();
import http from 'http';
const appserver = http.createServer(app);
import cors from 'cors';
import pool from './db.js'
import crypto from 'crypto';


import log from './log.js';

app.use(express.json())

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));


// testendpoint
app.get('/test', async(req, res)=>{
  try {
      res.json("OK vastus");
  } catch (err) {
    console.error(err)
  }
})

// ===========================================================================================================================================================

// sign up
app.post('/signup', async(req, res) => {
  try {
    log.info('test',"SINGNING UP")
    let {username="", pw="", firstname="", lastname="", email="", social_id="", social_platform="", profilePic="",} = req.body;
    log.info('test',req.body);
    log.info('test',username);
    log.info('test',firstname);

    var hash = crypto.createHash('md5').update(pw).digest('hex');

    const resp = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if(!resp.rows.length){
      //kasutajat ei ole veel olemas
      const newInsertion = await pool.query(
        "INSERT INTO users (username, pwhash, firstname, lastname, email, social_id, social_platform, profile_pic) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
        [username,hash, firstname, lastname, email, social_id, social_platform, profilePic]
      );
  
        res.json(newInsertion.rows[0]);
    }else{
      res.json({status: "NOK", message:"Kasutajanimi on kasutusel", data: resp});
    }

    
  } catch (err) {
    console.error(err)
  }
})

app.post('/loginFB', async(req, res) => {
  try {
    let {username="", pwhash=(new Date()).getTime().toString(15), firstname="", lastname="", email="", social_id="", social_platform="", profile_pic="",} = req.body;
    log.info('test',req.body)

    // username == "" ? res.json({status: "NOK", message:"Kasutajanimi on kohustuslik", data: resp})  : username

    var hash = crypto.createHash('md5').update(pwhash).digest('hex');
    log.info('test',`${pwhash} - ${hash}`);
    log.info('',`${pwhash} - ${hash}`)

    const resp = await pool.query(
      "SELECT * FROM users WHERE social_id = $1",
      [social_id]
    );

    if(resp.rows.length){
      const updateData = await pool.query(
        "UPDATE users SET social_platform = $1 WHERE social_id = $2",
        [social_platform, social_id]
      );
      res.json({status: "OK", message:"logged in successfully", data: resp}) 
    }else{
      //kasutajat ei ole veel olemas
      const newInsertion = await pool.query(
        "INSERT INTO users (username, pwhash, firstname, lastname, email, social_id, social_platform, profile_pic) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
        [username, hash, firstname, lastname, email, social_id, social_platform, profile_pic]
      );
  
      res.json(newInsertion.rows[0]);
    }

    
  } catch (err) {
    console.error(err)
  }
})

// login
// TODO pw peaks frontist liikuma juba hashitult nodesse
app.post('/login', async(req, res) => {
  try {
    log.info('login', 'user logging in')
    log.info('login', req.body)
    const {username="", pwhash=""} = req.body;
    log.info('test',req.body)

    var hash = crypto.createHash('md5').update(pwhash).digest('hex');
    log.info('test',`${pwhash} - ${hash}`);

    const resp = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND pwhash = $2",
      [username,hash]
    );
    
    if (resp.rows.length){        
      log.info('login', "logged in successfully")
      res.json({status: "OK", message:"logged in successfully", data: resp})        
    } else {
      log.error('login', "invalid username or password")
      log.error('login', resp)
      res.json({status: "NOK", message:"invalid username or password", data: resp});
    }
  } catch (err) {
    log.error('login', err)
  }
})

// get user
app.get('/getuser/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

      res.json(user.rows[0]);
  } catch (err) {
    console.error(err)
  }
})


// get teams
app.get('/getallteams', async(req, res)=>{
  try {
    const user = await pool.query("SELECT * FROM teams");

      res.json(user.rows);
  } catch (err) {
    console.error(err)
  }
})


// get matches
app.get('/getallmatches', async(req, res)=>{
  try {
    const matches = await pool.query("SELECT * FROM matches");

    res.json(matches.rows);
  } catch (err) {
    console.error(err)
  }
})

// get all users
app.get('/getallusers', async(req, res)=>{
  try {
    const users = await pool.query("SELECT * FROM users WHERE blocked = false");

      res.json(users.rows);
  } catch (err) {
    console.error(err)
  }
})

// change password
app.put('/changepassword/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const { newpwhash="" } = req.body;

    var hash = crypto.createHash('md5').update(newpwhash).digest('hex');

    const updatePw = await pool.query(
      "UPDATE users SET pwhash = $1 WHERE id = $2",
      [hash, id]
    );

      res.json("Password changed");
  } catch (err) {
    console.error(err)
  }
})

// change data
app.put('/changeuserdata/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const { firstname, lastname, email, username, profilePic } = req.body;

    const updateData = await pool.query(
      "UPDATE users SET firstname = $1, lastname = $2, email = $3, username = $4, profile_pic = $5 WHERE id = $6 RETURNING *",
      [firstname, lastname, email, username, profilePic, id]
    );

      res.json({status: "OK", message:"Andmed muudetud!", data: updateData});
  } catch (err) {
    console.error(err)
  }
})

//update user points
app.put('/updatepoints/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const { user_points } = req.body;

    const updateData = await pool.query(
      "UPDATE users SET user_points = $1 WHERE id = $2 RETURNING *",
      [user_points, id]
    );

      res.json({status: "OK", message:"Salvestatud", data: updateData});
  } catch (err) {
    console.error(err)
  }
})


// save PREDICTIONS
app.post('/savepredictions/:userId', async(req, res) => {
  try {
    const { userId } = req.params;
    // let {username="", pwhash=(new Date()).getTime().toString(15), firstname="", lastname="", email="", social_id="", social_platform="", profile_pic="",} = req.body;
    log.info('test',req.body.scores)
    log.info('test',`userdID: ${userId}`)
    log.info('test',`request body: ${JSON.stringify(req?.body)}`)    
    // const { scores } = req.body;
    // log.info('test',scores)
    let updatedDataArr=[]
    Object.keys(req?.body?.scores).map(async(matchId, row) => {
      log.info('test',"Matches row "+matchId)
      log.info('test',req.body.scores[matchId])
      const resp = await pool.query(
        "SELECT * FROM predictions WHERE userid = $1 AND matchid = $2",
        [userId, matchId]
      );
      if(resp.rows.length){
        log.info('test',"peab updatema")
        log.info('test',`UPDATE predictions SET team1score = ${req.body.scores[matchId][1]}, team2score = ${req.body.scores[matchId][2]} WHERE userid = ${userId} AND matchid = ${matchId}`)
        const updateData = await pool.query(
          "UPDATE predictions SET team1score = $1, team2score = $2 WHERE userid = $3 AND matchid = $4",
          [req.body.scores[matchId][1], req.body.scores[matchId][2], userId, matchId]
        );
        updatedDataArr.push("UPDATED MATCH "+matchId)
      }else{
        log.info('test',"peab uue rea salvestama")
        //kasutajat ei ole veel olemas
        const newInsertion = await pool.query(
          "INSERT INTO predictions (userid, matchid, team1score, team2score) VALUES($1,$2,$3,$4) RETURNING *",
          [userId, matchId, req.body.scores[matchId][1], req.body.scores[matchId][2]]
        );
        updatedDataArr.push(newInsertion)
      }
    })
    res.json({status: "OK", message:"Predictions updated", data: updatedDataArr});
  } catch (err) {
    console.error(err)
  }
})


// save MATCH SCORES
app.post('/savematchscore', async(req, res) => {
  try {
    // const { userId } = req.params;
    // let {username="", pwhash=(new Date()).getTime().toString(15), firstname="", lastname="", email="", social_id="", social_platform="", profile_pic="",} = req.body;
    log.info('test',req.body)
    // log.info('test',`userdID: ${userId}`)
    let reqbody = req.body.matchScores
    log.info('test',reqbody)
    let matchPredictions = {}
    let userScoreChange = {}
    let response = {}
    let counter = 0
    Promise.all(Object.keys(reqbody).map(async(matchid, mapidx) => {
        log.info('test',"mapping reqbody: ")
        log.info('test',reqbody[matchid])
        let saveMatchScore = await pool.query(
          "UPDATE matches SET team1score = $1, team2score = $2 WHERE id = $3",
          [parseInt(reqbody[matchid][1]), parseInt(reqbody[matchid][2]), matchid]
        );
        log.info('test',"set t1s to: "+reqbody[matchid][1]+" AND t2s to: "+reqbody[matchid][2])
        let getMatchPredictions = await pool.query(
          "SELECT * FROM predictions WHERE matchid = $1",
          [matchid]
        );
        matchPredictions[matchid] = getMatchPredictions.rows
        // log.info('test',"got predictions for match "+matchid)
        // log.info('test',getMatchPredictions.rows)
    })).then(()=>{
        log.info('test',"FINISHED saving matches")
        log.info('test',matchPredictions)
        Promise.all(Object.keys(matchPredictions).map(async(matchid) => {
            log.info('test',"MATCHID"+matchid)
            log.info('test',"mapping matchPredictions id: "+ matchid)
            Promise.all(Object.keys(matchPredictions[matchid]).map(async(prediction) => {
              log.info('test',`getting user ${matchPredictions[matchid][prediction].userid} points...`)  
              log.info('test',matchPredictions[matchid][prediction])
                let currentUserPointsresponse = await pool.query(
                  "SELECT user_points FROM users WHERE id = $1",
                  [matchPredictions[matchid][prediction].userid]
                );
                let currentUserPoints = currentUserPointsresponse.rows[0].user_points
                log.info('test',`current user points: ${currentUserPoints}`)
                log.info('test',`-------------------------------------------------------------`)
                // log.info('test',currentUserPoints)
                //POINTS CALCULATING LOGIC
                log.info('test',userScoreChange)
                log.info('test',`userid: ${matchPredictions[matchid][prediction].userid}`)
                log.info('test',`user points atm: ${userScoreChange[matchPredictions[matchid][prediction].userid]}`)
                log.info('test',`checking match: ${matchid}`)
                if(!userScoreChange[matchPredictions[matchid][prediction].userid]){
                  userScoreChange[matchPredictions[matchid][prediction].userid]=currentUserPoints;
                }
                log.info('test',userScoreChange)
                if(parseInt(reqbody[matchid][1]) == parseInt(matchPredictions[matchid][prediction].team1score)
                  && parseInt(reqbody[matchid][2]) == parseInt(matchPredictions[matchid][prediction].team2score)){
                    log.info('test',"EXACT SCORE +3")
                    userScoreChange[matchPredictions[matchid][prediction].userid]=parseInt(userScoreChange[matchPredictions[matchid][prediction].userid])+3
                }else if((parseInt(reqbody[matchid][1]) == parseInt(matchPredictions[matchid][prediction].team1score)
                  && parseInt(reqbody[matchid][2]) != parseInt(matchPredictions[matchid][prediction].team2score))
                  || (parseInt(reqbody[matchid][1]) != parseInt(matchPredictions[matchid][prediction].team1score)
                  && parseInt(reqbody[matchid][2]) == parseInt(matchPredictions[matchid][prediction].team2score))){
                    log.info('test',"NOT EXACT BUT ONE TEAM SCORE MATCHES +1")
                    userScoreChange[matchPredictions[matchid][prediction].userid]=parseInt(userScoreChange[matchPredictions[matchid][prediction].userid])+1
                }else if((parseInt(reqbody[matchid][1]) > parseInt(reqbody[matchid][2])
                  &&  parseInt(matchPredictions[matchid][prediction].team1score) > parseInt(matchPredictions[matchid][prediction].team2score))
                  || (parseInt(reqbody[matchid][1]) < parseInt(reqbody[matchid][2])
                  &&  parseInt(matchPredictions[matchid][prediction].team1score) < parseInt(matchPredictions[matchid][prediction].team2score))
                  || (parseInt(reqbody[matchid][1]) == parseInt(reqbody[matchid][2])
                  &&  parseInt(matchPredictions[matchid][prediction].team1score) == parseInt(matchPredictions[matchid][prediction].team2score))){
                    log.info('test',"NOT EXACT BUT CORRECT WINNER +1")
                    userScoreChange[matchPredictions[matchid][prediction].userid]=parseInt(userScoreChange[matchPredictions[matchid][prediction].userid])+1
                }
            })).then(()=>{
              log.info('test',"FINISHED calculating scores")
              log.info('test',userScoreChange)
              Promise.all(Object.keys(userScoreChange).map(async(userId) => {
                log.info('test',"need to set user:"+ userId+" points to "+userScoreChange[userId])
                if(userScoreChange[userId]){
                  const updateUserPoints = await pool.query(
                    "UPDATE users SET user_points = $1 WHERE id = $2",
                    [userScoreChange[userId], userId]
                  );
                }else{
                  log.info('test',"skipping.")
                }
              })).then(()=>{
                counter += 1
                if(counter == Object.keys(userScoreChange).length){
                  log.info('test',"ALL USERS POINTS ARE UPDATED")
                  res.json({status: "OK", message:"Scores are saved", data: {userScoreChange}});
                }
              })
            })
        })).then(()=>{
        })
    })
  } catch (err) {
    console.error(err)
  }
})



// get user predicitons
app.get('/getuserpredictions/:userId', async(req, res)=>{
  try {
    const { userId } = req.params;
    const predictions = await pool.query("SELECT * FROM predictions WHERE userid = $1",[userId]);

      res.json(predictions.rows);
  } catch (err) {
    console.error(err)
  }
})


// delete password
app.put('/blockuser/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const deleteuser = await pool.query(
      "UPDATE users SET blocked = true WHERE id = $1",
      [id]
    );

      res.json("User blocked");
  } catch (err) {
    console.error(err)
  }
})


export default appserver