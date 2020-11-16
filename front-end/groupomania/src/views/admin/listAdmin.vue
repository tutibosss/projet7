<template>
    <div>
        <h2>Liste des admin actif</h2>
        <listAdmin v-bind="{list: list, type: true}"/>
    </div>
</template>

<script>
import listAdmin from '../../components/admin/list'
const req = require('../../requetteAdmin')
export default {
    components:  {
        listAdmin
    },
    data: () => {return{
        list : []
    }},
    async beforeCreate () {
        const user = JSON.parse(localStorage.getItem('user'))
        const reponse = await req.getUser(user.token, true)
        if(!reponse.ok) alert('ne erreur cest produite')
        console.log(reponse)
        this.list = reponse.body
    }
}
</script>