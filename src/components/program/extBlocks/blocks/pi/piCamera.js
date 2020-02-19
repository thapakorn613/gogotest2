module.exports = function (Blockly) {
  Blockly.Color = Blockly.Color || {}

  // Blockly.Color.PI_CAMERA = '160'
  Blockly.Color.PI_CAMERA = Blockly.Msg.COLOR_PI_DEFAULT
  Blockly.Msg.COLOR_PI_CAMERA = Blockly.Color.PI_CAMERA

  Blockly.Msg.ICON_PI_CAMERA = ''

  Blockly.Blocks['use_camera'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_CAMERA)
          .appendField(Blockly.Msg.PI_CAMERA_USE)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(Blockly.Color.PI_CAMERA)
      this.setTooltip('')
      this.setHelpUrl('')
    }
  }

  Blockly.Blocks['close_camera'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_CAMERA)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_CAMERA)
          .appendField(Blockly.Msg.PI_CAMERA_CLOSE)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['start_find_face'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_CAMERA)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_CAMERA)
          .appendField(Blockly.Msg.PI_CAMERA_START_FIND_FACE)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['stop_find_face'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_CAMERA)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_CAMERA)
          .appendField(Blockly.Msg.PI_CAMERA_STOP_FIND_FACE)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['take_snapshot'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_CAMERA)
      this.appendDummyInput()
          .appendField(Blockly.Msg.ICON_PI_CAMERA)
          .appendField(Blockly.Msg.PI_CAMERA_TAKE_SNAPSHOT)
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setTooltip('')
    }
  }

  Blockly.Blocks['found_face'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_CAMERA)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_PI_CAMERA)
        .appendField(Blockly.Msg.PI_CAMERA_FOUND_FACE)
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setTooltip('')
    }
  }

  Blockly.Blocks['camera_is_on'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_CAMERA)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_PI_CAMERA)
        .appendField(Blockly.Msg.PI_CAMERA_IS_ON)
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setTooltip('')
    }
  }

  Blockly.Blocks['find_face_is_on'] = {
    init: function () {
      this.setColour(Blockly.Color.PI_CAMERA)
      this.appendDummyInput()
        .appendField(Blockly.Msg.ICON_PI_CAMERA)
        .appendField(Blockly.Msg.PI_CAMERA_FIND_FACE_IS_ON)
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setTooltip('')
    }
  }

  return Blockly
}
