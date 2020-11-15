exports.login = async (user) => {
    const reponse = await fetch('http://localhost:3000/api/auth/login',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.signup = async (user) => {
    const reponse = await fetch('http://localhost:3000/api/auth/signup',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.getAllPost = async (token) => {
    const reponse = await fetch('http://localhost:3000/api/post',{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.getPostId = async (token, postId) => {
    const reponse = await fetch('http://localhost:3000/api/post/'+postId,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.getAllPostId = async (token, userId) => {
    const reponse = await fetch('http://localhost:3000/api/profil/post/'+userId ,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    if(reponse.ok){
        const User = await reponse.json()
        console.log(User)
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.deletePost = async (token, postId) =>{
    const reponse = await fetch('http://localhost:3000/api/post/'+postId ,{
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    if(reponse.ok){
        const User = await reponse.json()
        console.log(User)
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.pushComment = async (token, postId, comment) => {
    const reponse = await fetch('http://localhost:3000/api/post/commentaire/'+postId,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(comment)
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.newPost = async (token, post) => {
    const reponse = await fetch('http://localhost:3000/api/post',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(post)
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.getUser = async (token, userId) => {
    const reponse = await fetch('http://localhost:3000/api/profil/'+userId,{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
} 

exports.deleteUser = async (token, userId) => {
    const reponse = await fetch('http://localhost:3000/api/profil/'+ userId, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.deleteUserPostAll = async (token, userId) => {
    const reponse = await fetch('http://localhost:3000/api/post/all/'+ userId, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.putProfil = async (token, userId, body) => {
    const reponse = await fetch('http://localhost:3000/api/profil/'+ userId, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.deleteCommentaire = async (token, postId, body) => {
    const reponse = await fetch('http://localhost:3000/api/commentaire/post/'+ postId, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.modifPost = async (token, postId, body) => {
    const reponse = await fetch('http://localhost:3000/api/post/'+ postId, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}

exports.modifCommentaire = async (token, postId, body) => {
    const reponse = await fetch('http://localhost:3000/api/commentaire/post/'+ postId, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(body)
    });
    if(reponse.ok){
        const User = await reponse.json()
        return {ok: reponse.ok, body: User}
    }
    const error = await reponse.json()
    return {ok: reponse.ok, body: error}
}
