<template>
  <div class="pi-network-panel">
    <div class="row">

      <div class="col-sm-6 text-center">
        <p>{{ 'raspberry.network.wlan_ip' | translate }}</p>
        <p v-if="rpi.wlanIpAddress == '0.0.0.0'">{{ rpi.wlanIpAddress }}</p>
        <p v-else><a :href="'http://' + rpi.wlanIpAddress + ':8888/'" target="_blank">{{ rpi.wlanIpAddress }}</a></p>
      </div>

      <div class="col-sm-6 text-center">
        <p>{{ 'raspberry.network.lan_ip' | translate }}</p>
        <p v-if="rpi.ipAddress == '0.0.0.0'">{{ rpi.ipAddress }}</p>
        <p v-else><a :href="'http://' + rpi.ipAddress + ':8888/'" target="_blank">{{ rpi.ipAddress }}</a></p>
      </div>

    </div>

    <div class="row">

      <div class="col-md-9 text-center">
        <fieldset>

          <div class="form-group with-icon-left with-icon-right">
            <div class="input-group">
              <input id="input-ssid" maxlength="60" v-model="ssid" required/>
              <i class="fa fa-wifi icon-left input-icon"></i>
              <label class="control-label" for="input-ssid">
                {{'raspberry.network.ssid' | translate}}</label>
              <i class="bar"></i>
              <i class="fa fa-times icon-right input-icon pointer" @click="clear('ssid')" v-if="ssid.length>0"></i>
              <i class="bar"></i>
            </div>
          </div>

          <div class="form-group with-icon-left with-icon-right">
            <div class="input-group">
              <input id="input-pass" maxlength="60" v-model="pass" :type="[ isShowPassword ? 'text' : 'password']"/>
              <i class="fa fa-lock icon-left input-icon"></i>
              <label class="control-label" for="input-pass">
                {{'raspberry.network.password' | translate}}</label>
              <i class="bar"></i>
              <i class="fa fa-times icon-right input-icon pointer" @click="clear('pass')" v-if="pass.length>0"></i>
              <i class="bar"></i>
            </div>
          </div>

          <vuestic-checkbox
            :label="'raspberry.network.show_password' | translate"
            v-model="isShowPassword"/>

        </fieldset>
      </div>

      <div class="col-md-3 text-center">
        <button class="btn btn-primary btn-with-icon rounded-icon" v-on:click="doConnectWifi()">
          <div class="button-motor-control">
            <i class="fa fa-inverse fa-2x fa-wifi little-adjust"></i>
          </div>
        </button>
        <p class="btn-label">{{ 'raspberry.network.connect' | translate }}</p>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'pi-network-panel',
    components: {
    },
    props: ['rpi'],
    data () {
      return {
        ssid: '',
        pass: '',
        isShowPassword: false,
      }
    },
    updated () {

    },
    methods: {
      clear (field) {
        this[field] = ''
      },
      doConnectWifi () {
        this.doGogoCmdObj({type: 'rpi_control', cmd: 'rpiWifiConnect', params: [this.ssid, this.pass]})
        // this.doGogoCmd('rpiWifiConnect' + '::' + this.ssid + '::' + this.pass)
      },
      ...mapMutations([
        'doGogoCmd', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
        'doGogoCmdObj'
      ]),
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";

</style>
