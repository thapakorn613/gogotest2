<template>
  <div class="dashboard-panel">
    
    <!-- <motor-display-panel :motors="motors"></motor-display-panel> -->
    <lab-display-panel></lab-display-panel>

    <vue-tabs>
      <v-tab :title="$t('gogoboard.tabs.lab_detail')">
        <lab-detail-panel></lab-detail-panel>
      </v-tab>

      <v-tab :title="$t('gogoboard.tabs.lab_status')">
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

import LabDisplayPanel from './dashboard-elements/LabDisplayPanel.vue'
import LabDetailPanel from './dashboard-elements/LabDetailPanel.vue'
import ServoControlPanel from './motor-elements/ServoControlPanel.vue'

import 'vue-nav-tabs/themes/paper.css'

export default {
  name: 'dashboard-panel',
  // props: ['motors'],
  components: {
    LabDisplayPanel,
    LabDetailPanel,
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