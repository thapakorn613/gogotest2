module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.PI_SMS = Blockly.Msg.COLOR_PI_DEFAULT
  Blockly.Msg.COLOR_PI_SMS = Blockly.Color.PI_SMS

  Blockly.Msg.ICON_PI_SMS = ''

  Blockly.Blocks['send_sms'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_SMS)

      this.appendValueInput('number')
          .appendField(Blockly.Msg.ICON_PI_SMS)
          .appendField(Blockly.Msg.PI_SMS_SEND_TO)
      this.appendValueInput('message')
          .appendField(Blockly.Msg.PI_SMS_WITH_MESSAGE)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  return Blockly
}
