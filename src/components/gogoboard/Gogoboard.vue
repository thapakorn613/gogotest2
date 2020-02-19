<template>
  <div class="extra">
    <div class="row">

      <div class="col-md-12 col-lg-7 offset-lg-0 col-xl-6 offset-xl-1">

        <div class="row">
          <div class="col-md-6 d-flex">
            <vuestic-widget class="chat-widget"
              :headerBgColor="'#a5d442'" :headerTextColor="'#fbfff3'"
              :icon="(gogo.info.boardType == 0 ? 'fa-warning' : 'fa-plug')"
              :headerClickAction="handleDisplayHeaderClick"
              :headerText="$t( gogo.info.boardType == 0 ? 'gogoboard.headers.is_not_connected' : 'gogoboard.headers.is_connected')" >
              <display-panel :info="gogo.info"></display-panel>
            </vuestic-widget>
          </div>
          <div class="col-md-6 d-flex">
            <vuestic-widget class="chat-widget"
              :icon="'fa-question'"
              :headerBgColor="'#607d8d'" :headerTextColor="'#fbfff3'"
              :headerText="$t('gogoboard.headers.ping')">
              <ping-panel :irValue="gogo.irValue"></ping-panel>
            </vuestic-widget>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <vuestic-widget class="chat-widget sensor-widget"
              :icon="'fa-thermometer-three-quarters'"
              :headerBgColor="'#db3f8d'" :headerTextColor="'#f3dde8'"
              :headerText="$t('gogoboard.headers.sensors')">
              <sensor-panel></sensor-panel>
            </vuestic-widget>
          </div>
        </div>
      </div>


      <div class="col-md-8 offset-md-2 col-lg-5 offset-lg-0 col-xl-4 d-flex">
        <vuestic-widget class="chat-widget"
          :icon="'fa-toggle-on'"
          :headerBgColor="'#f3a73c'" :headerTextColor="'#fff0dc'"
          :headerText="$t('gogoboard.headers.motors')">
          <!-- <motor-panel :motors="gogo.motors"></motor-panel> -->
          <motor-panel></motor-panel>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
// import OverviewTab from 'components/dashboard/features-tab/FeaturesTab.vue'
// import SetupProfileTab from 'components/dashboard/setup-profile-tab/SetupProfileTab.vue'
// import LeafletMap from 'components/maps/leaflet-maps/LeafletMap.vue'

import MotorPanel from './gogo-elements/MotorPanel.vue'
import SensorPanel from './gogo-elements/SensorPanel.vue'
import DisplayPanel from './gogo-elements/DisplayPanel.vue'
import PingPanel from './gogo-elements/PingPanel.vue'

import { mapGetters } from 'vuex'

import deviceControl from 'services/deviceControl'
// import deviceControl from 'services/deviceControl'
// import enjoyhint from '~enjoyhint/enjoyhint.min.js'
// import EnjoyHinti from 'enjoyhint/jquery.enjoyhint.js'
// import EnjoyHint from 'enjoyhint.js'
// const EnjoyHint = require('enjoyhint.js')
// require('jquery')
// console.log(require('static/modules/enjoyhint/enjoyhint.min.js')())
export default {
  name: 'gogoboard',
  components: {
    // LeafletMap,
    // SetupProfileTab,
    // OverviewTab,

    MotorPanel,
    SensorPanel,
    DisplayPanel,
    PingPanel
  },
  data () {
    return {
      count: 1
    }
  },
  mounted () {
    deviceControl.setSocket(this.$socket)
    this.$bus.$on('startGogoTour', () => {
      this.startTourIfNever()
    })
  },
  destroyed () {
    this.$bus.$off('startGogoTour')
  },
  computed: {
    ...mapGetters(['gogo'])
  },
  methods: {
    startTour () {
      let _this = this
      var enjoyhintInstance = new window.EnjoyHint({
        onStart () {
          // console.log('EnjoyHint start')
        },
        onEnd () {
          // console.log('EnjoyHint End')
          _this.setHasStartedTour()
        },
        onSkip () {
          // console.log('EnjoyHint Skip')
          _this.setHasStartedTour()
        }
      })
      // var enjoyhintSteps = [
      //   {'next .gogo-image-display': 'Checkout <strong>GoGo Board</strong> connectivity'
      //   },
      //   {'next #gogo-beep-icon': 'Click the "Beep" button. Do you hear it\'s <strong>beep</strong>  sound'
      //   },
      //   {'next #gogo-motor-icon-a': 'Now, select <strong>motor A</strong>'
      //   },
      //   {'next #gogo-on-icon': 'Try to turn it on !'
      //   },
      //   {'next .sensor-widget': 'See sensor value changes'
      //   }
      // ]
      var enjoyhintSteps = [
        {'next .gogo-image-display': 'GoGo Board status. <br>A picture of the board should show up here if it is <text class="hint-blue">connected</text> and <text class="hint-orange">turned on</text>.'
        },
        {'next #gogo-beep-icon': 'Click the "<text class="hint-blue">beep</text>" button. <br>You should hear a beep from the GoGo Board.'
        },
        {'next #gogo-motor-icon-a': 'Try out motors. <br>First, <text class="hint-orange">select a motor port</text> you wish to control.<br>e.g. Motor A'
        },
        {'next #gogo-on-icon': 'Press the "<text class="hint-blue">ON</text>" button to turn the motor on.<br>Don’t forget to connect the motor to the port you are controlling.'
        },
        {'end .sensor-widget': '<text class="hint-blue">Sensor values</text> are shown here as bar graphs.<br>Try connecting a few and see how the values change.',
          showNext: false,
          'skipButton': {text: 'End'}
        }
      ]
      enjoyhintInstance.set(enjoyhintSteps)
      enjoyhintInstance.run()
    },
    startTourIfNever () {
      if (!this.hasStartedTour()) {
        this.startTour()
      }
    },
    hasStartedTour () {
      return this.$localStorage.get('hasStartedTour')
      // return false
    },
    setHasStartedTour () {
      this.$localStorage.set('hasStartedTour', true)
    },
    handleDisplayHeaderClick () {
      this.startTour()
    }
  }
}
</script>

<style lang="scss" scoped>

.tabs {
  .overview-tab {
    .explore-row {
      display: none !important;
    }
  }

  .maps-tab {
    height: 500px;
  }
}

.profile-card-widget,
.chat-widget {
  width: 100%;
  .widget-body {
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      width: 100%;
    }
  }
}

.bottom-widgets {
  > div[class^='col'] {
    & > div {
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
.hint-blue {
  color: #00ebe7;
}

.hint-green-blue {
  color: #1ecd97;
}

.hint-red {
  color: #ff4136;
}

.hint-orange {
  color: #ff9500;
}

.hint-pink {
  color: #ff0080;
}
</style>

