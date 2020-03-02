/* eslint-disable */
import Paho from './paho-mqtt.js'
<template>
  <div class="d-flex">
    <transition name="slide-fade">
      <VuePerfectScrollbar class="scroll-wrapper" v-once v-if="isShowWidget">
        <div class="wrapper-content">
          <program-left-slide />
        </div>
      </VuePerfectScrollbar>
    </transition>
    <div id="programming-frame" style="">
      <div class="row no-gutters">
        <div class="col-md-12" id="blocklyArea">
          <div v-if="isBlockMode" id="blocklyDiv" ref="blocklyDiv" style="height: 500px; width: 100%;"></div>
          <!-- <pre v-else v-html="code" id="cmEditor"> </pre> -->
          <transition v-else name="slide-fade">
            <codemirror id="cmEditor" ref="cmEditor" v-model="code" :options="cmEditorOptions" @ready="onCmEditorReady" @input="onCmEditorChange"></codemirror>
          </transition>

        </div>
      </div>

      <footer class="footer row no-gutters justify-content-md-between justify-content-between " v-bind:class="{'justify-content-sm-center' : isShowWidget}">
        <!-- ******** Show only large Screen ******** -->
        <div class="btn-toolbar d-none" role="toolbar" v-bind:class="{ 'd-md-inline-flex': !isShowWidget, 'd-lg-inline-flex': isShowWidget }">
          <div class="btn-group btn-pale group-undo-redo" role="group" aria-label="First group">
            <button @click="handleUndo()" type="button" class="btn btn-pale btn-micro" v-tooltip.top="$t('program.footer.undo')">
              <i class="fa fa-undo"></i>
            </button>
            <button v-if="isBlockMode" @click="handleCleanup()" type="button" class="btn btn-pale btn-micro" v-tooltip.top="$t('program.footer.cleanup')">
              <i class="fa fa-sort"></i>
            </button>
            <button @click="handleRedo()" type="button" class="btn btn-pale btn-micro" v-tooltip.top="$t('program.footer.redo')">
              <i class="fa fa-repeat"></i>
            </button>
          </div>
        </div>

        <!-- ******** Show only large Screen ******** -->
        <div class="btn-toolbar d-none " role="toolbar"
          v-bind:class="{ 'd-lg-inline-flex': !isShowWidget, 'd-xl-inline-flex': isShowWidget }">
          <div class="btn-group btn-pale group-undo-redo" role="group" aria-label="First group">
            <button @click="switchProgramMode(0)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isBlockMode }">
              <i class="fa fa-puzzle-piece"></i> Blocks
            </button>
            <button @click="switchProgramMode(1)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isCodeMode }">
              <i class="fa fa-code"></i> Logo Code
            </button>
          </div>
        </div>

        <!-- ******** Show only small Screen ******** -->
        <!-- <div class="btn-toolbar d-none d-xl-none" role="toolbar"
          v-bind:class="{ 'd-md-inline-flex': !isShowWidget, 'd-md-inline-flex': isShowWidget }"> -->
        
        <div class="btn-toolbar d-inline-flex d-xl-none group-mode-selector" role="toolbar" v-bind:class="{'d-xs-none': isShowWidget, 'hide-when-small': isShowWidget, 'd-lg-none': !isShowWidget}">
          <div class="btn-group btn-pale group-undo-redo" role="group" aria-label="First group">
            <button @click="switchProgramMode(0)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isBlockMode }">
              <i class="fa fa-puzzle-piece"></i>
            </button>
            <button @click="switchProgramMode(1)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isCodeMode }">
              <i class="fa fa-code"></i>
            </button>
          </div>
        </div>

        <div class="btn-toolbar d-inline-flex">
          &#160;
          <button class="btn btn-success btn-with-icon rounded-icon btn-micro btn-run" v-tooltip.top.end="$t('program.footer.run')" v-on:click="doGogoCmdObj({cmd: 'logoRun'})">
            <div class="button-motor-control">
              <i id="run-icon" class="fa fa-inverse fa-play"></i>
            </div>
          </button>&#160;

          <button class="btn btn-danger btn-with-icon rounded-icon btn-micro btn-run d-none d-sm-inline" v-tooltip.top="$t('program.footer.stop')" v-on:click="doGogoCmdObj({cmd: 'logoStop'})">
            <div class="button-motor-control">
              <i class="fa fa-inverse fa-stop"></i>
            </div>
          </button>&#160;
          <button @click="stopLoop()" type="button" class="btn btn-warning btn-micro" v-bind:class="{ 'focus': isCodeMode }">
              <i class="fa fa-ban"></i> STOP LOOP
            </button>
          <!-- Remote Lab -->
          <button @click="handleDownloadToBoard_reMoteLab()" class="btn btn-danger btn-micro  d-none d-lg-inline-flex btn-download" v-tooltip.top.end="$t('program.footer.download')">
            <i class="fa fa-download"></i> {{ 'program.footer.download_short' | translate }}
          </button>


          <!-- ******** Show only large Screen ******** 
          <button @click="handleDownloadToBoard()" class="btn btn-danger btn-micro  d-none d-lg-inline-flex btn-download" v-tooltip.top.end="$t('program.footer.download')">
            <i class="fa fa-download"></i> {{ 'program.footer.download_short' | translate }}
          </button> -->

          <!-- ******** Show only small Screen ******** -->
          <!-- <button @click="handleDownloadToBoard()" class="btn btn-danger btn-micro d-inline-flex d-lg-none"
            v-tooltip.top="$t('program.footer.download')">
            <i class="fa fa-download"></i>
          </button> -->
          <button class="btn btn-danger btn-with-icon rounded-icon btn-micro btn-run d-inline d-lg-none" v-tooltip.top.end="$t('program.footer.download')" @click="handleDownloadToBoard()">
            <div class="button-motor-control">
              <i class="fa fa-download"></i>
            </div>
          </button>

        </div>

      </footer>

      <!-- <footer class="footer row justify-content-between d-none d-xl-flex">
        <div class="btn-toolbar d-inline-flex" role="toolbar">
          <div class="btn-group btn-pale group-undo-redo" role="group" aria-label="First group">
            <button @click="handleUndo()" type="button" class="btn btn-pale btn-micro">
              <i class="fa fa-undo"></i>
            </button>
            <button @click="handleCleanup()" type="button" class="btn btn-pale btn-micro">
              <i class="fa fa-sort"></i>
            </button>
            <button @click="handleRedo()" type="button" class="btn btn-pale btn-micro">
              <i class="fa fa-repeat"></i>
            </button>
          </div>
        </div>
        <div class="btn-toolbar d-inline-flex" role="toolbar">
          <div class="btn-group btn-pale group-undo-redo" role="group" aria-label="First group">
            <button @click="switchProgramMode(0)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isBlockMode }">
              <i class="fa fa-puzzle-piece"></i> Blocks
            </button>
            <button @click="switchProgramMode(1)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isCodeMode }">
              <i class="fa fa-code"></i> Logo Code
            </button>
          </div>
        </div>

        <button @click="handleDownloadToBoard()" class="btn btn-danger btn-micro">
          <i class="fa fa-download"></i> Download
        </button>

      </footer>
      <footer class="footer row justify-content-between d-flex d-xl-none text-center">
        <div class="btn-toolbar d-inline-flex" role="toolbar">
          <div class="btn-group btn-pale group-undo-redo" role="group" aria-label="First group">
            <button @click="handleUndo()" type="button" class="btn btn-pale btn-micro">
              <i class="fa fa-undo"></i>
            </button>
            <button @click="handleCleanup()" type="button" class="btn btn-pale btn-micro">
              <i class="fa fa-sort"></i>
            </button>
            <button @click="handleRedo()" type="button" class="btn btn-pale btn-micro">
              <i class="fa fa-repeat"></i>
            </button>
          </div>
        </div>
        <div class="btn-toolbar d-inline-flex" role="toolbar">
          <div class="btn-group btn-pale group-undo-redo" role="group" aria-label="First group">
            <button @click="switchProgramMode(0)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isBlockMode }">
              <i class="fa fa-puzzle-piece"></i>
            </button>
            <button @click="switchProgramMode(1)" type="button" class="btn btn-primary btn-micro" v-bind:class="{ 'focus': isCodeMode }">
              <i class="fa fa-code"></i>
            </button>
          </div>
        </div>

        <button @click="handleDownloadToBoard()" class="btn btn-danger btn-micro">
          <i class="fa fa-download"></i>
        </button>

      </footer> -->
      <span><input id="fileOpener" ref="fileOpener" type="file" style="display:none;" accept="text/xml" @change="loadTextFromFile"></span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import { mapMutations } from 'vuex'

