<template>
    <article>
        <div class="Post_titre">
            <p>publier par {{post.userName}}</p>
            <p>le  {{post.date}}</p>
        </div>
        <h2>{{post.titrePost}}</h2>
        <p>{{post.post}}</p>
    </article>
</template>

<script>
export default {
    props: ['post']
}
</script>