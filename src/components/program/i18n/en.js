// var Blockly.Msg = require('node-blockly/lib/i18n/en')

var Blockly = {}; Blockly.Msg = require('node-blockly/lib/i18n/en')()
const FILES = require('./file_list.json')
const LANG = 'en'

module.exports = function () {
  'use strict'

  for (const fileIndex in FILES) {
    // console.log(FILES[fileIndex])
    let texts = require(`./${LANG}/${FILES[fileIndex]}`)

    for (const key in texts) {
      Blockly.Msg[key] = texts[key]
    }
  }

  // // ************** Categories ************** //
  // Blockly.Msg.CAT_COMMON = 'Common Blocks'
  // Blockly.Msg.CAT_LOGIC = 'Logic'
  // Blockly.Msg.CAT_LOOPS = 'Loops'
  // Blockly.Msg.CAT_MATH = 'Math'
  // Blockly.Msg.CAT_SENSING = 'Sensing'
  // Blockly.Msg.CAT_DC_MOTOR = 'DC Motor'
  // Blockly.Msg.CAT_SERVO_MOTOR = 'Servo Motor'
  // Blockly.Msg.CAT_SOUND = 'Sound'
  // Blockly.Msg.CAT_TIME = 'Time'
  // Blockly.Msg.CAT_IR_CONTROL = 'IR Control'
  // Blockly.Msg.CAT_BUILTIN_DISPLAY = 'Built-in Display'
  // Blockly.Msg.CAT_ADDON_MODULES = 'Add-on Modules'
  // Blockly.Msg.CAT_ADDON_CLOCK = 'Clock Module'
  // Blockly.Msg.CAT_ADDON_DISPLAY = 'Display Module'
  // Blockly.Msg.CAT_ADDON_VOICE = 'Voice Recorder'
  // Blockly.Msg.CAT_ADDON_I2C = 'I2C Extension'

  // // ************** Raspberry Pi Categories ************** //
  // Blockly.Msg.CAT_RASPBERRY_PI = 'Raspberry Pi'
  // Blockly.Msg.CAT_CAMERA = 'Camera'
  // Blockly.Msg.CAT_CLOUD_SERVICE = 'Cloud Services'
  // Blockly.Msg.CAT_DATA_LOGGING = 'Data recording'
  // Blockly.Msg.CAT_EMAIL = 'E-mail'
  // Blockly.Msg.CAT_PI_GOGO_COM = 'GoGo Communication'
  // Blockly.Msg.CAT_PI_IMAGE = 'Image'
  // Blockly.Msg.CAT_PI_SOUND = 'Sound'
  // Blockly.Msg.CAT_PI_SMS = 'Text message'

  // Blockly.Msg.CAT_DEFINITION = 'Definition Blocks'
  // Blockly.Msg.VARIABLES = 'Variables'
  // Blockly.Msg.PROCEDURES = 'Procedures'

  // // ************** Procedures ************** //
  // Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = 'to'
  // Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = 'to'
  // Blockly.Msg.PROC_END = 'end'

  // // ************** Global ************** //
  // Blockly.Msg.VARIABLES_SET = 'set %1 to %2'
  // Blockly.Msg.MATH_CHANGE_TITLE = 'change %1 by %2'
  // Blockly.Msg.MSG_SECONDS = 'second(s)'

  // // ************** Logic ************** //
  // // Blockly.Msg.LOGIC_IF = 'if'
  // // Blockly.Msg.LOGIC_DO = 'do'
  // // Blockly.Msg.LOGIC_ELSE_DO = 'else do'
  // Blockly.Msg.LOGIC_BECOMES_TRUE = 'becomes true'
  // Blockly.Msg.LOGIC_ONE_TIME = 'one time'
  // Blockly.Msg.LOGIC_IS_IN_BETWEEN = 'is in between'
  // Blockly.Msg.LOGIC_BETWEEN_AND = 'and'
  // Blockly.Msg.LOGIC_NOT = 'not'

  // // ************** Loop ************** //
  // Blockly.Msg.LOOP_FOREVER = 'forever'
  // Blockly.Msg.LOOP_EACH_TIME_WAIT = 'each time wait'

  // Blockly.Msg.LOOP_SECONDS = Blockly.Msg.MSG_SECONDS
  // Blockly.Msg.LOOP_REPEAT = 'repeat'
  // Blockly.Msg.LOOP_TIMES = 'time(s)'
  // Blockly.Msg.LOOP_WAIT_UNTIL = 'wait until'
  // Blockly.Msg.LOOP_STOP_PROCEDURE = 'stop this procedure'

  // // ************** Math ************** //
  // Blockly.Msg.MATH_NUMBER_SERVO_TOOLTIP = 'A number for servo motor.'
  // Blockly.Msg.MATH_NUMBER_MOTOR_TOOLTIP = 'A number for motor power'
  // Blockly.Msg.MATH_RANDOM_NUMBER = 'random number'
  // Blockly.Msg.MATH_RANDOM_INCREASE = 'increase'
  // Blockly.Msg.MATH_RANDOM_DECREASE = 'decrease'
  // Blockly.Msg.MATH_RANDOM_BY = 'by'

  // // ************** Sensing ************** //
  // Blockly.Msg.SENSOR_SENSOR = 'sensor'
  // Blockly.Msg.SENSOR_SWITCH_ON_SENSOR = 'switch'
  // Blockly.Msg.SENSOR_IS_PRESSED = 'is pressed?'
  // Blockly.Msg.SENSOR_IF_SWITCH_ON_SENSOR = 'if switch'
  // Blockly.Msg.SENSOR_JUST_PRESSED = 'just pressed'
  // Blockly.Msg.SENSOR_JUST_RELEASED = 'just released'

  // // ************** DC Motor ************** //
  // Blockly.Msg.MOTOR_TALK_TO = 'talk to motor'
  // Blockly.Msg.MOTOR_TURN = 'turn'
  // Blockly.Msg.MOTOR_ON = 'on'
  // Blockly.Msg.MOTOR_OFF = 'off'
  // Blockly.Msg.MOTOR_TURN_ON_FOR = 'turn on for'
  // Blockly.Msg.MOTOR_TURN_CW = 'turn Clockwise'
  // Blockly.Msg.MOTOR_TURN_CCW = 'turn Counter-Clockwise'

  // Blockly.Msg.MOTOR_RD = 'reverse direction'
  // Blockly.Msg.MOTOR_SET_POWER = 'Set power'
  // Blockly.Msg.MOTOR = 'motor'
  // Blockly.Msg.MOTOR_IS_ON = 'is(are) on?'
  // Blockly.Msg.MOTOR_IS_CW = 'direction is(are) CW?'

  // // ************** Servo Motor ************** //
  // Blockly.Msg.SERVO = 'servo'
  // Blockly.Msg.SERVO_SET_HEADING = 'Set servo heading'
  // Blockly.Msg.SERVO_LEFT_TURN = 'Servo left turn'
  // Blockly.Msg.SERVO_RIGHT_TURN = 'Servo right turn'

  // // ************** Sound ************** //
  // Blockly.Msg.SOUND_BEEP = 'beep'

  // // ************** TIME ************** //
  // Blockly.Msg.TIME_WAIT = 'wait'
  // Blockly.Msg.TIME_GET_TIMER = 'get timer'
  // Blockly.Msg.TIME_RESET_TIMER = 'reset timer'
  // Blockly.Msg.TIME_TICK_EVERY = 'Tick every'
  // Blockly.Msg.TIME_TICK_COUNT = 'Tick count'
  // Blockly.Msg.TIME_TICKED = 'Ticked?'
  // Blockly.Msg.TIME_CLEAR_TICK = 'clear Tick'
  // Blockly.Msg.TIME_IF_TICKED = 'if Ticked'

  // // ************** Infrared ************** //
  // Blockly.Msg.IR_GET_IR = 'get infrared'
  // Blockly.Msg.IR_NEW_IR = 'new infrared?'

  // // ************** Clock Module ************** //
  // Blockly.Msg.MOD_CLOCK_GET = 'get'
  // Blockly.Msg.MOD_CLOCK_DAY = 'day'
  // Blockly.Msg.MOD_CLOCK_MONTH = 'month'
  // Blockly.Msg.MOD_CLOCK_YEAR = 'year'
  // Blockly.Msg.MOD_CLOCK_HOUR = 'hour'
  // Blockly.Msg.MOD_CLOCK_MINUTE = 'minute'
  // Blockly.Msg.MOD_CLOCK_SECOND = 'second'
  // Blockly.Msg.MOD_CLOCK_DAY_OF_WEEK = 'day of week'

  // // ************** Display Module ************** //
  // Blockly.Msg.MOD_DISPLAY_SHOW_TEXT = 'show text'
  // Blockly.Msg.MOD_DISPLAY_SHOW_NUMBER = 'show number'
  // Blockly.Msg.MOD_DISPLAY_MOVE_CURSOR = 'move cursor to'
  // Blockly.Msg.MOD_DISPLAY_CLEAR_SCREEN = 'clear screen'

  // // ************** Voice Module ************** //
  // Blockly.Msg.MOD_VOICE_PLAY_TRACK = 'Play Track'
  // Blockly.Msg.MOD_VOICE_NEXT_TRACK = 'Next Track'
  // Blockly.Msg.MOD_VOICE_PREV_TRACK = 'Prev Track'
  // Blockly.Msg.MOD_VOICE_SELECT_TRACK = 'Select Track'
  // Blockly.Msg.MOD_VOICE_ERASE = 'Erase All Tracks'

  // // ************** I2C Module ************** //
  // Blockly.Msg.MOD_I2C_WRITE_VALUE = 'I2C Write value'
  // Blockly.Msg.MOD_I2C_TO_REGISTER = 'to register#'
  // Blockly.Msg.MOD_I2C_ON_ADDRESS = 'on device address#'
  // Blockly.Msg.MOD_I2C_READ_FROM_REGISTER = 'I2C Read from register#'

  // // ************** Pi Camera ************** //
  // Blockly.Msg.PI_CAMERA_USE = 'Use camera'
  // Blockly.Msg.PI_CAMERA_CLOSE = 'Close camera'
  // Blockly.Msg.PI_CAMERA_START_FIND_FACE = 'Start Find-Face'
  // Blockly.Msg.PI_CAMERA_STOP_FIND_FACE = 'Stop Find-Face'
  // Blockly.Msg.PI_CAMERA_TAKE_SNAPSHOT = 'Take snapshot'
  // Blockly.Msg.PI_CAMERA_FOUND_FACE = 'Found a Face?'
  // Blockly.Msg.PI_CAMERA_IS_ON = 'Camera is on?'
  // Blockly.Msg.PI_CAMERA_FIND_FACE_IS_ON = 'Find-Face is on?'

  // // ************** Pi Cloud ************** //
  // Blockly.Msg.PI_CLOUD_SEND_IFTTT_EVENT = 'Send IFTTT event'
  // Blockly.Msg.PI_CLOUD_WITH_VALUE = 'with value'
  // Blockly.Msg.PI_CLOUD_SEND_TELEGRAM = 'Send Telegram'
  // Blockly.Msg.PI_CLOUD_TELEGRAM_MESSAGE = 'Message'
  // Blockly.Msg.PI_CLOUD_TELEGRAM_IMAGE = 'Image'
  // Blockly.Msg.PI_CLOUD_TELEGRAM_VALUE = 'value'
  // Blockly.Msg.PI_CLOUD_TELEGRAM_MESSAGE_EQUAL = 'Telegram message is equal to'

  // // ************** Pi Data Logging ************** //
  // Blockly.Msg.PI_DATA_RECORD = 'Record'
  // Blockly.Msg.PI_DATA_AS = 'as'

  // // ************** Pi Email ************** //
  // Blockly.Msg.PI_EMAIL_SEND_TO = 'Send Email to'
  // Blockly.Msg.PI_EMAIL_TITLE = ', title :'
  // Blockly.Msg.PI_EMAIL_BODY = ', body :'

  // // ************** Pi GoGo Communication ************** //
  // Blockly.Msg.PI_GOGO_KEY = 'Key'
  // Blockly.Msg.PI_GOGO_EQUAL_TO = 'is equal to'
  // Blockly.Msg.PI_GOGO_NUM_VAL_OF_KEY = 'Number value of key'
  // Blockly.Msg.PI_GOGO_SUBMIT_TEXT = 'Submit text'
  // Blockly.Msg.PI_GOGO_SUBMIT_NUMBER = 'Submit number'
  // Blockly.Msg.PI_GOGO_TO_TOPIC = 'to topic'

  // // ************** Pi Image ************** //
  // Blockly.Msg.PI_IMAGE_SHOW = 'Show image'
  // Blockly.Msg.PI_IMAGE_HIDE = 'Hide image'
  // Blockly.Msg.PI_IMAGE_SCREEN_TAPPED = 'Screen tapped?'

  // // ************** Pi Sound ************** //
  // Blockly.Msg.PI_SOUND_PLAY = 'Play Sound'
  // Blockly.Msg.PI_SOUND_STOP = 'Stop sound'
  // Blockly.Msg.PI_SOUND_SAY = 'Say'

  // // ************** Pi SMS ************** //
  // Blockly.Msg.PI_SMS_SEND_TO = 'Send SMS to no'
  // Blockly.Msg.PI_SMS_WITH_MESSAGE = 'with message'

  // // ************** Definition ************** //
  // Blockly.Msg.DEF_TITLE = 'define'
  // Blockly.Msg.DEF_AS = 'as'

  return Blockly.Msg
}
