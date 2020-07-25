const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "   ",
    database: "smartbrain",
  },
});

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

//signin
app.post("/signin", signin.handleSignin( db, bcrypt));

//register
app.post("/register",(req, res)=> {register.handleRegister(req, res, db, bcrypt)});

//get by id
app.get("/profile/:id", (req, res)=>{profile.handleProfileGet(req, res, db)});

app.put("/image",(req, res)=>{image.handleImage(req, res, db)});
app.post("/imageUrl",(req, res)=>{image.handleApiCall(req, res)});


app.listen(4000, () => {
  console.log('app is running on port 4000');
});
