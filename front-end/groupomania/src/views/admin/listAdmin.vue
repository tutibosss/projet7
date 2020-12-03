<template>
    <div>
        <h2>Liste des admins actifs</h2>
        <listAdmin v-bind="{list: list, type: true}"/>
    </div>
</template>

<script>
import listAdmin from '../../components/admin/list'
const req = require('../../axios/requette')
export default {
    components:  {
        listAdmin
    },
    data: () => {return{
        list : []
    }},
    async beforeCreate () {
        const reponse = await req.adminGetUser(true)
        if(!reponse.ok) alert("Une erreur s'est produite")
        this.list = reponse.body
    }
}
</script>