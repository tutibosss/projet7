<template>
    <article>
        <div class="Post_titre">
            <img :src="route" alt="" class="photoProfil">
            <div>
                <p>publier par :<br>
                 {{post.userName}}</p>
                 <p>le  {{new Date(post.date).toLocaleDateString('eu-FR', { year: 'numeric', month: 'long', day: 'numeric' })}} 
                    a  {{new Date(post.date).toLocaleTimeString('eu-FR')}}</p>
            </div>
        </div>
        <h2>{{post.titrePost}}</h2>
        <p>{{post.post}}</p>
    </article>
</template>

<script>

export default {
    props: ['post', 'route']
}

</script>