<template>
    <section class="home">
        <h2>Bienvenue voici la liste des poste</h2>
        <listPost v-bind:listPost='listItem' v-bind:userDroit='userDroit' />
    </section>
</template>

<script>
import listPost from '../components/post/listPost'
const req = require('../axios/requette')
export default {
    async beforeCreate () {
        const reponse = await req.getAllPost()
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