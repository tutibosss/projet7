<template>
    <div>
        <div class="Post_titre">
            <img :src="require('../../image/'+post.fileName)" alt="" class="photoProfil">
            <div>
                <p>publier par <br>
                {{post.userName}}</p>
                <p>le  {{post.date}}</p>
            </div>
        </div>
        <form class="modifPost_form">
            <label for="titre">titre du post</label>
            <input type="text " id="titre" v-model="titrePost">

            <label for="contenue"> contenue du post</label>
            <input type="text" id="contenue" v-model="contenuPost" class="createPost_form_inputPost">
            <div class="modifPost_button">
                <input  type="button" @click.prevent="annule" value="annule">   
                <input type="submit" @click.prevent="modifCommentaire" value="valide la modification">
            </div> 
        </form>    
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

           const user = JSON.parse(localStorage.getItem('user'))
           if(user.admin){
               console.log('admin')
               const reponse = await req.adminModifPost(idPost, update)
                if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
           }else{
               console.log('pasadmin')
                const reponse = await req.modifPost(idPost, update)
                if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
           }

            window.location.reload()
        }
    }
}
</script>