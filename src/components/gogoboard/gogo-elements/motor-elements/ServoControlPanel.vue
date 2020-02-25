<template>
  <div class="servo-control-panel">
    <p class="space-top-bottom">
    <div class="row">

        <div class="col-sm-4 text-right">
        <p>{{ 'gogoboard.servo.servo_head' | translate }}</p>
        </div>

        <div class="col-sm-5 justify-content-center">

        <!-- <VueSlideBar
            v-model="servoHead"
            :min="10"
            :max="40"
            :tooltipStyles="{ backgroundColor: '#3498db', borderColor: '#3498db' }">
        </VueSlideBar> -->
        <vue-slider ref="servoSlider" v-model="servoHead" :min="10" :max="40"></vue-slider>

        <fieldset>
            <div class="form-group with-icon-left">
                <div class="input-group">
                    <input type="number" maxlength="4" min="10" max="40" step="1" v-model="servoHead"/>
                    <i class="fa fa-long-arrow-up icon-left input-icon"></i>
                    <i class="bar"></i>
                </div>
            </div>
        </fieldset>

        </div>

        <div class="col-sm-3 text-center">
          <div class="motor-cmd-area">
              <button class="btn btn-info btn-with-icon rounded-icon" 
                v-tooltip.bottom="$t('gogoboard.servo.set_head')"
                v-on:click="setServoHead()">
                <div class="button-motor-control">
                    <i class="fa fa-inverse fa-2x fa-long-arrow-up shift-right"></i>
                </div>
              </button>
              <!-- <p class="btn-label">{{ 'gogoboard.servo.set_duty' | translate }}</p> -->
          </div>
        </div>

    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import vueSlider from 'vue-slider-component'
import VueSlideBar from 'vue-slide-bar'
import { setInterval } from 'timers'

export default {
  name: 'servo-control-panel',
  components: {
    vueSlider,
    VueSlideBar
  },
  data() {
    return {
      servoHead: 20,
    //   servoSliderOption: {
    //     // eventType: 'auto',
    //     // width: 'auto',
    //     // height: 10,
    //     // dotSize: 16,
    //     min: 10,
    //     max: 40
    //     // interval: 1,
    //     // show: true,
    //     // speed: 1,
    //     // tooltipDir: 'top',
    //   }
    }
  },
  methods: {
    setServoHead() {
      this.doGogoCmdObj({
        cmd: 'setServoDuty',
        params: this.servoHead
      })
    },
    ...mapMutations([
      'doGogoCmdObj' // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
    ])
  },
  mounted() {
    setInterval(() => {
      this.$nextTick(() => {
        if (this.$refs.servoSlider !== undefined) {
            this.$refs.servoSlider.refresh()
        }
      })
    }, 500)
  },
  updated() {    
    this.$nextTick(() => this.$refs.servoSlider.refresh())
    this.setServoHead()

  },
  computed: {
    // ...mapGetters(['gogoControls'])
  }
}
</script>

<style lang="scss" scoped>
</style>
