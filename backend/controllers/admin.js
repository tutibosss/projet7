const db = require('../middelware/db/connectDataBase')
const emailCrypte = require('../middelware/masqueEmail')

exports.getUser = async (req, res) => {
    const sql = 'SELECT userName, email, id, admin, fileName FROM user WHERE admin = ?'
    const value = req.params.value
    db.query(sql, value, (error,result) => {
        if(error) return res.status(400).json('une erreur c est produite ')
        
        let tableau = result

        for(let i = 0; i < tableau.length; i++){
            tableau[i].email = emailCrypte.decrypte(tableau[i].email)
        }
        res.status(200).json(tableau)
    })
}

exports.putStatus = (req, res) => {
    const update = JSON.stringify(req.body.status)
    const sql = "UPDATE user SET admin = ? WHERE id = ?"
    db.query(sql, [update, req.body.userId], (error,result) => {
        if(error) return res.status(400).json('une erreur c est produite ')
        res.status(200).json("les droit de lutilisateur on etait modifier")
    })
}