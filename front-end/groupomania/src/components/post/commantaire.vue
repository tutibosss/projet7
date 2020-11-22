<template>
    <div>
        <div class="listCommentaire">
            <p v-if="commentaire < 1"> il ny a pas de comentaire pour l instant</p>
            <div v-else v-for="(item, index) in commentaire" :key="index" >
                <article v-if="modifIndex != index" class="commentaireBox">
                    <div class="commentaireText">
                        <div>
                            <img :src="require('../../image/'+ item.fileName)" alt="" class="imgCommentaire">
                            <h4>{{item.userName}}</h4>
                        </div>
                        <p>{{item.commentaire}}</p>
                    </div>
                    <div v-if="(userId === item.userId || admin === true) && modifIndex === null" class="commentaireBox_button">
                        <button @click="modif(index, item)">modif</button>
                        <button @click="deleteCommentaire(index)">X</button>
                    </div>       
                </article>
         
                <div v-else-if="modifIndex === index" class="commentaireBox commentaireModif">
                    <p>{{item.userName}}</p>
                    <form class="commentaireModif_form">
                        <label for="modifCommentaire"> modifier le commentaire</label>
                        <input type="text" id="modifCommentaire" v-model="modifChamps" >
                        <div>
                            <input type="submit" value="envoyer la modification" @click.prevent="modifCommentaire(index)">
                            <input type="button" value="annule" @click.prevent="annuleModif">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="ButtonCommentaire">
            <input type="text" v-model="comment">
            <button @click="push">commenter</button>
        </div>
    </div>
</template>

<script>
const Req = require('../../axios/requette')

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
           
            const user = JSON.parse(localStorage.getItem('user'))
            const comment = {
                userId: user.userId,
                userName: user.userName,
                commentaire: this.comment
            }
            const postId = this.$route.params.postId
            
            const reponse = await Req.pushComment(postId, comment)
            if(reponse.ok != true) alert('tricheur') //fonction pour renvoyer au loin
            window.location.reload()
        },
        async deleteCommentaire (index) {
            const update = {
                index: index
            }
            
            const user = JSON.parse(localStorage.getItem('user'))
            if(user.admin){
                const reponse = await Req.adminDeleteCommentaire(this.$route.params.postId, update)
                if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
                alert(reponse.body)
            }else{
                const reponse = await Req.deleteCommentaire(this.$route.params.postId, update)
                if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
                alert(reponse.body)
            }
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
    
            const postId = this.$route.params.postId

            const user = JSON.parse(localStorage.getItem('user'))
            if(user.admin){
                const reponse = await Req.adminModifCommentaire( postId, update)
                if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
                alert(reponse.body)  
            }else{
                const reponse = await Req.modifCommentaire( postId, update)
                if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
                alert(reponse.body)               
            }
            window.location.reload()
        }
    }
}
</script>