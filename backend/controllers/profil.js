const db = require('../middelware/db/connectDataBase')
const bcrypte = require('bcrypt')

exports.getUser = (req, res) => {
    const userId = req.params.id
    const sql = 'SELECT * FROM user WHERE id = ?'
    db.query(sql, userId, (error, result) => {
        if(error) throw error;
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
        if(error) throw error;
        res.status(200).json(result)
    })
}

exports.deleteUser = (req, res) => {
    console.log('ctoutbon')
    const user = req.params.id
    console.log(user)
    const sql = 'DELETE FROM user WHERE id = ?'
    db.query(sql, user, (error, result) => {
        if(error) throw error;
        res.status(200).json({message: 'utilisarteur suprimer'}) 
    })
}

exports.modifProfil = async (req, res) => {
    
    const user = req.body.userId
  
    const queryUpdate = (sql) => {
        db.query(sql, user, (error, result) => {
            if(error) return res.status(400).json('une erreur ses produit veuille re essaye plus tard')
            return res.status(200).json('la modification a ete effectuer')

        })
    }
    
    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, req.body.email, (error,result) => {

        if(error) return res.status(400).json('une erreur ses produit veuille re essaye plus tard')
        
        if(result.length != 0 && result[0].id != user) return res.status(400).json('votre adress mail et utilise sur un autre compte')

        let sqlUpdate = 'userName = '+ "'"+req.body.userName+"'" + ', email = '+ "'"+req.body.email+"'"

        if(req.body.holdPassword != undefined){

            //si il y a un mot de passe
            const sql = 'SELECT password FROM user WHERE id = ?'
            db.query(sql, user, async (error, result) => {
                if(error) return res.status(400).json('une erreur seveur veuille essaye plus tard')
                const rep = await bcrypte.compare(req.body.holdPassword, result[0].password)
                if(!rep) return res.status(400).json('votre ancient mot de passe et incorecte')

                const password = await bcrypte.hash(req.body.newPassword, 10)
                sqlUpdate = sqlUpdate + ', password = ' +"'"+ password+"'"
    
                const sql = 'UPDATE user SET '+sqlUpdate+ ' WHERE id = ?'
                queryUpdate(sql)
            })
        }else{
            //si il n'y a pas le mot de passe
            const sql = 'UPDATE user SET '+sqlUpdate+ ' WHERE id = ?'
            queryUpdate(sql)
        }
    })
}