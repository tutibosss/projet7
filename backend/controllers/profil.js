const db = require('../middelware/db/connectDataBase')
const bcrypte = require('bcrypt')

exports.getUser = (req, res) => {
    const userId = req.params.id
    const sql = 'SELECT * FROM user WHERE id = ?'
    db.query(sql, userId, (error, result) => {
        if(error) return res.status(400).json('une erreur ses produit veuille re essaye plus tard')
        const rep = {
            userName : result[0].userName,
            email: result[0].email
        }
        res.status(200).json(rep)
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
    
    const user = req.body.userId

    delete req.body.userId
    
    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, req.body.email, (error,result) => {

        if(error) return res.status(400).json('une erreur ses produit veuille re essaye plus tard')
        
        if(result.length != 0 && result[0].id != user) return res.status(400).json('votre adress mail et utilise sur un autre compte')

        if(req.body.holdPassword != undefined){

            //si il y a un mot de passe
            const sql = 'SELECT password FROM user WHERE id = ?'
            db.query(sql, user, async (error, result) => {
                if(error) return res.status(400).json('une erreur seveur veuille essaye plus tard')

                const rep = await bcrypte.compare(req.body.holdPassword, result[0].password)
                if(!rep) return res.status(400).json('votre ancient mot de passe et incorecte')

                const password = await bcrypte.hash(req.body.newPassword, 10)
                
                delete req.body.holdPassword
                delete req.body.newPassword
                req.body.password = password
                console.log(req.body)
    
                const sql = 'UPDATE user SET ? WHERE id = ?'
                
                db.query(sql,[req.body, user], (error, result) => {
                    if(error) return res.status(400).json("une erreur c'est produite")
                    res.status(200).json('la modification a etait effectuer et le mot de passe et change')
                })
            })
        }else{
            //si il n'y a pas le mot de passe
            const sql = 'UPDATE user SET ? WHERE id = ?'
            db.query(sql,[req.body, user], (error, result) => {
                if(error) return res.status(400).json("une erreur c'est produite")
                res.status(200).json('la modification a etait effectuer et le mot de passe et change')
            })
        }
    })
}