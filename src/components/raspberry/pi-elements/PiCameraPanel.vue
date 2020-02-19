<template>
  <div class="pi-camera-panel">
    <div class="row">

      <div class="col-lg-3 col-md-4 text-center">

        <div class="row">
          <div class="col-md-12 col-sm-6 col-xs-6 space-top-bottom">
            <img v-if="rpi.cameraActive" src="/static/gogo-img/camera_active.png" width="84" height="84" alt="Camera is active" />
            <img v-else src="/static/gogo-img/camera_inactive.png" width="84" height="84" alt="Camera is inactive" />
            <br>
            <p class="btn-label">{{ 'raspberry.camera.camera_is' | translate }} {{ 'raspberry.camera.' + (rpi.cameraActive ? 'on' : 'off') | translate }}</p>
          </div>

          <div class="col-md-12 col-sm-6 col-xs-6 space-top-bottom">
            <img v-if="rpi.cameraIsFoundFace && rpi.cameraFindFaceActive" width="84" height="84"  src="/static/gogo-img/camera_face_found.png" alt="Found face" />
            <img v-else src="/static/gogo-img/camera_face_not_found.png" width="84" height="84" alt="Not found face" />
            <br>
            <p class="btn-label">{{ 'raspberry.camera.' + ( rpi.cameraFindFaceActive ? (rpi.cameraIsFoundFace ? 'found_face' : 'searching') : 'disabled'  ) | translate }}</p>
          </div>

        </div>
        
      </div>

      <div class="col-lg-5 col-md-8">
       
        <div class="row space-top-bottom" >

          <div class="col-sm-4 text-center">

            <button class="btn btn-primary btn-with-icon rounded-icon" v-on:click="doGogoCmd('rpiUseCamera')">
              <div class="button-motor-control">
                <i class="fa fa-inverse fa-2x fa-minus fa-rotate-90 little-adjust"></i>
              </div>
            </button>
            <p class="btn-label">{{ 'raspberry.camera.use' | translate }} </p>

          </div>

          <div class="col-sm-4 text-center">

            <button class="btn btn-danger btn-with-icon rounded-icon" v-on:click="doGogoCmd('rpiCloseCamera')">
              <div class="button-motor-control">
                <i class="fa fa-inverse fa-2x fa-circle-o"></i>
              </div>
            </button>
            <p class="btn-label">{{ 'raspberry.camera.close' | translate }} </p>            
          </div>

          <div class="col-sm-4 text-center">

            <button class="btn btn-warning btn-with-icon rounded-icon" v-on:click="doCameraCmd('rpiCameraPreview')">
              <div class="button-motor-control">
                <i class="fa fa-inverse fa-2x fa-eye"></i>
              </div>
            </button>
            <p class="btn-label">{{ 'raspberry.camera.preview' | translate }} </p>
            
          </div>

        </div>

        <div class="row space-top-bottom" >

          <div class="col-sm-4 text-center">

            <button class="btn btn-primary btn-with-icon rounded-icon" 
              v-on:click="doGogoCmd('rpiStartFindFace')">
              <div class="button-motor-control">
                <i class="fa fa-inverse fa-2x fa-search"></i>
              </div>
            </button>
            <p class="btn-label">{{ 'raspberry.camera.start_find_face' | translate }}</p>

          </div>

          <div class="col-sm-4 text-center">

            <button class="btn btn-danger btn-with-icon rounded-icon" v-on:click="doGogoCmd('rpiStopFindFace')">
              <div class="button-motor-control">
                <i class="fa fa-inverse fa-2x fa-stop"></i>
              </div>
            </button>
            <p class="btn-label">{{ 'raspberry.camera.stop_find_face' | translate }}</p>
            
          </div>

          <div class="col-sm-4 text-center">

            <button class="btn btn-warning btn-with-icon rounded-icon" v-on:click="doCameraCmd('rpiTakeSnapshot')">
              <div class="button-motor-control">
                <i class="fa fa-inverse fa-2x fa-camera little-adjust"></i>
              </div>
            </button>
            <p class="btn-label">{{ 'raspberry.camera.take_snapshot' | translate }}</p>
            
          </div>

        </div>
      
      </div>

      <div class="col-lg-4 text-center space-top-bottom">
           <img id="previewImage" class="preview-image align-self-center" :src="cameraPreviewImage" alt="current" />
      </div>

    </div>

  </div>
</template>

<script>
  import VueCircle from 'vue2-circle-progress'
  import { mapMutations } from 'vuex'

  export default {
    name: 'pi-camera-panel',
    components: {
      VueCircle
    },
    props: ['rpi'],
    data () {
      return {
        cameraPreviewImage: '/static/gogo-img/rpi_camera_preview.png'
      }
    },
    methods: {
      doCameraCmd (cmd) {
        this.doGogoCmd(cmd)
        window.setTimeout(() => {
          this.updatePreviewImage()
        }, 500)
      },
      updatePreviewImage () {
        if (this.rpi.justIpAddress === '0.0.0.0') {
          this.cameraPreviewImage = '/static/gogo-img/rpi_camera_preview.png'
        } else {
          this.cameraPreviewImage = 'http://' + this.rpi.justIpAddress + ':8888/media/snapshots/current.jpg?t=' + (new Date()).getTime()
          // jQuery('#previewImage').attr('src', this.cameraPreviewImage);
        }
      },
      ...mapMutations([
        'doGogoCmd', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
      ]),
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";


  .full-width {
    width: 100%;
  }
  .preview-image {
    width: 90%;
    max-width: 350px;
  }
</style>
