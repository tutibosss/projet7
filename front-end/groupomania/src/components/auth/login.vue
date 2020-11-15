<template>
  <div>
      <form>
          <label for="email">email</label>
          <input type="email" v-model="email" id="email">
          
          <label for="password" id="password">mot de passe</label>
          <input type="password" id="password" v-model="password">

          <input type="submit" value="se connecter" @click.prevent= 'login'>
      </form>
      <p>{{error}}</p>
  </div>
</template>

<script>
const req = require('../../requette')
const verif = require('./verifForm')

export default {
  data: () => { return {
    email: '',
    password: '',
    error: '',
  }},
  methods:{
    async login () {
      const user = {
        email: this.email,
        password: this.password
      }

      const test = verif.login(user)
      if(test != true) return this.error = test
      this.error = ''

      const rep = await req.login(user)
      console.log(rep)

      if(!rep.ok) return this.error = rep.body

      const repJson = JSON.stringify(rep.body)
      localStorage.setItem('user', repJson)
      this.$router.push({name:'index', params:{id: rep.body.userName}})
    }
  }
}
</script>
