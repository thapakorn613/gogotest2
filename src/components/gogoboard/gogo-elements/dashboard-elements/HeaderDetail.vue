<template>
  <div class="header-detail">
    <!-- <button class="btn btn-warning" @click="showLargeModal()">
      {{'modal.large' | translate }}
    </button> -->
    <vuestic-modal :show.sync="show" v-bind:large="true" ref="labDetailAlert" 
      :okClass="'none'" :okText="'modal.confirm' | translate"
      :cancelClass="'none'" :cancelText="'modal.cancel' | translate"
      :headerBgColor="'#3298a8'"
      >
      <div slot="title"><i class="fa fa-warning"></i> {{'plugin.noplugin_header' | translate}}</div>
      <div class="row justify-content-center">
        <img src="/static/gogo-img/demo-carControl.png">
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
  name: 'header-detail',
  props: {
    isOpen: {
      type: Boolean,
      required: false
    },
    isLab: {
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
  watch: {
    isOpen: function (val) {
        console.log(val+":"+this.isLab)
        this.showLargeModal()
    }
  },
  mounted () {
    // this.fetchDownloadUrl()
  },
  methods: {
    showLargeModal () {
      this.$refs.labDetailAlert.open()
    },
    hideLargeModal () {
      if (this.$refs.labDetailAlert) {
        this.$refs.labDetailAlert.clickMask()
      }
    }
  },
  computed: {
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
