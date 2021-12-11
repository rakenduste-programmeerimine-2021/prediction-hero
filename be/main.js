var express = require('express');
var app = express();
var http = require('http').createServer(app);
var cors = require('cors')
var pool = require('./db')
var crypto = require('crypto');

const port = 3001;

var log = require('./log.js');
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


// ===========================================================================================================================================================

// sign up
app.post('/signup', async(req, res) => {
  try {
    let {username, pwhash, firstname="", lastname="", email="", social_id="", social_platform="", profile_pic="",} = req.body;
    console.log(req.body)

    username = username == "" ? "olityhi" : username

    var hash = crypto.createHash('md5').update(pwhash).digest('hex');
    console.log(`${pwhash} - ${hash}`);
    log.info('',`${pwhash} - ${hash}`)

    const newInsertion = await pool.query(
      "INSERT INTO users (username, pwhash, firstname, lastname, email, social_id, social_platform, profile_pic) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [username,hash, firstname, lastname, email, social_id, social_platform, profile_pic]
    );

      res.json(newInsertion.rows[0]);
  } catch (err) {
    console.error(err)
  }
})

app.post('/loginFB', async(req, res) => {
  try {
    let {username="", pwhash=(new Date()).getTime().toString(15), firstname="", lastname="", email="", social_id="", social_platform="", profile_pic="",} = req.body;
    console.log(req.body)

    // username == "" ? res.json({status: "NOK", message:"Kasutajanimi on kohustuslik", data: resp})  : username

    var hash = crypto.createHash('md5').update(pwhash).digest('hex');
    console.log(`${pwhash} - ${hash}`);
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
    const {username, pwhash} = req.body;
    console.log(req.body)

    var hash = crypto.createHash('md5').update(pwhash).digest('hex');
    console.log(`${pwhash} - ${hash}`);

    const resp = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND pwhash = $2",
      [username,hash]
    );

    resp.rows.length 
      ? res.json({status: "OK", message:"logged in successfully", data: resp}) 
      : res.json({status: "NOK", message:"invalid username or password", data: resp});
      
  } catch (err) {
    console.error(err)
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
    const users = await pool.query("SELECT * FROM users");

      res.json(users.rows);
  } catch (err) {
    console.error(err)
  }
})

// change password
app.put('/changepassword/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const { newpwhash } = req.body;

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

      res.json({status: "OK", message:"Data updated", data: updateData});
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

      res.json({status: "OK", message:"Data updated", data: updateData});
  } catch (err) {
    console.error(err)
  }
})


// save PREDICTIONS
app.post('/savepredictions/:userId', async(req, res) => {
  try {

    const { userId } = req.params;
    // let {username="", pwhash=(new Date()).getTime().toString(15), firstname="", lastname="", email="", social_id="", social_platform="", profile_pic="",} = req.body;
    console.log(req.body.scores)
    console.log(`userdID: ${userId}`)

    let updatedDataArr=[]
    Object.keys(req.body.scores).map(async(matchId, row) => {
      console.log("Matches row "+matchId)
      console.log(req.body.scores[matchId])

      const resp = await pool.query(
        "SELECT * FROM predictions WHERE userid = $1 AND matchid = $2",
        [userId, matchId]
      );

      if(resp.rows.length){
        console.log("peab updatema")
        console.log(`UPDATE predictions SET team1score = ${req.body.scores[matchId][1]}, team2score = ${req.body.scores[matchId][2]} WHERE userid = ${userId} AND matchid = ${matchId}`)
        const updateData = await pool.query(
          "UPDATE predictions SET team1score = $1, team2score = $2 WHERE userid = $3 AND matchid = $4",
          [req.body.scores[matchId][1], req.body.scores[matchId][2], userId, matchId]
        );
        updatedDataArr.push("UPDATED MATCH "+matchId)
      }else{

        console.log("peab uue rea salvestama")
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
app.delete('/deleteuser/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const deleteuser = await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

      res.json("User deleted");
  } catch (err) {
    console.error(err)
  }
})



http.listen(port, () => {
  console.log(`HERO server jookseb pordil ${port}`);
  log.info('SERVER_STARTED',`HERO server started on port ${port}`)

});