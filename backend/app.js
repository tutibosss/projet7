require('dotenv').config({path: './.env'})
require('./utils/db/CreateDataBase')

const express = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const userRoute = require('./route/user');
const stuffRoute = require('./route/stuff');
const profilRoute = require('./route/profil');
const adminRoute = require('./route/admin')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(helmet());

app.use(bodyParse.json());

app.use('/images', express.static(path.join(__dirname, 'image')));

app.use('/api/auth', userRoute);
app.use('/api', stuffRoute);
app.use('/api/profil', profilRoute);
app.use('/api/admin', adminRoute)

module.exports = app;