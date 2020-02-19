module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.SENSOR = '#db3f8d'
  Blockly.Msg.COLOR_SENSOR = Blockly.Color.SENSOR

  Blockly.Msg.ICON_SENSOR = ''
  // Blockly.custom.iconSensor = 'static/site-img/icon/thermometer.svg'

  Blockly.Blocks['input_sensor'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_SENSOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconSensor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.SENSOR_SENSOR)
        .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']]), 'sensor')
      this.setOutput(true, 'Number')
      this.setColour(Blockly.Color.SENSOR)
      this.setTooltip(Blockly.Msg.SENSOR_SENSOR_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['input_switch'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_SENSOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconSensor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.SENSOR_SWITCH_ON_SENSOR)
        .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']]), 'SENSOR')
        .appendField(Blockly.Msg.SENSOR_IS_PRESSED)
      this.setOutput(true, 'Boolean')
      this.setColour(Blockly.Color.SENSOR)
      this.setTooltip(Blockly.Msg.SENSOR_SWITCH_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['input_switch_was_pressed'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_SENSOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconSensor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.SENSOR_IF_SWITCH_ON_SENSOR)
        .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']]), 'SENSOR')
        .appendField(Blockly.Msg.SENSOR_JUST_PRESSED)
      this.appendStatementInput('STATEMENT')
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN)
      this.appendDummyInput()
        .appendField('       ' + Blockly.Msg.LOGIC_ONE_TIME)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.SENSOR)
      this.setTooltip(Blockly.Msg.SENSOR_JUST_PRESSED_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['input_switch_was_released'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_SENSOR)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconSensor, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.SENSOR_IF_SWITCH_ON_SENSOR)
        .appendField(new Blockly.FieldDropdown([['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']]), 'SENSOR')
        .appendField(Blockly.Msg.SENSOR_JUST_RELEASED)
      this.appendStatementInput('STATEMENT')
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN)
      this.appendDummyInput()
        .appendField('       ' + Blockly.Msg.LOGIC_ONE_TIME)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.SENSOR)
      this.setTooltip(Blockly.Msg.SENSOR_JUST_RELEASED_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  return Blockly
}
