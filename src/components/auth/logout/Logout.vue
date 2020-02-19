<template>
  <div class="logout">
    <h2>{{'auth.createNewAccount' | translate}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'logout',
    data () {
      return {
        ok: true
      }
    },
    mounted () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    destroyed () {
      // console.log('Logout')
      this.$swalSuccess({
        title: this.$t('user.message.logged_out_header'),
        text: this.$t('user.message.logged_out'),
      })
    },
  }
</script>

<style lang="scss">
</style>
