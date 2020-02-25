<template>
  <div class="lab-status-panel">
    <div class="row justify-content-center">
        <span>{{ 'gogoboard.labdetail_panel.' + 'lab' + parentData | translate }}</span>
        
        <!--<div class="btn btn-micro btn-primary" @click="switchLab(1)" v-on:click="isActive = 1" v-bind:class="{ 'focus': isActive == 1}">
          {{'gogoboard.lab_panel.lab1' | translate}}
        </div>-->
        <!--<div v-if="lab == 0">
          A
        </div>-->



        <div class="row">
            <div class="col-sm-12 text-center">
                <p>Name : {{ parentData2 }} </p>
            </div>
            <div class="col-sm-12 text-center">
                {{'gogoboard.labdetail_panel.see_detail' | translate}} :
                <div class="btn btn-micro btn-warning"  @click="etr()">
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
