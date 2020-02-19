module.exports = function (Blockly) {
  Blockly.GogoCode['use_camera'] = function () {
    var code = 'usecamera\n'
    return code
  }

  Blockly.GogoCode['close_camera'] = function () {
    var code = 'closecamera\n'
    return code
  }

  Blockly.GogoCode['start_find_face'] = function () {
    var code = 'startfindface\n'
    return code
  }

  Blockly.GogoCode['stop_find_face'] = function () {
    var code = 'stopfindface\n'
    return code
  }

  Blockly.GogoCode['take_snapshot'] = function () {
    var code = 'takesnapshot\n'
    return code
  }

  Blockly.GogoCode['found_face'] = function () {
    var code = 'facefound?'
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['camera_is_on'] = function () {
    var code = 'cameraison?'
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  Blockly.GogoCode['find_face_is_on'] = function () {
    var code = 'isfindface?'
    return [code, Blockly.GogoCode.ORDER_NONE]
  }

  return Blockly
}


