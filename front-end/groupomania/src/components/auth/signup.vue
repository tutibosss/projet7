<template>
    <div>
      <p class="error">{{error}}</p>  
      <form>
          <label for="userName"> Pseudo </label>
          <input type="text" id="userName" required v-model="userName">

          <label for="email"> Email </label>
          <input type="email" id="email" required v-model="email">

          <label for="password"> Mot de passe </label>
          <input type="password" id="password" required v-model="password">

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

      const login = await req.login(user)

      if(!login.ok) return "Une erreur s'est produite"

      localStorage.setItem('user', JSON.stringify(login.body))
      this.$router.push({name:'index', params:{id: login.body.userName}})
    }
  }
}
</script>


