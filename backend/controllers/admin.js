const db = require('../middelware/db')

exports.getUser = (req, res) => {
    const sql = 'SELECT userName, email, id, admin FROM user WHERE admin = ?'
    const value = req.params.value
    console.log(value)
    db.query(sql, value, (error,result) => {
        if(error) return res.status(400).json('une erreur c est produite ')
        console.log(result)
        res.status(200).json(result)
    })
}

exports.putStatus = (req, res) => {
    const update = JSON.stringify(req.body.status)
    console.log(req.body.status)
    const sql = "UPDATE user SET admin = '"+update+"' WHERE id = ?"
    db.query(sql, req.body.userId, (error,result) => {
        if(error) return res.status(400).json('une erreur c est produite ')
        console.log(result)
        res.status(200).json("les droit de lutilisateur on etait modifier")
    })
}