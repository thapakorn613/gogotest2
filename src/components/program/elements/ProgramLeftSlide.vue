<template>
  <div class="program-left-slide">
    <vuestic-widget class="chat-widget dashboard-widget" 
        :icon="'a fa-check-circle-o'"
        :headerBgColor="'#4287f5'" :headerTextColor="'#fff0dc'"
        :headerText="$t('gogoboard.headers.dashboards')">
        <dashboard-panel :irValue="gogo.irValue"></dashboard-panel>
    </vuestic-widget>

    <vuestic-widget class="chat-widget lab-widget" 
        :icon="'fa fa-youtube-play'"
        :headerBgColor="'#4287f5'" :headerTextColor="'#fff0dc'"
        :headerText="$t('gogoboard.headers.videos')">
        <lab-panel :irValue="gogo.irValue"></lab-panel>
    </vuestic-widget>

    <vuestic-widget class="chat-widget" 
        :icon="'fa-question'"
        :headerBgColor="'#607d8d'" :headerTextColor="'#fbfff3'"
        :headerText="$t('gogoboard.headers.ping')">
        <ping-panel :irValue="gogo.irValue"></ping-panel>
    </vuestic-widget>

    <vuestic-widget class="chat-widget sensor-widget" 
        :icon="'fa-thermometer-three-quarters'"
        :headerBgColor="'#db3f8d'" :headerTextColor="'#f3dde8'"
        :headerText="$t('gogoboard.headers.sensors')">
        <sensor-panel :miniMode="true"></sensor-panel>
    </vuestic-widget>
    
    <vuestic-widget class="chat-widget motor-widget" 
        :icon="'fa-toggle-on'"
        :headerBgColor="'#f3a73c'" :headerTextColor="'#fff0dc'"
        :headerText="$t('gogoboard.headers.motors')">
        <motor-panel :motors="gogo.motors"></motor-panel>
    </vuestic-widget>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import notification from 'services/notification'
import MotorPanel from 'components/gogoboard/gogo-elements/MotorPanel.vue'
import SensorPanel from 'components/gogoboard/gogo-elements/SensorPanel.vue'
import DisplayPanel from 'components/gogoboard/gogo-elements/DisplayPanel.vue'
import PingPanel from 'components/gogoboard/gogo-elements/PingPanel.vue'
import LabPanel from 'components/gogoboard/gogo-elements/LabPanel.vue'
import DashboardPanel from 'components/gogoboard/gogo-elements/DashboardPanel.vue'

export default {
  name: 'program-left-slide',
  components: {
    MotorPanel,
    SensorPanel,
    DisplayPanel,
    PingPanel,
    LabPanel,
    DashboardPanel
  },
  props: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    ...mapGetters(['gogo']),
  }
}
</script>

<style lang="scss">
</style>
