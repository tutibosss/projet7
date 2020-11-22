<template>
    <div>
        <img :src="picture" alt="photo de profil" class="photoProfil">
        <p>{{userName}}</p>
        <p>{{email}}</p>
    </div>
</template>

<script>
const req = require('../../axios/requette')

export default {
    async beforeCreate () {
        const user = JSON.parse(localStorage.getItem('user'))

        const reponse = await req.getUser(user.userId)

        if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin

        console.log(reponse)

        this.email = reponse.body.email
        this.userName = reponse.body.userName
        this.picture = require('../../image/' + reponse.body.fileName)
        console.log (this.route)

        this.$emit('user-profil', {email: reponse.body.email, userName: reponse.body.userName})
    },
    data: () => {return{
        userName : '',
        email:'',
        picture: '',
    }}
}
</script>