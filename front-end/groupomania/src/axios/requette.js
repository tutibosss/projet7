const axios = require('./config') 

exports.login = (body) => {return axios('POST','auth/login', body)}

exports.signup = (body) => {return axios('POST','auth/signup', body)}

exports.getAllPost = () => {return axios('GET', 'post')}

exports.getPostId = (postId) => {return axios('GET', 'post/'+ postId)}

exports.getAllPostId = (userId) => {return axios('GET', 'profil/post/'+userId)}

exports.deletePost = (postId) => {return axios('DELETE', 'post/'+postId)}

exports.newPost = (body) => {return axios('POST', 'post', body)}

exports.pushComment = (postId, body) => {return axios('POST', 'post/commentaire/'+postId, body)}

exports.getUser = (userId) => {return axios('GET', 'profil/'+userId)}

exports.deleteUser = (userId) => {return axios('DELETE', 'profil/'+ userId)}

exports.deleteUserPostAll = (userId) => {return axios('DELETE', 'post/all/'+ userId)}

exports.putProfil = (userId, body) => {return axios('PUT', 'profil/'+ userId, body)}

exports.deleteCommentaire = (postId, body) => {return axios('DELETE', 'commentaire/post/'+ postId, body)}

exports.modifCommentaire = (postId, body) => {return axios('PUT', 'commentaire/post/'+ postId, body)}

exports.modifPost = (postId, body) => {return axios('PUT', 'post/'+ postId, body)}