import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ProgramLeftSlide from './elements/ProgramLeftSlide'

import deviceControl from 'services/deviceControl'
import utils from 'services/utils'
// import iframeMessage from 'services/iframeMessage'
import fb from 'services/firebaseConfig'
import notification from 'services/notification'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python.js'
// import 'codemirror/theme/base16-light.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/edit/closebrackets.js'


// ---------------- Import Core ----------------
import Blockly from 'node-blockly/browser'
// import Th from 'node-blockly/lib/i18n/th'
import En from './i18n/en'
import Th from './i18n/th'

// ---------------- Import Extends ----------------
// import extBlocks from './extBlocks'
import gogoGenrtator from './gogoGenarators'
import toolboxAdvanced from './xml/toolboxAdvanced.js'
import blocklyHelper from './modules/blocklyHelper'
import analyticsHelper from './modules/analyticsHelper'

const extBlocks = require('./extBlocks')(Blockly)

const PROGRAM_MODE =
  {
    BLOCK: 0,
    CODE: 1
  }
export default {
  name: 'program-and-blockly',
  components: {
    VuePerfectScrollbar,
    ProgramLeftSlide,
    codemirror,
    // UserProject
  },
  data () {
    return {
      fileId: '',
      // os: utils.getOS(),
      // isWindows: utils.getOS() === utils.type.WINDOWS,
      // isShowWidget: true,
      programMode: PROGRAM_MODE.BLOCK,
      isReady: false,
      isSaved: true,
      isCodeInEditorChange: true,
      workspace: null,
      code: '',
      beforeSwitchcode: '',
      xmlLogoCode: null,
      isOpenAsCode: true,
      cmEditorOptions: {
        // codemirror options
        tabSize: 2,
        mode: 'text/python',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        autofocus: true,
        // more codemirror options
      }
    }
  },
  created() {
    var mQtt_ch = 'defaultchannel'
    localStorage.setItem("mQtt_ch", mQtt_ch);
    console.log("created:",mQtt_ch)
    deviceControl.mqttconnect()
    //deviceControl.mqttsending("testcreate")
  },
  mounted () {
    document.querySelector('#content-wrap').className = ''

    deviceControl.setHttpConnector(this.$http)
    deviceControl.setNoti(this.$toasted)
    deviceControl.setSocket(this.$socket)
    deviceControl.setSwalSuccess(this.$swalSuccess)

    // ********** Get File ID from url ********** //
    var fileId = this.$route.params.id || this.$route.query.id

    if (fileId) {
      // console.log(fileId)
      this.fileId = fileId
    }
    this.isReady = true

    // ********** Listen events from other components ********** //
    this.$bus.$on('doBlocklyAction', (actionName, params) => {
      // console.log(actionName)
      if (actionName === 'newfile') {
        // this.initWorkspace()
        this.handleNewFile()
      } else if (actionName === 'setXML') {
        if (params && params.data) {
          this.setXmlToWorkspace(params.data, true)
        }
      } else if (actionName === 'open') {
        this.$refs.fileOpener.setAttribute('openType', 'open')
        this.$refs.fileOpener.click()
      } else if (actionName === 'import') {
        this.$refs.fileOpener.setAttribute('openType', 'import')
        this.$refs.fileOpener.click()
      } else if (actionName === 'download') {
        this.handleDownloadIntoFile()
      }
    })

    this.$bus.$on('fethAndSaveWorkspace', () => {
      this.saveCacheWorksapce()
    })

    this.$bus.$on('setLanguage', (lang) => {
      this.setBlocklyLanguage(lang, true)
    })


    // ********** Blockly Integration ********** //
    // extBlocks()
    this.nothing(Th)
    this.nothing(extBlocks)
    gogoGenrtator(Blockly)

    // ********** Set Blockly Language ********** //
    // Blockly.setLocale(En)
    // Blockly.setLocale(Th)
    // this.renderBlockly()
    this.setBlocklyLanguage(Vue.i18n.locale(), true)

    if (this.getFileIdFromUrl()) {
      this.$bus.$emit('forceOpenProject', this.getFileIdFromUrl())
    }

    // ********** Resize the elements when the screen size changes ********** //
    window.onresize = (e) => {
      utils.updateWorkspaceSize(!this.isShowWidget)
      Blockly.svgResize(this.workspace)
    }

    utils.updateWorkspaceSize(!this.isShowWidget)
    Blockly.svgResize(this.workspace)
    window.BlocklyI = Blockly
  },
  beforeDestroy () {
    if (document.querySelector('#content-wrap')) {
      document.querySelector('#content-wrap').className = 'content-wrap'
    }
  },
  destroyed () {
    this.$bus.$off('doBlocklyAction')
    this.$bus.$off('fethAndSaveWorkspace')
    this.$bus.$off('setLanguage')
  },
  computed: {
    isShowWidget () {
      return this.$store.getters.program.isShowWidget
    },
    currentProjectName () {
      return this.$store.getters.program.toSaveProject.name
    },
    isBlockMode () {
      return this.programMode === PROGRAM_MODE.BLOCK
    },
    isCodeMode () {
      return this.programMode === PROGRAM_MODE.CODE
    },
    codemirror () {
      try {
        return this.$refs.cmEditor.codemirror
      } catch (error) {
        console.warn('no code')
      }
    }
  },
  watch: {
    isShowWidget (newVal, oldVal) {
      if (newVal !== oldVal && this.isReady) {
        utils.updateWorkspaceSize(!newVal)
        setTimeout(() => {
          // document.querySelector('.blocklySvg').width = '100%'
          Blockly.svgResize(this.workspace)
        }, 100)
      }
    },
    // programMode (newVal, oldVal) {
    //   if (newVal === PROGRAM_MODE.BLOCK) {
    //     setTimeout(() => {
    //       utils.updateWorkspaceSize(!this.isShowWidget)
    //       this.renderBlockly()
    //       // Blockly.svgResize(this.workspace)
    //     }, 200)
    //   }
    // }
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
      'doGogo', 'doGogoCmdObj' // map `this.doGogoCmd()` to `this.$store.commit('doGogoCmd')`
    ]),

    nothing (param) {
    },
    getFileIdFromUrl () {
      return this.$route.params.id || this.$route.query.id
    },
    renderBlockly () {
      if (this.workspace) {
        this.workspace.removeChangeListener(this.updatedCode)
        // this.code = Blockly.Xml.workspaceToDom(this.workspace)
        this.workspace.dispose()
      }
      Blockly.HSV_SATURATION = 0.65
      // Blockly.HSV_VALUE = 0.7
      this.workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolboxAdvanced,
        zoom: {
          controls: true,
          wheel: false,
          startScale: 1.0,
          maxScale: 1.5,
          minScale: 0.4
        },
        grid: {
          spacing: 45,
          length: 7,
          colour: 'rgba(189, 195, 199, 0.30)',
          snap: false
        }
      })

      // ******* Loading cached workspace ******* //
      try {
        let cachedWorkspaceXml = Blockly.Xml.textToDom(this.getCachedWorkspace())
        // window.cached = cachedWorkspaceXml
        this.extractXmlIntoVar(cachedWorkspaceXml, false, true)
        // ******* Change Program Mode ******* //
        this.detectSavedModeAndChange(cachedWorkspaceXml)
      } catch (e) {
        // console.warn(e)
      }

      // ******* Monitor changing ******* //
      this.workspace.addChangeListener(this.updatedCode)
      // return editor
    },
    detectSavedModeAndChange (xml) {
      // console.log('Saved Mode :', utils.getGogoXmlValue(xml, 'program_mode'))
      if (utils.getGogoXmlValue(xml, 'program_mode') === 'code') {
        Blockly.Xml.domToWorkspace(xml, this.workspace)
        this.workspace.scrollCenter()
        this.isOpenAsCode = true
        this.xmlLogoCode = utils.getGogoXmlValue(xml, 'logo_code')
        // this.code = '' + this.xmlLogoCode

        this.switchProgramMode(PROGRAM_MODE.CODE)
      } else {
        this.isOpenAsCode = false
        Blockly.Xml.domToWorkspace(xml, this.workspace)
        this.workspace.clearUndo()
        this.workspace.scrollCenter()
      }
    },
    setXmlToWorkspace (xmlText, isReplace) {
      if (isReplace) {
        this.workspace.clear()
        Blockly.getMainWorkspace().clear()
        // Blockly.mainWorkspace.clear()
      }

      // console.log(this.workspace.isClearing)
      let workspaceXml = Blockly.Xml.textToDom(xmlText)

      if (!isReplace) {
        workspaceXml = blocklyHelper.filterOutMain(workspaceXml)
      }

      this.extractXmlIntoVar(workspaceXml, false, isReplace)
      // Blockly.Xml.domToWorkspace(workspaceXml, this.workspace)
      this.detectSavedModeAndChange(workspaceXml)
      this.workspace.scrollCenter()

      this.$swalSuccess({
        title: this.$t('program.messages.opened_title'),
        text: this.$t('program.messages.open_success'),
      })
    },
    initWorkspace () {
      this.setXmlToWorkspace(blocklyHelper.workspaceAndMain, true)
    },
    setBlocklyLanguage (lang, reRendering) {
      // console.log(lang)
      if (lang === 'gb') {
        Blockly.setLocale(En)
      } else if (lang === 'th') {
        Blockly.setLocale(Th)
      } else {
        Blockly.setLocale(En)
      }
      if (reRendering) {
        this.renderBlockly()
      }
    },
    getWorkspaceXml () {
      return Blockly.Xml.workspaceToDom(this.workspace)
    },
    getCachedWorkspace () {
      let cached = this.$localStorage.get('currentWorkspace')
      // ********** if it's blank then return main function ********** //
      if (!cached || cached === blocklyHelper.blankWorkspace || !RegExp('type="procedure_procedure"').test(cached)) {
        cached = blocklyHelper.workspaceAndMain
      }
      return cached
      // return blocklyHelper.workspaceAndMain
    },
    getWorkspaceLogoCode () {
      var logoCode = blocklyHelper.filterCode(Blockly.GogoCode.workspaceToCode(this.workspace))
      return blocklyHelper.cleanCode(logoCode)
    },
    getLogoCode () {
      if (this.isBlockMode) {
        return this.getWorkspaceLogoCode()
      } else if (this.isCodeMode) {
        return this.getCodeFromEditor()
      }
    },
    getCodeFromEditor () {
      let editor = this.$refs.cmEditor.codemirror || this.codemirror
      return editor.doc.getValue().trim()
    },
    updatedCode (workspace) {
      this.isSaved = false
      // ********** Save Cache Workspace ********** //
      this.saveCacheWorksapce()
      // this.code = Blockly.GogoCode.workspaceToCode(this.workspace)
      // this.code = this.code.replace(/\n/g, '<br>')

      // ********** Filter generated code ********** //
      // var logoCode = blocklyHelper.filterCode(Blockly.GogoCode.workspaceToCode(this.workspace))
      // this.code = logoCode.replace(/\n/g, '<br>')
      Blockly.GogoCode['userDefinedOp'] = []
      this.code = this.getWorkspaceLogoCode()
    },
    prepareCacheWokspace (isTextFormat, params) {
      let workspaceXml = this.getWorkspaceXml()
      let data = {
        'program_mode': (this.isCodeMode ? 'code' : 'block'),
        'logo_code': this.getLogoCode(),
        'file_name': this.currentProjectName || 'Untitled',
        'timestamp': Date.now(),
        'datetime_iso8601': utils.getDateTimeIso8601(),
        'locale': Vue.i18n.locale(),
        ...params
      }
      // ********** Old way to embed data ********** //
      // workspaceXml = utils.setGogoXmlValue(workspaceXml, 'program_mode', (this.isCodeMode ? 'code' : 'block'))
      // workspaceXml = utils.setGogoXmlValue(workspaceXml, 'logo_code', this.getLogoCode())
      // workspaceXml = utils.setGogoXmlValue(workspaceXml, 'file_name', this.currentProjectName || 'Untitled')
      workspaceXml = utils.setGogoJsonToXml(workspaceXml, data)
      return (isTextFormat ? Blockly.Xml.domToText(workspaceXml) : workspaceXml)
    },
    saveCacheWorksapce () {
      let xmlText = this.prepareCacheWokspace(true)
      this.$store.dispatch('setCurrentWorkspaceXmlText', xmlText)
      this.$localStorage.set('currentWorkspace', xmlText)
    },
    handleNewFile () {
      this.$swalConfirm({})
        .then((result) => {
          if (result.value) {
            this.initWorkspace()

            this.$store.dispatch('setProjectId', null)
            this.$store.dispatch('setToSaveProjectEmpty')

            this.$swalSuccess({
              title: this.$t('program.messages.create_title'),
              text: this.$t('program.messages.create_text'),
            })
              .then(() => {
                this.$bus.$emit('showNewProjectModal', 'clean')
              })
          }
        })
    },
    handleDownloadIntoFile () {
      utils.saveFile(this.currentProjectName, this.prepareCacheWokspace(true, {'is_local_file': 'true'}))
    },
    handleSaveForAnalytics () {
      try {
        var data = {
          hashed_email: (this.$store.getters.user ? analyticsHelper.hashEmail(this.$store.getters.user.email) : ''),
          bid: analyticsHelper.getBrowserId(),
          fw_versoin: this.$store.getters.gogo.info.firmwareVersion,
          board_version: this.$store.getters.gogo.info.boardVersion,
          board_type: this.$store.getters.gogo.info.boardType,
        }
      } catch (error) {

      }

      var workspaceText = this.prepareCacheWokspace(true, data)
      // console.log(workspaceText)

      let toSendData = {
        xml: workspaceText,
        uid: this.$store.getters.user.id
      }

      this.$http.post('https://gogoapi.learninginventions.org/storage/v2/astore', toSendData, { emulateJSON: true })
        // .then(response => {
        //   console.log(response)
        // })
    },
    handleUndo () {
      if (this.isBlockMode) {
        this.workspace.undo(false)
      } else if (this.isCodeMode) {
        let editor = this.codemirror || this.$refs.cmEditor.codemirror
        editor.doc.undo()
      }
    },
    handleRedo () {
      if (this.isBlockMode) {
        this.workspace.undo(true)
      } else if (this.isCodeMode) {
        let editor = this.codemirror || this.$refs.cmEditor.codemirror
        editor.doc.redo()
        // console.log(this.codemirror.doc.getValue())
      }
    },
    handleCleanup () {
      this.workspace.cleanUp()
    },
    handleDownloadToBoard_reMoteLab () {
      //var mQtt_ch = 'Lab1'
      var mQtt_ch = localStorage.getItem("mQtt_ch");
      console.log(mQtt_ch)
      if(mQtt_ch != 'defaultchannel'){
        deviceControl.preCompileVerify(this.getLogoCode(), () => {
          // this.doGogoCmdObj({cmd: 'logoRun'})
        })
        this.saveCacheWorksapce()
        this.handleSaveForAnalytics()
      }else{
        this.$swalNotSelect({})
      }
    },
    handleDownloadToBoard () {
      deviceControl.preCompileVerify(this.getLogoCode(), () => {
        // this.doGogoCmdObj({cmd: 'logoRun'})
      })
      this.saveCacheWorksapce()
      this.handleSaveForAnalytics()
    },
    loadTextFromFile (ev) {
      const file = ev.target.files[0]
      const reader = new FileReader()

      // ********** Load the selected file content ********** //
      reader.onload = e => {
        // ********** Open or Import ********** //
        let isOpenType = ev.target.getAttribute('openType') === 'open'
        let workspaceXml = e.target.result
        this.setXmlToWorkspace(workspaceXml, isOpenType)

        if (isOpenType) {
          this.$store.dispatch('setProjectId', null)
          this.$store.dispatch('setToSaveProjectEmpty')
        }

        // ********** Prepare to open a same file ********** //
        ev.target.value = null
      }
      reader.readAsText(file)
    },
    extractXmlIntoVar (xml, isTextFormat, isReplace) {
      xml = isTextFormat ? Blockly.Xml.textToDom(xml) : xml
      var data = utils.getGogoJsonValuefromXml(xml)
      // console.log(data)
      if (isReplace && data.is_local_file && data.is_local_file === 'true') {
        this.$store.dispatch('setCurrentProject', { name: (data.file_name ? data.file_name : '') })
        this.$store.dispatch('setToSaveProjectName', data.file_name ? data.file_name : '')
      }
      return data

      // console.log('Extract \t', data)
    },
    onCmEditorReady (cm) {
      // window.editor = this.codemirror
      utils.updateWorkspaceSize(!this.isShowWidget)
      this.beforeSwitchcode = (' ' + this.code).trim()
      // console.log(this.beforeSwitchcode)
      // console.log(this.xmlLogoCode)
      if (this.xmlLogoCode) {
        this.beforeSwitchcode = (' ' + this.xmlLogoCode).trim()
        setTimeout(() => {
          // this.code = '' + this.xmlLogoCode
          cm.doc.setValue(this.xmlLogoCode || '')
          this.xmlLogoCode = null
          cm.doc.clearHistory()
        }, 200)
      }
      // console.log(cm.getTextArea())
      // cm.doc.clearHistory()
      this.saveCacheWorksapce()
    },
    onCmEditorChange (newCode) {
      this.isSaved = false
      this.isCodeInEditorChange = this.beforeSwitchcode !== newCode.trim()
      this.saveCacheWorksapce()
    },
    switchProgramMode (mode) {
      // console.log(this.isCodeInEditorChange)
      // if (this.programMode === PROGRAM_MODE.CODE) {
      //   let tmpCode = this.getCodeFromEditor()
      //   console.log(tmpCode)
      //   console.log(tmpCode !== this.beforeSwitchcode)
      // }
      // if (this.programMode === PROGRAM_MODE.CODE && mode === PROGRAM_MODE.BLOCK && (this.isCodeInEditorChange || this.isOpenAsCode)) {
      if (this.programMode === PROGRAM_MODE.CODE && mode === PROGRAM_MODE.BLOCK && ((this.getCodeFromEditor() !== this.beforeSwitchcode) || this.isOpenAsCode)) {
        this.$swalConfirm({})
          .then((result) => {
            if (result.value) {
              this.confimswitchMode(mode)
              this.isOpenAsCode = false
            }
          })
      } else {
        this.confimswitchMode(mode)
      }
    },
    sendmqtt () {
      //location.replace("https://www.google.com")
      deviceControl.mqttsending("cloudbtn")
    },
    stopLoop(){
      deviceControl.stopLoop()
      console.log("Advance STOP LOOP!!!!!")
      deviceControl.mqttsending("Advance STOP LOOP!!!!!")
    },
    open_camera(){
      
    },
    confimswitchMode (mode) {
      this.programMode = mode

      if (this.programMode === PROGRAM_MODE.BLOCK) {
        this.saveCacheWorksapce()
        setTimeout(() => {
          utils.updateWorkspaceSize(!this.isShowWidget)
          // this.saveCacheWorksapce()
          this.renderBlockly()
          Blockly.svgResize(this.workspace)
          // setTimeout(() => {

          // }, 100)
        }, 150)
      } else {
        setTimeout(() => {
          utils.updateWorkspaceSize(!this.isShowWidget)
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  position: relative;
  height: calc(100vh - 72px);
  width: 360px;
  min-width: 360px;
  // margin: 18px;
  padding: 0px;
  background-color: #fff;
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
  transition: all 0.3s ease;
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

.btn-run {
  i.fa {
    font-size: 1rem !important;
  }
}

.btn-download {
  padding: 0.625rem 1.2rem !important;
}

@media all and (max-width: 680px) {
  .group-mode-selector {
    &.hide-when-small {
      display: none !important;
    }
  }
}

.footer {
  .btn-group .btn {
      padding-left: 1rem;
      padding-right: 1rem;
  }
}
</style>

<style lang="scss">
.motor-widget .widget-body {
  padding: 1rem !important;
}

.widget-hide {
  display: none;
}

svg.blocklySvg {
  background-color: #fafafa;
}

.blocklyToolboxDiv {
  background-color: #fff;

  .blocklyTreeRow, .blocklyTreeLabel {
    cursor: pointer;
  }

  .blocklyTreeRow {
    height: 26px;
  }
  .blocklyTreeLabel {
    font-family: "FontAwesome", sans-serif;
    font-size: 14px
  }

  .blocklyTreeIcon {
    // display: inline-block;
    // font: normal normal normal 14px/1 FontAwesome;
    // font-size: 12px;
    // text-rendering: auto;
    // -webkit-font-smoothing: antialiased;

    &::before {
      // content: "\F108";
    }
  }
}

.blocklyText{
  font-family: "FontAwesome", sans-serif;
  font-size: 14px;
}

#programming-frame {
  // width: 500px;
  // width: calc(100vw - 375px);
}

.footer {
  background-color: #fff !important;
  // height: 50px;
  padding: 10px;
  margin-left: 0px;
  position: fixed;
  bottom: 0;
  width: calc(100vw - 360px);
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;

  .group-undo-redo i {
    font-size: 16px;
  }

  #cmEditor {
    // font-size: 14px !important;
    // font-family: monospace !important;
  }

  .box-shadow,
  .btn-group.btn-pale {
    // box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    box-shadow: 0 4px 9.6px 0.4px rgb(217, 217, 217);
  }
}

#cmEditor {
  .CodeMirror-gutter.CodeMirror-linenumbers {
    background-color: #fff;
  }
}

.blocklyBubbleCanvas body.blocklyMinimalBody {
  min-height: 0px;
  height: 0px;
}

// ******* fixed it's overrided by blockly ******* //
.vuestic-navbar .dropdown.navbar-dropdown.show:after {
  z-index: 1;
}

.sweetCancelButtonClass {
  line-height: 1 !important;
  border-radius: 1.875rem !important;
}
</style>
