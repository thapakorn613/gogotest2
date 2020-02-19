// var Blockly = {}

// export default {
//   coderbot_cam_average: {
//         // Block for moving forward.
//     init: function () {
//       this.setHelpUrl('http://code.google.com/p/blockly/wiki/Move')
//       this.setColour(40)
//       var di = this.appendDummyInput()
//       di.appendField(Blockly.Msg.ARD_SERVO_WRITE)
//       this.setPreviousStatement(true)
//       this.setNextStatement(true)
//       this.setTooltip('CoderBot_moveForwardTooltip')
//     }
//   }
// }
// 'use strict'

// var Blockly = require('./_blockly')


// Blockly.Lua = require('./lib/lua_compressed')(Blockly);

module.exports = function (Blockly) {
  Blockly.custom = {}
  Blockly.custom.iconSize = 15
  require('./blocks/basic/function')(Blockly)

  require('./blocks/basic/logic')(Blockly)
  require('./blocks/basic/loop')(Blockly)

  require('./blocks/basic/math')(Blockly)
  require('./blocks/basic/sensor')(Blockly)
  require('./blocks/basic/motor')(Blockly)
  require('./blocks/basic/servo')(Blockly)
  require('./blocks/basic/sound')(Blockly)
  require('./blocks/basic/otherAction')(Blockly)
  require('./blocks/basic/time')(Blockly)
  require('./blocks/basic/irRemote')(Blockly)
  require('./blocks/basic/definition')(Blockly)

  require('./blocks/modules/clockModule')(Blockly)
  require('./blocks/modules/displayModule')(Blockly)
  require('./blocks/modules/voiceModule')(Blockly)
  require('./blocks/modules/i2c')(Blockly)

  // Blockly.Msg.COLOR_PI_DEFAULT = '#d81b60'
  Blockly.Msg.COLOR_PI_DEFAULT = '#7cb342'

  require('./blocks/pi/piCamera')(Blockly)
  require('./blocks/pi/piCloudService')(Blockly)
  require('./blocks/pi/piDataLogging')(Blockly)
  require('./blocks/pi/piEmail')(Blockly)
  require('./blocks/pi/piFingerScan')(Blockly)
  require('./blocks/pi/piGogoCom')(Blockly)
  require('./blocks/pi/piImage')(Blockly)
  require('./blocks/pi/piRfid')(Blockly)
  require('./blocks/pi/piSound')(Blockly)
  require('./blocks/pi/piSms')(Blockly)

  // Blockly.Blocks = Object.assign(Blockly.Blocks, require('./blocks/motor')(Blockly))

  Blockly.Blocks.coderbot_cam_average = {
          // Block for moving forward.
    init: function () {
      this.setHelpUrl('http://code.google.com/p/blockly/wiki/Move')
      this.setColour(40)
      var di = this.appendDummyInput()
      di.appendField(Blockly.Msg.COLLAPSE_BLOCK)
      this.setPreviousStatement(true)
      this.setNextStatement(true)
      this.setTooltip('CoderBot_moveForwardTooltip')
    }
  }

  return Blockly
}

