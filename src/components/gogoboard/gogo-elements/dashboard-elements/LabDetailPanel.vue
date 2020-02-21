<template>
  <div class="lab-detail-panel">
    <div class="row justify-content-center">

        <span>{{ 'gogoboard.labdetail_panel.lab1' | translate }}</span><br><br>

        <div class="row">
            <div class="col-sm-12">
                <fieldset>
                <div class="form-group form-group-w-btn">
                    <div class="input-group">
                    <input id="input-w-btn" maxlength="4" required v-model="text7segment"/>
                    <label class="control-label" for="input-w-btn">{{'gogoboard.labdetail_panel.name'
                        | translate}}</label><i class="bar"></i>
                    </div>
                    <div class="btn btn-micro btn-primary" v-on:click="showText()">
                    {{'gogoboard.labdetail_panel.enter' | translate}}
                    </div>
                </div>
                </fieldset>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 text-center">
                {{'gogoboard.labdetail_panel.see_detail' | translate}} :
                <div class="btn btn-micro btn-warning" v-on:click="showText()">
                    {{'gogoboard.labdetail_panel.detail' | translate}}
                </div>
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
  name: 'lab-detail-panel',
  components: {
    vueSlider,
    VueSlideBar
  },
  data() {
    return {
      servoHead: 10,
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
