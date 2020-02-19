module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.PI_EMAIL = Blockly.Msg.COLOR_PI_DEFAULT
  Blockly.Msg.COLOR_PI_EMAIL = Blockly.Color.PI_EMAIL

  Blockly.Msg.ICON_PI_EMAIL = ''

  Blockly.Blocks['send_email'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_EMAIL)

      this.appendValueInput('email')
          .appendField(Blockly.Msg.ICON_PI_EMAIL)
          .appendField(Blockly.Msg.PI_EMAIL_SEND_TO)
      this.appendValueInput('title')
          .appendField(Blockly.Msg.PI_EMAIL_TITLE)
      this.appendValueInput('body')
          .appendField(Blockly.Msg.PI_EMAIL_BODY)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  return Blockly
}
