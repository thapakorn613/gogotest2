module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  Blockly.Color.PI_IMAGE = Blockly.Msg.COLOR_PI_DEFAULT
  Blockly.Msg.COLOR_PI_IMAGE = Blockly.Color.PI_IMAGE

  Blockly.Msg.ICON_PI_IMAGE = ''
  Blockly.Msg.ICON_PI_SCREEN = ''

  Blockly.Blocks['show_image'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_SOUND)
      this.appendValueInput('string')
          .appendField(Blockly.Msg.ICON_PI_IMAGE)
          .appendField(Blockly.Msg.PI_IMAGE_SHOW)
      this.setInputsInline(true)
      this.setPreviousStatement(true, 'null')
      this.setNextStatement(true, 'null')
      this.setTooltip('')
    }
  }

  Blockly.Blocks['hide_image'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_IMAGE)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_IMAGE)
          .appendField(Blockly.Msg.PI_IMAGE_HIDE)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['screen_tapped'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_IMAGE)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_SCREEN)
          .appendField(Blockly.Msg.PI_IMAGE_SCREEN_TAPPED)
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setTooltip('')
    }
  }

  return Blockly
}
