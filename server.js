const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/Register');
const signin = require('./Controllers/signIn');
const profile = require('./Controllers/Profile');
const image = require('./Controllers/Image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'umami17',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());


//ROOT
app.get('/', (req, res) => {
	res.send('the server is working');
});

//SIGNIN
//Uses dependency injection to pass bcrypt to signIn.js
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

//REGISTER
//Uses dependency injection to pass bcrypt and db to Register.js
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

//PROFILE
//Uses dependency injection to pass db to Profile.js
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

//IMAGE
//Uses dependency injection to pass db to Image.js
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });


app.listen((process.env.PORT || 3001), () => {
	console.log(`app is running on port ${process.env.PORT}`)
});
