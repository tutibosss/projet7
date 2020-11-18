<template>
    <div>
      <p>{{error}}</p>  
      <form>
          <label for="userName"> user name </label>
          <input type="text" id="userName" required v-model="userName">

          <label for="email"> email </label>
          <input type="email" id="email" required v-model="email">

          <label for="password"> Mot de passe </label>
          <input type="password" id="passeword" required v-model="password">

          <input type="submit" @click.prevent="signup" class="buttonAuth">
      </form>   
    </div>
</template>

<script>
const verif = require('./verifForm')
const req = require('../../axios/requette')

export default {
  data: () => {return {
    userName: '',
    email: '',
    password:'',
    error: ''
  }},
  methods: {
    async signup () {

      //creation du compte

      const user = {
        userName: this.userName,
        email: this.email,
        password: this.password
      }
      const test = verif.signup(user)
      if(test != true) return this.error = test
      this.error = ''

      const rep = await req.signup(user)
      if(!rep.ok) return this.error = rep.body

      //conection au compte cree

      const login = await req.login(user)

      if(!login.ok) return this.error = rep.body + " une erreur c'est produit lors de la conection"

      localStorage.setItem('user', JSON.stringify(login.body))
      this.$router.push({name:'index', params:{id: login.body.userName}})
    }
  }
}
</script>


