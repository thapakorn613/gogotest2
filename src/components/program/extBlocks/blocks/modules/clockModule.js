module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.CLOCK_MODULE = '#5cb1d6'
  Blockly.Msg.COLOR_CLOCK_MODULE = Blockly.Color.CLOCK_MODULE

  Blockly.Msg.ICON_CLOCK_MODULE = ''

  Blockly.Blocks['clock_date'] = {
    init: function () {
      this.setColour(Blockly.Color.CLOCK_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_CLOCK_MODULE)
        .appendField(Blockly.Msg.MOD_CLOCK_GET)
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.MOD_CLOCK_DAY, '4'],
          [Blockly.Msg.MOD_CLOCK_MONTH, '5'],
          [Blockly.Msg.MOD_CLOCK_YEAR, '6'],
          [Blockly.Msg.MOD_CLOCK_HOUR, '2'],
          [Blockly.Msg.MOD_CLOCK_MINUTE, '1'],
          [Blockly.Msg.MOD_CLOCK_SECOND, '0'],
          [Blockly.Msg.MOD_CLOCK_DAY_OF_WEEK, '3']]), 'date')
      this.setOutput(true, 'Number')
      this.setTooltip('')
    }
  }

  return Blockly
}
