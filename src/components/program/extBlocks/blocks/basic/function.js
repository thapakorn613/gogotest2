module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.PROCEDURE = '290'
  Blockly.Msg.COLOR_PROCEDURE = Blockly.Color.PROCEDURE

  Blockly.Blocks['procedure_procedure'] = {
    init: function () {
      this.setColour(210)
      this.appendDummyInput()
        .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE)
        .appendField(new Blockly.FieldTextInput('main'), 'pname')
      this.appendStatementInput('statement', null)
      var input = this.appendDummyInput()
      input.appendField('                   ' + Blockly.Msg.PROC_END)
      this.setTooltip(Blockly.Msg.PROCEDURES_MAIN_TOOLTIP)
      this.setDeletable(false)
    }
  }

  return Blockly
}
