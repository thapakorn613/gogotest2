<template>
  <div></div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import notification from 'services/notification'

  export default {
    name: 'global-monitor',
    props: {
    },
    data () {
      return {
        show: false,
      }
    },
    mounted () {
    },
    methods: {
    },
    computed: {
      ...mapGetters({
        rpi: 'rpi'
      }),
    },
    watch: {
      rpi (newVal, oldVal) {
        if (newVal.wifiStatusCode !== oldVal.wifiStatusCode) {
          if (!newVal.wifiStatusCode) return

          var text = this.$t('raspberry.wifi_status.' + newVal.wifiStatusCode)

          if (newVal.wifiStatusCode === 1) {
            notification.info(text)
          } else if (newVal.wifiStatusCode === 2) {
            notification.success(text)
          } else {
            notification.info(text)
          }
        }

        if (newVal.revision !== oldVal.revision) {
          notification.info(this.$t((newVal.revision !== 0) ? 'raspberry.messages.pi_is_on' : 'raspberry.messages.pi_is_disconnected'))
          this.$ga.event('device', 'pi', (newVal.revision !== 0) ? 'connect' : 'disconnect', null)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>