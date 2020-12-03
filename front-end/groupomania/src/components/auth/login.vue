<template>
  <div>
      <p class="error">{{error}}</p>
      <form>
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email">
          
          <label for="password" id="password">Mot de passe</label>
          <input type="password" id="password" v-model="password">

          <input type="submit" value="se connecter" @click.prevent= 'login' class="buttonAuth">
      </form>
  </div>
</template>

<script>
const req = require('../../axios/requette')
const verif = require('./verifForm')

export default {
  data: () => { return {
    email: '',
    password: '',
    error: null,
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

      if(!rep.ok) return this.error = rep.body

      const repJson = JSON.stringify(rep.body)
      localStorage.setItem('user', repJson)
      this.$router.push({name:'index', params:{id: rep.body.userName}})
    }
  }
}
</script>
