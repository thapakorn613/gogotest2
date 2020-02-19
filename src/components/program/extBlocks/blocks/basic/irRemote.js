module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.IR_REMOTE = '#f4511e'
  Blockly.Msg.COLOR_IR_REMOTE = Blockly.Color.IR_REMOTE

  Blockly.Msg.ICON_IR_REMOTE = ''

  Blockly.Blocks['input__output__storage_new_ir'] = {
    init: function () {
      this.setColour(Blockly.Color.IR_REMOTE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_IR_REMOTE)
        .appendField(Blockly.Msg.IR_NEW_IR)
      this.setOutput(true, 'Boolean')
      this.setTooltip(Blockly.Msg.IR_NEW_IR_TOOLTIP)
    }
  }


  Blockly.Blocks['input__output__storage_get_ir'] = {
    init: function () {
      this.setColour(Blockly.Color.IR_REMOTE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_IR_REMOTE)
        .appendField(Blockly.Msg.IR_GET_IR)
      this.setOutput(true, null)
      this.setTooltip('')
    }
  }

  return Blockly
}
