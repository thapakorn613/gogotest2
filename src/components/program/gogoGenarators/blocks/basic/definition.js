module.exports = function (Blockly) {
  Blockly.GogoCode['userDefinedOp'] = [['1', '1']]

  Blockly.GogoCode['action_define_operation_name'] = function (block) {
    var valueOp = Blockly.GogoCode.valueToCode(block, 'OP', Blockly.GogoCode.ORDER_NONE)
    var valueName = block.getFieldValue('NAME')
        //   // TODO: Assemble Python into code variable.
        // valueOp = valueOp.replace(/\n/g, ' ')
    var functionName = Blockly.GogoCode.provideFunction_(
            valueName,
      ['[p]to ' + Blockly.GogoCode.FUNCTION_NAME_PLACEHOLDER_ + '',
        '  output ' + valueOp,
        'end[/p]'])
        // // Generate the function call for this block.
        //   var code = functionName + '()'
        //   return [code, Blockly.GogoCode.ORDER_FUNCTION_CALL]
    if (Blockly.GogoCode['userDefinedOp'].indexOf([valueName, functionName]) === -1) {
      Blockly.GogoCode['userDefinedOp'].push([valueName, functionName])
      // console.log('Added', [valueName, functionName])
    }
    // Blockly.GogoCode['userDefinedOp'].push([valueName, functionName])
    return ''
    // return `;${valueOp} = ${functionName}\n`
  }

  Blockly.GogoCode['get_defined_operation_name'] = function (block) {
    var dropdownName = block.getFieldValue('NAME')
    var code = dropdownName + ''
    return [code, Blockly.Python.ORDER_NONE]
  }
}

