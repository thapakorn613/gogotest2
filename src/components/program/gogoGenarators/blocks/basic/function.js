module.exports = function (Blockly) {
  Blockly.GogoCode['procedure_procedure'] = function () {
    var statementsStatement = Blockly.GogoCode.statementToCode(this, 'statement')
    var textPname = this.getFieldValue('pname')
    // TODO: Assemble GogoCode into code variable.
    // var code = '[SS]to '+textPname+'\n[SS]'+statementsStatement+'end[SS]';
    // var code = '[p]<span class="c210">to ' + textPname + '</span><span class="c0">newline</span>\n[SS]' + statementsStatement + '<span class="c0">newline</span><span class="c210">end</span>[/p]'
    var code = '[p]<span class="c210">to ' + textPname + '</span>\n[SS]' + statementsStatement + '<span class="c210">end</span>[/p]'
    return code
  }

  Blockly.GogoCode['procedures_callreturn'] = function (block) {
    // Call a procedure with a return value.
    var funcName = Blockly.GogoCode.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)
    var args = []
    for (var x = 0; x < block.arguments_.length; x++) {
      args[x] = Blockly.GogoCode.valueToCode(block, 'ARG' + x,
          Blockly.GogoCode.ORDER_COMMA) || 'null'
    }
    // var code = funcName + '(' + args.join(', ') + ')';
    var code = args.join(' ') + ' ' + parseInt('0xff') + ' ' + parseInt('0xff') + ' '
    code = '' + funcName + ' ' + args.join(' ') + '  '
    // code = code.clean()
    return [code, Blockly.GogoCode.ORDER_FUNCTION_CALL]
  }


  Blockly.GogoCode['procedures_defreturn'] = function (block) {
    // Define a procedure with a return value.
    var funcName = Blockly.GogoCode.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)
    var branch = ''
    try {
      branch = Blockly.GogoCode.statementToCode(block, 'STACK')
    } catch (error) {
      branch = ''
    }
    if (Blockly.GogoCode.INFINITE_LOOP_TRAP) {
      branch = Blockly.GogoCode.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + block.id + '\'') + branch
    }

    var returnValue = Blockly.GogoCode.valueToCode(block, 'RETURN',
        Blockly.GogoCode.ORDER_NONE) || ''
    if (returnValue) {
      returnValue = '  output ' + returnValue + ';\n'
    }
    var args = []
    for (var x = 0; x < block.arguments_.length; x++) {
      args[x] = ':' + Blockly.GogoCode.variableDB_.getName(block.arguments_[x],
          Blockly.Variables.NAME_TYPE)
    }
    var code = '(main ' + funcName + '[' + args.join(', ') + '] {\n' +
        branch + returnValue + '} )'
    // code = '[p]to ' + funcName + ' ' + args.join(' ') + '\n ' + branch + '\n' + returnValue + '\nend\n [/p]'
    code = Blockly.GogoCode.scrub_(block, code)
    code = `[p]to ${funcName} ${args ? args.join(' ') + '\n' : ''}${(branch ? branch + '\n' : '')} ${(returnValue ? returnValue + '\n' : '')} end\n[/p]`
    Blockly.GogoCode.definitions_[funcName] = code
    return null
  }

  Blockly.GogoCode['procedures_defnoreturn'] = Blockly.GogoCode['procedures_defreturn']

  Blockly.GogoCode['procedures_callnoreturn'] = function (a) {
    var b = Blockly.GogoCode.variableDB_.getName(a.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)
    var c = []
    for (var d = 0; d < a.arguments_.length; d++) {
      c[d] = Blockly.GogoCode.valueToCode(a, 'ARG' + d, Blockly.GogoCode.ORDER_COMMA) || 'null'
    };
    var code = b + ' ' + c.join(' ') + ' '
    return code
  }

  return Blockly
}

