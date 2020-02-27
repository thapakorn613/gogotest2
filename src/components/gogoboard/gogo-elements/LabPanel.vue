<template>
<div class="lab-panel">
    <div class="row">
      <div class="col-sm-12 text-center">
        <fieldset>
          <div class="btn btn-micro btn-primary" @click="switchLab(1)" v-on:click="isActive = 1" v-bind:class="{ 'focus': isActive == 1}">
            {{'gogoboard.lab_panel.lab1' | translate}}
          </div>
          <div class="btn btn-micro btn-primary" @click="switchLab(2)" v-on:click="isActive = 2" v-bind:class="{ 'focus': isActive == 2}">
            {{'gogoboard.lab_panel.lab2' | translate}}
          </div>
          <div class="btn btn-micro btn-primary" @click="switchLab(3)" v-on:click="isActive = 3" v-bind:class="{ 'focus': isActive == 3}">
            {{'gogoboard.lab_panel.lab3' | translate}}
          </div>
          <!-- ******** Show only large Screen ********
          <div class="btn-toolbar d-none " role="toolbar"
            v-bind:class="{ 'd-lg-inline-flex': !isShowWidget, 'd-xl-inline-flex': isShowWidget }">
            <div class="btn-group btn-pale group-undo-redo" role="group" aria-label="First group">
              <button @click="switchLab(1)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isActive }">
                <i class="fa fa-puzzle-piece"></i> Blocks
              </button>
              <button @click="switchLab(2)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isActive }">
                <i class="fa fa-code"></i> Logo Code
              </button>
            </div>
          </div>
          ******************** -->
        </fieldset>
      </div>
    </div>
</div>
</template>
<script>
import deviceControl from 'services/deviceControl'

var labNumber = 0
export default {
  computed: {
    /*isActive () {
      //console.log(labNumber == numb)
      return labNumber
    }*/
  },
  data() {
    return {
      isActive: 0
    }
  },
  methods: {
    switchLab (number) {
      var mQtt_ch
      if(number === 1){
        mQtt_ch = 'Lab1'
        window.open("https://youtu.be/wFGb_3jqFE8?t=192", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
      }else if(number === 2){
        mQtt_ch = 'Lab2'
        window.open("https://youtu.be/IV1mC9yDY4o?t=23", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
      }else if(number === 3){
        mQtt_ch = 'Lab3'
      }
      localStorage.setItem("mQtt_ch", mQtt_ch);
      console.log(number,":",mQtt_ch)
    }
  }
}
</script>