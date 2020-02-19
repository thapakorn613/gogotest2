module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  // Blockly.Color.PI_CAMERA = '#607d8d'
  // Blockly.Msg.COLOR_PI_CAMERA = Blockly.Color.PI_CAMERA

  Blockly.Blocks['userfid'] = {
    init: function () {
      this.setColour(230)
      this.appendDummyInput()
        .appendTitle('Use RFID')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['read_from_rfid'] = {
    init: function () {
      this.setColour(230)
      this.appendDummyInput()
        .appendTitle('Read from RFID')
      this.setInputsInline(true)
      this.setOutput(true, String)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['write_to_rfid'] = {
    init: function () {
      this.setColour(230)
      this.appendValueInput('NAME')
        .appendTitle('Write to RFID')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  return Blockly
}
