<template>
<div>
    <form>
        <label for="firstName"> prenom </label>
        <input type="text" id="firstName" v-model="userName">

        <label for="email"> email </label>
        <input type="email" id="email" v-model="email">

        <label for="password" v-if="checkbox"> Ancien Mot de passe </label>
        <input type="password" id="passeword" v-model="holdPassword" v-if="checkbox">
        
        <label for="newPassword" v-if="checkbox"> Nouveaux Mot de passe </label>
        <input type="password" id="newPasseword" v-if="checkbox" v-model="newPassword">
    </form>
    <p>{{message}}</p>
    <label for="mdp">modifier mot de passe</label>
    <input type="checkbox" title="modifier le mot de passe" id="mdp" v-model="checkbox">

    <button @click="putProfil" > modifier mon profil </button>
</div>
</template>

<script>
const req = require('../../requette')
const verif = require('./verifPasseword')
export default {
    props: ['User'],
    beforeMount () {
        this.email = this.User.email
        this.userName = this.User.userName
    },
    data: () => {
        return{
            checkbox: '',
            userName :'',
            email: '',
            holdPassword: '',
            newPassword: '',
            message: ''
        }
    },
    methods: {
        async putProfil () {

            //verifier ci il y a un changement
            let update = {email: this.email, userName: this.userName}
            if(this.User.userName === update.userName && this.User.email === update.email && !this.checkbox) return this.message = 'vous navez effuctuer aucune modif'
            
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
            console.log(update)

            //envoie de la requette final
            const reponse = await req.putProfil(user.token, user.userId, update)
            if(!reponse.ok) return this.message = reponse.body
            alert(reponse.body)
            this.$router.push({name: 'myPage'}) 
        }
    }
}
</script>