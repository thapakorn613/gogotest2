import deviceProcess from './deviceProcess'
import { CONST, CONFIG } from './const'

import notification from './notification'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import PahoMQTT from 'paho-mqtt'


// import Noty from 'noty'

// var deviceProcess = require('./deviceProcess')

var state = {
  firmwareIsBeingUpdated: false,
  socket: null,
  httpConnector: null,
  noti: null,
  gogoInfo: deviceProcess.getDefault().info,
  swalSuccess: null,
}


var imm;
var cmdList = [];
var imm1byte = [];
var boolCompare =[];
var newCmd = true;
var valuesensor ;
var sensorStackForIf = [];
var gblBuffer1 = [];
var gblBuffer2 = [];
var gblBuffer3 = [];
var gblBuffer = [];

var gblBufferTest = [];
var gblString = [];

var gblTimer = 0;

var boolGblBuffer = 0;
var imm2Number = [];
var client ;
var loop;
var gblReporter;
var boolGblLoop;
var totalSeconds = 0;
var old_cmd = "cmd";

var countVMpro = 0;

var ss = localStorage.getItem("sensor_val"); // sensor value
//const Paaho = require('./paho-mqtt')
//var PahoMQTT = require('./paho-mqtt-new')
var randomstring = require("randomstring");

global.Paho = {
  MQTT: PahoMQTT
}

const vm = {
  WAIT: 16,
  OP_PLUS: 23,
  OP_MINUS: 24,
  OP_MULTIPLY: 25,
  OP_DIVISION: 26,
  OP_MODULO: 27,
  OP_EQUAL: 28,
  OP_GREATER: 29,
  OP_LESS: 30,
  OP_AND: 31,
  OP_OR: 32,
  OP_XOR: 33,
  OP_NOT: 31,
  SETPOWER: 59,
  OP_GREATER_OR_EQUAL: 61,
  OP_LESS_OR_EQUAL: 62,
  ISTHISWAY: 66,
  ISTHATWAY: 67,
  SERVO_SET_H: 87,
  SERVO_LT: 88,
  SERVO_RT: 89,
  STRING: 111,
}

const globalControl = {
  
  send (data, callback) {
    // this.$socket.send(data)

    state.socket.sendObj({
      'type': 'rawHID',
      'data': data
    })
    if (callback) {
      callback()
    }

    // window.svue.$socket.send(JSON.stringify({
    //   'type': 'rawHID',
    //   'data': data
    // }))

    // state.socket.send(data.join(''))
    // console.log(data)
  },
  
  sendCommandFirmware (data, callback) {
    console.log(data)
    // var buffer = new ArrayBuffer(CONST.TX_PACKET_SIZE - 1)
    var cmd = new Array(CONST.TX_PACKET_SIZE).fill(0)
    // cmd[CONST.ENDPOINT]      = CONST.ENDPOINT_ID
    for (var i in data) {
      // if (i>0 && i<CONST.TX_PACKET_SIZE)
      cmd[parseInt(i) - 0] = data[i]
    }
    this.send(cmd, callback)
  },

  sendCommand (data, callback) {
    if (state.firmwareIsBeingUpdated) return
    // var buffer = new ArrayBuffer(CONST.TX_PACKET_SIZE - 1)
    // var cmd = new Uint8Array(buffer)
    var cmd = new Array(CONST.TX_PACKET_SIZE).fill(0)

    // -- cmd[CONST.ENDPOINT]      = CONST.ENDPOINT_ID
    for (var i in data) {
      // if (i>0 && i<CONST.TX_PACKET_SIZE)
      cmd[parseInt(i) - 0] = data[i]
    }
    // this.send(buffer, callback)
    this.send(cmd, callback)
  },

  sendControlCommand (data) {
    data[CONST.CATEGORY_ID] = CONST.CATEGORY_OUTPUT_CONTROL
    this.sendCommand(data)
  },

  sendRpiControlCommand (data) {
    data[CONST.CATEGORY_ID] = CONST.CATEGORY_RASPBERRY_PI_CONTROL
    this.sendCommand(data)
  },

  setLogoMemoryPointer: (pointer, callback) => {
    /* Set memory point to address 0.
        Note that this memeory address is relative to the
        Logo code area in the processor's flash memory.
        See setFlashMemoryPointer if you need to point to
        an absolute flash memory location
    */
    var cmdList = []
    cmdList[CONST.CATEGORY_ID] = CONST.CATEGORY_MEMORY_CONTROL
    cmdList[CONST.CMD_ID] = CONST.MEM_LOGO_SET_POINTER
    cmdList[CONST.PARAMETER1] = 0
    cmdList[CONST.PARAMETER2] = 0
    globalControl.sendCommand(cmdList, callback)
  },

  setFlashMemoryPointer (pointer, callback) {
    var cmdList = []

    /*  Sets memory pointer to a raw location on the processor
     */
    // print "Set flash pointer to " + hex(pointer)

    cmdList[CONST.CATEGORY_ID] = CONST.CATEGORY_MEMORY_CONTROL
    cmdList[CONST.CMD_ID] = CONST.MEM_SET_POINTER
    cmdList[CONST.PARAMETER1] = pointer >> 8
    cmdList[CONST.PARAMETER2] = pointer & 0xff
    globalControl.sendCommandFirmware(cmdList, callback)
  },

  writeFlashMemory: (content, callback, offset) => {
    offset = offset || 0
    if (offset > content.length) {
      if (typeof callback === 'function') {
        callback()
      }
      return
    }

    /* Write content to the flash memory */
    var txLength = content.length

    var cmdList = []
    cmdList[CONST.CATEGORY_ID] = CONST.CATEGORY_MEMORY_CONTROL
    cmdList[CONST.CMD_ID] = CONST.MEM_WRITE

    // # if the content cannot fit in one packet
    if (txLength - offset > (CONST.TX_PACKET_SIZE - 4)) {
      cmdList[CONST.PARAMETER1] = CONST.TX_PACKET_SIZE - 4
    } else {
      cmdList[CONST.PARAMETER1] = txLength - offset
    }

    // # copy the content to be transmitted to the output buffer
    for (var i = 0; i < cmdList[CONST.PARAMETER1]; i++) {
    // for (var i in _.range(cmdList[CONST.PARAMETER1])) {
      cmdList[4 + Number(i)] = content[offset + Number(i)]
    }

    offset += CONST.TX_PACKET_SIZE - 4

    globalControl.sendCommandFirmware(cmdList, () => {
      setTimeout(() => {
        globalControl.writeFlashMemory(content, callback, offset)
      }, 10)
    })

    // # this dealy allows the processor to finish writing the
    // # received content to the flash memory before receiving
    // # more content
  }
}

