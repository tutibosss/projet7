<template>
    <section>
        <h2>bonjour</h2>
        <listPost v-bind:listPost='listItem' v-bind:userDroit='userDroit' />
    </section>
</template>

<script>
import listPost from '../components/post/listPost'
const req = require('../requette'
)
export default {
    async beforeCreate () {
        const user = JSON.parse(localStorage.getItem('user'))
        const reponse = await req.getAllPost(user.token)
        console.log(reponse)
        if(reponse.ok != true) alert('tricheur') //fonction pour renvoyer au loin
        this.listItem = reponse.body
    },
    data: () =>{return{
        listItem: [],
        userDroit: false
    }},
    components: {
        listPost
    }
}
</script>