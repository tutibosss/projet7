<template>
    <div v-if="listPost.length != 0" class="listPost">
        <router-link v-for="item in listPost" :key="item.id" :to="{name: 'openPost', params: {postId: item.id}}" class="Post">
            <post v-bind="{post: item, route: require('../../image/' + item.fileName)}"/>
        </router-link>
    </div>
    <p v-else class="marginAuto">Aucun post pour l'instant, créez en un ;)</p>
</template>

<script>
import post from './post'
export default {
    props: {
        listPost: {type: Array},
        userDroit: {type: Boolean}
    },
    components:{
        post
    }
}
</script>