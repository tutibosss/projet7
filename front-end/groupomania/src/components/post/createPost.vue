<template>
    <div class="createPost">
        <h2>cree un post</h2>
        <form class="createPost_form">
            <label for="titre">Titre du post</label>
            <input type="text " id="titre" v-model="titrePost">

            <label for="contenue"> Contenu du post</label>
            <input type="text" id="contenue" v-model="post" class="createPost_form_inputPost">
            
            <input type="submit" value="cree le post" @click.prevent="newPost" class="createPost_form_button">
        </form>
    </div>
</template>

<script>
const req = require('../../axios/requette')

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

            const reponse = await req.newPost(post)
            if(reponse.ok != true) return alert("Une erreur s'est produite")
            alert(reponse.body)
            this.$router.push({name:'index', params:{id: user.userName}})
        }
    }
}
</script>