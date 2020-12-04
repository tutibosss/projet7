const db = require('../utils/db/connectDataBase')
const bcrypt = require('bcrypt')
const emailCrypt = require('../utils/masqueEmail')

exports.getUser = (req, res) => {
    const userId = req.params.id
    const sql = 'SELECT email, userName, fileName, admin FROM user WHERE id = ?'
    db.query(sql, userId, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite")
        result[0].email = emailCrypt.decrypte(result[0].email)
        res.status(200).json(result[0])
    })
}

exports.getPost = (req, res) => {
    const userId = req.params.id
    const sql = 'SELECT * FROM post WHERE userId = ? ORDER BY id DESC'
    db.query(sql, userId, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite")
        res.status(200).json(result)
    })
}

exports.deleteUser = (req, res) => {
    const user = req.params.id
    const sql = 'DELETE FROM user WHERE id = ?'
    db.query(sql, user, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite")
        res.status(200).json({message: 'Utilisateur supprimé'}) 
    })
}

exports.modifProfil = async (req, res) => {
    const update = req.file ? 
    {
        ...JSON.parse(req.body.profil),
        fileName: req.file.filename
    } : {...req.body}

    const user = update.userId

    delete update.userId
    update.email = emailCrypt.crypte(update.email)
    
    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, update.email, (error,result) => {

        const fileName = result[0].fileName
        if(error) return res.status(400).json("Une erreur s'est produite")
        
        if(result.length != 0 && result[0].id != user) return res.status(400).json("Votre adresse mail est utilisée sur un autre compte")

        if(update.holdPassword){

            const sql = 'SELECT password FROM user WHERE id = ?'
            db.query(sql, user, async (error, result) => {
                if(error) return res.status(400).json("Une erreur s'est produite")

                const rep = await bcrypt.compare(update.holdPassword, result[0].password)
                if(!rep) return res.status(400).json("Votre ancien mot de passe est incorrect")

                const password = await bcrypt.hash(update.newPassword, 10)
                
                delete update.holdPassword
                delete update.newPassword
                update.password = password
    
                const sql = 'UPDATE user SET ? WHERE id = ?'
                
                db.query(sql,[update, user], (error, result) => {
                    if(error) return res.status(400).json("Une erreur s'est produite")
                    res.status(200).json("La modification à été effectué et mot de passe est changé")
                })
            })
        }else{
            const sql = 'UPDATE user SET ? WHERE id = ?'
            db.query(sql,[update, user], (error, result) => {
                if(error) return res.status(400).json("Une erreur s'est produite")
                res.status(200).json('La modification à été effectué')
            })
        }

    })
}