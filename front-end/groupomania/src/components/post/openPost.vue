<template>
    <article>
        <post v-bind="{post: post}" v-if="!modifier"/>
        <modifPost v-bind:post="post" @annule="annuler" v-else />
        <div v-if="admin === true || userDroit === true && !modifier">
            <button @click="modif">modifier</button>
            <button @click="deletePost">suprimer le post</button>
        </div>
        <commentaire v-bind="{commentaire: post.commentaire, admin: admin, userId: userId}"/>
    </article>
</template>

<script>

const Req = require('../../axios/requette')
const reqAdm = require('../../requetteAdmin')

import commentaire from './commantaire'
import post from './post'
import modifPost from './modifPost'

export default {
    data: () => {return {
        post: '',
        comment: '',
        admin: false,
        userDroit: false,
        userId: '',
        modifier: false
    }},
    components: {
        commentaire,
        post,
        modifPost
    },
    async mounted () {
         const user = JSON.parse(localStorage.getItem('user'))
         const postId = this.$route.params.postId 

         const reponse = await Req.getPostId(postId)
         if(reponse.ok != true) alert('tricheur') //fonction pour renvoyer au loin
         this.post = reponse.body
     
        if(user.admin) this.admin = true
        if(user.userId === this.post.userId) this.userDroit = true

        this.userId = user.userId
    },
    methods: {
        async deletePost () {
            const user = JSON.parse(localStorage.getItem('user'))
            const postId = this.$route.params.postId 

            if(this.admin){
            const reponse = await reqAdm.deletePost(user.token,postId)
            
            if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
            
            }else if (this.userDroit && !this.admin){
                
                const reponse = await Req.deletePost(postId)
                if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin

            }else {return alert ('commende impossible')}

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