module.exports = function (Blockly) {
  Blockly.GogoCode['control_forever_wait'] = function (block) {
    var statementsDo = Blockly.GogoCode.statementToCode(this, 'do')
    // TODO: Assemble GogoCode into code variable.
    var valueWaitTime = Blockly.GogoCode.valueToCode(block, 'NAME', Blockly.GogoCode.ORDER_NONE)
    // valueName *= 10;
    // var code = '<span class="c120">forever \n[\n' + statementsDo + '  <span class="c290">wait ' + (isNaN(valueWaitTime) ? 0 : valueWaitTime) + '</span>\n]</span>\n'
    var code = `<span class="c120">forever \n[\n${statementsDo}  <span class="c290">wait ${valueWaitTime}</span>\n]</span>\n`
    return code
  }

  Blockly.GogoCode['control_forever'] = function () {
    var statementsDo = Blockly.GogoCode.statementToCode(this, 'do')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">forever \n[\n' + statementsDo + ' ]</span>\n'
    return code
  }

  Blockly.GogoCode['control_repeat'] = function () {
    var valueTimes = Blockly.GogoCode.valueToCode(this, 'times', Blockly.GogoCode.ORDER_NONE)
    var statementsDo = Blockly.GogoCode.statementToCode(this, 'do')
    // TODO: Assemble GogoCode into code variable.
    // var code = '<span class="c120">repeat '+valueTimes.slice(1, valueTimes.length-1)+' \n[\n'+statementsDo+'\n]</span>\n';
    var code = '<span class="c120">repeat ' + valueTimes + ' \n[\n' + statementsDo + ' ]</span>\n'
    return code
  }

  Blockly.GogoCode['control_waituntil'] = function () {
    var valueName = Blockly.GogoCode.valueToCode(this, 'NAME', Blockly.GogoCode.ORDER_NONE)
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">waituntil [ ' + valueName + ' ]</span>\n'
    return code
  }

  Blockly.GogoCode['procedure_stop'] = function () {
    var code = '<span class="c290">stop</span>\n'
    return code
  }

  return Blockly
}

