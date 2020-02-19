<template>
  <div>
    <button @click="handleUndo()">Undo</button>
    <button @click="handleRedo()">Redo</button>
    <div class="row">
      <div class="col-md-8">
        <div id="blocklyDiv" ref="blocklyDiv" style="height: 600px; width: 100%;"></div>
      </div>
      <div class="col-md-4">
        <div v-html="code" style="font-family: monospace;"> </div>
      </div>
    </div>
  </div>
</template>

<script>
// ---------------- Import Core ----------------
import Blockly from 'node-blockly/browser'
// import Th from 'node-blockly/lib/i18n/th'
import En from './i18n/en'

// ---------------- Import Extends ----------------
// import extBlocks from './extBlocks'
import gogoGenrtator from './gogoGenarators'
import toolboxAdvanced from './xml/toolboxAdvanced.js'
import blocklyHelper from './modules/blocklyHelper'
const extBlocks = require('./extBlocks')(Blockly)


export default {
  name: 'program-blockly',
  components: {
  },
  data () {
    return {
      workspace: null,
      code: ''
    }
  },
  mounted () {
    // var blocklyDiv = document.getElementById('blocklyDiv')
    // this.workspace = Blockly.inject(blocklyDiv, {
    //   toolbox: xmlText
    // })

    // Extend blocks
    // extBlocks()
    this.nothing(En)
    this.nothing(extBlocks)
    gogoGenrtator(Blockly)
    Blockly.setLocale(En)
    this.renderBlockly()

    // window.BlocklyI = Blockly
  },
  beforeDestroy () {

  },
  computed: {
    // ...mapGetters(['program']),
  },
  watch: {
  },
  methods: {
    nothing (param) {
    },
    renderBlockly () {
      if (this.workspace) {
        this.workspace.removeChangeListener(this.updatedCode)
        this.code = Blockly.Xml.workspaceToDom(this.workspace)
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

      // Loading cached workspace
      try {
        let cachedWorkspaceXml = Blockly.Xml.textToDom(this.getCachedWorkspace())
        // let cachedWorkspaceXml = Blockly.Xml.textToDom(this.mainFunction)
        Blockly.Xml.domToWorkspace(cachedWorkspaceXml, this.workspace)
        this.workspace.clearUndo()
        this.workspace.scrollCenter()
      } catch (e) {
        console.warn(e)
      }

      // Monitor changing
      this.workspace.addChangeListener(this.updatedCode)
      // return editor
    },
    getWorkspaceXml () {
      return Blockly.Xml.workspaceToDom(this.workspace)
    },
    getCachedWorkspace () {
      let cached = this.$localStorage.get('currentWorkspace')
      // ********** if it's blank then return main function ********** //
      if (!cached || cached === blocklyHelper.blankWorkspace) {
        cached = blocklyHelper.workspaceAndMain
      }
      return cached
    },
    getLogoCode () {
      var logoCode = blocklyHelper.filterCode(Blockly.GogoCode.workspaceToCode(this.workspace))
      return blocklyHelper.cleanCode(logoCode)
    },
    updatedCode (workspace) {
      Blockly.GogoCode['userDefinedOp'] = []
      // ********** Save Cache Workspace ********** //
      this.$localStorage.set('currentWorkspace', Blockly.Xml.domToText(this.getWorkspaceXml()))
      // this.code = Blockly.GogoCode.workspaceToCode(this.workspace)
      // this.code = this.code.replace(/\n/g, '<br>')

      // ********** Filter generated code ********** //
      var logoCode = blocklyHelper.filterCode(Blockly.GogoCode.workspaceToCode(this.workspace))
      this.code = logoCode.replace(/\n/g, '<br>')
    },
    handleUndo () {
      this.workspace.undo(false)
    },
    handleRedo () {
      this.workspace.undo(true)
    }
  }
}
</script>

<style lang="scss">
</style>
