<template>
    <div>
        <div>
            <p v-if="commentaire < 1"> il ny a pas de comentaire pour l instant</p>
            <div v-else v-for="(item, index) in commentaire" :key="index">
                <article v-if="modifIndex != index">
                    <h4>{{item.userName}}</h4>
                    <p>{{item.commentaire}}</p>
                    <div v-if="userId === item.userId || admin === true && modifIndex === null">
                        <button @click="modif(index, item)">modif</button>
                        <button @click="deleteCommentaire(index)">X</button>
                    </div>       
                </article>
         
                <div v-else-if="modifIndex === index">
                    <p>{{item.userName}}</p>
                    <form>
                        <label for="modifCommentaire"> modifier le commentaire</label>
                        <input type="text" id="modifCommentaire" v-model="modifChamps" >
                        <input type="submit" value="envoyer la modification" @click.prevent="modifCommentaire(index)">
                    </form>
                    <button @click="annuleModif">annule</button>
                </div>

            </div>
        </div>
        <div>
            <input type="text" v-model="comment">
            <button @click="push">commenter</button>
        </div>
    </div>
</template>

<script>
const req = require('../../requette')
export default {
    props:{
        commentaire: {type: Array},
        admin: {type: Boolean},
    },
    data: () => {return {
        comment:'',
        userId:'',
        modifIndex: null,
        modifChamps: null
    }},
    mounted () {
        this.userId = JSON.parse(localStorage.getItem('user')).userId
    },
    methods:{
        async push () {
            console.log(this.admin)
            const user = JSON.parse(localStorage.getItem('user'))
            const comment = {
                userId: user.userId,
                userName: user.userName,
                commentaire: this.comment
            }
            const postId = this.$route.params.postId
            
            const reponse = await req.pushComment(user.token, postId, comment)
            if(reponse.ok != true) alert('tricheur') //fonction pour renvoyer au loin
            window.location.reload()
        },
        async deleteCommentaire (index) {
            const update = {
                index: index,
                userId: this.userId
            }
            console.log(this.$route.params.postId, update)
            const user = JSON.parse(localStorage.getItem('user'))
            const reponse = await req.deleteCommentaire(user.token, this.$route.params.postId, update)
            if(reponse.ok != true) alert('tricheur') //fonction pour renvoyer au loin
            alert(reponse.body)
            window.location.reload()
        },
        modif(index, champ) {
            if(this.modifIndex != null) return alert('vous ete deja en cour de modification veuille annule ou finir la modif en cours')
            this.modifIndex = index
            this.modifChamps = champ.commentaire
        },
        annuleModif () {
            this.modifIndex = null
            this.modifChamps = null
        },
        async modifCommentaire (index) {
            const update = {
                index: index,
                newCommentaire: this.modifChamps 
            }
            const user = JSON.parse(localStorage.getItem('user'))
            const postId = this.$route.params.postId

            const reponse = await req.modifCommentaire(user.token, postId, update)
            if(reponse.ok != true) alert('tricheur') //fonction pour renvoyer au loin
            alert(reponse.body)
            window.location.reload()
        }
    }
}
</script>