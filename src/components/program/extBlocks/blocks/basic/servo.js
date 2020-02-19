module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.MOTOR = '#f59d22'
  Blockly.Msg.COLOR_MOTOR = Blockly.Color.MOTOR

  // Blockly.Msg.ICON_MOTOR = ''
  Blockly.Msg.ICON_SERVO_MOTOR = ''

  Blockly.Blocks['servo_seth'] = {
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendValueInput('heading', Number)
        .appendField(Blockly.Msg.ICON_SERVO_MOTOR)
        .appendField(Blockly.Msg.SERVO_SET_HEADING)
      this.setInputsInline(true)
      //    this.appendDummyInput()
      //        .appendField("Set servo heading")
      //        .appendField(new Blockly.FieldTextInput("10"), "heading");
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['servo_lt'] = {
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendValueInput('heading', Number)
        .appendField(Blockly.Msg.ICON_SERVO_MOTOR)
        .appendField(Blockly.Msg.SERVO_LEFT_TURN)
      this.setInputsInline(true)
      //    this.appendDummyInput()
      //        .appendField("Servo left turn")
      //        .appendField(new Blockly.FieldTextInput("10"), "heading");
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['servo_rt'] = {
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendValueInput('heading', Number)
        .appendField(Blockly.Msg.ICON_SERVO_MOTOR)
        .appendField(Blockly.Msg.SERVO_RIGHT_TURN)
      this.setInputsInline(true)
      //    this.appendDummyInput()
      //        .appendField("Servo right turn")
      //        .appendField(new Blockly.FieldTextInput("10"), "heading");
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  return Blockly
}
