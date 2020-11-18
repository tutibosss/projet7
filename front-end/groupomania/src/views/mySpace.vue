<template>
    <div class="home">
        <router-link :to="{name: 'myProfil'}" class="profilView">
            <h2>Mon profil</h2>
            <profil/>
        </router-link>
        <button v-if="listItem.length > 0" @click="deleteMyPost">suprimer tout mais post</button>
        <listPost v-bind:listPost='listItem' v-bind:userDroit='userDroit'/>
    </div>
</template>

<script>
import listPost from '../components/post/listPost'
import profil from '../components/profil/profil'
const req = require('../axios/requette')

export default {
    async beforeCreate () {
        const user = JSON.parse(localStorage.getItem('user'))
        const reponse = await req.getAllPostId(user.userId)
        if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
        this.listItem = reponse.body
        this.userDroit = true
    },
    data: () => {return {
        listItem: [],
        userDroit: ''
    }},
    components: {
        listPost,
        profil
    },
    methods: {
        async deleteMyPost () {
            const user = JSON.parse(localStorage.getItem('user'))
            const rep = await req.deleteUserPostAll(user.userId)
            if(rep.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
            window.location.reload()
        }
    }
}
</script>