export default{
  config: {
    motorPort: ['a', 'b', 'c', 'd'],
    maxByteCodeLength: 2048,
    image: {
      path: 'assets/img/'
    },
    firmware: {
      path: 'assets/firmware/',
      bootloader: 'bootloader.hex',
      bootloaderPT: 'bootloaderPT.hex',
      gogoboard4: {
        minSupport: 111,
        latest: 111,
        111: 'gogo40.v111.hex'
      },
      gogoboard: {
        minSupport: 40,
        latest: 40,
        40: 'rpt10.v40.hex',
        31: 'rpt10.v31.hex'
      }
    },
    message: {
      warning: 'warning',
      firmwareNotSupport:
        'Please update GoGo Board firmware.\nThe minimum supported version is ',
      latestFirmware:
        'New firmware is available, The latest firmware version is ',
      currentFirmware: 'Current firmware version is ',
      pluginIsNotConnected: 'Plugin is not connected!',
      boardIsNotConnected: 'GoGo Board is not connected!',
      downloadLogoComplete: 'Download success',
      memUsed: 'with memory used ',
      logoCodeTooLarge:
        "The Logo code is too large! I don't have enough memory to hold it",
      cloudUnavailable:
        'Cloud Service is unavailable or no internet connection.',
      syntaxError: 'Syntax Error.',
      unknowBoardType: 'Unknown board type ',
      connectionError: 'Connection Error',
      noPiAlive: 'The Raspberry Pi is not alive',
      usingLastestFirmware: "You're using the latest firmware.",
      updatingFirmware: 'Updating firmware...',
      raspiDisconnect: 'Raspberry Pi disconnected',
      raspiConnect: 'Raspberry Pi is on'
    },
    status: {
      wifi: [
        '',
        'Connecting... (this can take a while)',
        'Success',
        'Authentication/Connection Error',
        'SSID Not Found',
        'Unknown Error'
      ],
      sms: [
        '',
        'Sending... (this can take a while)',
        'Success',
        'Error',
        "Error : Device doesn't exist ",
        'Error : Can not access SIM card',
        'Unknown Error'
      ],
      email: {
        0: '',
        1: 'Sending... (this can take a while)',
        2: 'Success',
        3: 'Connection Error',
        4: 'Authentication Error',
        5: 'Confliction Error',
        6: 'Unknown Error',
        11: 'Sending... (this can take a while)',
        12: 'Success'
      }
    },
    cloudCompilerUrl:
      'https://7fkqkq6trh.execute-api.ap-southeast-1.amazonaws.com/logo/',
    cloudCompilerUrlEnd: '/compile',
    rpiCmd: [
      'rpiShutdown',
      'rpiReboot',
      'rpiUseCamera',
      'rpiCloseCamera',
      'rpiCameraPreview',
      'rpiStartFindFace',
      'rpiStopFindFace',
      'rpiTakeSnapshot'
    ]
  },

  globalControl,

  setSocket (socket) {
    state.socket = socket
  },

  setHttpConnector (connector) {
    state.httpConnector = connector
  },

  setNoti (noti) {
    state.noti = noti
  },

  setSwalSuccess (swal) {
    state.swalSuccess = swal
  },

  setGoGoInfo (info) {
    state.gogoInfo = info
  },

  processCommand (command) {
    command = command.split('::')

    if (command[0] === 'logo') {
      this.preCompileVerify(command[1])
    }

    command = command.slice(1)

    switch (command[0]) {
      case 'ledOn':
        this.controls.ledControl(0, 1) // 0 = the default user led, 1 = 0n
        break
      case 'ledOff':
        this.controls.ledControl(0, 0) // 0 = the default user led, 1 = 0n
        break
      case 'beep':
        this.controls.beep()
        break
      case 'motorOn':
        this.controls.mOn()
        break
      case 'motorOff':
        this.controls.mOff()
        break
      case 'motorRD':
        this.controls.mRD()
        break
      case 'motorCW':
        this.controls.mCW()
        break
      case 'motorCCW':
        this.controls.mCCW()
        break
      case 'talkToMotor':
        this.controls.talkToMotor(command[1])
        break
      case 'setPower':
        this.controls.setPower(command[1])
        break
      case 'setServoDuty':
        this.controls.setServoDuty(command[1])
        break
      case 'runStop':
        this.controls.LogoControl(2)
        break
      case 'LogoControl':
        this.controls.LogoControl(command[1])
        break
      case 'logoRun':
        location.replace('https://www.w3schools.com')
        console.log('onConnect')
        this.controls.logoRun()
        break
      case 'logocloud':
        this.controls.logoCloud()
        break
      case 'toggleMotor':
        this.controls.toggleMotor(parseInt(command[1]))
        break
      case 'showShortText':
        this.controls.showShortText(command[1])
        break
      case 'rpiWifiConnect':
        this.rpiControls.rpiWifiConnect(command[1], command[2])
        break
      default:
        if (CONFIG.rpiCmd.indexOf(command[0]) > -1) {
          this.rpiControls[command[0]]()
        }
        // console.log(' ');
    }
  },

  processCommandObject (command) {
    if (command.type === undefined || command.cmd === undefined) return

    if (command.type === 'control' && command.cmd in this.controls) {
      if (command.params === undefined) {
        this.controls[command.cmd]()
      } else {
        this.controls[command.cmd](command.params)
      }
    } else if (command.type === 'rpi_control' && command.cmd in this.rpiControls) {
      if (command.params === undefined) {
        this.rpiControls[command.cmd]()
      } else if (command.params.length === 2) {
        this.rpiControls[command.cmd](command.params[0], command.params[1])
      } else {
        this.rpiControls[command.cmd](command.params)
      }
    }
  },

  controls: {

    sendControlCommand: (data) => {
      globalControl.sendControlCommand(data)
      // console.log(data)
    },

    ping () {
      // for gogo board
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_PING
      cmdList[CONST.PARAMETER1] = 0
      this.sendControlCommand(cmdList)
    },

    pingNode (nodeAddress) {
      // for gogo wireless
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_PING
      cmdList[CONST.PARAMETER1] = 1
      cmdList[CONST.PARAMETER2] = nodeAddress
      this.sendControlCommand(cmdList)
    },

    beep () {
      var cmdList = []

      cmdList[CONST.CMD_ID] = CONST.CMD_BEEP
      this.sendControlCommand(cmdList)
    },

    setAutorun (state) {
      /*
      :param state: 0 = disabled, 1 = enabled
      :return: none
      */
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_AUTORUN_STATE
      cmdList[CONST.PARAMETER1] = state
      this.sendControlCommand(cmdList)
    },

    LogoControl (state) {
      /*
      :param state: 0 = stop logo procedure, 1 = run logo procedure
      :return: none
      */

      state = parseInt(state)
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_LOGO_CONTROL
      cmdList[CONST.PARAMETER1] = state
      this.sendControlCommand(cmdList)
    },

    logoRun () {
      this.LogoControl(1)
    },

    logoStop () {
      this.LogoControl(0)
    },
    /* eslint-disable */
    logoCloud () {
        //location.replace("https://www.w3schools.com")
    },
    /* eslint-enable */

    mOn () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_MOTOR_ON_OFF
      cmdList[CONST.PARAMETER1] = 0
      cmdList[CONST.PARAMETER2] = 1
      this.sendControlCommand(cmdList)
    },

    mOff () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_MOTOR_ON_OFF
      cmdList[CONST.PARAMETER1] = 0
      cmdList[CONST.PARAMETER2] = 0
      this.sendControlCommand(cmdList)
    },

    mCW () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_MOTOR_DIRECTION
      cmdList[CONST.PARAMETER1] = 0
      cmdList[CONST.PARAMETER2] = 1
      this.sendControlCommand(cmdList)
    },

    mCCW () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_MOTOR_DIRECTION
      cmdList[CONST.PARAMETER1] = 0
      cmdList[CONST.PARAMETER2] = 0
      this.sendControlCommand(cmdList)
    },

    mRD () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_MOTOR_RD
      cmdList[CONST.PARAMETER1] = 0
      this.sendControlCommand(cmdList)
    },

    talkToMotor (motorBits) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_SET_ACTIVE_PORTS
      cmdList[CONST.PARAMETER1] = Number(motorBits)
      this.sendControlCommand(cmdList)
    },

    setPower (powerLevel) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_SET_POWER
      cmdList[CONST.PARAMETER1] = 0 // target motors = 0 = currently selected motors
      cmdList[CONST.PARAMETER2] = Number(powerLevel) >> 8 // highbyte
      cmdList[CONST.PARAMETER3] = Number(powerLevel) & 0xff // lowbyte

      this.sendControlCommand(cmdList)
    },

    setServoDuty (duty) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_SET_SERVO_DUTY
      cmdList[CONST.PARAMETER1] = 0 // target motors = 0 = currently selected motors
      cmdList[CONST.PARAMETER2] = Number(duty) >> 8 // highbyte
      cmdList[CONST.PARAMETER3] = Number(duty) & 0xff // lowbyte

      this.sendControlCommand(cmdList)
    },

    motorToggleA () {
      this.toggleMotor(0)
    },

    motorToggleB () {
      this.toggleMotor(1)
    },

    motorToggleC () {
      this.toggleMotor(2)
    },

    motorToggleD () {
      this.toggleMotor(3)
    },

    toggleMotor (motorNumber) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_TOGGLE_ACTIVE_PORT
      cmdList[CONST.PARAMETER1] = motorNumber
      this.sendControlCommand(cmdList)
    },

    ledOn () {
      this.ledControl(0, 1)
    },

    ledOff () {
      this.ledControl(0, 0)
    },

    ledControl (ledID, onOffState) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_LED_CONTROL
      cmdList[CONST.PARAMETER1] = ledID // 0 = the default user LED
      cmdList[CONST.PARAMETER2] = onOffState // 0 = off , 1 = on
      this.sendControlCommand(cmdList)
    },

    reboot () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_REBOOT
      globalControl.sendCommandFirmware(cmdList)
    },

    syncRTC (dateTimeList) {
      var cmdList = {}
      cmdList[CONST.CMD_ID] = CONST.CMD_SYNC_RTC
      if (!dateTimeList) {
        var now = new Date()
        dateTimeList = [now.getSeconds(), now.getMinutes(), now.getHours(), now.getDay(),
          now.getDate(), (now.getMonth() + 1), now.getFullYear() - 2000]
      }
      cmdList = this.appendDic(dateTimeList, cmdList)
      this.sendControlCommand(cmdList)
    },

    readRTC () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_READ_RTC
      this.sendControlCommand(cmdList)
    },

    showShortText (text) {
      var cmdList = {}
      text = text.toString()
      cmdList[CONST.CMD_ID] = CONST.CMD_SHOW_SHORT_TEXT

      cmdList = deviceProcess.stringToByes(text, cmdList, null)
      // var i = 0
      // for (var c in text) {
      //   cmdList[CONST.PARAMETER1 + i]    = text.charCodeAt(i);
      //   i+=1;
      // }
      // cmdList[CONST.PARAMETER1 + i] = 0 // terminates the string

      this.sendControlCommand(cmdList)
    },

    showLongText: (text) => {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_SHOW_LONG_TEXT
      cmdList = deviceProcess.stringToByes(text, cmdList, null)
      // cmdList[CONST.PARAMETER1 + i] = 0 // terminates the string
      this.sendControlCommand(cmdList)
    },

    LCDclearText () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.CMD_CLEAR_SCREEN

      this.sendControlCommand(cmdList)
    },

    voiceModuleControl (command, trackNumber) {
      command = command || ''
      command = command.toLowerCase().trim()
      var cmdList = {}

      trackNumber = trackNumber || -1

      var voiceModuleCommands = {
        'play': CONST.CMD_VOICE_PLAY_PAUSE,
        'nexttrack': CONST.CMD_VOICE_NEXT_TRACK,
        'prevtrack': CONST.CMD_VOICE_PREV_TRACK,
        'gototrack': CONST.CMD_VOICE_GOTO_TRACK,
        'erasetracks': CONST.CMD_VOICE_ERASE_ALL_TRACKS
      }

      if (command in voiceModuleCommands) {
        cmdList[CONST.CMD_ID] = voiceModuleCommands[command]
        if (command === 'gototrack') {
          cmdList[CONST.PARAMETER1] = trackNumber
        }
        this.sendControlCommand(cmdList)
      }
    }
  },

  rpiControls: {

    sendRpiControlCommand: (data) => {
      globalControl.sendRpiControlCommand(data)
    },

    rpiUseCamera () {
      this.rpiCameraControl(1)
      // show a preview from the camera
      // setTimeout(_rpiCameraPreview, 500);
    },

    rpiCloseCamera () {
      this.rpiCameraControl(0)
    },

    rpiCameraControl (cameraOnState) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_CAMERA_CONTROL
      cmdList[CONST.PARAMETER1] = cameraOnState // 0 = off , 1 = on

      this.sendRpiControlCommand(cmdList)
    },

    rpiStartFindFace () {
      this.rpiFindFaceControl(1)
    },

    rpiStopFindFace () {
      this.rpiFindFaceControl(0)
    },

    rpiFindFaceControl (findFaceState) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_FIND_FACE_CONTROL
      cmdList[CONST.PARAMETER1] = findFaceState // 0 = disable , 1 = enable

      this.sendRpiControlCommand(cmdList)
    },

    rpiTakeSnapshot () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_TAKE_SNAPSHOT
      cmdList[CONST.PARAMETER1] = 1 // 1 = save image, 0 = preview only

      this.sendRpiControlCommand(cmdList)

      // setTimeout(function() {
      //   widget.RaspberryPiView.updatePreviewImage();
      // }, 500);
    },

    rpiCameraPreview () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_TAKE_SNAPSHOT
      cmdList[CONST.PARAMETER1] = 0 // 1 = save image, 0 = preview only

      this.sendRpiControlCommand(cmdList)

      // setTimeout(function() {
      //   widget.RaspberryPiView.updatePreviewImage();
      // }, 500);
    },

    rpiWifiConnect (ssid, password) {
      var cmdList = {}

      password = password || null
      if (!password) { password = '' }
      cmdList[CONST.CMD_ID] = CONST.RPI_WIFI_CONNECT

      var parameterString = ssid + ',' + password
      cmdList[CONST.PARAMETER1] = parameterString.length

      cmdList = deviceProcess.stringToByes(parameterString, cmdList, CONST.PARAMETER2)
      this.sendRpiControlCommand(cmdList)
    },

    rpiWifiDisonnect () {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_WIFI_DISCONNECT
      this.sendRpiControlCommand(cmdList)
    },

    rpiEmailConfig (emailUser, emailPassword) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_EMAIL_CONFIG
      var parameterString = emailUser + ',' + emailPassword
      cmdList[CONST.PARAMETER1] = parameterString.length
      cmdList = deviceProcess.stringToByes(parameterString, cmdList, CONST.PARAMETER2)
      this.sendRpiControlCommand(cmdList)
    },

    rpiEmailSend (emailRecipient, emailSubject, emailBody) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_EMAIL_SEND
      var parameterString = emailRecipient + ',' + emailSubject + ',' + emailBody
      cmdList[CONST.PARAMETER1] = parameterString.length
      cmdList = deviceProcess.stringToByes(parameterString, cmdList, CONST.PARAMETER2)
      this.sendRpiControlCommand(cmdList)
    },

    rpiSMSSend (smsNumber, smsMessage) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_SMS_SEND
      var parameterString = smsNumber + ',' + smsMessage
      cmdList[CONST.PARAMETER1] = parameterString.length
      cmdList = deviceProcess.stringToByes(parameterString, cmdList, CONST.PARAMETER2)
      this.sendRpiControlCommand(cmdList)
    },

    rpiSetRpiTxBuffer (index, value) {
      var cmdList = {}

      cmdList[CONST.CMD_ID] = CONST.RPI_SET_TX_BUFFER
      cmdList[CONST.PARAMETER1] = index
      cmdList[CONST.PARAMETER2] = value
      this.sendRpiControlCommand(cmdList)
    },

    rpiClearScreenTappedFlag () {
      this.rpiSetRpiTxBuffer(CONST.RPI_SCREEN_TAP, 0)
    },

    rpiReboot () {
      var cmdList = {}
      cmdList[CONST.CMD_ID] = CONST.RPI_REBOOT
      this.sendRpiControlCommand(cmdList)
    },

    rpiShutdown () {
      var cmdList = {}
      cmdList[CONST.CMD_ID] = CONST.RPI_SHUTDOWN
      this.sendRpiControlCommand(cmdList)
    }
  },

  downloadLogoCode (logoBinaryString, callback) {
    /* Download Logo Byte code to the gogo board\

        It automatically sets the memory ponter to 0 and\
        downloads the code\
    */

    // console.log("Sent Logo mem pointer to 0");
    globalControl.setLogoMemoryPointer(0, () => {
      // console.log("download the bin code");
      // send the Logo binary code
      globalControl.writeFlashMemory(logoBinaryString, () => {
        setTimeout(() => {
          this.controls.ledControl(1, 0)
          this.controls.beep()
          if (typeof callback === 'function') {
            callback()
          }
        }, 15)
      })
    })
  },

  isPluginConnected () {
    return (state.socket && state.socket.readyState === state.socket.OPEN)
  },

  isBoardConnected () {
    return state.gogoInfo.boardType > 0
  },

  checkSupportedFimware () {
    if (state.gogoInfo.boardType === CONST.GOGOBOARD &&
      state.gogoInfo.firmwareVersion &&
      state.gogoInfo.firmwareVersion >= CONFIG.firmware.gogoboard4.minSupport) {
      return true
    } else if (state.gogoInfo.boardType === CONST.PITOPPING &&
      state.gogoInfo.firmwareVersion &&
      state.gogoInfo.firmwareVersion >= CONFIG.firmware.gogoboard.minSupport) {
      return true
    } else {
      return false
    }
  },

  getLogoVersion (logoVersion) {
    logoVersion = parseFloat(logoVersion)
    var fimwareVersion = parseInt(state.gogoInfo.firmwareVersion)
    // var boardVersion = parseInt(this.current.boardVersion)
    var boardType = parseInt(state.gogoInfo.boardType)

    if ([1.2, 1.3].indexOf(logoVersion) > -1) return logoVersion

    //  If GoGo Board 4.x
    if (boardType === CONST.GOGOBOARD) {
      return 1.2

      //  If GoGo Board 5.x or Pi Topping
    } else if (boardType === CONST.PITOPPING) {
      if (!isNaN(fimwareVersion) && fimwareVersion < 40) {
        return 1.2
      }
    }

    return 1.3
  },


  cloudCompile (logoCode, callback) {
    // var _this = this;
    var compilerUrl = CONFIG.cloudCompilerUrl + this.getLogoVersion() + CONFIG.cloudCompilerUrlEnd
    var sendingData = {
      logo: logoCode,
      firmware_version: state.gogoInfo.firmwareVersion,
      board_type: state.gogoInfo.boardType,
      board_version: state.gogoInfo.boardVersion
    }

    state.httpConnector.post(compilerUrl, sendingData, {emulateJSON: true}).then((response) => {
      // Success
      if (typeof callback === 'function') {
        callback(response.data)
      }
      this.compileAndDownloadSecond(response.data)
    }, (response) => {
      // Error
      if (response.data && response.data.status && (response.data.status >= 500 && response.data.status < 600)) {
        // this._notiService.error('', CONFIG.message.syntaxError)
        notification.warning(CONFIG.message.syntaxError || 'Error')
      } else {
        // this._notiService.error('', CONFIG.message.cloudUnavailable)
        notification.warning(CONFIG.message.cloudUnavailable || 'Error')
      }
    })
  },
  preCompileVerify (logoCode, callbackSuccess, callbackFail) {
    if (!this.isPluginConnected()) {
      console.warn('GoGo', '\t', CONFIG.message.pluginIsNotConnected)
      notification.warning(CONFIG.message.pluginIsNotConnected)
      if (typeof callbackFail === 'function') {
        callbackFail()
      }
      return
    }

    if (!this.isBoardConnected()) {
      console.warn('GoGo', '\t', CONFIG.message.boardIsNotConnected)
      notification.warning(CONFIG.message.boardIsNotConnected)
      if (typeof callbackFail === 'function') {
        callbackFail()
      }
      return
    }

    if (!this.checkSupportedFimware()) {
      notification.warning(CONFIG.message.firmwareNotSupport + CONFIG.firmware.gogoboard.minSupport)
      if (typeof callbackFail === 'function') {
        callbackFail()
      }
      return
    }
    this.cloudCompile(logoCode, callbackSuccess)
  },
  mqttconnect(){
    console.log("ss",ss)
    console.log("messege = mqttconnectfunction")
    //Paaho = require('./paho-mqtt-new')
    //client = new Paaho.Paho.MQTT.Client("soldier.cloudmqtt.com", /*30420*/34222,"bank99");
    //client = new Paaho.Paho.MQTT.Client("smart-teacher.cloudmqtt.com", /*30420*/443,"bank99");
    //client = new Paaho.Paho.MQTT.Client("35.198.231.150", 9001,randomstring.generate(7));
    client = new Paho.MQTT.Client("35.198.231.150", 9001,randomstring.generate(7));
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    var options = {
      useSSL: true,
      //userName: "vpfewsse",
      //password: "gNAs763mxcGN",
      //userName: "obpkkwdc",
      //password: "1lUnSF15XpWM",
      //userName: "ekrwnxjf",
      //password: "x9OU_vaUyZQJ",
      onSuccess:onConnect,
      onFailure:doFail
    }
    client.connect(options);
    function onConnect() {
      console.log("MQTTonConnect");
      var message = new Paho.MQTT.Message("reQconnect");
      var mQtt_ch = localStorage.getItem("mQtt_ch");
      message.destinationName = "remotelab/"+mQtt_ch;
      console.log(mQtt_ch);
      client.send(message);
      client.subscribe("remotelab/"+mQtt_ch);
    }
    function doFail(e){
      console.log(e);
    }
    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        //console.log("onConnectionLost:"+responseObject.errorMessage);
      }
    }
    // called when a message arrives
    function onMessageArrived(message) {
      console.log("onMessageArrived:"+message.payloadString);
      localStorage.setItem("rcvmsg", message.payloadString);
      //document.getElementById("demo").innerHTML = message.payloadString;
    }
  },
  mqttsending ( msg ) {
    console.log("messege = ",msg)
    cmdList =[];
    //const Paaho = require('./paho-mqtt')
    //Paaho = require('./paho-mqtt-new')
    console.log("MQTTonConnect");
    var mQtt_ch = localStorage.getItem("mQtt_ch");
    client.subscribe("remotelab/"+mQtt_ch);
    for(var i=0;i<msg.length;i++){
      var message = new Paho.MQTT.Message(msg[i]);
      message.destinationName = "remotelab/"+mQtt_ch;
      //console.log("loopmsg",msg[i]);
      client.send(message);
    }
    //client.send(message);
  },
  mqttreceive ( msg ) {
    console.log("messege = ",msg)
    //const Paaho = require('./paho-mqtt')
    Paaho = require('./paho-mqtt-new')
    console.log("MQTTonConnect for receive");
    var mQtt_ch = localStorage.getItem("mQtt_ch");
    //client.subscribe("/gogomqtt");
    //var d = new Date();
    //var n = d.getMilliseconds();
    //console.log(d,":",n);
    //client.send(message);
  },

  virtualgogo ( vByteCode ) {

    var text = vByteCode;
    //console.log(text)
    var gblQueue = [];
    gblBufferTest=[];
    gblBuffer=[];
    gblBuffer1=[];
    gblBuffer2=[];
    imm1byte = [];
    boolCompare =[];
    sensorStackForIf = [];
    boolGblBuffer = 0;
    imm2Number = [];
    cmdList =[];
    var words = text;
    var lenghtOfBuffer = 0;
    const WAIT = 16;
    gblReporter = false;
    
    for(var i=0;i<words.length;i++){
        var tempToInt = parseInt(words[i], 10);
        gblQueue.push(tempToInt);
    } 
    // Stack
    this.vmProcess(gblQueue);
    //console.log(cmdList)
    //this.sendCmd(cmdList)
    //this.mqttsending(cmdList)


  },
  vmProcess(_gblQueue){
      var loop = _gblQueue.shift();
      for(var i=0;i<1000;i++){
          if (loop == 1){
              var tempImm = _gblQueue.shift();
              imm1byte.push(parseInt(tempImm, 10));
              loop = _gblQueue.shift(); // next set
          }else if (loop == 2){
              for(var i=0;i<2;i++){
                  var tempImmNumber = _gblQueue.shift();
                  imm2Number.push(parseInt(tempImmNumber, 10));
              }
              var highByte = (imm2Number.shift()) << 8;
              var lowByte = imm2Number.shift();
              var tempNumIf = highByte + lowByte;
              imm1byte.push(tempNumIf);
              var typeCompare = _gblQueue.shift();
              if(typeCompare == 1 ){
                _gblQueue.shift();
              }
              this.cmdProcess(typeCompare);
              loop = _gblQueue.shift(); // next set
          }else if (loop == 3){ //  start of list
              var lenghtBuf = _gblQueue.shift();
              var bufferTemp =[];      
              for(var i=0;i<lenghtBuf;i++){
                  loop = _gblQueue.shift();
                  bufferTemp.push(loop);
              }
              countVMpro++;
              bufferTemp.pop();
              gblBufferTest.push(bufferTemp);
              // console.log("------------- ",countVMpro,"-------------");
              //console.log("bufferTemp : ",bufferTemp);
              // console.log("gblBufferTest : ",gblBufferTest);
              loop = _gblQueue.shift(); // next set
          }else if(loop == 111){
            var lenghtBuf = _gblQueue.shift();
            var bufferTemp =[];      
            for(var i=0;i<lenghtBuf;i++){
                loop = _gblQueue.shift();
                gblString.push(loop);
            }
            //console.log("bufferTemp : ",bufferTemp);
            loop = _gblQueue.shift(); // next set
          }else{
            this.cmdProcess(loop); // end set - opcode
            loop = _gblQueue.shift(); // next set
          }
          if(loop == 0 || loop === undefined ){
              
              //console.log("end of loop");
              break;
          }
      }
      this.sendCmd(cmdList)
      // while(loop !=  || loop === undefined) ;
  },
  cmdProcess(_cmdOpcode){
      switch (_cmdOpcode) {
          case 1:
              break;
          case 7:
              console.log("stop : ");
              this.clearInterval(boolGblLoop);
              break;
          case 9:
              var _imm = imm1byte.shift();
              var bufferTemp = [];
              //console.log(gblBufferTest.length);
              var indexGblBuf = parseInt(gblBufferTest.length, 10);
              //console.log(indexGblBuf);
              for(var j=0;j<gblBufferTest[indexGblBuf-1].length;j++){
                  bufferTemp.push(gblBufferTest[indexGblBuf-1][j]);
              }
              //console.log("bufferTemp Repeat : ",bufferTemp);
              this.Repeat(bufferTemp,_imm);    
              break;
          case 10: // ---- If ----- function
              console.log("at if function ");
              var bufferIf = [];
              var indexGblBuf = parseInt(gblBufferTest.length, 10);
              for(var j=0;j<gblBufferTest[indexGblBuf-1].length;j++){
                  bufferIf.push(gblBufferTest[indexGblBuf-1][j]);
              }
              //console.log("bufferIf : ",bufferIf);
              var _boolCompare = boolCompare.pop();
              if(_boolCompare == true){
                  //console.log("TRUEEEEEEE");
                  this.vmProcess(bufferIf);
              }
              break; 
          case 11: // ---- If Else ----- function
              console.log("at if-else function ");
              //console.log("bool :",boolCompare);
              var _boolCompare = boolCompare.pop();
              var bufferIfinIf = [];
              var indexGblBuf = parseInt(gblBufferTest.length, 10);
              if(_boolCompare == false){
                  for(var j=0;j<gblBufferTest[indexGblBuf-1].length;j++){
                      bufferIfinIf.push(gblBufferTest[indexGblBuf-1][j]);
                  }
                  //console.log("TRUEEEEEEE");
                  //console.log("bufferIfinIf : ",bufferIfinIf);
                  this.vmProcess(bufferIfinIf);
              }else {
                  var indexGblBuf = parseInt(gblBufferTest.length, 10);
                  for(var j=0;j<gblBufferTest[indexGblBuf-2].length;j++){
                      bufferIfinIf.push(gblBufferTest[indexGblBuf-2][j]);
                  }
                  //console.log("Falseeeeee");
                  //console.log("bufferIfinIf : ",bufferIfinIf);
                  this.vmProcess(bufferIfinIf);
              }
              break;
          case 12:
              var cmdstr = "beep";
              cmdList.push(cmdstr)
              //console.log(cmdList)
              //this.sendCmd(cmdList);
              //this.mqttsending(cmdstr);
              break;
          case 14:
              if(gblReporter){
                  var myIntervel = setInterval(function(){    
                      if(boolCompare.pop() == true){
                          //console.log("reporter: TRUE");
                          this.clearInterval(myIntervel);
                      }else {
                          //console.log("reporter: FALSE");
                      }
                  }, 50);
              }
              break;
          case 15:
              var _imm = imm1byte.shift();
              var bufferTemp = [];
              ////console.log("gblBufferTest :", gblBufferTest.length);
              var indexGblBuf = parseInt(gblBufferTest.length, 10);
              ////console.log("indexGblBuf : ", indexGblBuf);
              for (var j = 0; j < gblBufferTest[indexGblBuf - 1].length; j++) {
                  bufferTemp.push(gblBufferTest[indexGblBuf - 1][j]);
              }
              ////console.log("bufferTemp For loop : ", bufferTemp);
              this.forLoop(bufferTemp);
              break;
          case 16:
              var _imm = imm1byte.pop();
              _imm = _imm * 100;
              this.sleepMillisec(_imm);
              ////console.log("wait _imm : ",_imm);
              break;
          case 17:
              this.setInterval(setTime, 1000);
              //console.log("cmd Timer");
              break;
          case 18:
              //console.log("cmd Reset timer");
              break;
          case 20: // IR 
              var getIRvalue = 600;
              imm1byte.push(getIRvalue);
              //console.log("IR ");
              break;
          case 21: // NEW IR 
              var getIRvalue = 500;
              imm1byte.push(getIRvalue);
              //console.log("NEW IR ");
              break;
          case vm.OP_PLUS:
              var _imm = imm1byte.pop();
              var _temp1 = imm1byte.pop();
              _imm = _temp1 + _imm;
              imm1byte.push(_imm);
              break;
          case vm.OP_MINUS:
              var _imm = imm1byte.pop();
              var _temp1 = imm1byte.pop();
              _imm = _temp1 - _imm;
              imm1byte.push(_imm);
              break;
          case 26:
              var _imm = imm1byte.pop();
              var _temp1 = imm1byte.pop();
              _imm = _temp1/_imm;
              //console.log(_imm);
              imm1byte.push(_imm);
              break;
          case 25:
              var _imm = imm1byte.pop();
              var temp1 = imm1byte.pop();
              _imm = _imm * temp1; 
              imm1byte.push(_imm);
              break;
          case 27: // 
              var _imm = imm1byte.pop();
              var temp1 = imm1byte.pop();
              _imm =  temp1 % _imm; 
              imm1byte.push(_imm);
              break;
          case 28: // 
              var _imm = imm1byte.pop();
              var temp1 = imm1byte.pop();
              if(_imm == temp1){
                  boolCompare.push(true);
                  ////console.log("bool : ",boolCompare);
              } 
              else{
                  boolCompare.push(false);
              } 
              // imm1byte.push(_imm);
              break;
          case 29:
              var numSensor = sensorStackForIf.shift();
              var numCompare = imm1byte.pop();
              ss = localStorage.getItem("sensor_val"); // sensor value
              ss = ss.split(",")
              console.log(numSensor)
              valuesensor = ss;
              //console.log("sensor[",numSensor,"]:",valuesensor," > ",numCompare);
              if (valuesensor[numSensor-1] > numCompare){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              break;
          case 30:
              var numSensor = sensorStackForIf.shift();
              var numCompare = imm1byte.shift();
              ss = localStorage.getItem("sensor_val"); // sensor value
              ss = ss.split(",")
              valuesensor = ss;
              //console.log("sensor[",numSensor,"]:",valuesensor," < ",numCompare);
              if (valuesensor[numSensor-1] < numCompare){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              break;
          case 31:
              ////console.log("compare 31");
              ////console.log("bool : ",boolCompare);
              var numSensor = sensorStackForIf.shift();
              var numCompare = imm1byte.shift();
              var _boolCompare1 = boolCompare.shift();
              var _boolCompare2 = boolCompare.shift();
              if(_boolCompare1 == true && _boolCompare2 == true){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              break;
          case 32:
              ////console.log("compare 32");
              ////console.log("bool : ",boolCompare);
              var numSensor = sensorStackForIf.shift();
              var numCompare = imm1byte.shift();
              var _boolCompare1 = boolCompare.shift();
              var _boolCompare2 = boolCompare.shift();
              if(_boolCompare1 == true || _boolCompare2 == true){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              break;
          case 33:
              //console.log("compare 33 : XOR");
              ////console.log("bool : ",boolCompare);
              var numSensor = sensorStackForIf.shift();
              var numCompare = imm1byte.shift();
              var _boolCompare1 = boolCompare.shift();
              var _boolCompare2 = boolCompare.shift();
              if((_boolCompare1 && !_boolCompare2 ) || ( !_boolCompare1 && _boolCompare2 )){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              break;
          case vm.OP_GREATER_OR_EQUAL:
              //console.log("compare 61 : OP_GREATER_OR_EQUAL");
              var numSensor = sensorStackForIf.shift();
              var numCompare = imm1byte.shift();
              ss = localStorage.getItem("sensor_val"); // sensor value
              ss = ss.split(",")
              valuesensor = ss;
              //console.log("sensor[",numSensor,"]:",valuesensor," < ",numCompare);
              if (valuesensor[numSensor-1] >= numCompare){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              ////console.log("bool : ",boolCompare);
              break;
          case vm.OP_LESS_OR_EQUAL:
              //console.log("compare 62 : OP_LESS_OR_EQUAL");
              var numSensor = sensorStackForIf.shift();
              var numCompare = imm1byte.shift();
              ss = localStorage.getItem("sensor_val"); // sensor value
              ss = ss.split(",")
              valuesensor = ss;
              //console.log("sensor[",numSensor,"]:",valuesensor," < ",numCompare);
              if (valuesensor[numSensor-1] <= numCompare){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              ////console.log("bool : ",boolCompare);
              break;
          case 34:
              var _imm = imm1byte.pop();
              var temp1 = imm1byte.pop();
              if(_imm !== temp1){
                  boolCompare.push(true);
              }
              else{
                  boolCompare.push(false);
              } 
              ////console.log("bool 34 : ",boolCompare);
              break;
          case 48:
              //console.log("at if-one-time function ");
              var bufferIfinIf = [];
              var indexGblBuf = parseInt(gblBufferTest.length, 10);
              for(var j=0;j<gblBufferTest[indexGblBuf-1].length;j++){
                  bufferIfinIf.push(gblBufferTest[indexGblBuf-1][j]);
              }
              var _boolCompare = boolCompare.pop();
              if(_boolCompare == true){
                  //console.log("TRUEEEEEEE");
                  this,vmProcess(bufferIfinIf);
              }
              break;
          case 49:
              var cmdstr = "motorOn";
              cmdList.push(cmdstr)
              console.log(cmdList)
              //this.sendCmd(cmdstr);
              break;
          case 50:
              var _imm = imm1byte.pop();
              _imm = _imm * 100;
              this.sleepMillisec(_imm);
              console.log("wait _imm : ",_imm);
              break;
          case 51:
              var cmdstr = "motorOff";
              cmdList.push(cmdstr)
              //console.log(cmdList)
              //this.sendCmd(cmdstr);
              break;
          case 52:
              var cmdstr = "motorCW";
              cmdList.push(cmdstr)
              //this.sendCmd(cmdstr);
              break;
          case 53:
              var cmdstr = "motorCCW";
              cmdList.push(cmdstr)
              //this.sendCmd(cmdstr);
              break;
          case 54:
              var cmdstr = "motorRD";
              //this.sendCmd(cmdstr);
              break;
          case 55:
              var _imm = imm1byte.pop();
              sensorStackForIf.push(_imm);
              // var cmdstr = "sensor : " + _imm;
              // console.log("sensorStackForIf : ",sensorStackForIf);
              //this.sendCmd(cmdstr);
              break;
          case vm.SETPOWER:
              var _imm = imm1byte.pop();
              sensorStackForIf.push(_imm);
              var valuePowerOfMotor = _imm;
              var cmdstr = "setPower motor : "+valuePowerOfMotor;
              //this.sendCmd(cmdstr);
              break;
          case 64:
              var _imm = imm1byte.pop();
              // GET  STATUS SENSOR
              // fix sensor value
              var statusSensor2isOn = true;
              var cmdstr = "sensor : " + _imm + " is on";
              if(statusSensor2isOn){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              //this.sendCmd(cmdstr);
              break;
          case 65:
              var _imm = imm1byte.pop();
              // GET  STATUS SENSOR
              var statusSensorXisOff = true;
              var cmdstr = "sensor : " + _imm + " is off";
              if(statusSensorXisOff){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              //this.sendCmd(cmdstr);
              break;
          case vm.ISTHISWAY: // opcode 66
              var _imm = imm1byte.pop();
              // GET  STATUS SENSOR
              // fix direction of motor
              var statusMotorIsCW = true;
              var cmdstr = "sensor : " + _imm + " direction is CW ";
              if(statusMotorIsCW){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              //console.log("bool : ",boolCompare);
              //this.sendCmd(cmdstr);
              break;
          
          case vm.ISTHATWAY: // opcode 66
              var _imm = imm1byte.pop();
              // GET  STATUS SENSOR
              // fix direction of motor
              var statusMotorIsCCW = true;
              var cmdstr = "sensor : " + _imm + " direction is CCW ";
              if(statusMotorIsCCW){
                  boolCompare.push(true);
              }else {
                  boolCompare.push(false);
              }
              //console.log("bool : ",boolCompare);
              //this.sendCmd(cmdstr);
              break;
          case vm.SERVO_SET_H: // opcode 87
              var _imm = imm1byte.pop();
              // GET  STATUS SENSOR
              // fix direction of motor
              var headerServe = _imm;
              var cmdstr = "servo set header: " + _imm ;
              //this.sendCmd(cmdstr);
              cmdList.push(cmdstr)
              break;
          case vm.SERVO_LT: // opcode 87
              var _imm = imm1byte.pop();
              // GET  STATUS SENSOR
              // fix direction of motor
              var headerServe = _imm;
              var cmdstr = "servo set SERVO_LT: " + _imm ;
              //this.sendCmd(cmdstr);
              cmdList.push(cmdstr)
              break;
          case vm.SERVO_RT: // opcode 87
              var _imm = imm1byte.pop();
              // GET  STATUS SENSOR
              // fix direction of motor
              var headerServe = _imm;
              var cmdstr = "servo set SERVO_RT: " + _imm ;
              //this.sendCmd(cmdstr);
              cmdList.push(cmdstr)
              break;
          case 90:
              var _imm = imm1byte.pop();
              /*var str = "select motor "+_imm;
              //console.log('Hi')
              this.sendCmd(str);*/
              this.selectMotor(_imm)
              break;
          case 99:
              var check_type = imm1byte.pop();
              if(check_type == 2 ){
                  var _imm = imm1byte.pop();
                  console.log("Show number : ",_imm);
              }
              else if(check_type == 3 ){
                  for(var i=0;i<gblString.length;i++){
                      // function convert to ASCII    
                  }
                  console.log("Show text : "+gblString);
              }else {
                  console.log("ERROR IN OPCODE 99");
              }
              break;
          case 107:
              var tempASCII_3 = imm1byte.pop();
              var tempASCII_2 = imm1byte.pop();
              var tempASCII_1 = imm1byte.pop();
              var str = "I2C Write value "+tempASCII_1 + " to Register# "+tempASCII_2 + " on device address # "+tempASCII_3;
              //this.sendCmd(str);
              break;
          case undefined:
              break;
          default:
              console.log("none jahh ",_cmdOpcode);
              break;
      }
  },
  testbb(bb){
    console.log(bb);
  },
  /*forloop(){
    var tempForJ = parseInt(gblBufferTest.length, 10);
    var count =0;
    var self = this;
    boolGblLoop = setInterval(function() {
        
      var bufferLoop = [];
      for(var j=0;j<tempForJ;j++){
          bufferLoop.push(gblBufferTest[j]);
      }
      console.log("---------------------- loop ",count,"---------------------------");
      count++;
      localStorage.setItem("bufferloop", bufferLoop);
      //self.testbb("sadfsa");
      //self.mqttsending(cmdList)
      self.vmProcess(bufferLoop);
    }, 40);
    //this.vmProcess(bufferLoop);
  },*/
  forLoop(_gblBufferInForLoop) {
    var loopBuffer = [];
    var tempLenghInForLoop = parseInt(_gblBufferInForLoop.length, 10);
    var count =0;
    var self = this;
    //for (var i = 0; i < 4; i++) {
    boolGblLoop = setInterval(function() {
        console.log("---------------------- loop for loop ",count,"---------------------------")
        count++;
        for (var j = 0; j < tempLenghInForLoop; j++) {
            loopBuffer.push(_gblBufferInForLoop[j]);
        }
        self.vmProcess(loopBuffer);
    //}
    }, 50);
  },
  showNumber(){
      console.log("No function ");
  },
  selectMotor(_imm){
      //console.log("select motor ",_imm);
      var msg = "talkToMotor "+_imm
      cmdList.push(msg)
      //console.log(cmdList)
      //this.mqttsending(msg)
  },
  chooseCmd(opcode){
      var str="";
      switch(opcode){
          case 12:
              str = "beep";
              break;
          case 0:
              str = "Looking";
              break;
          default:
              str = "none";
      }
      return str;
  },
  Repeat(_gblBuffer1,Imm){
      var loopBuffer = [];
      var tempLenghRepeat = parseInt(_gblBuffer1.length, 10);
      // console.log("loop : oooooooooooooooooooooooo");
      for(var i=0;i<Imm;i++){
          for(var j=0;j<tempLenghRepeat;j++){
              loopBuffer.push(_gblBuffer1[j]);
          }
      }
      this.vmProcess(loopBuffer);
  },
  cmdWait(Imm){
      var _imm = Imm * 100;
      console.log("wait :",_imm);
  },
  sleepMillisec(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
  },
  setTime() {
      totalSeconds++;
  },
  sendCmd(str){
    /*console.log(str.length)
    console.log(str.length != 0)
    if(str.length != 0){
      console.log(old_cmd,str)
      console.log(old_cmd != str)
      if(old_cmd != str){
        console.log(str);
        this.mqttsending(str);
        old_cmd = str;
      }
    }*/
    console.log(str)
    this.mqttsending(str)
  },
  stopLoop(){
    clearInterval(boolGblLoop);
  },
  compileAndDownloadSecond (data) {
    console.log(data.data)
    clearInterval(boolGblLoop)
    this.virtualgogo(data.data)
    //this.mqttsending("data.data")
    if (!data.result) {
      notification.warning(data.message || 'Error')
      return
    }
    if (data.data.length > CONFIG.maxByteCodeLength) {
      notification.warning(CONFIG.message.warning, CONFIG.message.logoCodeTooLarge)
      return
    }
    // var byteCodeLen = data.data.length
    // var percentUsed = (100 * byteCodeLen / CONFIG.maxByteCodeLength).toFixed(2)
    // console.log(byteCodeLen + " of " + CONFIG.maxByteCodeLength + " bytes used " + percentUsed);
    this.downloadLogoCode(data.data, () => {
      // notification.success(CONFIG.message.downloadLogoComplete, `${CONFIG.message.memUsed} ${percentUsed} %`)
      this.controls.setAutorun((data.autoRunState ? 1 : 0))
      if (state.swalSuccess) {
        state.swalSuccess({
          title: CONFIG.message.downloadLogoComplete,
          // text: `${CONFIG.message.memUsed} ${percentUsed} %`,
        })
      }
    })
  },

}
