module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.LOOP = '150'
  Blockly.Msg.COLOR_LOOP = Blockly.Color.LOOP

  Blockly.Msg.ICON_LOOP = ''

  Blockly.Blocks['control_forever_wait'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.LOOP_FOREVER)
      this.appendStatementInput('do')
          .setCheck(null)
          .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO)
      this.appendValueInput('NAME')
          .setCheck('Number')
          .appendField(Blockly.Msg.LOOP_EACH_TIME_WAIT)
      this.appendDummyInput()
          .appendField('1/10 ' + Blockly.Msg.MSG_SECONDS)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setColour(Blockly.Color.LOOP)
      this.setTooltip(Blockly.Msg.LOOP_FOREVER_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['control_forever'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.LOOP_FOREVER)
      this.appendStatementInput('do')
          .setCheck(null)
          .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setColour(Blockly.Color.LOOP)
      this.setTooltip(Blockly.Msg.LOOP_FOREVER_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['control_repeat'] = {
    init: function () {
      this.appendValueInput('times')
          .setCheck('Number')
          .appendField(Blockly.Msg.LOOP_REPEAT)
      this.appendDummyInput()
          .appendField(Blockly.Msg.LOOP_TIMES)
      this.appendStatementInput('do')
          .setCheck(null)
          .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setColour(Blockly.Color.LOOP)
      this.setTooltip(Blockly.Msg.LOOP_REPEAT_TOOLTIP)
      this.setHelpUrl('https://en.wikipedia.org/wiki/For_loop')
    }
  }

  Blockly.Blocks['control_repeat1'] = {
    init: function () {
      this.appendValueInput('TIMES')
        .setCheck('Number')
        .appendField('repeat')
      this.appendDummyInput()
        .appendField('times')
      this.appendStatementInput('DO')
        .setCheck(null)
        .appendField('do')
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setColour(Blockly.Color.LOOP)
      this.setTooltip(Blockly.Msg.CONTROLS_REPEAT_TOOLTIP)
      this.setHelpUrl('https://en.wikipedia.org/wiki/For_loop')
    }
  }

  Blockly.Blocks['control_waituntil'] = {
    init: function () {
      this.appendValueInput('NAME')
          .setCheck(['Boolean', 'Number'])
          .appendField(Blockly.Msg.LOOP_WAIT_UNTIL)
      this.setInputsInline(false)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.LOOP)
      this.setTooltip(Blockly.Msg.LOOP_WAIT_UNTIL_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['procedure_stop'] = {
    init: function () {
      this.setColour(Blockly.Color.LOOP)
      this.appendDummyInput().appendField(Blockly.Msg.LOOP_STOP_PROCEDURE)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.LOOP_STOP_PROCEDURE_TOOLTIP)
    }
  }

  return Blockly
}
