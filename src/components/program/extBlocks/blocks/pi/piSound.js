module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.PI_SOUND = Blockly.Msg.COLOR_PI_DEFAULT
  Blockly.Msg.COLOR_PI_SOUND = Blockly.Color.PI_SOUND

  Blockly.Msg.ICON_PI_SOUND = ''
  Blockly.Msg.ICON_PI_SAY = ''

  Blockly.Blocks['play_sound'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_SOUND)
      this.appendValueInput('string')
          .appendField(Blockly.Msg.ICON_PI_SOUND)
          .appendField(Blockly.Msg.PI_SOUND_PLAY)
      this.setInputsInline(true)
      this.setPreviousStatement(true, 'null')
      this.setNextStatement(true, 'null')
      this.setTooltip('')
    }
  }

  Blockly.Blocks['stop_sound'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_SOUND)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_SOUND)
          .appendField(Blockly.Msg.PI_SOUND_STOP)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['say'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_SOUND)
      this.appendValueInput('string')
          .appendField(Blockly.Msg.ICON_PI_SAY)
          .appendField(Blockly.Msg.PI_SOUND_SAY)
      this.setInputsInline(true)
      this.setPreviousStatement(true, 'null')
      this.setNextStatement(true, 'null')
      this.setTooltip('')
    }
  }

  return Blockly
}
