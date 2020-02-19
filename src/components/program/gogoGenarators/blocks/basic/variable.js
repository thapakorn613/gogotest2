module.exports = function (Blockly) {
  Blockly.GogoCode['variables_get'] = function (block) {
    // Variable getter.
    var code = `<span class="c330">${Blockly.GogoCode.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE)}</span>`
    return [code, Blockly.GogoCode.ORDER_ATOMIC]
  }

  Blockly.GogoCode['variables_set'] = function (block) {
    // Variable setter.
    var argument0 = Blockly.GogoCode.valueToCode(block, 'VALUE',
            Blockly.GogoCode.ORDER_ASSIGNMENT) || '0'
    var varName = Blockly.GogoCode.variableDB_.getName(
            block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)
    return `<span class="c330">set ${varName} ${argument0} </span>\n`
  }

  Blockly.GogoCode['math_change'] = function (block) {
    // Add to a variable in place.
    var argument0 = Blockly.GogoCode.valueToCode(block, 'DELTA',
        Blockly.GogoCode.ORDER_NONE) || '0'
    var varName = Blockly.GogoCode.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)
    return `set ${varName} ( ${varName} + ${argument0} )\n`
  }

  return Blockly
}

