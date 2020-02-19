module.exports = function (Blockly) {
  Blockly.GogoCode['controls_if'] = function (block) {
    // If/elseif/else condition.
    var n = 0
    var argument = Blockly.GogoCode.valueToCode(block, 'IF' + n,
        Blockly.GogoCode.ORDER_NONE) || 'False'
    var branch = Blockly.GogoCode.statementToCode(block, 'DO' + n) ||
        Blockly.GogoCode.PASS || ''
    var code = (block.elseCount_ ? 'ifelse ' : 'if ') + argument + '\n' + '[\n' + branch + ']\n'
    // *************** Temporary Ignore *************** //
    // for (n = 1; n <= block.elseifCount_; n++) {
    //   argument = Blockly.GogoCode.valueToCode(block, 'IF' + n,
    //       Blockly.GogoCode.ORDER_NONE) || 'False'
    //   branch = Blockly.GogoCode.statementToCode(block, 'DO' + n) ||
    //       Blockly.GogoCode.PASS || ''
    //   code += 'elif ' + argument + '\n' + '[\n' + branch + ']\n'
    // }
    if (block.elseCount_) {
      branch = Blockly.GogoCode.statementToCode(block, 'ELSE') ||
          Blockly.GogoCode.PASS || ''
      code += '[\n' + branch + ']\n'
    }
    return code
  }

  Blockly.GogoCode['control_if'] = function () {
    var valueCondition = Blockly.GogoCode.valueToCode(this, 'condition', Blockly.GogoCode.ORDER_NONE)
    var statementsStatement = Blockly.GogoCode.statementToCode(this, 'statement')

    var code = '<span class="c120">if ' + valueCondition + ' \n[\n' + statementsStatement + ']</span>\n'
    return code
  }

  Blockly.GogoCode['control_ifelse'] = function () {
    var valueCondition = Blockly.GogoCode.valueToCode(this, 'condition', Blockly.GogoCode.ORDER_NONE)
    var statementsIf = Blockly.GogoCode.statementToCode(this, 'if')
    var statementsElse = Blockly.GogoCode.statementToCode(this, 'else')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">ifelse ' + valueCondition + ' \n[\n' + statementsIf + '] [\n' + statementsElse + ']</span>\n'
    return code
  }

  Blockly.GogoCode['control_if_state_change'] = function () {
    var valueCondition = Blockly.GogoCode.valueToCode(this, 'condition', Blockly.GogoCode.ORDER_ATOMIC)
    var statementsStatement = Blockly.GogoCode.statementToCode(this, 'statement')

    // var code = 'if '+valueCondition.slice(1, valueCondition.length-1)+' [\n'+statementsStatement+']\n';
    var code = '<span class="c120">ifstatechange ' + valueCondition + ' \n[\n' + statementsStatement + ']</span>\n'
    return code
  }

  Blockly.GogoCode['math_equal'] = function () {
    var valueLeft = Blockly.GogoCode.valueToCode(this, 'left', Blockly.GogoCode.ORDER_NONE)
    var valueRight = Blockly.GogoCode.valueToCode(this, 'right', Blockly.GogoCode.ORDER_NONE)
    var dropdownOp = this.getFieldValue('cond')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c10">( ' + valueLeft + ' ' + dropdownOp + ' ' + valueRight + ' )</span> '
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['math_in_between'] = function () {
    var valueInput = Blockly.GogoCode.valueToCode(this, 'input', Blockly.GogoCode.ORDER_NONE)
    var valueLower = Blockly.GogoCode.valueToCode(this, 'lower', Blockly.GogoCode.ORDER_NONE)
    var valueUpper = Blockly.GogoCode.valueToCode(this, 'upper', Blockly.GogoCode.ORDER_NONE)

    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c10">(' + valueInput + ' > ' + valueLower + ') and (' + valueInput + ' < ' + valueUpper + ')</span> '
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['math_andor'] = function () {
    var valueLeft = Blockly.GogoCode.valueToCode(this, 'left', Blockly.GogoCode.ORDER_ATOMIC)
    var valueRight = Blockly.GogoCode.valueToCode(this, 'right', Blockly.GogoCode.ORDER_ATOMIC)
    var dropdownOp = this.getFieldValue('andor')
    // TODO: Assemble GogoCode into code variable.
    // var code = valueLeft.slice(1, valueLeft.length-1)+' '+dropdownOp+' '+valueRight.slice(1, valueRight.length-1) +' ';
    var code = '<span class="c10">' + valueLeft + ' ' + dropdownOp + ' ' + valueRight + '</span> '
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['math_not'] = function () {
    var valueBool = Blockly.GogoCode.valueToCode(this, 'bool', Blockly.GogoCode.ORDER_ATOMIC)
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c10">not ' + valueBool + '</span>'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['logic_boolean'] = function () {
    var code = (this.getFieldValue('BOOL') === 'TRUE') ? '1' : '0'
    // var code = '<span class="c10">' + dropdownOp + '</span> '
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  return Blockly
}

