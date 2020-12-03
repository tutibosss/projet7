const db = require('../utils/db/connectDataBase')
const emailCrypte = require('../utils/masqueEmail')

exports.getUser = async (req, res) => {
    const sql = 'SELECT userName, email, id, admin, fileName FROM user WHERE admin = ?'
    const value = req.params.value
    db.query(sql, value, (error,result) => {
        if(error) return res.status(400).json("Une erreur s'est produite")
        
        let tableaux = result

        for(let i = 0; i < tableaux.length; i++){
            tableaux[i].email = emailCrypte.decrypte(tableaux[i].email)
        }
        res.status(200).json(tableaux)
    })
}

exports.putStatus = (req, res) => {
    const update = JSON.stringify(req.body.status)
    const sql = "UPDATE user SET admin = ? WHERE id = ?"
    db.query(sql, [update, req.body.userId], (error,result) => {
        if(error) return res.status(400).json("Une erreur s'est produite")
        res.status(200).json("Les droits de l'utilisateur ont été modifié")
    })
}