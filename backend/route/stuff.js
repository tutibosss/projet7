const express = require('express');
const router = express.Router();
const stuffCrtl = require('../controllers/stuff');

const auth = require('../middelware/auth')
// const multer = require('../middelware/multer-config')

router.post('/post', auth, stuffCrtl.newPost);
router.post('/post/commentaire/:id', auth, stuffCrtl.newCommentaire);
router.put('/commentaire/post/:id', auth, stuffCrtl.modifCommentaire)
router.put('/post/:id', auth, stuffCrtl.modifPost)
router.delete('/commentaire/post/:id', auth, stuffCrtl.deleteCommentaire)
router.get('/post', auth, stuffCrtl.GetAllPost);
router.get('/post/:id', auth, stuffCrtl.GetPost);
router.delete('/post/:id', auth, stuffCrtl.deletePost);
router.delete('/post/all/:id', auth, stuffCrtl.deleteAllPost);


module.exports = router;