<template>
    <div v-if="!modifProfil">
        <profil @user-profil = "setUser"/>
        <button @click="modif">{{message}}</button>
        <button @click="deleteUser">suprimer le profil</button>
    </div>
    <div v-else>
        <editProfil v-bind:User="user"/>
        <button @click="modif">{{message}}</button>
    </div>
</template>

<script>
import profil from '../components/profil/profil'
import editProfil from '../components/profil/editProfil'

const req = require('../axios/requette')
export default {
    components: {
        profil,
        editProfil
    },
    data: () => {return{
        user: '',
        modifProfil: false,
        message: 'moifier le profil'
    }},
    methods: {
        setUser(payload) {
            this.user = payload
        },
        modif() {
            this.modifProfil = !this.modifProfil
            if(this.modifProfil) return this.message = 'retour'
            this.message = 'modifier le profil'
        },
        async deleteUser () {
            const user = JSON.parse(localStorage.getItem('user'))
            const reponse = await req.deleteUser(user.userId)
            if(reponse.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
            const rep = await req.deleteUserPostAll(user.userId)
            if(rep.ok != true) return alert('tricheur') //fonction pour renvoyer au loin
            this.$router.push({name: 'login'})
        }
    },
}
</script>