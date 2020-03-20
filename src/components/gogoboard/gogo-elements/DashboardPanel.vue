<template>
  <div class="dashboard-panel">
    
    <lab-display-panel :parentData="labStatus" v-on:childToParent="onChildClick"></lab-display-panel>
    <!--<LabDisplayPanel :parentData="myData" v-on:childToParent="onChildClick"></LabDisplayPanel>-->
    <vue-tabs>
      <v-tab :title="$t('gogoboard.tabs.lab_detail')">
        <lab-detail-panel :parentData="fromChild" v-on:detailToStatus="onUserEnter" v-on:detailToStatuss="onCallDetail"></lab-detail-panel>
      </v-tab>

      <!--<v-tab :title="$t('gogoboard.tabs.lab_test')">
        <LabDetailPanel :parentDat="fromChild"></LabDetailPanel>
        999
      </v-tab>-->

      <v-tab :title="$t('gogoboard.tabs.lab_status')">
        <lab-status-panel :parentData="fromChild" :parentData2="fromDetail" ></lab-status-panel>
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
import LabStatusPanel from './dashboard-elements/LabStatusPanel.vue'
import ServoControlPanel from './motor-elements/ServoControlPanel.vue'
import HeaderDetail from './dashboard-elements/HeaderDetail'

import 'vue-nav-tabs/themes/paper.css'

export default {
  name: 'dashboard-panel',
  // props: ['motors'],
  components: {
    LabDisplayPanel,
    LabDetailPanel,
    LabStatusPanel,
    HeaderDetail,
    ServoControlPanel,
    VueTabs,
    VTab
  },
  data () {
    return {
      A: 10,
      counter: 0,
      fromChild: '1',
      fromDetail: '', // This value is set to the value emitted by the child
      toSeeDetail: '',
    }
  },
  methods: {
    onChildClick (value) {
      this.fromChild = value
      console.log("Hichd"+value)
    },
    onUserEnter (value) {
      this.fromDetail = value
      console.log(value)
    },
    onCallDetail (value) {
      this.toSeeDetail = value
      console.log(value)
    }
  },
  computed: {
    ...mapGetters(['labStatus']),
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