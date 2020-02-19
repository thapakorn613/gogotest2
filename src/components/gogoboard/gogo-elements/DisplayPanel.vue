<template>
  <div class="display-panel text-center">
    <div class="gogo-image-display">
      <img v-if="info.boardType==1" class="board board-link" 
        src="static/gogo-img/gogoboard46.png" @click="showGogo46Popup()">
      <img v-else-if="info.boardType==2" class="board board-link"
        src="static/gogo-img/pitopping32.png" @click="showGogoPitopPopup()">
      <img v-else class="board" src="static/gogo-img/noboard_found.png">
    </div>
    <p v-if="info.firmwareVersion>0" class="btn-label">
      {{'gogoboard.firmware_version_is' | translate}} {{ info.firmwareVersion }}
    </p>
  </div>
</template>

<script>

  export default {
    name: 'display-panel',
    props: ['info'],
    data () {
      return {
        var: 1,
      }
    },
    methods: {
      showGogoPitopPopup () {
        this.$swal({
          html: '<img class="board-buttom-pad board-large" src="static/gogo-img/gogoboard5.jpg">',
          showConfirmButton: false,
        })
      },
      showGogo46Popup () {
        this.$swal({
          html: '<img class="board-buttom-pad board-large" src="static/gogo-img/gogoboard46.png">',
          showConfirmButton: false,
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .board {
    width: 95%;
    max-width: 300px;
  }

</style>

<style lang="scss">
  .board-link {
    cursor: pointer;
  }

  .board-buttom-pad {
    padding-bottom: 12px;
  }

  .board-large {
    width: 100%;
    height: auto;
  }
</style>
