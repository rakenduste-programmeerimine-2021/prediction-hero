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

app.get('/', (req, res) => {
    res.send("OK - toimib !!!");
});
app.get('/test',async(req,res)=>{
  res.json({data: "Greetings from node.js"});
})

// ===========================================================================================================================================================

// sign up
// TODO pw peaks frontist liikuma juba hashitult nodesse
// TODO check, et sellist kasutjat juba ei oleks, kui on siis tagasta viga nt kujul {status: "NOK", message: "Sellise nimega kasutaja on juba registreeritud."}
app.post('/signup', async(req, res) => {
  try {
    const {username, pwhash} = req.body;
    console.log(req.body)

    var hash = crypto.createHash('md5').update(pwhash).digest('hex');
    console.log(`${pwhash} - ${hash}`);
    log.info('',`${pwhash} - ${hash}`)

    const newInsertion = await pool.query(
      "INSERT INTO users (username, pwhash) VALUES($1,$2) RETURNING *",
      [username,hash]
    );

      res.json(newInsertion.rows[0]);
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
      ? res.json({status: "OK", message:"logged in successfully"}) 
      : res.json({status: "NOK", message:"invalid username or password"});
      
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

// get all users (debugging)
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


// change password
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


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

http.listen(port, () => {
  console.log(`HERO server jookseb pordil ${port}`);
  log.info('SERVER_STARTED',`HERO server started on port ${port}`)

});