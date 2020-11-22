<template>
    <div class="adminView">
        <h2>bienvenue ans la gestion des admin</h2>
        <div class="navAdmin">
            <router-link :to="{name: 'listAdmin'}"> liste de admin </router-link>
            <router-link :to="{name: 'listUser'}"> liste de user </router-link>
        </div>
        <router-view class="listAdmin"/>
    </div>
</template>

<script>
export default {

}
</script>