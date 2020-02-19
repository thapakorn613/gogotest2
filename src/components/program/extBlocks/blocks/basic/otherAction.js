module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.OTHER_ACTION = '#607d8d'
  Blockly.Msg.COLOR_OTHER_ACTION = Blockly.Color.OTHER_ACTION

  Blockly.Blocks['action_led'] = {
    category: 'Action',
    init: function () {
      this.setColour(Blockly.Color.OTHER_ACTION)
      this.appendDummyInput().appendField('turn on-board LED')
        .appendField(new Blockly.FieldDropdown([['on', 'on'], ['off', 'off']]), 'onoff')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('Causes the GoGo to turn LED on/off.')
    }
  }

  return Blockly
}
