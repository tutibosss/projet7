<template>
    <div class="listAdmin">
        <p v-if="list.length === 0"> aucun utilisateur n'a etait trouver</p>
        <div v-else class="listAdmin_box">
            <div v-for="item in list" :key="item.id" class="listAdmin_item">
                <img :src="require('../../image/' + item.fileName)" alt="" class="photoProfil">
                <h3>{{item.userName}}</h3>
                <p>{{item.email}}</p>
                <button v-if="(list.length > 1 || !type )&& userId != item.id" @click="modifAdmin(item.admin, item.id)">{{textButton}}</button>
            </div>
        </div>
    </div>
</template>

<script>
const req = require('../../axios/requette')
export default {
    props: {
        list : {type: Array},
        type: {type: Boolean}
    },
    data: () => {return {
        textButton: '',
        userId: '',
    }},
    beforeMount () {
        this.userId = JSON.parse(localStorage.getItem('user')).userId
        
        if(!this.type) return this.textButton = "passe l'utilisateur admin"
        this.textButton = "enlever les droit d'admin"
    },
    methods: {
        async modifAdmin (status, id) {
            const Status = !JSON.parse(status)

            const update = {
                userId : id,
                status : Status
            }
            
            const reponse = await req.putUser(update)
            if(!reponse.ok) alert('une erreur cest produite')
            alert("le status de l'utilisateur a bien etait modifier")
            this.$router.push({name: 'listAdmin'})
            window.location.reload()
        }
    }
}
</script>