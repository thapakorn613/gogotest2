module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.DEFINITION = '230'
  Blockly.Msg.COLOR_DEFINITION = Blockly.Color.DEFINITION

  Blockly.Blocks['action_define_operation_name'] = {
    init: function () {
      this.appendDummyInput()
              .appendField(Blockly.Msg.DEF_TITLE)
      this.appendValueInput('OP')
              .setCheck(['Boolean', 'Number'])
      this.appendDummyInput()
              .appendField(Blockly.Msg.DEF_AS)
      this.appendDummyInput()
              .appendField(new Blockly.FieldTextInput('name'), 'NAME')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.DEFINITION)
      this.setTooltip('')
      this.setHelpUrl('')
    }
  }

  function dynamicOptions () {
    // var options = []
    // var now = Date.now()
    // for (var i = 0; i < 7; i++) {
    //   options.push([String(new Date(now)).substring(0, 3), 'DAY' + i])
    //   now += 24 * 60 * 60 * 1000
    // }
    // return options

    var list = []
    if (Blockly.GogoCode['userDefinedOp'] && Blockly.GogoCode['userDefinedOp'].length > 0) {
      for (let index = 0; index < Blockly.GogoCode['userDefinedOp'].length; index++) {
        let element = Blockly.GogoCode['userDefinedOp'][index]
        if (list.indexOf(element) === -1) {
          list.push(element)
        }
      }
      return list
    //   return Blockly.GogoCode['userDefinedOp']
    } else {
      return [['True', '1']]
    }
  }

  Blockly.Blocks['get_defined_operation_name'] = {
    init: function () {
      this.appendDummyInput()
              // .appendField(new Blockly.FieldDropdown([['option', 'OPTIONNAME'], ['option', 'OPTIONNAME'], ['option', 'OPTIONNAME']]), 'NAME')
              .appendField(new Blockly.FieldDropdown(dynamicOptions()), 'NAME')
              .appendField('?')
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setColour(Blockly.Color.DEFINITION)
      this.setTooltip('')
      this.setHelpUrl('')
    }
  }
  return Blockly
}

