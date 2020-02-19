module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.DISPLAY_MODULE = '#5cb1d6'
  Blockly.Msg.COLOR_DISPLAY_MODULE = Blockly.Color.DISPLAY_MODULE

  Blockly.Msg.ICON_DISPLAY_MODULE = ''

  Blockly.Blocks['display_text'] = {
    init: function () {
      this.setColour(Blockly.Color.DISPLAY_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_DISPLAY_MODULE)
        .appendField(Blockly.Msg.MOD_DISPLAY_SHOW_TEXT + ' "')
        .appendField(new Blockly.FieldTextInput('text'), 'text')
        .appendField('"')
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['display_number'] = {
    init: function () {
      this.setColour(Blockly.Color.DISPLAY_MODULE)
      //    this.appendDummyInput()
      //        .appendField("show number  \"")
      //        .appendField(new Blockly.FieldTextInput("text"), "text")
      //        .appendField("\"");
      //     this.appendDummyInput()
      //         .appendField('show number ')
      //     this.appendValueInput('value')
      // //        .setCheck("Number");

      this.appendValueInput('value')
        // .setCheck(["Boolean", "Number"])
        .appendField(Blockly.Msg.ICON_DISPLAY_MODULE)
        .appendField(Blockly.Msg.MOD_DISPLAY_SHOW_NUMBER)

      this.setInputsInline(false)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['display_movecursor'] = {

    init: function () {
      this.setColour(Blockly.Color.DISPLAY_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_DISPLAY_MODULE)
        .appendField(Blockly.Msg.MOD_DISPLAY_MOVE_CURSOR)
        .appendField(new Blockly.FieldTextInput('position'), 'num')
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['display_clearscreen'] = {
    init: function () {
      this.setColour(Blockly.Color.DISPLAY_MODULE)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_DISPLAY_MODULE)
        .appendField(Blockly.Msg.MOD_DISPLAY_CLEAR_SCREEN)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('')
    }
  }

  return Blockly
}
