<template>
<div>
    <h3>Modifier mon profil</h3>
    <form class="profilForm" id="form" @submit.prevent="putProfil" >
        <label for="photoProfil">Photo de profil</label>
        <img :src="miniature" alt="photo de profil" class="photoProfil marginAuto">
        <input type="file" id="photoProfil" accept=".png,.jpg,.jpeg,.svg" @change="files">

        <label for="firstName"> Pseudo </label>
        <input type="text" id="firstName" v-model="userName">

        <label for="email"> Email </label>
        <input type="email" id="email" v-model="email">

        <label for="password" v-if="checkbox"> Ancien Mot de passe </label>
        <input type="password" id="password" v-model="holdPassword" v-if="checkbox">
        
        <label for="newPassword" v-if="checkbox"> Nouveau mot de passe </label>
        <input type="password" id="newPassword" v-if="checkbox" v-model="newPassword">

        <div class="profilForm_checbox">
            <input type="checkbox" title="Modifier le mot de passe" id="mdp" v-model="checkbox">
            <label for="mdp">Modifier le mot de passe</label>
        </div>

        <input type="submit" value="modifier mon profil">
    </form>
    <p class="error">{{message}}</p>
</div>
</template>

<script>
const req = require('../../axios/requette')
const verif = require('./verifPassword')
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

            let update = {email: this.email, userName: this.userName}
            if(this.User.userName === update.userName && this.User.email === update.email && !this.checkbox && fd === undefined) return this.message = "Vous n'avez effectué aucune modification"   

            const user = JSON.parse(localStorage.getItem('user'))
            update ={...update, userId: user.userId}

            if(!verif.email(this.email)) return this.message = 'Votre email est incorrect'
            if(!verif.taille(this.username)) return this.message = 'Votre pseudo est trop court'

            if(this.checkbox){
                if(!verif.taille(this.holdPassword) || !verif.taille(this.newPassword)) return this.message = ("L'un de vos mots de passe ne correspond pas aux critères")
                update = {...update, holdPassword: this.holdPassword, newPassword: this.newPassword}
                }

            if(fd){
                fd.append('profil', JSON.stringify(update))
                update = fd
            }

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