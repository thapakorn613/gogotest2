<template>
  <div class="lab-display-panel">
    <!-- <icon label="No Photos" scale="2">
      <icon name="circle" scale="2"></icon>
      <icon name="redo" scale="2" class="alert" style="color:green;"></icon>
    </icon> -->

    <!-- <a class="fa-stack fa-3x" href="javascript:;">
      <i class="motor-port-bg fa fa-circle fa-stack-2x"></i>
      <i class="motor-port-name fa fa-stack-1x fa-inverse">A</i>
      <i class="motor-direction fa fa-repeat fa-stack-2x"></i>
    </a> -->
    <!--<div class="row justify-content-center">
        <span>{{ 'gogoboard.motor.slect_motor_port' | translate }}</span>
        <br><br>
    </div>-->
        <!-- simplest prop - pass a string -->
    <!--<LabDetailPanel title="This is my title"></LabDetailPanel>-->


    <!--<label for="child-input">Child input: </label>
    <input id="child-input" type="text" name="msg" v-model="childMessage" v-on:keyup="emitToParent">-->
    <div class="row justify-content-around">

      <div class="lab-area">
        <a id="gogo-lab-icon-a" class="gogo-monitor-lab fa-stack fa-2x" href="javascript:;"
          v-tooltip.top="$t('gogoboard.motor.'+(motors[0].isActive ? 'click_to_unselect' : 'click_to_select')) + ' A'"
          v-bind:class="[labActive_1 ? 'lab-active' : 'lab-inactive']"
          v-on:click="selectLab(1)" @click="isSelect = 1" >
          <i class="lab-bg fa fa-circle fa-stack-2x"></i>
          <i class="lab-icon lab-icon-1 icon-lab-1 fa-stack-1x "></i>
          <i class="lab-select fa fa-stack-2x"
            v-bind:class="[ isSelect == 1 ? 'fa-circle-o-notch fa-spin' : '' ]"></i>
          <!--<i class="fa fa-circle-o-notch fa-spin fa-stack-2x"></i>-->
          <i class="lab-ban fa fa-stack-2x"
            v-bind:class="[
            false ? 'fa-ban' : '',// ban and unban
            false ? 'lab-ban-active' : 'lab-ban-inactive', // true or false ? true : false
            ]"></i>
          <!--<img src="/static/gogo-img/remote.png" width="70" height="22">-->

        </a>
        <!--<i class="icon-play"></i>-->
        <div class="row justify-content-center">
          <span>{{ 'gogoboard.labdisplay_panel.lab1' | translate }}</span>
        </div>
      </div>

      <div class="lab-area">
        <a id="gogo-lab-icon-a" class="gogo-monitor-lab fa-stack fa-2x" href="javascript:;"
          v-tooltip.top="$t('gogoboard.motor.'+(motors[0].isActive ? 'click_to_unselect' : 'click_to_select')) + ' A'"
          v-bind:class="[labActive_2 ? 'lab-active' : 'lab-inactive']"
          v-on:click="selectLab(2)" @click="isSelect = 2">
          <i class="lab-bg fa fa-circle fa-stack-2x"></i>
          <i class="lab-icon lab-icon-1 icon-lab-2 fa-stack-1x "></i>
          <i class="lab-select fa fa-stack-2x"
            v-bind:class="[ isSelect == 2 ? 'fa-circle-o-notch fa-spin' : '' ]"></i>
          <i class="lab-ban fa fa-stack-2x"
            v-bind:class="[
            false ? 'fa-ban' : '',// ban and unban
            false ? 'lab-ban-active' : 'lab-ban-inactive', // true or false ? true : false
            ]"></i>
        </a>
        <div class="row justify-content-center">
          <span>{{ 'gogoboard.labdisplay_panel.lab2' | translate }}</span>
        </div>
      </div>

      <div class="lab-area">
        <a id="gogo-lab-icon-a" class="gogo-monitor-lab fa-stack fa-2x" href="javascript:;"
          v-tooltip.top="$t('gogoboard.motor.'+(motors[0].isActive ? 'click_to_unselect' : 'click_to_select')) + ' A'"
          v-bind:class="[labActive_3 ? 'lab-active' : 'lab-inactive']"
          v-on:click="selectLab(3)">
          <i class="lab-bg fa fa-circle fa-stack-2x"></i>
          <i class="lab-icon lab-icon-1 icon-lab-3 fa-stack-1x "></i>
          <i class="lab-ban fa fa-stack-2x"
            v-bind:class="[
            true ? 'fa-ban' : '',// ban and unban
            true ? 'lab-ban-active' : 'lab-ban-inactive', // true or false ? true : false
            ]"></i>
        </a>
        <div class="row justify-content-center">
          <span>{{ 'gogoboard.labdisplay_panel.lab3' | translate }}</span>
        </div>
      </div>

      <!--<div class="motor-area">
        <a class="gogo-monitor-motor fa-stack fa-2x" href="javascript:;" 
          v-tooltip.top="$t('gogoboard.motor.'+(motors[3].isActive ? 'click_to_unselect' : 'click_to_select')) + ' D'"
          v-bind:class="[motors[3].isOn ? 'motor-on' : 'motor-off']"
          v-on:click="toggleMotor(3)">
          <i class="motor-port-bg fa fa-circle fa-stack-2x"></i>
          <i class="motor-port-name fa fa-stack-1x ">D</i>
          <i class="motor-direction fa fa-stack-2x"
            v-bind:class="[
            motors[3].direction == 'cw' ? 'fa-repeat' : 'fa-undo',
            motors[3].isActive ? 'motor-'+motors[3].direction : 'motor-inactive',
            ]"></i>
        </a>
        <p v-tooltip.bottom="$t('gogoboard.motor.motor_power')">{{ motors[3].power }}</p>
      </div>-->

    </div>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LabDetailPanel from './LabDetailPanel.vue'

