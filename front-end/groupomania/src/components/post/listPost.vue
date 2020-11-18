<template>
    <div v-if="listPost.length != 0" class="listPost">
        <router-link v-for="item in listPost" :key="item.id" :to="{name: 'openPost', params: {postId: item.id}}" class="Post">
            <div class="Post_titre">
                <p>publier par {{item.userName}}</p>
                <p>le {{item.date.split('T')[0]}} a {{item.date.split('T')[1].split('000Z')[0]}}</p>
            </div>
            <h3>{{item.titrePost}}</h3>
            <p>{{item.post}}</p>
        </router-link>
    </div>
    <p v-else class="marginAuto">aucun post pour l'instant cree en un ;)</p>
</template>

<script>
export default {
    props: {
        listPost: {type: Array},
        userDroit: {type: Boolean}
    },
}
</script>