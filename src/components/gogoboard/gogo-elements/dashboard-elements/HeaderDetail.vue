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
      <div slot="title"><i class="fa fa-car"></i> {{'gogoboard.labdetail_panel.lab' + isLab| translate}}</div>

      <!--<div class="row justify-content-left">
        <img src="/static/gogo-img/demo-carControl.png" width="100" height="110">
      </div>-->

        <div class="row">
            <div class="col-sm-3 text-right" style="background-color:lightcyan;"><h5>
                <img src="/static/gogo-img/demo-carControl.png" width="150" height="160"></h5>
            </div>
            <div class="col-sm-3 text-right space" style="background-color:lightcyan;"><h5><p>{{ 'gogoboard.labdetail_panel.lab1_detail.head' | translate}} :</p></h5></div>
            <div class="col-sm-6 space" style="background-color:lavender;"><h6><p>{{ 'gogoboard.labdetail_panel.lab1_detail.head1' | translate}}</p></h6></div>
            <div class="col-sm-6 text-right space" style="background-color:lightcyan;"><h5><p>{{ 'gogoboard.labdetail_panel.lab1_detail.tool' | translate}} :</p></h5></div>
            <div class="col-sm-6 space" style="background-color:lavender;"><h6><p>{{ 'gogoboard.labdetail_panel.lab1_detail.tool1' | translate}}<br>
            {{ 'gogoboard.labdetail_panel.lab1_detail.tool2' | translate}}</p></h6></div>

            <!--<div class="col-lg-2 text-left" style="background-color:green;"><h6><p>{{ 'gogoboard.labdetail_panel.lab1_detail.head' | translate}} :</p></h6>
                <div class="row">
                <div class="col-sm-12 text-left" style="background-color:blue;">
                    <h6><p>{{ 'gogoboard.labdetail_panel.lab1_detail.tool' | translate}} :</p></h6>
                </div>
                </div>
            </div>
            <div class="col-sm-6 text-left" style="background-color:white;"><h6><p>{{ 'gogoboard.labdetail_panel.lab1_detail.head1' | translate}}</p></h6>
                <div class="row">
                <div class="col-sm-12 text-left">
                    <h6><p>{{ 'gogoboard.labdetail_panel.lab1_detail.tool1' | translate}}</p></h6>
                </div>
                </div>
            </div>-->
        </div>

      <hr width="50%">
      
    </vuestic-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import notification from 'services/notification'

const releaseUrl =
  'https://api.github.com/repos/gogoremote/remotelab-plugin/releases/latest'
const macUrl =
  'https://github.com/LILCMU/gogo-plugin/releases/download/v0.9.4/gogo-plugin-0.9.4.dmg'
const winUrl =
  'https://github.com/gogoremote/remotelab-plugin/releases/download/1.0.0/GoGo.Plugin-Remote.Lab.msi'

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
.spacehead {
  margin-top: 20px;
  margin-bottom: 60px;
}

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
