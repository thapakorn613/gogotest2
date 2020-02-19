<template>
  <div class="pi-info-panel">
    <div class="row">

      <div class="col-sm-4 text-center">
        <vue-circle
          ref="cpuLoad"
          :progress="rpi.cpuLoad"
          :size="100"
          :reverse="false"
          line-cap="round"
          :fill="{ color: '#db3f8d' }"
          insert-mode="append"
          :thickness="10"
          :show-percent="false"
          :animation="{ duration: 100}"
          >
          <label>{{ rpi.cpuLoad }}</label>
        </vue-circle>
        <p class="btn-label">{{ 'raspberry.info.cpu_load' | translate }}</p>
      </div>

      <div class="col-sm-4 text-center">
        <vue-circle
          ref="cpuTemp"
          :progress="rpi.cpuTemp"
          :size="100"
          :reverse="false"
          line-cap="round"
          :fill="{ color: '#689F38' }"
          insert-mode="append"
          :thickness="10"
          :show-percent="false"
          :animation="{ duration: 100}"
          >
          <p>{{ rpi.cpuTemp }}</p>
        </vue-circle>
        <p class="btn-label">{{ 'raspberry.info.cpu_temp' | translate }}</p>
      </div>

      <div class="col-sm-4 text-center">
        <vue-circle
          ref="memoryUsed"
          :progress="rpi.memoryUsed"
          :size="100"
          :reverse="false"
          line-cap="round"
          :fill="{ color: '#303F9F' }"
          insert-mode="append"
          :thickness="10"
          :show-percent="false"
          :animation="{ duration: 100}"
          >
          <p>{{ rpi.memoryUsed }}</p>
        </vue-circle>
        <p class="btn-label">{{ 'raspberry.info.mem_used' | translate }}</p>
      </div>

    </div>

    <div class="row space-top-bottom">

      <div class="col-sm-3 offset-sm-3 text-center">
        <button class="btn btn-primary btn-with-icon rounded-icon" v-on:click="doGogoCmd('rpiShutdown')">
          <div class="button-motor-control">
            <i class="fa fa-inverse fa-2x fa-power-off"></i>
          </div>
        </button>
        <p class="btn-label">{{ 'raspberry.info.shutdown' | translate }}</p>
      </div>

      <div class="col-sm-3 text-center">
        <button class="btn btn-primary btn-with-icon rounded-icon" v-on:click="doGogoCmd('rpiReboot')">
          <div class="button-motor-control">
            <i class="fa fa-inverse fa-2x fa-refresh"></i>
          </div>
        </button>
        <p class="btn-label">{{ 'raspberry.info.reboot' | translate }}</p>
      </div>

    </div>
  </div>
</template>

<script>
  import VueCircle from 'vue2-circle-progress'
  import { mapMutations } from 'vuex'

  export default {
    name: 'pi-info-panel',
    components: {
      VueCircle
    },
    props: ['rpi'],
    data () {
      return {
        fill: { gradient: ['red'] },
      }
    },
    updated () {
      this.$refs.cpuTemp.updateProgress(this.rpi.cpuTemp)
      this.$refs.cpuLoad.updateProgress(this.rpi.cpuLoad)
      this.$refs.memoryUsed.updateProgress(this.rpi.memoryUsed)
    },
    methods: {
      ...mapMutations([
        'doGogoCmd', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
      ]),
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";

</style>
