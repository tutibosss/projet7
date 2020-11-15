exports.deletePost = async (token, postId) =>{
    const reponse = await fetch('http://localhost:3000/api/admin/post/'+postId ,{
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