<template>
  <div class="display-panel justify-content-center">
    <div style="height:195px;text-align:center;">
      <img v-if="rpi.revision>0" class="board" src="static/gogo-img/raspberry_pi_b.png">
      <img v-else class="board" src="static/gogo-img/noboard_found.png">
    </div>
    <div v-if="rpi.revision>0" class="btn-label">
      {{'raspberry.revistion_is' | translate}} {{ rpi.revision }}
    </div>
  </div>
</template>

<script>

  export default {
    name: 'display-panel',
    props: ['rpi'],
    data () {
      return {
        var: 1,
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";

  .board {
    width: 85%;
    max-width: 300px;
  }
</style>
