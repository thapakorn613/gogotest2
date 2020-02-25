<template>
  <div class="lab-detail-panel">
    <div class="row justify-content-center">
        <span>{{ 'gogoboard.labdetail_panel.' + 'lab1' | translate }}</span><br><br>
        <p>{{ lab }}</p>

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
                <div class="btn btn-micro btn-warning" v-on:click="etr()">
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

//var lab_selected = 99
var lab

export default {
  name: 'lab-detail-panel',
  components: {
    vueSlider,
    VueSlideBar
  },
  data() {
    return {
      message: 'You loaded this page on ',
      lab: 0
      //lab: localStorage.getItem("lab_selected")

    }
  },
  methods: {
    etr () {
      this.$swalDetail({})
      lab = 40
      console.log("88")
    }
  },
  mounted() {

  },
  updated() {    

  },
  computed: {
    labselected () {
      return 99
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
