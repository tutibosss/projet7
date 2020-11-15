const db = require('../middelware/db')
const fs = require('fs');
const { json } = require('body-parser');

exports.newPost = (req, res) => {
    let comment = []
    comment = JSON.stringify(comment)
    console.log(comment)
    const sql = 'INSERT INTO post SET ?'
    const value = {
        userId: req.body.userId,
        userName: req.body.userName,
        titrePost: req.body.titrePost,
        post: req.body.post,
        commentaire: comment
    }
    db.query(sql, value, (error,result) => {
        if(error) throw error;
        return res.status(200).json({message: 'post créé'})
    })
}

exports.newCommentaire = (req, res) =>{
    const idPost = req.params.id
    console.log(idPost)
    console.log('cbn')
    const sql = 'SELECT commentaire FROM post WHERE id = ?'
    db.query(sql, idPost, (error, result) =>{
        if(error) throw error;
        const array = JSON.parse(result[0].commentaire)
        array.push(req.body)
        console.log(array)
        const update ="'"+JSON.stringify(array)+"'"
        const SQL = 'UPDATE post SET commentaire=' +update+ ' WHERE id = ?'
        console.log(SQL)
        db.query(SQL, idPost, (error, result) => {
            if(error) throw error;
            return res.status(200).json({message: 'ajout du commentaire'})
        })
    })
}

exports.modifCommentaire = (req, res) => {
    console.log(req.body)
    const postId = req.params.id
    const sql = 'SELECT commentaire FROM post WHERE id= ?'
    db.query(sql, postId, (error, result) => {
        if(error) return res.status(400).json('une erreur c est produite');
        let commentaire = JSON.parse(result[0].commentaire)
        console.log(commentaire)
        commentaire[req.body.index].commentaire = req.body.newCommentaire
        console.log(commentaire)
        const update = JSON.stringify(commentaire)
        const SQL = "UPDATE post SET commentaire = '" + update + "' WHERE id = ?"
        db.query(SQL, postId, (error ,result) => {
            if(error) return res.status(400).json('une erreur c est produite');
            res.status(200).json('modification effectuer')
        })
    })
}


exports.modifPost = (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    const sql = "UPDATE post SET titrePost = '"+req.body.titrePost+"', post = '"+req.body.post+"' WHERE id = ?"
    db.query(sql, req.params.id, (error, result) => {
        if(error) return res.status(400).json('une erreur c est produit')
        res.status(200).json('votre mise a jour a bien etait effectuer')
    })
}

exports.GetAllPost = (req, res) => {
    const sql = 'SELECT * FROM post'
    db.query(sql, (error,result) =>{
        if(error) throw error;
        // const post = result.reverse()
        return res.status(200).json(result)
    })
}

exports.GetPost = (req, res) => {
    console.log("cbn")
    const idPost = req.params.id
    const sql = 'SELECT * FROM post WHERE id = ?'
    db.query(sql, idPost, (error, result) => {
        if(error) throw errow;
        result[0].commentaire = JSON.parse(result[0].commentaire)
        return res.status(200).json(result[0])
    })
}

exports.deletePost = (req, res) =>{
    const postId = req.params.id
    const sql = 'DELETE FROM post WHERE id = ?'
    db.query(sql, postId, (error, result) => {
        if(error) return res.status(400).json('un probleme et survenue veuille retanter plus tard');
        return res.status(200).json('post suprimer')
    })
}

exports.deleteAllPost = async (req, res) => {
        console.log('delete')
        const user = req.params.id
        const sql = 'DELETE FROM post WHERE userId = ?'
        db.query(sql, user, (error, result) => {
            if(error) return res.status(400).json('une erreur c est produite');
            res.status(200).json({message: 'les post on bien etait suprime'})
        })
}

exports.deleteCommentaire = async (req, res) => {
    const postId = req.params.id
    const sql = 'SELECT commentaire FROM post WHERE id= ?'
    db.query(sql, postId, (error, result) => {
        if(error) return res.status(400).json('une erreur c est produite');
        let commentaire = JSON.parse(result[0].commentaire)
        console.log(commentaire)

        
        const modifTableau = () => {
            console.log(req.body.index)
            commentaire.splice(req.body.index , 1)
            return commentaire
        }

        const update = modifTableau()

        const Update ="'"+JSON.stringify(update)+"'"
        const SQL = 'UPDATE post SET commentaire=' +Update+ ' WHERE id = ?'

        db.query(SQL, postId, (error, result) => {
            if(error) return res.status(400).json('une erreur c est produite');
            res.status(200).json('le commentaire et bien suprimer')
        })
    })
}