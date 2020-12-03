<template>
    <section class="home">
        <h2>Bienvenue voici la liste des postes</h2>
        <listPost v-bind:listPost='listItem' v-bind:userDroit='userDroit' />
    </section>
</template>

<script>
import listPost from '../components/post/listPost'
const req = require('../axios/requette')
export default {
    async beforeCreate () {
        const reponse = await req.getAllPost()
        if(reponse.ok != true) alert("Une erreur s'est produite")
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