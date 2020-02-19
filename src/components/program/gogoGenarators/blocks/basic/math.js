module.exports = function (Blockly) {
  Blockly.GogoCode['math_number'] = function () {
    var textNumber = this.getFieldValue('number')
    var code = '<span class="c10">' + (isNaN(textNumber) ? 0 : textNumber) + '</span>'
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['math_number_servo'] = function () {
    var textNumber = this.getFieldValue('number')
    var code = '<span class="c10">' + (isNaN(textNumber) ? 10 : textNumber) + '</span>'
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['math_number_motor_power'] = function () {
    var textNumber = this.getFieldValue('number')
    var code = '<span class="c10">' + (isNaN(textNumber) ? 0 : textNumber) + '</span>'
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['math_random'] = function () {
    // TODO: Assemble GogoCode into code variable.
    var code = Math.floor(Math.random() * 32768 * 2) - 32768
    code = '<span class="c10">random</span>'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['math_operator'] = function () {
    var valueLeft = Blockly.GogoCode.valueToCode(this, '1stNum', Blockly.GogoCode.ORDER_NONE)
    var valueRight = Blockly.GogoCode.valueToCode(this, '2ndNum', Blockly.GogoCode.ORDER_NONE)
    var dropdownOp = this.getFieldValue('op')
    // TODO: Assemble GogoCode into code variable.
    var code = `<span class="c10">( ${valueLeft} ${dropdownOp} ${valueRight} )</span>`
    // code = code.split('×').join('*')
    // code = code.split('÷').join('/')
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }


  Blockly.GogoCode['variable_increase_by'] = function () {
    var incremental = Blockly.GogoCode.valueToCode(this, 'increment', Blockly.GogoCode.ORDER_NONE)
    var varName = Blockly.GogoCode.variableDB_.getName(
      this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)
    return `<span class="c330">set ${varName} ${varName} + ${incremental}</span>\n`
  }

  Blockly.GogoCode['variable_decrease_by'] = function () {
    var incremental = Blockly.GogoCode.valueToCode(this, 'increment', Blockly.GogoCode.ORDER_NONE)
    var varName = Blockly.GogoCode.variableDB_.getName(
      this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)
    return `<span class="c330">set ${varName} ${varName} - ${incremental}</span>\n`
  }

  return Blockly
}
