<template>
    <div class="profil">
        <div v-if="!modifProfil" class="profilBox">
            <profil @user-profil = "setUser" class="profilBox_view"/>
            <div class="profilButton">
                <button @click="modif">{{message}}</button>
                <button @click="deleteUser">Supprimer le profil</button>
            </div>
            <router-link :to="{name : 'myPage'}">Retour a mon espace</router-link>  
        </div>
        <div v-else class="profilBox">
            <editProfil v-bind:User="user" class="profilBox_view"/>
            <button @click="modif" class="profilSoloButton">{{message}}</button>
        </div>  
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
        message: 'Modifier le profil'
    }},
    methods: {
        setUser(payload) {
            this.user = payload
        },
        modif() {
            this.modifProfil = !this.modifProfil
            if(this.modifProfil) return this.message = 'retour'
            this.message = 'Modifier le profil'
        },
        async deleteUser () {
            const user = JSON.parse(localStorage.getItem('user'))
            const reponse = await req.deleteUser(user.userId)
            if(reponse.ok != true) return alert("Une erreur s'est produite")
            const rep = await req.deleteUserPostAll(user.userId)
            if(rep.ok != true) return alert("Une erreur s'est produite")
            this.$router.push({name: 'login'})
        }
    },
}
</script>