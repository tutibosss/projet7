<template>
    <form>
        <label for="titre">titre du post</label>
        <input type="text " id="titre" v-model="titrePost">

        <label for="contenue"> contenue du post</label>
        <input type="text" id="contenue" v-model="post">
        
        <input type="submit" value="cree le post" @click.prevent="newPost">
    </form>
</template>

<script>
const req = require('../../requette')

export default {
    data: () => {return{
        titrePost: '',
        post: ''
    }},
    methods: {
        async newPost () {
            const user = JSON.parse(localStorage.getItem('user'))
            const post = {
                userId: user.userId,
                userName: user.userName,
                titrePost: this.titrePost,
                post: this.post
            }

            const reponse = await req.newPost(user.token, post)
            if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
            this.$router.push({name:'index', params:{id: user.userName}})
        }
    }
}
</script>