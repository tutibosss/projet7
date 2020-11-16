const express = require('express');
const router = express.Router();

// const profilCtrl = require('../controllers/profil')
const stuffCtrl = require('../controllers/stuff')
const adminCtrl = require('../controllers/admin')

const auth = require('../middelware/authAdmin');

router.delete('/post/:id', auth, stuffCtrl.deletePost)
router.get('/user/:value', auth, adminCtrl.getUser)
router.put('/user/status', auth, adminCtrl.putStatus)

module.exports = router