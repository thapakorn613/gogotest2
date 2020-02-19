// var Blockly.Msg = require('node-blockly/lib/i18n/th')

// var Blockly = {}; Blockly.Msg = require('node-blockly/lib/i18n/en')()
var Blockly = {}; Blockly.Msg = {}
var En = require('node-blockly/lib/i18n/en')()
var Th = require('node-blockly/lib/i18n/th')()

const FILES = require('./file_list.json')
const LANG = 'th'

module.exports = function () {
  'use strict'

  for (const key in En) {
    Blockly.Msg[key] = En[key]
  }

  for (const key in Th) {
    Blockly.Msg[key] = Th[key]
  }

  for (const fileIndex in FILES) {
    // console.log(FILES[fileIndex])
    let texts = require(`./${LANG}/${FILES[fileIndex]}`)

    for (const key in texts) {
      Blockly.Msg[key] = texts[key]
    }
  }

  // // ************** Categories ************** //
  // Blockly.Msg.CAT_COMMON = 'ทั่วไป'
  // Blockly.Msg.CAT_LOGIC = 'ตรรกะ'
  // Blockly.Msg.CAT_LOOPS = 'การวนซ้ำ'
  // Blockly.Msg.CAT_MATH = 'คณิตศาสตร์'
  // Blockly.Msg.CAT_SENSING = 'เซ็นเซอร์'
  // Blockly.Msg.CAT_DC_MOTOR = 'มอเตอร์กระแสตรง'
  // Blockly.Msg.CAT_SERVO_MOTOR = 'มอเตอร์เซอร์โว'
  // Blockly.Msg.CAT_SOUND = 'เสียง'
  // Blockly.Msg.CAT_TIME = 'เวลา'
  // Blockly.Msg.CAT_IR_CONTROL = 'รีโมตคอนโทรล'
  // Blockly.Msg.CAT_BUILTIN_DISPLAY = 'หน้าจอ'
  // Blockly.Msg.CAT_ADDON_MODULES = 'ส่วนขยาย'
  // Blockly.Msg.CAT_ADDON_CLOCK = 'โมดูลนาฬิกา'
  // Blockly.Msg.CAT_ADDON_DISPLAY = 'โมดูลหน้าจอ'
  // Blockly.Msg.CAT_ADDON_VOICE = 'โมดูลเสียง'
  // Blockly.Msg.CAT_ADDON_I2C = 'ส่วนขยาย I2C'

  // // ************** Raspberry Pi Categories ************** //
  // Blockly.Msg.CAT_RASPBERRY_PI = 'ราสเบอรี่พาย'
  // Blockly.Msg.CAT_CAMERA = 'กล้อง'
  // Blockly.Msg.CAT_CLOUD_SERVICE = 'บริการคลาวด์'
  // Blockly.Msg.CAT_DATA_LOGGING = 'บันทึกข้อมูล'
  // Blockly.Msg.CAT_EMAIL = 'อีเมล์'
  // Blockly.Msg.CAT_PI_GOGO_COM = 'สื่อสารกับโกโก'
  // Blockly.Msg.CAT_PI_IMAGE = 'รูปภาพ'
  // Blockly.Msg.CAT_PI_SOUND = 'เสียง'
  // Blockly.Msg.CAT_PI_SMS = 'ส่ง SMS'

  // Blockly.Msg.CAT_DEFINITION = 'การนิยามเงื่อนไข'
  // Blockly.Msg.VARIABLES = 'ตัวแปร'
  // Blockly.Msg.PROCEDURES = 'กระบวนการ'

  // // ************** Procedures ************** //
  // Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = 'กำหนด'
  // Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = 'กำหนด'
  // Blockly.Msg.PROC_END = 'จบ'

  // // ************** Global ************** //
  // Blockly.Msg.VARIABLES_SET = 'กำหนดค่า %1 เป็น %2'
  // Blockly.Msg.MATH_CHANGE_TITLE = 'เปลี่ยนค่า %1 ทีละ %2'
  // Blockly.Msg.MSG_SECONDS = 'วินาที'

  // // ************** Logic ************** //
  // // Blockly.Msg.LOGIC_IF = 'if'
  // // Blockly.Msg.LOGIC_DO = 'do'
  // // Blockly.Msg.LOGIC_ELSE_DO = 'else do'
  // Blockly.Msg.LOGIC_BECOMES_TRUE = 'กลายเป็นจริง'
  // Blockly.Msg.LOGIC_ONE_TIME = 'ครั้งเดียว'
  // Blockly.Msg.LOGIC_IS_IN_BETWEEN = 'มีค่าระหว่าง'
  // Blockly.Msg.LOGIC_BETWEEN_AND = 'และ'
  // Blockly.Msg.LOGIC_NOT = 'ไม่'

  // // ************** Loop ************** //
  // Blockly.Msg.LOOP_FOREVER = 'วนซ้ำตลอด'
  // Blockly.Msg.LOOP_EACH_TIME_WAIT = 'แต่ละรอบรอ'

  // // Blockly.Msg.LOOP_SECONDS = Blockly.Msg.MSG_SECONDS
  // Blockly.Msg.LOOP_REPEAT = 'ทำซ้ำ'
  // Blockly.Msg.LOOP_TIMES = 'ครั้ง'
  // Blockly.Msg.LOOP_WAIT_UNTIL = 'รอจนกว่า'
  // Blockly.Msg.LOOP_STOP_PROCEDURE = 'หยุด'

  // // ************** Math ************** //
  // Blockly.Msg.MATH_NUMBER_SERVO_TOOLTIP = 'A number for servo motor.'
  // Blockly.Msg.MATH_NUMBER_MOTOR_TOOLTIP = 'A number for motor power'
  // Blockly.Msg.MATH_RANDOM_NUMBER = 'สุ่มตัวเลข'
  // Blockly.Msg.MATH_RANDOM_INCREASE = 'เพิ่มค่า'
  // Blockly.Msg.MATH_RANDOM_DECREASE = 'ลดค่า'
  // Blockly.Msg.MATH_RANDOM_BY = 'ทีละ'

  // // ************** Sensing ************** //
  // Blockly.Msg.SENSOR_SENSOR = 'เซ็นเซอร์'
  // Blockly.Msg.SENSOR_SWITCH_ON_SENSOR = 'สวิทช์'
  // Blockly.Msg.SENSOR_IS_PRESSED = 'ถูกกด?'
  // Blockly.Msg.SENSOR_IF_SWITCH_ON_SENSOR = 'ถ้าสวิทช์'
  // Blockly.Msg.SENSOR_JUST_PRESSED = 'พึ่งจะถูกกด'
  // Blockly.Msg.SENSOR_JUST_RELEASED = 'พึ่งจะถูกปล่อย'

  // // ************** DC Motor ************** //
  // Blockly.Msg.MOTOR_TALK_TO = 'สั่งงานมอเตอร์'
  // Blockly.Msg.MOTOR_TURN = 'ให้'
  // Blockly.Msg.MOTOR_ON = 'เปิด'
  // Blockly.Msg.MOTOR_OFF = 'ปิด'
  // Blockly.Msg.MOTOR_TURN_ON_FOR = 'เปิดเป็นเวลา'
  // Blockly.Msg.MOTOR_TURN_CW = 'หมุนตามเข็ม'
  // Blockly.Msg.MOTOR_TURN_CCW = 'หมุนทวนเข็ม'

  // Blockly.Msg.MOTOR_RD = 'กลับทิศ'
  // Blockly.Msg.MOTOR_SET_POWER = 'ตั้งค่าพลังงาน'
  // Blockly.Msg.MOTOR = 'มอเตอร์'
  // Blockly.Msg.MOTOR_IS_ON = 'กำลังทำงานอยู่?'
  // Blockly.Msg.MOTOR_IS_CW = 'กำลังหมุนตามเข็ม?'

  // // ************** Servo Motor ************** //
  // Blockly.Msg.SERVO = 'เซอร์โว'
  // Blockly.Msg.SERVO_SET_HEADING = 'ตั้งหัวเซอร์โว'
  // Blockly.Msg.SERVO_LEFT_TURN = 'หมุนหัวเซอร์โวไปทางซ้าย'
  // Blockly.Msg.SERVO_RIGHT_TURN = 'หมุนหัวเซอร์โวไปทางขวา'

  // // ************** Sound ************** //
  // Blockly.Msg.SOUND_BEEP = 'ส่งเสียงบี๊บ'

  // // ************** TIME ************** //
  // Blockly.Msg.TIME_WAIT = 'รอ'
  // Blockly.Msg.TIME_GET_TIMER = 'ค่าไทม์เมอร์'
  // Blockly.Msg.TIME_RESET_TIMER = 'รีเซ็ตไทม์เมอร์'
  // Blockly.Msg.TIME_TICK_EVERY = 'Tick every'
  // Blockly.Msg.TIME_TICK_COUNT = 'Tick count'
  // Blockly.Msg.TIME_TICKED = 'Ticked?'
  // Blockly.Msg.TIME_CLEAR_TICK = 'clear Tick'
  // Blockly.Msg.TIME_IF_TICKED = 'if Ticked'

  // // ************** Infrared ************** //
  // Blockly.Msg.IR_GET_IR = 'ค่าอินฟราเรด'
  // Blockly.Msg.IR_NEW_IR = 'มีอินฟราเรดใหม่?'

  // // ************** Clock Module ************** //
  // Blockly.Msg.MOD_CLOCK_GET = 'ค่า'
  // Blockly.Msg.MOD_CLOCK_DAY = 'วัน'
  // Blockly.Msg.MOD_CLOCK_MONTH = 'เดือน'
  // Blockly.Msg.MOD_CLOCK_YEAR = 'ปี'
  // Blockly.Msg.MOD_CLOCK_HOUR = 'ชั่วโมง'
  // Blockly.Msg.MOD_CLOCK_MINUTE = 'นาที'
  // Blockly.Msg.MOD_CLOCK_SECOND = 'วินาที'
  // Blockly.Msg.MOD_CLOCK_DAY_OF_WEEK = 'ลำดับวันในสัปดาห์'

  // // ************** Display Module ************** //
  // Blockly.Msg.MOD_DISPLAY_SHOW_TEXT = 'แสดงตัวหนังสือ'
  // Blockly.Msg.MOD_DISPLAY_SHOW_NUMBER = 'แสดงตัวเลข'
  // Blockly.Msg.MOD_DISPLAY_MOVE_CURSOR = 'ย้ายตำแหน่งเคอร์เซอร์ไปยัง'
  // Blockly.Msg.MOD_DISPLAY_CLEAR_SCREEN = 'ล้างหน้าจอ'

  // // ************** Voice Module ************** //
  // Blockly.Msg.MOD_VOICE_PLAY_TRACK = 'เล่นแทร็ก'
  // Blockly.Msg.MOD_VOICE_NEXT_TRACK = 'แทร็กถัดไป'
  // Blockly.Msg.MOD_VOICE_PREV_TRACK = 'แทร็กก่อนหน้า'
  // Blockly.Msg.MOD_VOICE_SELECT_TRACK = 'เลือกแทร็ก'
  // Blockly.Msg.MOD_VOICE_ERASE = 'ลบแทร็กทั้งหมด'

  // // ************** I2C Module ************** //
  // Blockly.Msg.MOD_I2C_WRITE_VALUE = 'เขียนค่า I2C '
  // Blockly.Msg.MOD_I2C_TO_REGISTER = 'ไปยังรีจิสเตอร์#'
  // Blockly.Msg.MOD_I2C_ON_ADDRESS = 'ตำแหน่ง#'
  // Blockly.Msg.MOD_I2C_READ_FROM_REGISTER = 'อ่านค่า I2C จากรีจิสเตอร์#'

  // // ************** Pi Camera ************** //
  // Blockly.Msg.PI_CAMERA_USE = 'ใช้งานกล้อง'
  // Blockly.Msg.PI_CAMERA_CLOSE = 'ปิดกล้อง'
  // Blockly.Msg.PI_CAMERA_START_FIND_FACE = 'เริ่มค้นหาใบหน้า'
  // Blockly.Msg.PI_CAMERA_STOP_FIND_FACE = 'หยุดการค้นหาใบหน้า'
  // Blockly.Msg.PI_CAMERA_TAKE_SNAPSHOT = 'ถ่ายรูป'
  // Blockly.Msg.PI_CAMERA_FOUND_FACE = 'เจอใบหน้า?'
  // Blockly.Msg.PI_CAMERA_IS_ON = 'กล้องเปิดอยู่?'
  // Blockly.Msg.PI_CAMERA_FIND_FACE_IS_ON = 'กำลังค้นหาใบหน้าอยู่?'

  // // ************** Pi Cloud ************** //
  // Blockly.Msg.PI_CLOUD_SEND_IFTTT_EVENT = 'ส่งอีเวนท์ IFTTT ชื่อ'
  // Blockly.Msg.PI_CLOUD_WITH_VALUE = 'ด้วยค่า'
  // Blockly.Msg.PI_CLOUD_SEND_TELEGRAM = 'ส่ง'
  // Blockly.Msg.PI_CLOUD_TELEGRAM_MESSAGE = 'ข้อความ'
  // Blockly.Msg.PI_CLOUD_TELEGRAM_IMAGE = 'รูปภาพ'
  // Blockly.Msg.PI_CLOUD_TELEGRAM_VALUE = 'ไปยัง Telegram ด้วยค่า'
  // Blockly.Msg.PI_CLOUD_TELEGRAM_MESSAGE_EQUAL = 'ข้อความจาก Telegram ตรงกับ'

  // // ************** Pi Data Logging ************** //
  // Blockly.Msg.PI_DATA_RECORD = 'บันทึก'
  // Blockly.Msg.PI_DATA_AS = 'เป็น'

  // // ************** Pi Email ************** //
  // Blockly.Msg.PI_EMAIL_SEND_TO = 'ส่งอีเมล์ถึง'
  // Blockly.Msg.PI_EMAIL_TITLE = 'ด้วยหัวเรื่อง'
  // Blockly.Msg.PI_EMAIL_BODY = 'และเนื้อหา'

  // // ************** Pi GoGo Communication ************** //
  // Blockly.Msg.PI_GOGO_KEY = 'ค่า Key'
  // Blockly.Msg.PI_GOGO_EQUAL_TO = 'ตรงกับ'
  // Blockly.Msg.PI_GOGO_NUM_VAL_OF_KEY = 'ค่าตัวเลขของ Key'
  // Blockly.Msg.PI_GOGO_SUBMIT_TEXT = 'ส่งข้อความ'
  // Blockly.Msg.PI_GOGO_SUBMIT_NUMBER = 'ส่งค่า'
  // Blockly.Msg.PI_GOGO_TO_TOPIC = 'ไปยังหัวข้อ'

  // // ************** Pi Image ************** //
  // Blockly.Msg.PI_IMAGE_SHOW = 'แสดงรูป'
  // Blockly.Msg.PI_IMAGE_HIDE = 'ซ่อนรูป'
  // Blockly.Msg.PI_IMAGE_SCREEN_TAPPED = 'มีการแตะที่หน้าจอ?'

  // // ************** Pi Sound ************** //
  // Blockly.Msg.PI_SOUND_PLAY = 'เล่นเสียง'
  // Blockly.Msg.PI_SOUND_STOP = 'หยุดเล่นเสียง'
  // Blockly.Msg.PI_SOUND_SAY = 'พูด'

  // // ************** Pi SMS ************** //
  // Blockly.Msg.PI_SMS_SEND_TO = 'ส่ง SMS ไปยังหมายเลข'
  // Blockly.Msg.PI_SMS_WITH_MESSAGE = 'ด้วยข้อความ'

  // // ************** Definition ************** //
  // Blockly.Msg.DEF_TITLE = 'นิยามเงื่อนไข'
  // Blockly.Msg.DEF_AS = 'เป็น'

  return Blockly.Msg
}
