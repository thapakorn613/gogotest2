module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.VOICE_MODULE = '#5cb1d6'
  Blockly.Msg.COLOR_VOICE_MODULE = Blockly.Color.VOICE_MODULE

  Blockly.Msg.ICON_VOICE_MODULE = ''
  Blockly.Msg.ICON_VOICE_MODULE_PLAY = ''

  Blockly.Blocks['recorder_play'] = {
    init: function () {
      this.setColour(Blockly.Color.VOICE_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_VOICE_MODULE)
        .appendField(Blockly.Msg.MOD_VOICE_PLAY_TRACK)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['recorder_next'] = {
    init: function () {
      this.setColour(Blockly.Color.VOICE_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_VOICE_MODULE)
        .appendField(Blockly.Msg.MOD_VOICE_NEXT_TRACK)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['recorder_prev'] = {
    init: function () {
      this.setColour(Blockly.Color.VOICE_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_VOICE_MODULE)
        .appendField(Blockly.Msg.MOD_VOICE_PREV_TRACK)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['recorder_select'] = {
    init: function () {
      this.setColour(Blockly.Color.VOICE_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_VOICE_MODULE)
        .appendField(Blockly.Msg.MOD_VOICE_SELECT_TRACK)
        .appendField(new Blockly.FieldTextInput('N'), 'track')
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['recorder_eraseall'] = {
    init: function () {
      this.setColour(Blockly.Color.VOICE_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_VOICE_MODULE)
        .appendField(Blockly.Msg.MOD_VOICE_ERASE)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }
  return Blockly
}
