const express = require('express');
const router = express.Router();

// const profilCtrl = require('../controllers/profil')
const stuffCtrl = require('../controllers/stuff')
const adminCtrl = require('../controllers/admin')

const auth = require('../middelware/authAdmin');

router.delete('/post/:id', auth, stuffCtrl.deletePost)
router.get('/user/:value', auth, adminCtrl.getUser)
router.put('/user/status', auth, adminCtrl.putStatus)
router.put('/post/:id', auth, stuffCtrl.modifPost)
router.delete('/commentaire/post/:id', auth, stuffCtrl.deleteCommentaire)
router.put('/commentaire/post/:id', auth, stuffCtrl.modifCommentaire)

module.exports = router