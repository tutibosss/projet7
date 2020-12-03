<template>
    <nav>
        <router-link :to="{name: 'home'}"> Home </router-link>
        <router-link :to="{name: 'myPage'}"> Mon espace </router-link>
        <router-link :to="{name: 'createPost'}"> Créer un post </router-link>
        <router-link v-if="admin" :to="{name: 'admin'}"> admin gestion </router-link>
        <a href="*" @click.prevent="deconnect"> Déconnexion </a>
    </nav>
</template>

<script>
export default {
    props: {
        admin :{type: Boolean}
    },
    methods: {
        deconnect () {
            localStorage.removeItem('user')
            this.$router.push({name: 'login'})
        }
    }
}
</script>