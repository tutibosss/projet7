<template>
  <div class="divPrincipal">
    <header>
      <img :src="require('./assets/icon-left-font-monochrome-white.svg')" class="header-photo" alt="">
    </header>
    <router-view class="routerview"/>
  </div>
</template>