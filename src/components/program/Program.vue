<template>
  <div class="d-flex">
    <transition name="slide-fade">
      <VuePerfectScrollbar class="scroll-wrapper" v-once v-if="isShowWidget">
        <div class="wrapper-content"> 
          <program-left-slide />
        </div>
      </VuePerfectScrollbar>
    </transition>

    
    <div class=""><iframe id="programming-frame" :src="'static/tinker/index.html#' + fileId " 
      width="100%" height="600" frameBorder="0" border="0"></iframe>
    </div>
  </div>
</template>

<script>

  import { mapMutations } from 'vuex'
  
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import ProgramLeftSlide from './elements/ProgramLeftSlide'
  // import UserProject from './elements/UserProject'

  // var deviceControl = require('services/deviceControl')
  import deviceControl from 'services/deviceControl'
  import utils from 'services/utils'
  import iframeMessage from 'services/iframeMessage'
  import fb from 'services/firebaseConfig'
  import notification from 'services/notification'

  export default {
    name: 'program',
    components: {
      VuePerfectScrollbar,
      ProgramLeftSlide,
      // UserProject
    },
    data () {
      return {
        fileId: '',
        os: utils.getOS(),
        isWindows: utils.getOS() === utils.type.WINDOWS,
        // isShowWidget: true,
        isReady: false,
      }
    },
    mounted () {
      // console.log('Programming')
      deviceControl.setHttpConnector(this.$http)
      deviceControl.setNoti(this.$toasted)
      deviceControl.setSocket(this.$socket)

      window.onmessage = (e) => {
        var msg = e.data
        // console.log('Message', msg)
        if (typeof msg === 'object') {
          if (!msg.event) {
          } else if (msg.event === 'messageReady') {
            iframeMessage.sendMessage({event: 'setENV', data: process.env.NODE_ENV === 'production'})
            iframeMessage.sendMessage({event: 'conenct'})
          } else if (msg.event === 'responseGetXML') {
            this.uploadToStorage(msg.data)
          } else if (msg.event === 'responseNewfile') {
            this.$store.dispatch('setProjectId', null)
            this.$store.dispatch('setToSaveProjectEmpty')
            this.$bus.$emit('showNewProjectModal', 'clean')
          } else if (msg.event === 'responseOpen') {
            this.$store.dispatch('setProjectId', null)
          } else if (msg.event === 'updateFileId') {
            utils.changeURL(msg.data)
            this.fileId = msg.data
          }
        } else if ('Blockly' in e.source) {
          this.doGogo(msg)
        }
      }

      document.querySelector('#content-wrap').className = ''
      utils.updateIframeSize(!this.isShowWidget)
      window.onresize = (e) => {
        utils.updateIframeSize(!this.isShowWidget)
      }
      this.isReady = true

      var fileId = this.$route.params.id || this.$route.query.id

      if (fileId) {
        // sendMessageToIframe({cloudload: programId})
        // console.log(fileId)
        this.fileId = fileId
      }
    },
    beforeDestroy () {
      if (document.querySelector('#content-wrap')) {
        document.querySelector('#content-wrap').className = 'content-wrap'
      }
    },
    computed: {
      isShowWidget () {
        return this.$store.getters.program.isShowWidget
      },
      // ...mapGetters(['program']),
    },
    watch: {
      isShowWidget (newVal, oldVal) {
        if (newVal !== oldVal && this.isReady) {
          utils.updateIframeSize(!newVal)
        }
      }
    },
    methods: {
      uploadToStorage (content) {
        if (!this.$store.getters.user.id) {
          this.$store.dispatch('setProjectSavingState', false)
          notification.warning(this.$t('program.messages.please_login'))
        } else {
          let data = {
            action: 'link',
            xml: content,
            uid: this.$store.getters.user.id
          }
          this.$http.post('https://gogoapi.learninginventions.org/storage/v2/', data, { emulateJSON: true }).then(
            response => {
              // Success
              // Valid ID ?
              if (response.bodyText.length === 36) {
                this.addOrUpdateProjectToDB(response.bodyText)
              } else {
                this.$store.dispatch('setProjectSavingState', true)
                notification.warning(this.$t('program.messages.unable_to_save'))
              }
            },
            response => {
              this.$store.dispatch('setProjectSavingState', true)
              notification.warning(this.$t('program.messages.unable_to_save'))
              // Error
            }
          )
        }
      },
      addOrUpdateProjectToDB (fileId) {
        notification.info(this.$t('program.messages.saving'))
        // Update to exists document
        if (this.$store.getters.program.currentProjectId) {
          fb.projectsCollection.doc(this.$store.getters.program.currentProjectId).update({
            updatedAt: new Date(),
            fileId: fileId
          }).then((response) => {
            notification.success(this.$t('program.messages.save_success'))
          }).catch(err => {
            notification.warning(this.$t('program.messages.unable_to_save'))
            console.log('Database', '\t', 'Error', err)
          })
        // Add new document
        } else if (this.$store.getters.program.toSaveProject.name) {
          this.addProjectToDB(fileId)
        } else {
          // addProjectToDB(fileId)
        }
      },
      addProjectToDB (fileId) {
        fb.projectsCollection.add({
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: this.$store.getters.user.id,
          fileId: fileId,
          name: this.$store.getters.program.toSaveProject.name,
          desc: this.$store.getters.program.toSaveProject.desc
        }).then((response) => {
          notification.success(this.$t('program.messages.save_success'))
          // console.log('Database', '\t', response)
          this.$store.dispatch('setProjectId', response.id)
        }).catch(err => {
          notification.warning(this.$t('program.messages.unable_to_save'))
          console.log('Database', '\t', 'Error', err)
        })
      },
      ...mapMutations([
        'doGogo', // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
      ]),
    }
  }
</script>

<style lang="scss" scoped>
  
.scroll-wrapper {
  position: relative;
  height: calc(100vh - 72px);;
  width: 360px;
  // margin: 18px;
  padding: 0px;
  background-color:#fff;
  .wrapper-content {
    margin: 13px;
    margin-right: 15px;
  }
}

.program-widget {
  visibility: visible;
  opacity: 1;
  
  transition-delay: 0s;

  &.hide {
    visibility: hidden;
    opacity: 0;
  
    transition: visibility 0s linear 0.33s, opacity 0.33s linear;
  }
}

$transition-time: 100ms;

#programming-frame {
  // -webkit-transition:width $transition-time ease-in-out, height $transition-time ease-in-out;
  // -moz-transition:width $transition-time ease-in-out, height $transition-time ease-in-out;
  // -o-transition:width $transition-time ease-in-out, height $transition-time ease-in-out;
  // transition:width $transition-time ease-in-out, height $transition-time ease-in-out;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  // transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}

</style>

<style lang="scss">

.motor-widget .widget-body {
  padding: 1rem !important;
}

.widget-hide {
  display: none;
}

// #programming-frame {
//   width: calc(100vw - 375px);
// }

</style>
