const db = require('../utils/db/connectDataBase')

exports.newPost = (req, res) => {
    const SQL = 'SELECT fileName FROM user WHERE id = ?'
    db.query(SQL, req.body.userId, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite")
        let comment = []
        comment = JSON.stringify(comment)
        const sql = 'INSERT INTO post SET ?'
        const value = {
            userId: req.body.userId,
            fileName: result[0].fileName,
            userName: req.body.userName,
            titrePost: req.body.titrePost,
            post: req.body.post,
            commentaire: comment
        }
        db.query(sql, value, (error,result) => {
            if(error) return res.status(400).json("Une erreur s'est produite");
            return res.status(200).json('Post créé')
        })
    })
}

exports.newCommentaire = (req, res) =>{
    const Sql = 'SELECT fileName FROM user WHERE id = ?'
    db.query(Sql, req.body.userId, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite")
        const filename = result[0].fileName
        const idPost = req.params.id
        const sql = 'SELECT commentaire FROM post WHERE id = ?'
    
        db.query(sql, idPost, (error, result) =>{
    
            if(error) return res.status(400).json("Une erreur s'est produite");
            
            const array = JSON.parse(result[0].commentaire)
            array.push({...req.body, fileName : filename})
    
            const update = JSON.stringify(array)
    
            const SQL = 'UPDATE post SET commentaire = ? WHERE id = ?'
            db.query(SQL, [update, idPost], (error, result) => {
                if(error) return res.status(400).json("Une erreur s'est produite");
                return res.status(200).json({message: 'Ajout du commentaire'})
            })
        })
    })
}

exports.modifCommentaire = (req, res) => {
    const postId = req.params.id

    const sql = 'SELECT commentaire FROM post WHERE id= ?'
    db.query(sql, postId, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite");

        let commentaire = JSON.parse(result[0].commentaire)
        commentaire[req.body.index].commentaire =  req.body.newCommentaire
        
        const update = JSON.stringify(commentaire)
        const SQL = "UPDATE post SET commentaire = ? WHERE id = ?"
        db.query(SQL, [update ,postId], (error ,result) => {
            if(error) return res.status(400).json("Une erreur s'est produite");
            res.status(200).json('La modification à été effectué')
        })
    })
}


exports.modifPost = (req, res) => {
    const sql = "UPDATE post SET ? WHERE id = ?"
    db.query(sql, [req.body, req.params.id], (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite")
        res.status(200).json("Votre mise à jour a bien été effectué")
    })
}

exports.GetAllPost = (req, res) => {
    const sql = 'SELECT * FROM post ORDER BY id DESC'
    db.query(sql, (error,result) =>{
        if(error) return res.status(400).json("Une erreur s'est produite");
        return res.status(200).json(result)
    })
}

exports.GetPost = (req, res) => {
    const idPost = req.params.id
    const sql = 'SELECT * FROM post WHERE id = ?'
    db.query(sql, idPost, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite");
        result[0].commentaire = JSON.parse(result[0].commentaire)
        return res.status(200).json(result[0])
    })
}

exports.deletePost = (req, res) =>{
    const postId = req.params.id
    const sql = 'DELETE FROM post WHERE id = ?'
    db.query(sql, postId, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite");
        return res.status(200).json('Post supprimé')
    })
}

exports.deleteAllPost = async (req, res) => {
        const user = req.params.id
        const sql = 'DELETE FROM post WHERE userId = ?'
        db.query(sql, user, (error, result) => {
            if(error) return res.status(400).json("Une erreur s'est produite");
            res.status(200).json('Les posts ont bien été supprimé')
        })
}

exports.deleteCommentaire = async (req, res) => {
    const postId = req.params.id
    const sql = 'SELECT commentaire FROM post WHERE id= ?'
    db.query(sql, postId, (error, result) => {
        if(error) return res.status(400).json("Une erreur s'est produite");
        let commentaire = JSON.parse(result[0].commentaire)

        commentaire.splice(req.body.index , 1)
        const update = JSON.stringify(commentaire)

        const SQL = 'UPDATE post SET commentaire = ? WHERE id = ?'

        db.query(SQL, [update, postId], (error, result) => {
            if(error) return res.status(400).json("Une erreur s'est produite");
            res.status(200).json("Le commentaire est bien supprimé")
        })
    })
}