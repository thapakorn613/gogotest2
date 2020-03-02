// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import VuesticPlugin from 'vuestic-theme/vuestic-plugin'
import './i18n'
import YmapPlugin from 'vue-yandex-maps'

import VueNativeSock from 'vue-native-websocket'
import VueResource from 'vue-resource'
import Tooltip from 'vue-directive-tooltip'
// import 'vue-directive-tooltip/css/index.css' // artRonin
import VueAnalytics from 'vue-analytics'


// import firebase from 'firebase'

// console.log(fb)
// import Vuebar from 'vuebar'

// import VueCircle from 'vue2-circle-progress'

// import 'vue-awesome/icons/flag'
// import 'vue-awesome/icons'

// import Icon from 'vue-awesome/components/Icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileImport, faFolderOpen, faFileDownload, faShareAlt, faFile, faSave, faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import VueMomentLib from 'vue-moment-lib'
import VueLocalStorage from 'vue-localstorage'

import VueSweetalert2 from 'vue-sweetalert2'

import fb from 'services/firebaseConfig'

Vue.use(require('vue-moment'))

Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)

Vue.use(VueNativeSock, 'ws://localhost:8317', {
  store: store,
  reconnection: true,
  reconnectionDelay: 3000,
  format: 'json',
})
Vue.use(VueResource)
Vue.use(Tooltip, {
  delay: 50,
  placement: 'buttom',
  class: 'custom-tooltip',
  // triggers: ['hover'],
  offset: 8
})
// Vue.use(Vuebar)
// Vue.use(VueCircle)

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, { fieldsBagName: 'formFields' })

Vue.use(VueAnalytics, {
  id: 'UA-83816046-15',
  router,
  autoTracking: {
    exception: true
  },
  debug: {
    enabled: false,
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

library.add(faFileImport)
library.add(faFolderOpen)
library.add(faFileDownload)
library.add(faShareAlt)
library.add(faFile)
library.add(faSave)
library.add(faFolder)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.use(VueMomentLib)
Vue.use(VueLocalStorage)

Vue.use(VueSweetalert2)

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
    store.dispatch('toggleSidebar', true)
  } else {
    store.dispatch('toggleSidebar', false)
  }
}

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get () {
      return EventBus
    }
  },
  $swalSuccess: {
    get () {
      return this.$swal.mixin({
        type: 'success',
        customClass: 'success',
        // title: this.$t('program.messages.opened_title'),
        // text: this.$t('program.messages.open_success'),
        showConfirmButton: false,
        timer: 4500,
      })
    }
  },
  $swalConfirm: {
    get () {
      return this.$swal.mixin({
        title: this.$t('global.warning_confirm.title'),
        text: this.$t('global.warning_confirm.message'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b0e049',
        cancelButtonColor: '#e34a4a',
        confirmButtonClass: 'sweet-aleart-button-class',
        cancelButtonClass: 'sweet-aleart-button-class',
        confirmButtonText: this.$t('global.warning_confirm.yes'),
        cancelButtonText: this.$t('global.warning_confirm.cancel'),
      })
    }
  },
  $swalNotSelect: {
    get () {
      return this.$swal.mixin({
        title: this.$t('gogoboard.labdisplay_panel.notselect'),
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#b0e049',
        cancelButtonColor: '#e34a4a',
        confirmButtonClass: 'sweet-aleart-button-class',
        cancelButtonClass: 'sweet-aleart-button-class',
        confirmButtonText: this.$t('global.warning_confirm.yes'),
        cancelButtonText: this.$t('global.warning_confirm.cancel'),
      })
    }
  },
  $swalDetail1: {
    get () {
      return this.$swal.mixin({
        title: this.$t('gogoboard.labdetail_panel.lab1'),
        width: 600,
        // text: this.$t('gogoboard.labdetail_panel.lab1_detail.head'),
        html: this.$t('gogoboard.labdetail_panel.lab1_detail.head'),
        imageUrl: '/static/gogo-img/demo-carControl.png',
        imageWidth: 240,
        imageHeight: 200,
        // text: this.$t('gogoboard.labdetail_panel.sub_head'),
        // type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#b0e049',
        cancelButtonColor: '#e34a4a',
        confirmButtonClass: 'sweet-aleart-button-class',
        cancelButtonClass: 'sweet-aleart-button-class',
        confirmButtonText: this.$t('global.warning_confirm.ok'),
        cancelButtonText: this.$t('global.warning_confirm.cancel'),
      })
    }
  },
  $swalDetail2: {
    get () {
      return this.$swal.mixin({
        title: this.$t('gogoboard.labdetail_panel.lab2'),
        text: this.$t('gogoboard.labdetail_panel.lab2_detail.head'),
        // type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#b0e049',
        cancelButtonColor: '#e34a4a',
        confirmButtonClass: 'sweet-aleart-button-class',
        cancelButtonClass: 'sweet-aleart-button-class',
        confirmButtonText: this.$t('global.warning_confirm.ok'),
        cancelButtonText: this.$t('global.warning_confirm.cancel'),
      })
    }
  },
  $swalDetail3: {
    get () {
      return this.$swal.mixin({
        title: this.$t('gogoboard.labdetail_panel.lab3'),
        text: this.$t('gogoboard.labdetail_panel.see_detail'),
        // type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#b0e049',
        cancelButtonColor: '#e34a4a',
        confirmButtonClass: 'sweet-aleart-button-class',
        cancelButtonClass: 'sweet-aleart-button-class',
        confirmButtonText: this.$t('global.warning_confirm.ok'),
        cancelButtonText: this.$t('global.warning_confirm.cancel'),
      })
    }
  },
  $swalSaving: {
    get () {
      return this.$swal.mixin({
        title: this.$t('global.saving.title'),
        type: 'info',
        onOpen: () => {
          this.$swal.showLoading()
        }
      })
    }
  },
  $swalLoading: {
    get () {
      return this.$swal.mixin({
        title: this.$t('global.loading.title'),
        type: 'info',
        onOpen: () => {
          this.$swal.showLoading()
        }
      })
    }
  },
  $swalHide: {
    get () {
      return this.$swal.close
    }
  },
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyBKCoorcXlrk0E8ZMdiVDJRzqYvXYeMcOM',
    //   authDomain: 'gogo-code.firebaseapp.com',
    //   databaseURL: 'https://gogo-code.firebaseio.com',
    //   projectId: 'gogo-code',
    //   storageBucket: 'gogo-code'
    // })

    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //   }
    // })

    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        // console.log('Auto SignIn')

        fb.projectsCollection
          .where('userId', '==', this.$store.getters.user.id)
          .orderBy('updatedAt', 'desc')
          .onSnapshot((docs) => {
            let projects = []

            docs.forEach(doc => {
              let record = doc.data()
              record.id = doc.id
              projects.push(record)

              // if (doc.id === this.$store.getters.program.currentProjectId) {
              //   console.log('sense change\t', record.fileId)
              //   this.$bus.$emit('openProject', record.fileId)
              // }
            })
            this.$store.dispatch('setUserProjects', projects)
            // this.$bus.$emit('setUserProject', projects)
            // this.$bus.$emit('setProjectLoadingStatus', false)
          })
        // // ================= Get Token =================
        // fb.auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
        //   console.log(idToken)
        // }).catch((error) => {
        //   // Handle error
        //   console.log('Error', error)
        // })
      } else {
        this.$store.dispatch('setUserProjects', [])
      }
    })


    // *********** Set Language ************ //
    if (this.$localStorage.get('lang')) {
      Vue.i18n.set(this.$localStorage.get('lang'))
    }
  }
})


// export const firebaseP = firebase
