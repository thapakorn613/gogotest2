<template>
  <div class="motor-control-panel">
    
    <div class="row justify-content-center">

        <div class="motor-cmd-area">
        <button id="gogo-on-icon" class="btn btn-info btn-with-icon rounded-icon" 
            v-tooltip.bottom="{ content: $t('gogoboard.motor.on') }"
            v-on:click="doGogoCmd('motorOn')">
            <div class="button-motor-control">
            <i class="fa fa-inverse fa-2x fa-minus fa-rotate-90 little-adjust"></i>
            </div>
        </button>
        <!-- <p class="btn-label">ON</p> -->
        </div>

        <div class="motor-cmd-area">
        <button class="btn btn-info btn-with-icon rounded-icon" 
            v-tooltip.bottom="$t('gogoboard.motor.off')"
            v-on:click="doGogoCmd('motorOff')">
            <div class="button-motor-control">
            <i class="fa fa-inverse fa-2x fa-circle-o"></i>
            </div>
        </button>
        <!-- <p class="btn-label">OFF</p> -->
        </div>

        <div class="motor-cmd-area">
        <button class="btn btn-warning btn-with-icon rounded-icon" 
            v-tooltip.bottom="$t('gogoboard.motor.ccw')"
            v-on:click="doGogoCmd('motorCCW')">
            <div class="button-motor-control">
            <i class="fa fa-inverse fa-2x fa-undo"></i>
            </div>
        </button>
        <!-- <p class="btn-label">CCW</p> -->
        </div>

        <div class="motor-cmd-area">
        <button class="btn btn-warning btn-with-icon rounded-icon" 
            v-tooltip.bottom="$t('gogoboard.motor.rd')"
            v-on:click="doGogoCmd('motorRD')">
            <div class="button-motor-control">
            <i class="fa fa-inverse fa-2x fa-refresh"></i>
            </div>
        </button>
        <!-- <p class="btn-label">RD</p> -->
        </div>

        <div class="motor-cmd-area">
        <button class="btn btn-warning btn-with-icon rounded-icon" 
            v-tooltip.bottom="$t('gogoboard.motor.cw')"
            v-on:click="doGogoCmd('motorCW')">
            <div class="button-motor-control">
            <i class="fa fa-inverse fa-2x fa-repeat"></i>
            </div>
        </button>
        <!-- <p class="btn-label">CW</p> -->
        </div>    
        
    </div>
    <p><br>
    <div class="row">

        <div class="col-sm-4 text-right">
        <p>{{ 'gogoboard.motor.motor_power' | translate }}</p>
        </div>

        <div class="col-sm-5 justify-content-center">

        <!-- <VueSlideBar
            v-model="motorPower"
            :min="0"
            :max="100"
            >
        </VueSlideBar> -->
        <vue-slider ref="motorSlider" v-model="motorPower"></vue-slider>

        <fieldset>
            <div class="form-group with-icon-left">
                <div class="input-group">
                    <input type="number" maxlength="4" min="0" max="100" step="1" v-model="motorPower"/>
                    <i class="fa fa-flash icon-left input-icon"></i>
                    <i class="bar"></i>
                </div>
            </div>
        </fieldset>

        </div>

        <div class="col-sm-3 text-center">
            <div class="motor-cmd-area">
                <button class="btn btn-info btn-with-icon rounded-icon" 
                    v-tooltip.bottom="$t('gogoboard.motor.set_power')"
                    v-on:click="setMotorPower()">
                    <div class="button-motor-control">
                        <i class="fa fa-inverse fa-2x fa-flash shift-right"></i>
                    </div>
                </button>
                <!-- <p class="btn-label">{{ 'gogoboard.motor.set_power' | translate }}</p> -->
            </div>
        </div>

    </div>
            
</div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import vueSlider from 'vue-slider-component'
import VueSlideBar from 'vue-slide-bar'

export default {
  name: 'motor-control-panel',
  components: {
    vueSlider,
    VueSlideBar
  },
  data () {
    return {
      motorPower: 100,
      text: {
          ok: this.$t('gogoboard.motor.set_power')
      }
    }
  },
  methods: {
    setMotorPower () {
      this.doGogoCmdObj( {
        cmd: 'setPower',
        params: this.motorPower
      } )
    },
    ...mapMutations([
        'doGogoCmd', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
        'doGogoCmdObj', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
    ]),
  },
  mounted () {
      setTimeout(() => {
        if (this.$refs.motorSlider !== undefined) {
            this.$nextTick(() => this.$refs.motorSlider.refresh());
        }
      }, 300)
  },
  updated () {
    this.$nextTick(() => this.$refs.motorSlider.refresh());
  },
  computed: {
    // ...mapGetters(['gogoControls'])
  }
}
</script>

<style lang="scss" scoped>
.motor-cmd-area {
//   margin-left: 5px;
  margin-right: 5px;
}
</style>
