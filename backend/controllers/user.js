const db = require('../utils/db/connectDataBase')
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');
const emailCryp = require('../utils/masqueEmail')

exports.signup = (req, res) => {
    const email = emailCryp.crypte(req.body.email)
    const sql = "SELECT email FROM user WHERE email = ?";
    
    db.query(sql, email, async (error,result) => {
        if(error) return res.status(400).json("Une erreur s'est produite");
        if(result.length > 0){
            return res.status(400).json("Email de l'utilisateur existe déja")
        }
        const password = await bcrypt.hash(req.body.password, 10)
        const user = {
            userName: req.body.userName,
            email: email,
            password: password
        }
        const SQL = 'INSERT INTO user SET ?'
        db.query(SQL, user, (error, result) =>{
            if(error) return res.status(400).json("Une erreur s'est produite");
            return res.status(200).json('Utilisateur créé')
        })
    })

}

exports.login = async (req, res) => {

    const email = emailCryp.crypte(req.body.email)

    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, email, (error,result)=>{

        if(error) return res.status(400).json("Une erreur s'est produite");

        if(result.length < 1){
            return res.status(400).json('Utilisateur non trouvé')
        }

        const user = result[0]
        
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json('Mauvais mot de passe')
                }
                if(user.admin === 'true'){
                    return res.status(200).json({
                        userId: user.id,
                        userName: user.userName,
                        token: token.sign(
                            {userId: user.id, admin: true},
                            process.env.DB_token,
                            {expiresIn: '24h'}
                        )
                    });
                }else{
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