module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.PI_DATA_LOGGING = Blockly.Msg.COLOR_PI_DEFAULT
  Blockly.Msg.COLOR_PI_DATA_LOGGING = Blockly.Color.PI_DATA_LOGGING

  Blockly.Msg.ICON_PI_DATA_LOGGING = ''

  Blockly.Blocks['record_as'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_DATA_LOGGING)
      this.appendValueInput('expression')
          .appendField(Blockly.Msg.ICON_PI_DATA_LOGGING)
          .appendField(Blockly.Msg.PI_DATA_RECORD)
          .setCheck(['Boolean', 'Number'])
      this.appendValueInput('string')
          .appendField(Blockly.Msg.PI_DATA_AS)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  return Blockly
}
