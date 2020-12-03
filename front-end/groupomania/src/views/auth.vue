<template>
    <div class="auth" >
        <div class="formAuth">
            <h2>Bienvenue sur notre réseau social</h2>
            <navOffline/>
            <router-view/>
        </div>
    </div>
</template>

<script>
import navOffline from '../components/nav/navOffline'
export default {
    components: {
        navOffline
    }
}
</script>