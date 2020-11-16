<template>
    <div>
        <h2>Liste des admin actif</h2>
        <listUser v-bind="{list: list, type: false}"/>
    </div>
</template>

<script>
import listUser from '../../components/admin/list'
const req = require('../../requetteAdmin')
export default {
    components:  {
        listUser
    },
    data: () => {return{
        list : []
    }},
    async beforeCreate () {
        const user = JSON.parse(localStorage.getItem('user'))
        const reponse = await req.getUser(user.token, false)
        if(!reponse.ok) alert('ne erreur cest produite')
        console.log(reponse)
        this.list = reponse.body
    }
}
</script>