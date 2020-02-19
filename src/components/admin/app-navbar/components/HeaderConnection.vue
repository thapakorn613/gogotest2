<template>
  <div class="header-connection">
    <!-- <button class="btn btn-warning" @click="showLargeModal()">
      {{'modal.large' | translate }}
    </button> -->
    <vuestic-modal :show.sync="show" v-bind:large="true" ref="noPluginAlert" 
      :okClass="'none'" :okText="'modal.confirm' | translate"
      :cancelClass="'none'" :cancelText="'modal.cancel' | translate"
      :headerBgColor="'#eee'"
      >
      <div slot="title"><i class="fa fa-warning"></i> {{'plugin.noplugin_header' | translate}}</div>
      <div class="row justify-content-center">
        <img src="static/site-img/plug-slash.png">
      </div>

      <div class="row space justify-content-center text-center">
        <h5>
        {{'plugin.long_desc' | translate }}
        <br><br>
        {{'plugin.long_desc_2nd' | translate }}
        </h5>
      </div>

      <hr width="50%">

      <div class="row justify-content-center">
        <h6>{{'plugin.download' | translate }} </h6>
      </div>

      <div class="row space d-flex justify-content-center text-center">
        <div class="block mac">
          <a :href="macUrl">
            <i class="fa fa-4x fa-apple"></i>
            <p class="btn-label">macOS</p>
          </a>
        </div>
        <div class="block windows">
          <a :href="winUrl">
            <i class="fa fa-4x fa-windows"></i>
            <p class="btn-label">Windows</p>
          </a>
        </div>
      </div>
      
    </vuestic-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import notification from 'services/notification'

const releaseUrl =
  'https://api.github.com/repos/lilcmu/gogo-plugin/releases/latest'
const macUrl =
  'https://github.com/LILCMU/gogo-plugin/releases/download/v0.9.4/gogo-plugin-0.9.4.dmg'
const winUrl =
  'https://github.com/LILCMU/gogo-plugin/releases/download/v0.9.4/gogo-plugin-0.9.4.msi'

export default {
  name: 'header-connection',
  props: {
    isOpen: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      show: false,
      macUrl: macUrl,
      winUrl: winUrl
    }
  },
  mounted () {
    // this.fetchDownloadUrl()
    setTimeout(() => {
      if (!this.socket.isConnected) {
        this.fetchDownloadUrl()
      }
    }, 2 * 1000)

    setTimeout(() => {
      if (!this.socket.isConnected) {
        this.showLargeModal()
        this.$ga.event('web', 'noplugin')

        var pluginChecker = setInterval(() => {
          if (this.socket.isConnected) {
            clearInterval(pluginChecker)
            this.hideLargeModal()
            notification.success(this.$t('plugin.installed_and_runing'))
            this.$bus.$emit('startGogoTour')
          }
        }, 1 * 1000)
      } else {
        this.$bus.$emit('startGogoTour')
      }
    }, 4 * 1000)
  },
  methods: {
    fetchDownloadUrl () {
      this.$http.get(releaseUrl, {}, { emulateJSON: true }).then(
        response => {
          // Success
          var fetchedMacUrl = this.findUrl(response.body.assets, '.dmg')
          var fetchedWinUrl = this.findUrl(response.body.assets, '.msi')

          if (fetchedMacUrl) {
            this.macUrl = fetchedMacUrl
          }

          if (fetchedWinUrl) {
            this.winUrl = fetchedWinUrl
          }
        },
        response => {
          // Error
        }
      )
    },
    findUrl (list, ext) {
      for (var asset of list) {
        if (
          asset.browser_download_url &&
          asset.browser_download_url.endsWith(ext)
        ) {
          return asset.browser_download_url
        }
      }
      return null
    },
    showLargeModal () {
      this.$refs.noPluginAlert.open()
    },
    hideLargeModal () {
      if (this.$refs.noPluginAlert) {
        this.$refs.noPluginAlert.clickMask()
      }
    }
  },
  computed: {
    ...mapGetters(['socket'])
  }
}
</script>

<style lang="scss" scoped>
.space {
  padding-top: 20px;
  padding-bottom: 20px;
}

.block {
  padding-left: 30px;
  padding-right: 30px;
  color: $brand-info;
}

.mac a {
  color: $cc-pink;
}

.windows a {
  color: $brand-info;
}
</style>

<style lang="scss">
.vuestic-modal .modal-content {
  border-radius: 12px;
}
</style>
