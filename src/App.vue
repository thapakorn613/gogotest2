<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted () {
      // ************** Load "userback" on production site ************** //
      if (process.env.NODE_ENV === 'production') {
        window.Userback = window.Userback || {}
        window.Userback.access_token = '2572|3580|YThmW0eXLLMFKMCAClnmRpJP58SgRlO4dFCpi2rEIY8WmdXQce';

        (function (id) {
          if (document.getElementById(id)) { return }
          var s = document.createElement('script')
          s.id = id
          s.async = 1
          s.src = 'https://static.userback.io/widget/v1.js'
          var parentNode = document.head || document.body
          parentNode.appendChild(s)
        })('userback-sdk')
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/main";

  body {
    height: 100%;
    #app {
      height: 100%;
    }


    .userback-button-container {

      // ******* Hide the button ******* //
      // display: none;
      div:first-child {
        position: fixed !important;
        right: -80px !important;
      }

      // ******* Hide the powered by logo ******* //
      .userback-powered-by {
        display: none;
      }
    }
  }
</style>
