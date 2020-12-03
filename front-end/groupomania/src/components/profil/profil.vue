<template>
    <div>
        <img :src="require('../../image/'+ picture)" alt="photo de profil" class="photoProfil">
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

        if(reponse.ok != true) return alert("Une erreur s'est produite")

        this.email = reponse.body.email
        this.userName = reponse.body.userName

        this.picture = reponse.body.fileName
        this.$emit('user-profil', {email: reponse.body.email, userName: reponse.body.userName, fileName: reponse.body.fileName})
    },
    data: () => {return{
        userName : '',
        email:'',
        picture: 'pictureUserDefault.png',
    }}
}
</script>