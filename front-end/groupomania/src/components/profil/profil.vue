<template>
    <div>
    <p>{{userName}}</p>
    <p>{{email}}</p>
    </div>
</template>

<script>
const req = require('../../requette')
export default {
    async beforeCreate () {
        const user = JSON.parse(localStorage.getItem('user'))

        const reponse = await req.getUser(user.token, user.userId)
        console.log(reponse)

        if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin

        this.email = reponse.body.email
        this.userName = reponse.body.userName

        this.$emit('user-profil', {email: reponse.body.email, userName: reponse.body.userName})
    },
    data: () => {return{
        userName : '',
        email:''
    }}
}
</script>