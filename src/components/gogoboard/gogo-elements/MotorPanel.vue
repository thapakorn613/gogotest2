<template>
  <div class="motor-panel">
    
    <!-- <motor-display-panel :motors="motors"></motor-display-panel> -->
    <motor-display-panel></motor-display-panel>

    <vue-tabs>
      <v-tab :title="$t('gogoboard.tabs.dc_motor')" icon="ti-user">
        <motor-control-panel></motor-control-panel>
      </v-tab>

      <v-tab :title="$t('gogoboard.tabs.servo_motor')">
        <servo-control-panel></servo-control-panel>
      </v-tab>
  </vue-tabs>

    <!-- <div class="row">
      <div class="col-sm-12">
        <vuestic-tabs class="tabs narrowPadding" :names="[$t('gogoboard.tabs.dc_motor'), $t('gogoboard.tabs.servo_motor')]">
          <div :slot="'gogoboard.tabs.dc_motor' | translate">
            <motor-control-panel></motor-control-panel>
          </div>
          <div :slot="'gogoboard.tabs.servo_motor' | translate">
            <servo-control-panel></servo-control-panel>
          </div>
        </vuestic-tabs>
      </div>
    </div> -->
</div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { VueTabs, VTab } from 'vue-nav-tabs'

import MotorDisplayPanel from './motor-elements/MotorDisplayPanel.vue'
import MotorControlPanel from './motor-elements/MotorControlPanel.vue'
import ServoControlPanel from './motor-elements/ServoControlPanel.vue'

import 'vue-nav-tabs/themes/paper.css'

export default {
  name: 'motor-panel',
  // props: ['motors'],
  components: {
    MotorDisplayPanel,
    MotorControlPanel,
    ServoControlPanel,
    VueTabs,
    VTab
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    // ...mapGetters(['gogoControls'])
  }
}
</script>

<style lang="scss" scoped>


.center {
  text-align: center;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

</style>