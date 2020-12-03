<template>
    <div>
        <navOnline v-bind="{admin: this.$store.state.admin}"/>
        <router-view/>
    </div>
</template>

<script>
import navOnline from '../components/nav/navOnline'
const req = require('../axios/requette')
export default {
    components : {
        navOnline
    },
    async beforeCreate(){
            const user = JSON.parse(localStorage.getItem('user'))
            const rep = await req.getUser(user.userId)
            if(!rep.ok) return alert('une erreur cest produite')
            const admin = JSON.parse(rep.body.admin)
            this.$store.commit('adminStatue', admin)
    }
}
</script>