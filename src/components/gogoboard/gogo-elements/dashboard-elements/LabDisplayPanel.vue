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

    <div class="row justify-content-around">

      <div class="lab-area">
        <a id="gogo-lab-icon-a" class="gogo-monitor-lab fa-stack fa-3x" href="javascript:;"
          v-tooltip.top="$t('gogoboard.motor.'+(motors[0].isActive ? 'click_to_unselect' : 'click_to_select')) + ' A'"
          v-bind:class="[true ? 'lab-active' : 'lab-inactive']"
          v-on:click="toggleMotor(0)">
          <i class="motor-port-bg fa fa-circle fa-stack-2x"></i>
          <!--<i class="motor-port-name fa fa-stack-1x ">99</i>-->
          <i class="motor-direction fa fa-stack-2x"
            v-bind:class="[
            motors[0].direction == 'cw' ? 'fa-ban' : '',// ban and unban
            false ? 'lab-active' : 'lab-inactive', // true or false ? true : false
            ]"></i>
        </a>
        <div class="row justify-content-center">
          <span>{{ 'gogoboard.labdisplay_panel.lab1' | translate }}</span>
        </div>
      </div>

      <div class="lab-area">
        <a class="gogo-monitor-motor fa-stack fa-3x" href="javascript:;" 
          v-tooltip.top="$t('gogoboard.motor.'+(motors[1].isActive ? 'click_to_unselect' : 'click_to_select')) + ' B'"
          v-bind:class="[motors[1].isOn ? 'motor-on' : 'motor-off']"
          v-on:click="toggleMotor(1)">
          <i class="motor-port-bg fa fa-circle fa-stack-2x"></i>
          <i class="motor-port-name fa fa-stack-1x ">B</i>
          <i class="motor-direction fa fa-stack-2x"
            v-bind:class="[
            motors[1].direction == 'cw' ? 'fa-repeat' : 'fa-undo',// true or false ? true : false
            motors[1].isActive ? 'motor-'+motors[1].direction : 'motor-inactive',
            ]"></i>
        </a>
        <p v-tooltip.bottom="$t('gogoboard.motor.motor_power')">{{ motors[1].power }}</p>
      </div>

      <div class="motor-area">
        <a class="gogo-monitor-motor fa-stack fa-2x" href="javascript:;" 
          v-tooltip.top="$t('gogoboard.motor.'+(motors[2].isActive ? 'click_to_unselect' : 'click_to_select')) + ' C'"
          v-bind:class="[motors[2].isOn ? 'motor-on' : 'motor-off']"
          v-on:click="toggleMotor(2)">
          <i class="motor-port-bg fa fa-circle fa-stack-2x"></i>
          <i class="motor-port-name fa fa-stack-1x ">C</i>
          <i class="motor-direction fa fa-stack-2x"
            v-bind:class="[
            motors[2].direction == 'cw' ? 'fa-repeat' : 'fa-undo',
            motors[2].isActive ? 'motor-'+motors[2].direction : 'motor-inactive',
            ]"></i>
        </a>
        <p v-tooltip.bottom="$t('gogoboard.motor.motor_power')">{{ motors[2].power }}</p>
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

export default {
  name: 'lab-display-panel',
  // props: ['motors'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    toggleMotor (motorIndex) {
      this.doGogoCmdObj( {
        cmd: 'toggleMotor',
        params: motorIndex
      } )
      // this.gogoControls.toggleMotor(motorIndex)
    },
    ...mapMutations([
      'doGogoCmdObj', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
    ]),
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

.lab-active {
  color: #43eb34;
}

.lab-inactive {
  color: #6f8898;
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
