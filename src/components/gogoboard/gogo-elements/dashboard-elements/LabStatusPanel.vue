<template>
  <div class="lab-status-panel">
    <div class="row justify-content-center">
        <span><h2>{{ 'gogoboard.labdetail_panel.' + 'lab' + parentData | translate }}</h2></span>

        <!--<div class="row">
            <div class="col-sm-6 text-center">
              <p>Name : {{ parentData2 }} </p>
            </div>
        </div>-->

    </div>
    <div class="row">
      <div class="col-sm-6 text-right" style="background-color:white;"><h5>
        <p>{{ 'gogoboard.labstatus_panel.name' | translate }} :</p>
        <div class="row">
          <div class="col-sm-12 text-right" style="background-color:white;">
            <p>{{ 'gogoboard.labstatus_panel.internet' | translate }} :</p>
          </div>
        </div></h5>
      </div>
      <div class="col-sm-6 text-left" style="background-color:white;"><p>{{ parentData2 || 'unknown'}}</p>
        <div class="row">
          <div class="col-sm-12 text-left">
            <p>{{ 'gogoboard.labstatus_panel.internet' | translate }}</p>
          </div>
        </div>
      </div>

      <!--<div class="col-sm-4 text-right">
        <p>{{ 'gogoboard.labstatus_panel.internet' | translate }}</p>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import vueSlider from 'vue-slider-component'
import VueSlideBar from 'vue-slide-bar'
import { setInterval } from 'timers'

//var lab_selected = 99
//var lab

export default {
  name: 'lab-detail-panel',
  props: { 
    parentData: Number,
    parentData2: String,
  },
  components: {
    vueSlider,
    VueSlideBar,
  },
  data() {
    return {
      message: 'You loaded this page on ',
      lab: 1,
      lab_selected : 0,
      form: {
        name: ''
      }
      //lab: localStorage.getItem("lab_selected")

    }
  },
  methods: {
    etr () {
      if(this.parentDat == 1){
        this.$swalDetail1({})
      }else if(this.parentDat == 2){
        this.$swalDetail2({})
      }else if(this.parentDat == 3){
        this.$swalDetail3({})
      }else{
        this.$swalDetail1({})
      }
      this.lab = 0
      console.log(this.lab)
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
