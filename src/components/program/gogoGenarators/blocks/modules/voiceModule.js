module.exports = function (Blockly) {
  Blockly.GogoCode['recorder_play'] = function (block) {
    var code = '<span class="c90">play</span>\n'
    return code
  }

  Blockly.GogoCode['recorder_next'] = function (block) {
    var code = '<span class="c90">nexttrack</span>\n'
    return code
  }

  Blockly.GogoCode['recorder_prev'] = function (block) {
    var code = '<span class="c90">prevtrack</span>\n'
    return code
  }

  Blockly.GogoCode['recorder_select'] = function (block) {
    var numTrack = block.getFieldValue('track')
    var code = '<span class="c90">gototrack ' + numTrack + '</span>\n'
    return code
  }

  Blockly.GogoCode['recorder_eraseall'] = function (block) {
    var code = '<span class="c90">erasetracks</span>\n'
    return code
  }

  return Blockly
}

