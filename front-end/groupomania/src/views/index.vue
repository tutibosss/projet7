<template>
    <div>
        <navOnline v-bind="{admin: admin}"/>
        <router-view/>
    </div>
</template>

<script>
import navOnline from '../components/nav/navOnline'
export default {
    components : {
        navOnline
    },
    data : () => {return{
        admin: false
    }},
    mounted() {
        console.log('cbn')
        const user = JSON.parse(localStorage.getItem('user'))
        if(user.admin != undefined && user.admin) this.admin = user.admin
    }
}
</script>