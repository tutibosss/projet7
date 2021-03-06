const express = require('express');
const multer = require('../middleware/multer-config');
const router = express.Router();

const profilCtrl = require('../controllers/profil')

const auth = require('../middleware/auth')

router.get('/:id', auth, profilCtrl.getUser)
router.get('/post/:id', auth, profilCtrl.getPost)
router.delete('/:id', auth, profilCtrl.deleteUser)
router.put('/:id', auth, multer, profilCtrl.modifProfil)

module.exports = router