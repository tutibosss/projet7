<template>
    <nav>
        <router-link :to="{name: 'home'}"> home </router-link>
        <router-link :to="{name: 'myPage'}"> mon profil </router-link>
        <router-link :to="{name: 'createPost'}"> cree un post </router-link>
        <router-link v-if="admin" :to="{name: 'admin'}"> admin gestion </router-link>
        <button  @click.prevent="deconnect"> decoconection </button>
    </nav>
</template>

<script>
export default {
    props: {
        admin :{type: Boolean}
    },
    methods: {
        deconnect () {
            console.log('cbn')
            localStorage.removeItem('user')
            this.$router.push({name: 'login'})
        }
    }
}
</script>