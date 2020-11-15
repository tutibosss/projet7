const express = require('express');
const router = express.Router();

// const profilCtrl = require('../controllers/profil')
const stuffCtrl = require('../controllers/stuff')

const authAdmin = require('../middelware/authAdmin');

router.delete('/post/:id', authAdmin, stuffCtrl.deletePost)

module.exports = router