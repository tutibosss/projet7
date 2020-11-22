<template>
    <article>
        <div class="Post_titre">
            <img :src="route" alt="" class="photoProfil">
            <div>
                <p>publier par :<br>
                 {{post.userName}}</p>
                <p>le  {{post.date}}</p>
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