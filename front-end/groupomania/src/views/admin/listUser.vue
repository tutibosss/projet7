<template>
    <div class="listAdmin">
        <h2>Liste des utilisateurs</h2>
        <listUser v-bind="{list: list, type: false}"/>
    </div>
</template>

<script>
import listUser from '../../components/admin/list'
const req = require('../../axios/requette')
export default {
    components:  {
        listUser
    },
    data: () => {return{
        list : []
    }},
    async beforeCreate () {
        const reponse = await req.adminGetUser(false)
        if(!reponse.ok) alert("Une erreur s'est produite")
        this.list = reponse.body
    }
}
</script>