<template>
    <div>
        <div>
            <p>publier par {{post.userName}}</p>
            <p>le  {{post.date}}</p>
        </div>
        <form>
            <label for="titre">titre du post</label>
            <input type="text " id="titre" v-model="titrePost">

            <label for="contenue"> contenue du post</label>
            <input type="text" id="contenue" v-model="contenuPost">
        </form>
        <button @click="modifCommentaire"> valide la modification </button>
        <button @click="annule"> annule </button>        
    </div>
</template>

<script>
const req = require('../../axios/requette')
export default {
    props: ['post'],
    mounted () {
        console.log(this.post)
        this.contenuPost = this.post.post
        this.titrePost = this.post.titrePost
    },
    data: () => {return{
        contenuPost: '',
        titrePost:''
    }},
    methods : {
        annule () {
            this.$emit('annule', {rep : false})
        },
        async modifCommentaire () {
            const update = {
                titrePost : this.titrePost,
                post : this.contenuPost
            }
            const idPost = this.$route.params.postId

            const reponse = await req.modifPost(idPost, update)
            if(reponse.ok != true) alert('tricheur') //fonction pour renvoyer au loin
            alert(reponse.body)
            window.location.reload()
        }
    }
}
</script>