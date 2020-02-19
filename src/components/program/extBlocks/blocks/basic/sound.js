module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.SOUND = '#607d8d'
  Blockly.Msg.COLOR_SOUND = Blockly.Color.SOUND

  Blockly.Msg.ICON_SOUND = ''

  Blockly.Blocks['action_beep'] = {
    category: 'Action',
    init: function () {
      this.setColour(Blockly.Color.SOUND)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_SOUND)
        .appendField(Blockly.Msg.SOUND_BEEP)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.SOUND_BEEP_TOOLTIP)
    }
  }


  return Blockly
}
