module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.TIME = '20'
  // Blockly.Color.TIME = '#8D6E63'
  Blockly.Msg.COLOR_TIME = Blockly.Color.TIME

  Blockly.Msg.ICON_TIME = ''

  Blockly.Blocks['action_wait'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_TIME)
          .appendField(Blockly.Msg.TIME_WAIT)
      this.appendValueInput('NAME')
          .setCheck('Number')
      this.appendDummyInput()
          .appendField('1/10 ' + Blockly.Msg.MSG_SECONDS)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.TIME)
      this.setTooltip(Blockly.Msg.TIME_WAIT_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['action_wait_sec'] = {
    init: function () {
      this.setColour(Blockly.Color.TIME)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_TIME)
        .appendField(Blockly.Msg.TIME_WAIT)
      this.appendValueInput('NUMBER', 'Number')
      this.appendDummyInput()
        .appendField(Blockly.Msg.MSG_SECONDS)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip(Blockly.Msg.TIME_WAIT_TOOLTIP)
    }
  }

  Blockly.Blocks['action_gettimer'] = {
    category: 'Action',
    init: function () {
      this.setColour(Blockly.Color.TIME)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_TIME)
        .appendField(Blockly.Msg.TIME_GET_TIMER)
      this.setOutput(true, 'Number')
      this.setTooltip(Blockly.Msg.TIME_GET_TIMER_TOOLTIP)
    }
  }

  Blockly.Blocks['action_reset_timer'] = {
    category: 'Action',
    init: function () {
      this.setColour(Blockly.Color.TIME)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_TIME)
        .appendField(Blockly.Msg.TIME_RESET_TIMER)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.TIME_RESET_TIMER_TOOLTIP)
    }
  }

  Blockly.Blocks['action_settickrate'] = {
    init: function () {
      this.setColour(Blockly.Color.TIME)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_TIME)
        .appendField(Blockly.Msg.TIME_TICK_EVERY)
      this.appendValueInput('NAME', Number)
      this.appendDummyInput()
        .appendField('1/10 ' + Blockly.Msg.MSG_SECONDS)
      this.setInputsInline(true)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip(Blockly.Msg.TIME_SET_TICK_TOOLTIP)
    }
  }

  Blockly.Blocks['action_gettickcount'] = {
    category: 'Action',
    init: function () {
      this.setColour(Blockly.Color.TIME)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_TIME)
        .appendField(Blockly.Msg.TIME_TICK_COUNT)
      this.setOutput(true, 'Number')
      this.setTooltip(Blockly.Msg.TIME_TICK_COUNT_TOOLTIP)
    }
  }

  Blockly.Blocks['action_ticked'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_TIME)
        .appendField(Blockly.Msg.TIME_TICKED)
      this.setOutput(true, 'Boolean')
      this.setColour(Blockly.Color.TIME)
      this.setTooltip(Blockly.Msg.TIME_TICKED_TOOLTIP)
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['action_cleartick'] = {
    category: 'Action',
    init: function () {
      this.setColour(Blockly.Color.TIME)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_TIME)
        .appendField(Blockly.Msg.TIME_CLEAR_TICK)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.TIME_CLEAR_TICK_TOOLTIP)
    }
  }

  Blockly.Blocks['control_if_ticked'] = {
    init: function () {
      this.setColour(Blockly.Color.TIME)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_TIME)
        .appendField(Blockly.Msg.TIME_IF_TICKED)
      var input = this.appendStatementInput('do', null)
      input.appendField('do')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip(Blockly.Msg.TIME_IF_TICKED_TOOLTIP)
    }
  }

  return Blockly
}
