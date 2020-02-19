module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  // Blockly.Color.PI_CAMERA = '#607d8d'
  // Blockly.Msg.COLOR_PI_CAMERA = Blockly.Color.PI_CAMERA

  Blockly.Blocks['use_finer_scan'] = {
    init: function () {
      this.setColour(160)
      this.appendDummyInput()
        .appendField('Use Finger Scan')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }



  Blockly.Blocks['identify_finger'] = {
    init: function () {
      this.setColour(160)
      this.appendDummyInput()
        .appendField('Identify Finger')
      this.setInputsInline(true)
      this.setOutput(true, String)
      this.setTooltip('')
    }
  }



  Blockly.Blocks['enroll_finger'] = {
    init: function () {
      this.setColour(160)
      this.appendDummyInput()
        .appendField('Enroll Finger')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  return Blockly
}
