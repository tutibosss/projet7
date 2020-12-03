<template>
    <div class="adminView">
        <h2>Bienvenue dans la gestion des admins</h2>
        <div class="navAdmin">
            <router-link :to="{name: 'listAdmin'}"> Liste d'admin </router-link>
            <router-link :to="{name: 'listUser'}"> Liste d'utilisateurs </router-link>
        </div>
        <router-view class="listAdmin"/>
    </div>
</template>