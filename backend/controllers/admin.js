const db = require('../middelware/db/connectDataBase')

exports.getUser = (req, res) => {
    const sql = 'SELECT userName, email, id, admin FROM user WHERE admin = ?'
    const value = req.params.value
    db.query(sql, value, (error,result) => {
        if(error) return res.status(400).json('une erreur c est produite ')
        res.status(200).json(result)
    })
}

exports.putStatus = (req, res) => {
    const update = JSON.stringify(req.body.status)
    console.log(req.body)
    console.log(update)
    const sql = "UPDATE user SET admin = ? WHERE id = ?"
    console.log(sql)
    db.query(sql, [update, req.body.userId], (error,result) => {
        console.log(error)
        if(error) return res.status(400).json('une erreur c est produite ')
        console.log(result)
        res.status(200).json("les droit de lutilisateur on etait modifier")
    })
}