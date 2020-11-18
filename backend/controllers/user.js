const db = require('../middelware/db/connectDataBase')
const bcrypte = require('bcrypt');
const token = require('jsonwebtoken');
const emailCryp = require('../middelware/masqueEmail')

exports.signup = (req, res) => {
    const email = emailCryp.crypte(req.body.email)
    const sql = "SELECT email FROM user WHERE email = ?";
    
    db.query(sql, email, async (error,result) => {
        if(error) return res.status(400).json('erreur interne veuille retente plus tard');
        if(result.length > 0){
            return res.status(400).json("email de l'utilisateur existe déja")
        }
        const password = await bcrypte.hash(req.body.password, 10)
        const user = {
            userName: req.body.userName,
            email: email,
            password: password
        }
        const SQL = 'INSERT INTO user SET ?'
        db.query(SQL, user, (error, result) =>{
            if(error) return res.status(400).json('erreur interne veuille retente plus tard');
            return res.status(200).json('utilisateur cree')
        })
    })

}

exports.login = async (req, res) => {

    const email = emailCryp.crypte(req.body.email)

    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, email, (error,result)=>{

        if(error) return res.status(400).json('erreur interne veuille retente plus tard');

        if(result.length < 1){
            return res.status(400).json('utilisateur non trouve')
        }

        const user = result[0]
        console.log(user.admin)
        
        bcrypte.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json('mauvais mot de passe')
                }
                console.log(user.admin)
                if(user.admin === 'true'){
                    console.log('admin')
                    return res.status(200).json({
                        userId: user.id,
                        userName: user.userName,
                        admin: true,
                        token: token.sign(
                            {userId: user.id, admin: true},
                            process.env.DB_token,
                            {expiresIn: '24h'}
                        )
                    });
                }else{
                    console.log("pas admin")
                    res.status(200).json({
                        userId: user.id,
                        userName: user.userName,
                        token: token.sign(
                            {userId: user.id},
                            process.env.DB_token,
                            {expiresIn: '24h'}
                        )
                    });
                }
            })
    })
}