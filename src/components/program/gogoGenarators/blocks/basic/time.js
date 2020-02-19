module.exports = function (Blockly) {
  Blockly.GogoCode['action_wait'] = function (block) {
    var valueNumber = Blockly.GogoCode.valueToCode(block, 'NAME', Blockly.GogoCode.ORDER_NONE)
    // TODO: Assemble GogoCode into code variable.
    var code = `<span class="c290">wait ${valueNumber}</span> \n`
    return code
  }

  Blockly.GogoCode['action_wait_sec'] = function (block) {
    var valueNumber = Blockly.GogoCode.valueToCode(block, 'NUMBER', Blockly.GogoCode.ORDER_NONE)
    // TODO: Assemble GogoCode into code variable.
    var code = `<span class="c290">wait ( ${valueNumber} * 10 ) </span> \n`
    return code
  }

  Blockly.GogoCode['action_gettimer'] = function () {
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">timer</span>'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['action_reset_timer'] = function () {
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">resett</span>\n'
    return code
  }

  // ============== TICKS ====================

  Blockly.GogoCode['action_settickrate'] = function (block) {
    var valueName = Blockly.GogoCode.valueToCode(block, 'NAME', Blockly.GogoCode.ORDER_NONE)
  // valueName = valueName.replace('<span class="c10">', '').replace('</span>', '').toInt()
  // valueName *= 10;
  // var code = '<span class="c290">wait ' + (isNaN(valueName) ? 0 : valueName) + '</span> \n';
    var code = '<span class="c290">settickrate ' + valueName + '</span> \n'
    return code
  }

  Blockly.GogoCode['action_gettickcount'] = function () {
  // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">tickcount</span>'
  // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['action_ticked'] = function () {
  // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">(tickcount > 0)</span>'
  // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['action_cleartick'] = function () {
  // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">cleartick</span>\n'
    return code
  }

  Blockly.GogoCode['control_if_ticked'] = function () {
    // var period = Blockly.GogoCode.valueToCode(this, 'period', Blockly.GogoCode.ORDER_ATOMIC)
    var statementsDo = Blockly.GogoCode.statementToCode(this, 'do')
    // TODO: Assemble GogoCode into code variable.
    var code = '<span class="c120">if tickcount > 0\n[' + statementsDo + '\ncleartick\n]\n</span>\n'
    return code
  }

  return Blockly
}

