<template>
    <nav>
        <router-link :to="{name: 'home'}"> home </router-link>
        <router-link :to="{name: 'myPage'}"> mon profil </router-link>
        <router-link :to="{name: 'createPost'}"> cree un post </router-link>
        <button  @click.prevent="deconnect"> decoconection </button>
    </nav>
</template>

<script>
export default {
    methods: {
        deconnect () {
            console.log('cbn')
            localStorage.removeItem('user')
            this.$router.push({name: 'login'})
        }
    }
}
</script>