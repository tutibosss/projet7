<template>
    <div>
        <navOnline/>
        <router-view/>
    </div>
</template>

<script>
import navOnline from '../components/nav/navOnline'
export default {
    components : {
        navOnline
    }
}
</script>