const multer = require ('multer');
const storage = multer.diskStorage({
    destination:(req, file, calback) => {
        calback(null, '../front-end/groupomania/src/image')
    },
    filename: (req, file, callback) => {
        console.log('cbn')
        const name = file.originalname.split(' ').join('_');
        callback(null,Date.now() + name );
      }
});

module.exports = multer({storage: storage}).single('image');