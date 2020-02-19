module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.LOGIC = '210'
  Blockly.Msg.COLOR_LOGIC = Blockly.Color.LOGIC

  Blockly.Msg.ICON_LOGIC = ''

  Blockly.Blocks['control_if'] = {
    init: function () {
      this.appendValueInput('condition')
          .setCheck(['Boolean', 'Number'])
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF)
      this.appendStatementInput('statement')
          .setCheck(null)
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN)
      this.setInputsInline(false)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.LOGIC)
      this.setTooltip('If input expression is true, then do some statements.')
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['control_ifelse'] = {
    init: function () {
      this.appendValueInput('condition')
          .setCheck(['Boolean', 'Number'])
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF)
      this.appendStatementInput('if')
          .setCheck(null)
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN)
      this.appendStatementInput('else')
          .setCheck(null)
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
      this.setInputsInline(false)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.LOGIC)
      this.setTooltip(Blockly.Msg.CONTROL_IF_ELSE_TOOLTIP)
      this.setHelpUrl('')
    }
  }


  Blockly.Blocks['control_if_state_change'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF)
      this.appendValueInput('condition')
          .setCheck(['Boolean', 'Number'])
      this.appendDummyInput()
          .appendField(Blockly.Msg.LOGIC_BECOMES_TRUE)
      this.appendStatementInput('statement')
          .setCheck(null)
          .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN)
      this.appendDummyInput()
          .appendField('       ' + Blockly.Msg.LOGIC_ONE_TIME)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.LOGIC)
      this.setTooltip(Blockly.Msg.CONTROL_IF_STATE_CHANGE_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['math_equal'] = {
    init: function () {
      this.appendValueInput('left')
          .setCheck(['Boolean', 'Number'])
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([['=', '='], ['>', '>'], ['\u2265', '>='], ['<', '<'], ['\u2264', '<=']]), 'cond')
      this.appendValueInput('right')
          .setCheck(['Boolean', 'Number'])
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setColour(Blockly.Color.LOGIC)
      this.setTooltip(Blockly.Msg.LOGIC_EQUAL_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['math_in_between'] = {
    init: function () {
      this.appendValueInput('input')
          .setCheck(['Boolean', 'Number'])
      this.appendValueInput('lower')
          .setCheck(['Boolean', 'Number'])
          .appendField(Blockly.Msg.LOGIC_IS_IN_BETWEEN)
      this.appendDummyInput()
          .appendField(Blockly.Msg.LOGIC_BETWEEN_AND)
      this.appendValueInput('upper')
          .setCheck(['Boolean', 'Number'])
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setColour(Blockly.Color.LOGIC)
      this.setTooltip(Blockly.Msg.LOGIC_BETWEEN_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['math_andor'] = {
    init: function () {
      this.appendValueInput('left')
          .setCheck(['Boolean', 'Number'])
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.LOGIC_OPERATION_AND, 'and'], [Blockly.Msg.LOGIC_OPERATION_OR, 'or']]), 'andor')
      this.appendValueInput('right')
          .setCheck(['Boolean', 'Number'])
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setColour(Blockly.Color.LOGIC)
      this.setTooltip(Blockly.Msg.LOGIC_ANDOR_TOOLTIP)
      this.setHelpUrl('')
    }
  }


  Blockly.Blocks['math_not'] = {
    init: function () {
      this.setColour(Blockly.Color.LOGIC)
      // this.appendDummyInput();
      this.appendValueInput('bool').setCheck('Boolean').appendField(Blockly.Msg.LOGIC_NOT)
      this.setOutput(true, 'Boolean')
      this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP)
    }
  }

  return Blockly
}
