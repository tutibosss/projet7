<template>
    <article class="PostView">
        <post class="Post" v-bind="{post: post, route: route}" v-if="!modifier"/>
        
        <modifPost class="Post" v-bind:post="post" @annule="annuler" v-else />

        <div v-if="(userDroit === true || admin === true) && !modifier" class="ButtonPost">
            <button @click="modif">modifier</button>
            <button @click="deletePost">suprimer le post</button>
        </div>

        <commentaire v-bind="{commentaire: post.commentaire, admin: admin, userId: userId}" class="commentaire"/>
        
    </article>
</template>

<script>

const Req = require('../../axios/requette')

import commentaire from './commantaire'
import post from './post'
import modifPost from './modifPost'

export default {
    data: () => {return {
        post: '',
        route: '',
        comment: '',
        admin: '',
        userDroit: false,
        userId: '',
        modifier: false
    }},
    components: {
        commentaire,
        post,
        modifPost,
    },
    async beforeCreate () {
         const user = JSON.parse(localStorage.getItem('user'))
         const postId = this.$route.params.postId 

         const reponse = await Req.getPostId(postId)
         if(reponse.ok != true) alert('une erreur cest produite')
         this.post = reponse.body
         this.route = require('../../image/'+reponse.body.fileName)
     
        this.admin = this.$store.state.admin
        if(user.userId === this.post.userId) this.userDroit = true

        this.userId = user.userId
    },
    methods: {
        async deletePost () {
            const postId = this.$route.params.postId 

            if(this.admin){
            const reponse = await Req.adminDeletePost(postId)
            
            if(reponse.ok != true) return alert('une erreur cest produite')
            
            }else if (this.userDroit && !this.admin){
                
                const reponse = await Req.deletePost(postId)
                if(reponse.ok != true) return alert('une erreur cest produite')

            }else {return alert ('commande impossible')}

            alert('lobjet et bien suprimer')
            this.$router.push({name: 'home'})
        },
        modif () {
            this.modifier = true
        },
        annuler(payload){
            this.modifier = payload.rep
        }
    }
}
</script>