//var lab_selected = 0

export default {
  name: 'lab-display-panel',
  props: ['parentData'],
  components: {
    LabDetailPanel
  },
  data () {
    return {
      childMessage: '',
      labIndex: '',
      isSelect: '',
      labActive: '',
      labActive_1: false,
      labActive_2: false,
      labActive_3: false,
    }
  },
  methods: {
    selectLab (event) {
      //console.log(event)
      this.$emit('childToParent', event)
      var mQtt_ch
      var number = event
      if(number == 1){
        mQtt_ch = 'Lab1'
        //window.open("https://youtu.be/wFGb_3jqFE8?t=192", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
      }else if(number == 2){
        mQtt_ch = 'Lab2'
        //window.open("https://youtu.be/IV1mC9yDY4o?t=23", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
      }else if(number == 3){
        mQtt_ch = 'Lab3'
      }
      localStorage.setItem("mQtt_ch", mQtt_ch);
      console.log(number,":",mQtt_ch)
    },
    ...mapMutations([
      'doGogoCmdObj', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
    ]),
  },
  watch: {
    /*labActive: function (val) {
      console.log(val+":"+this.isLab)
    },*/
    parentData: function (val) {
      switch (val) {
        case "lab-1-active":
          this.labActive_1 = true;
          //console.log('1:'+this.labActive_1)
          break;
        case "lab-1-inactive":
          this.labActive_1 = false;
          //console.log('1:'+this.labActive_1)
          break;
        case 'lab-2-active':
          this.labActive_2 = true;
          //console.log('2:'+this.labActive_2)
          break;
        case 'lab-2-inactive':
          this.labActive_2 = false;
          //console.log('2:'+this.labActive_2)
          break;
        case 'lab-3-active':
          this.labActive_3 = true;
          //console.log('3:'+this.labActive_3)
          break;
        case 'lab-3-inactive':
          this.labActive_3 = false;
          //console.log('3:'+this.labActive_3)
          break;
      }
    }
  },
  mounted () {
  },
  updated () {
  },
  computed: {
    motors() {
      return this.$store.getters.gogo.motors
    }
  }
}
</script>

<style lang="scss" scoped>

.motor-area {
  // width: 25%;
  margin-left: 2px;
  text-align: center;
  margin-right: 2px;
}

.gogo-monitor-motor {
  z-index: auto;
}

.motor-port-name {
  font-family: arial;
  // font-size: x-large;
  font-size: 20px;
}

.lab-select {
  color: rgb(255, 236, 152);
}

.lab-active {
  color: #98FF98;
}

.lab-inactive {
  color: #c7c9ca;
}

.lab-ban-active {
  color: #f10000;
}

.lab-ban-inactive {
  color: #6f8898;
}

.lab-icon-1 {
  color: #000000;
}

.icon-lab-1{
  background-image : url("/static/gogo-img/demo-carControl-black.png");
  background-size: cover;
}

.icon-lab-2{
  background-image : url("/static/gogo-img/demo-lightControl-black.png");
  background-size: cover;
}

.icon-lab-3{
  background-image : url("/static/gogo-img/demo-balancing-black.png");
  background-size: cover;
}

.motor-inactive {
  color: #6f8898;
}

.motor-on {
  color: #e8e517;

  .motor-port-name {
    color: #a58b00;
  }

}

.motor-off {
  // color: #b0bec5;
  color: #89a9bb;


  .motor-port-name {
    color: #fff;
  }
}

.motor-cw {
  // color: #00a858;
  color: #8fd200
}

.motor-ccw {
  // color: #f44336;
  color: #ef5350;
}

.motor-control {
  text-align: center;
  margin: 0px;
}

.motor-control > .md-button {
  margin-left: 2px;
  margin-right: 2px;
}
/*
.motor-control > span {
  font-size: 12px;
}
*/

.normal-font {
  font-size: 12pt;
}
</style>
