module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.MOTOR = '#f3a73c'
  Blockly.Msg.COLOR_MOTOR = Blockly.Color.MOTOR

  Blockly.Msg.ICON_MOTOR = ''

  // Blockly.custom.iconMotor = 'static/site-img/icon/wheel.svg'

  Blockly.Blocks['action_motor'] = {
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MOTOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMotor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MOTOR_TALK_TO)
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'a').appendField('A ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'b').appendField('B ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'c').appendField('C ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'd').appendField('D')

      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.MOTOR_TALK_TO_TOOLTIP)
    }
  }

  Blockly.Blocks['motor_action_turn'] = {
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MOTOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMotor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MOTOR_TURN)
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_ON, 'on'], [Blockly.Msg.MOTOR_OFF, 'off']]), 'turn')
      // var input =  this.appendValueInput( "right", "motor");
      // input.appendField(",");
      // this.setOutput(true, "motor");
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.MOTOR_ONOFF_TOOLTIP)
    }
  }

  Blockly.Blocks['motor_action_onfor'] = {
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      //    this.appendDummyInput().appendField("turn on for")
      //    .appendField(new Blockly.FieldTextInput("1"), "second")
      //    .appendField("second(s)");
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MOTOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMotor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MOTOR_TURN_ON_FOR)
      this.appendValueInput('value', Number)
      this.appendDummyInput()
        .appendField('1/10 ' + Blockly.Msg.MSG_SECONDS)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.MOTOR_TURN_ON_FOR_TOOLTIP)
    }
  }

  Blockly.Blocks['motor_action_thisway'] = {
    category: 'Motor Action',
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MOTOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMotor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MOTOR_TURN_CW, 'cw'], [Blockly.Msg.MOTOR_TURN_CCW, 'ccw']]), 'clockwise')
      // this.appendValueInput( "right", "motor");
      // this.setOutput(true, "motor");
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['motor_action_rd'] = {
    category: 'Motor Action',
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MOTOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMotor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MOTOR_RD)
      // this.appendValueInput( "right", "motor");
      // this.setOutput(true, "motor");
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.MOTOR_RD_TOOLTIP)
    }
  }

  Blockly.Blocks['motor_action_power'] = {
    category: 'Motor Action',
    init: function () {
      this.setColour(Blockly.Color.MOTOR)

      // this.appendDummyInput().appendField("set power").appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]]), "power");

      this.appendValueInput('power', Number)
        .appendField(Blockly.Msg.ICON_MOTOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMotor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MOTOR_SET_POWER)

      // this.appendDummyInput().appendField("set power");
      // this.appendValueInput("power", Number);

      this.setInputsInline(true)
      // this.appendValueInput( "right", "motor");
      // this.setOutput(true, "motor");
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.MOTOR_SET_POWER_TOOLTIP)
    }
  }

  Blockly.Blocks['action_motor_is_on'] = {
    category: 'Action',
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MOTOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMotor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MOTOR)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'a').appendField('A ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'b').appendField('B ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'c').appendField('C ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'd').appendField('D')


      // var input =  this.appendValueInput( "NAME", "motor");
      // input.appendField("to");
      this.appendDummyInput().appendField(Blockly.Msg.MOTOR_IS_ON)
      this.setOutput(true, 'Boolean')
      this.setInputsInline(true)
      this.setPreviousStatement(false, null)
      this.setNextStatement(false, null)
      this.setTooltip(Blockly.Msg.MOTOR_IS_ON_TOOLTIP)
    }
  }

  Blockly.Blocks['action_motor_is_cw'] = {
    category: 'Action',
    init: function () {
      this.setColour(Blockly.Color.MOTOR)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MOTOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMotor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MOTOR)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'a').appendField('A ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'b').appendField('B ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'c').appendField('C ')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'd').appendField('D')


      // var input =  this.appendValueInput( "NAME", "motor");
      // input.appendField("to");
      this.appendDummyInput().appendField(Blockly.Msg.MOTOR_IS_CW)
      this.setOutput(true, 'Boolean')
      this.setInputsInline(true)
      this.setPreviousStatement(false, null)
      this.setNextStatement(false, null)
      this.setTooltip(Blockly.Msg.MOTOR_IS_CW_TOOLTIP)
    }
  }

  return Blockly
}
