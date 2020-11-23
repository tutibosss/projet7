const db = require('../middelware/db/connectDataBase')
const bcrypte = require('bcrypt')
const emailCrypt = require('../middelware/masqueEmail')
const fs = require('fs');

exports.getUser = (req, res) => {
    const userId = req.params.id
    const sql = 'SELECT email, userName, fileName, admin FROM user WHERE id = ?'
    db.query(sql, userId, (error, result) => {
        if(error) return res.status(400).json('une erreur ses produit veuille re essaye plus tard')
        result[0].email = emailCrypt.decrypte(result[0].email)
        res.status(200).json(result[0])
    })
}

exports.getPost = (req, res) => {
    const userId = req.params.id
    const sql = 'SELECT * FROM post WHERE userId = ? ORDER BY id DESC'
    db.query(sql, userId, (error, result) => {
        if(error) return res.status(400).json('une erreur ses produit veuille re essaye plus tard')
        res.status(200).json(result)
    })
}

exports.deleteUser = (req, res) => {
    const user = req.params.id
    const sql = 'DELETE FROM user WHERE id = ?'
    db.query(sql, user, (error, result) => {
        if(error) return res.status(400).json('une erreur ses produit veuille re essaye plus tard')
        res.status(200).json({message: 'utilisarteur suprimer'}) 
    })
}

exports.modifProfil = async (req, res) => {
    const update = req.file ? 
    {
        ...JSON.parse(req.body.profil),
        fileName: req.file.filename
    } : {...req.body}

    const deletFile = (repFile) =>{
        if(req.file && repFile != 'pictureUserDefault.png'){
            console.log('suprime')
            fs.unlink('../front-end/groupomania/src/image/' + repFile, (err) => {
                if(err) return res.status(400).json('une erreur est survenue')
            })
        }
    }

    const user = update.userId

    delete update.userId
    update.email = emailCrypt.crypte(update.email)
    
    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, update.email, (error,result) => {

        const fileName = result[0].fileName
        console.log(fileName)

        if(error) return res.status(400).json('une erreur ses produit veuille re essaye plus tard')
        
        if(result.length != 0 && result[0].id != user) return res.status(400).json('votre adress mail et utilise sur un autre compte')

        if(update.holdPassword){

            //si il y a un mot de passe
            const sql = 'SELECT password FROM user WHERE id = ?'
            db.query(sql, user, async (error, result) => {
                if(error) return res.status(400).json('une erreur seveur veuille essaye plus tard')

                const rep = await bcrypte.compare(update.holdPassword, result[0].password)
                if(!rep) return res.status(400).json('votre ancient mot de passe et incorecte')

                const password = await bcrypte.hash(update.newPassword, 10)
                
                delete update.holdPassword
                delete update.newPassword
                update.password = password
                console.log(update)
    
                const sql = 'UPDATE user SET ? WHERE id = ?'
                
                db.query(sql,[update, user], (error, result) => {
                    if(error) return res.status(400).json("une erreur c'est produite")
                    deletFile(fileName)
                    res.status(200).json('la modification a etait effectuer et le mot de passe et change')
                })
            })
        }else{
            //si il n'y a pas le mot de passe
            const sql = 'UPDATE user SET ? WHERE id = ?'
            console.log(update)
            db.query(sql,[update, user], (error, result) => {
                if(error) return res.status(400).json("une erreur c'est produite")
                res.status(200).json('la modification a etait effectuer')
                deletFile(fileName)
            })
        }

    })
}