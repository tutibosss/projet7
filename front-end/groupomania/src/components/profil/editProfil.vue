<template>
<div>
    <h3>modifier mon profil</h3>
    <form class="profilForm" id="form" @submit.prevent="putProfil" >
        <label for="photoProfil">photo de profil</label>
        <img :src="miniature" alt="" class="photoProfil marginAuto">
        <input type="file" id="photoProfil" accept=".png,.jpg,.jpeg,.svg" @change="files">

        <label for="firstName"> prenom </label>
        <input type="text" id="firstName" v-model="userName">

        <label for="email"> email </label>
        <input type="email" id="email" v-model="email">

        <label for="password" v-if="checkbox"> Ancien Mot de passe </label>
        <input type="password" id="passeword" v-model="holdPassword" v-if="checkbox">
        
        <label for="newPassword" v-if="checkbox"> Nouveaux Mot de passe </label>
        <input type="password" id="newPasseword" v-if="checkbox" v-model="newPassword">

        <div class="profilForm_checbox">
            <input type="checkbox" title="modifier le mot de passe" id="mdp" v-model="checkbox">
            <label for="mdp">modifier mot de passe</label>
        </div>

        <input type="submit" value="modifier mon profil">
    </form>
    <p class="error">{{message}}</p>
</div>
</template>

<script>
const req = require('../../axios/requette')
const verif = require('./verifPasseword')
export default {
    props: ['User'],
    beforeMount () {
        this.email = this.User.email
        this.userName = this.User.userName
        this.miniature = require('../../image/'+ this.User.fileName)
    },
    data: () => {
        return{
            checkbox: '',
            userName :'',
            email: '',
            holdPassword: '',
            newPassword: '',
            message: '',
            file: null,
            miniature: ''
        }
    },
    methods: {
        files (event) {
            this.file = event.target.files[0]

            const reader = new FileReader()
            reader.onload = () => {
                this.miniature = reader.result
            }
            reader.readAsDataURL(event.target.files[0]) 
        },

        async putProfil () {
            let fd
            if(this.file){
                fd = new FormData
                fd.append('image', this.file, this.file.name)
            }
            //verifier ci il y a un changement
            let update = {email: this.email, userName: this.userName}
            if(this.User.userName === update.userName && this.User.email === update.email && !this.checkbox && fd === undefined) return this.message = 'vous navez effuctuer aucune modif'
            
            //ajout de userId
            const user = JSON.parse(localStorage.getItem('user'))
            update ={...update, userId: user.userId}

            // verif des donnes
            if(!verif.email(this.email)) return this.message = 'votre email est incorect'
            if(!verif.taille(this.username)) return this.message = 'votre pseudo et trop court'
            
            //verif ci changemant de mot de passe
            if(this.checkbox){
                if(!verif.taille(this.holdPassword) || !verif.taille(this.newPassword)) return this.message = ("l'un de vos mot de passe ne correspond pas au critaire")
                update = {...update, holdPassword: this.holdPassword, newPassword: this.newPassword}
                }

            if(fd){
                fd.append('profil', JSON.stringify(update))
                update = fd
            }

            //envoie de la requette final
            const reponse = await req.putProfil(user.userId, update)
            if(!reponse.ok) return this.message = reponse.body
            user.userName = this.userName
            localStorage.setItem('user', JSON.stringify(user))
            alert(reponse.body)
            window.location.reload()
        }
    }
}
</script>