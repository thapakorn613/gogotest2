module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.MATH = '180'
  Blockly.Msg.COLOR_MATH = Blockly.Color.MATH

  Blockly.Msg.ICON_MATH = ''

  // Blockly.custom.iconMath = 'static/site-img/icon/calculator.svg'

  // Blockly.Blocks['math_number'] = {
  //   init: function () {
  //     this.setColour(Blockly.Color.MATH)
  //     this.appendDummyInput()
  //     .appendField(new Blockly.FieldTextInput('0', Blockly.FieldTextInput.numberValidator), 'NUM')
  //     this.setOutput(true, 'Number')
  //     this.setTooltip('A number.')
  //   }
  // }

  Blockly.Blocks['math_number'] = {
    init: function () {
      this.setColour(Blockly.Color.MATH)
      this.appendDummyInput()
          // .appendField(new Blockly.FieldTextInput('0'), 'NUM')
          .appendField(new Blockly.FieldNumber(0, 0, Infinity, 1), 'number')
      this.setOutput(true, 'Number')
      this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP)
    }
  }

  Blockly.Blocks['math_number_float'] = {
    init: function () {
      this.setColour(Blockly.Color.MATH)
      this.appendDummyInput()
          // .appendField(new Blockly.FieldTextInput('0'), 'NUM')
          .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.1), 'number')
      this.setOutput(true, 'Number')
      this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP)
    }
  }

  Blockly.Blocks['math_number_servo'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(10, 10, 40, 1), 'number')
      this.setOutput(true, 'Number')
      this.setColour(Blockly.Color.MATH)
      this.setTooltip(Blockly.Msg.MATH_NUMBER_SERVO_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['math_number_motor_power'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(10, 0, 100, 1), 'number')
      this.setOutput(true, 'Number')
      this.setColour(Blockly.Color.MATH)
      this.setTooltip(Blockly.Msg.MATH_NUMBER_MOTOR_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['math_operator'] = {
    init: function () {
      this.setColour(Blockly.Color.MATH)
      this.appendValueInput('1stNum', Number)
      var input = this.appendValueInput('2ndNum', Number)
      input.appendField(new Blockly.FieldDropdown([['+', '+'], ['-', '-'], ['×', '*'], ['÷', '/'], ['%', '%']]), 'op')
      this.setInputsInline(true)
      this.setOutput(true, 'Number')
      this.setTooltip(Blockly.Msg.MATH_OPERATOR_TOOLTIP)
    }
  }

  Blockly.Blocks['math_random'] = {
    category: 'Math',
    init: function () {
      this.setColour(Blockly.Color.MATH)
      this.appendDummyInput().appendField(Blockly.Msg.MATH_RANDOM_NUMBER)
      this.setOutput(true, 'Number')
      this.setTooltip(Blockly.Msg.MATH_RANDOM_TOOLTIP)
    }
  }

  Blockly.Blocks['variable_increase_by'] = {
    category: 'Math',
    init: function () {
      this.setColour(Blockly.Color.MATH)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MATH)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMath, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MATH_INCREASE)
        .appendField(Blockly.LANG_VARIABLES_GET_TITLE)
        .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR')
      // .appendField(this.getFieldValue('VAR'));

      this.appendValueInput('increment', Number)
        .appendField(Blockly.Msg.MATH_BY)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setInputsInline(true)
      this.setOutput(false)
      this.setTooltip(Blockly.Msg.MATH_INCREASE_TOOLTIP)
    },
    getVars: function () {
      return [this.getFieldValue('VAR')]
    },
    renameVar: function (oldName, newName) {
      if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
        this.setTitleValue(newName, 'VAR')
      }
    }
  }

  Blockly.Blocks['variable_decrease_by'] = {


    category: 'Math',
    init: function () {
      this.setColour(Blockly.Color.MATH)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_MATH)
        // .appendField(new Blockly.FieldImage(Blockly.custom.iconMath, Blockly.custom.iconSize, Blockly.custom.iconSize, '*'))
        .appendField(Blockly.Msg.MATH_DECREASE)
        .appendField(Blockly.LANG_VARIABLES_GET_TITLE)

        .appendField(new Blockly.FieldVariable(Blockly.LANG_VARIABLES_GET_ITEM), 'VAR')
      // .appendField(this.getFieldValue('VAR'));

      this.appendValueInput('increment', Number)
        .appendField(Blockly.Msg.MATH_BY)


      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setInputsInline(true)
      this.setOutput(false)
      this.setTooltip(Blockly.Msg.MATH_DECREASE_TOOLTIP)
    },
    getVars: function () {
      return [this.getFieldValue('VAR')]
    },
    renameVar: function (oldName, newName) {
      if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
        this.setTitleValue(newName, 'VAR')
      }
    }
  }






  //   this.appendValueInput( "variable", Number)
  //   .appendField("Increase ");
  //   this.appendValueInput( "increment", Number)
  //   .appendField("by ");


  //   this.setPreviousStatement(true, null);
  //   this.setNextStatement(true, null);






  return Blockly
}
