<template>
  <div class="extra">
    <div class="row">

      <div class="col-md-5 offset-md-0 col-lg-4 offset-lg-1 d-flex">
        <vuestic-widget class="chat-widget"
          :headerBgColor="'#a5d442'" :headerTextColor="'#fbfff3'"
          :icon="(rpi.revision== 0 ? 'fa-warning' : 'fa-check-circle')"
          :headerText="$t('raspberry.headers.raspberry_pi') 
            + ' ' 
            + $t(rpi.revision>0 ? 'raspberry.headers.is_connected' : 'raspberry.headers.is_not_connected')">
          <pi-display-panel :rpi="rpi"></pi-display-panel>
        </vuestic-widget>
      </div>

      <div class="col-md-7 col-lg-6 d-flex">
        <vuestic-widget :headerText="$t('raspberry.headers.info')" class="chat-widget"
          :icon="'fa-info'"
          :headerBgColor="'#db3f8d'" :headerTextColor="'#f3dde8'" >
          <pi-info-panel :rpi="rpi"></pi-info-panel>
        </vuestic-widget>
      </div>

    </div>

    <div class="row">

      <div class="col-md-5 offset-md-0 col-lg-4 offset-lg-1 d-flex">
        <vuestic-widget :headerText="$t('raspberry.headers.keyvalue')" class="chat-widget"
          :icon="'fa-envelope'"
          :headerBgColor="'#607d8d'" :headerTextColor="'#e6e6e6'" >
          <pi-keyvalue-panel></pi-keyvalue-panel>
        </vuestic-widget>
      </div>

      <div class="col-md-7 col-lg-6 d-flex">
        <vuestic-widget :headerText="$t('raspberry.headers.network')" class="chat-widget"
          :icon="'fa-wifi'"
          :headerBgColor="'#f3a73c'" :headerTextColor="'#fff0dc'" >
          <pi-network-panel :rpi="rpi"></pi-network-panel>
        </vuestic-widget>
      </div>



    </div>

    <div class="row">

      <div class="col-md-12 offset-md-0 col-lg-10 offset-lg-1 d-flex" v-if="rpi.justIpAddress != '0.0.0.0'">
        <vuestic-widget :headerText="$t('raspberry.headers.homescreen')" class="chat-widget"
          :icon="'fa-home'"
          :headerBgColor="'#795147'" :headerTextColor="'#dad0ce'" >
          <pi-homescreen-panel :rpi="rpi"></pi-homescreen-panel>
        </vuestic-widget>
      </div>

    </div>

    <div class="row">

      <div class="col-md-12 offset-md-0 col-lg-10 offset-lg-1 d-flex">
        <vuestic-widget :headerText="$t('raspberry.headers.camera')" class="chat-widget"
          :icon="'fa-camera'"
          :headerBgColor="'#02a8f4'" :headerTextColor="'#ebf9ff'" >
          <pi-camera-panel :rpi="rpi"></pi-camera-panel>
        </vuestic-widget>
      </div>

    </div>

    
  </div>
</template>

<script>


  import { mapGetters } from 'vuex'

  import PiDisplayPanel from './pi-elements/PiDisplayPanel.vue'
  import PiInfoPanel from './pi-elements/PiInfoPanel.vue'
  import PiNetworkPanel from './pi-elements/PiNetworkPanel.vue'
  import PiHomescreenPanel from './pi-elements/PiHomescreenPanel.vue'
  import PiKeyvaluePanel from './pi-elements/PiKeyvaluePanel.vue'
  import PiCameraPanel from './pi-elements/PiCameraPanel.vue'

  import deviceControl from 'services/deviceControl'

  export default {
    name: 'gogoboard',
    components: {
      PiDisplayPanel,
      PiInfoPanel,
      PiNetworkPanel,
      PiHomescreenPanel,
      PiKeyvaluePanel,
      PiCameraPanel
    },
    data () {
      return {
        count: 1
      }
    },
    mounted () {
      deviceControl.setSocket(this.$socket)
    },
    computed: {
      ...mapGetters(['rpi']),
    }
  }
</script>

<style lang="scss" scoped>
.chat-widget {
  width: 100%;
}
</style>
