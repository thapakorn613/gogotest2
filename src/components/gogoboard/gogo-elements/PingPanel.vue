<template>
  <div class="ping-panel">
    <!-- {{ $store.getters.program.currentProjectId }}
    <br>
    {{ $store.getters.program.toSaveProject }} -->
    <div class="row justify-content-center">
      <div class="col-sm-4 text-center mb-3">
        <button id="gogo-beep-icon" class="btn btn-info btn-with-icon rounded-icon" 
          v-tooltip.bottom="$t('gogoboard.ping_panel.beep')"
          v-on:click="doGogoCmd('beep')">
          <div class="button-motor-control">
            <i id="beep-icon" class="fa fa-inverse fa-2x fa-bell"></i>
          </div>
        </button>
        <!-- <p class="btn-label">Beep</p> -->
      </div>

      <!-- <div class="col-sm-4 text-center">
        <button class="btn btn-success btn-with-icon rounded-icon" 
          v-tooltip.bottom="$t('gogoboard.button.run')"
          v-on:click="doGogoCmd('logoRun')">
          <div class="button-motor-control">
            <i id="run-icon" class="fa fa-inverse fa-2x fa-play"></i>
          </div>
        </button>
        <p class="btn-label">Run</p>
      </div>

      <div class="col-sm-4 text-center">
        <button class="btn btn-danger btn-with-icon rounded-icon" 
          v-tooltip.bottom="$t('gogoboard.button.stop')"
          v-on:click="doGogoCmd('logoStop')">
          <div class="button-motor-control">
            <i class="fa fa-inverse fa-stop"></i>
          </div>
        </button>
        <p class="btn-label">Stop</p>
      </div> -->
    </div>

    <div class="row">
      <div class="col-sm-12">
        <fieldset>
          <div class="form-group form-group-w-btn">
            <div class="input-group">
              <input id="input-w-btn" maxlength="4" required v-model="text7segment"/>
              <label class="control-label" for="input-w-btn">{{'gogoboard.ping_panel.show_placeholder'
                | translate}}</label><i class="bar"></i>
            </div>
            <div class="btn btn-micro btn-primary" v-on:click="showText()">
              {{'gogoboard.ping_panel.show_button' | translate}}
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 text-center">
        <img src="/static/gogo-img/remote.png" width="70" height="22">&nbsp;&nbsp;
        {{ 'gogoboard.ping_panel.ir_received_code' | translate}} {{ irValue || 0 }}
      </div>
    </div>

  </div>
</template>

<script>

  import { mapMutations } from 'vuex'

  export default {
    name: 'ping-panel',
    props: ['irValue'],
    data () {
      return {
        var: 1,
        text7segment: '',
      }
    },
    methods: {
      showText () {
        this.$ga.event('gogo', 'command', 'showText', null)
        this.doGogoCmd('showShortText' + '::' + this.text7segment + '  ')
      },
      ...mapMutations([
        'doGogoCmd', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
      ]),
    }
  }
</script>

<style lang="scss" scoped>
  #beep-icon {
    // left: 13px;
  }

  #run-icon {
    left: 18px;
  }
</style>
