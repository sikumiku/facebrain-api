const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'sigridaasma',
        password : '',
        database : 'smart-brain'
    }
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json('success')
})

// since we have chained functions, the req res can be left out and handled in handleSignin function
app.post('/signin', signin.handleSignin(postgres, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, postgres, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgres) });

app.put('/image', (req, res) => { image.handleImage(req, res, postgres) });

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT, () => {
    console.log(`app running on port ${process.env.PORT}`)
})
