module.exports = function (Blockly) {
  Blockly.GogoCode['record_as'] = function (block) {
    var valueExpression = Blockly.GogoCode.valueToCode(block, 'expression', Blockly.GogoCode.ORDER_NONE)

    // ****** Change Python to GoGoCode Later ******
    var valueString = Blockly.Python.valueToCode(block, 'string', Blockly.GogoCode.ORDER_ATOMIC)
    valueString = valueString.replace(/'/g, '"')

    var code = 'record ' + valueExpression + ' ' + valueString + ' \n'
    return code
  }

  return Blockly
}
