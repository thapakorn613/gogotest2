module.exports = function (Blockly) {
  Blockly.GogoCode['input_sensor'] = function () {
    var dropdownSensor = this.getFieldValue('sensor')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c290">sensor' + dropdownSensor + '</span>'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['input_switch'] = function () {
    var dropdownSensor = this.getFieldValue('SENSOR')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c290">sensor' + dropdownSensor + ' > 500</span>'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['input_switch_was_pressed'] = function (block) {
    var dropdownSensor = block.getFieldValue('SENSOR')
    var statementsStatement = Blockly.GogoCode.statementToCode(block, 'STATEMENT')
    // TODO: Assemble Python into code variable.
    var code = `<span class="c290">ifstatechange sensor${dropdownSensor} > 500</span> [\n ${statementsStatement} ] \n`
    return code
  }

  Blockly.GogoCode['input_switch_was_released'] = function (block) {
    var dropdownSensor = block.getFieldValue('SENSOR')
    var statementsStatement = Blockly.GogoCode.statementToCode(block, 'STATEMENT')
    // TODO: Assemble Python into code variable.
    var code = `<span class="c290">ifstatechange sensor${dropdownSensor} < 500</span> [\n ${statementsStatement} ] \n`
    return code
  }

  return Blockly
}

