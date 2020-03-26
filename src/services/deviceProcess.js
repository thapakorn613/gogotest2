import { PACKAGETYPE, CONST, CONFIG } from './const'

var sensor_val;
export default {

  getDefault () {
    return {
      info: { boardType: 0, boardVersion: 0, firmwareVersion: 0 },
      //sensors: [0, 0, 0, 0, 0, 0, 0, 0],
      sensors: [0, 0, 0, 0, 0, 0, 0, 0],
      motors: [
        { isOn: 0, direction: 'cw', isActive: 0, power: 0 },
        { isOn: 0, direction: 'cw', isActive: 0, power: 0 },
        { isOn: 0, direction: 'cw', isActive: 0, power: 0 },
        { isOn: 0, direction: 'cw', isActive: 0, power: 0 }
      ],
      boardVersion: 0,
      firmwareVersion: 0,
      irValue: 0,
      rtc: { year: 0, month: 0, date: 0, hour: 0, minute: 0, second: 0 },
      // rpi: this.getDefaultRpi()
    }
  },

  getDefaultRpi () {
    return {
      revision: 0,
      ipAddress: '0.0.0.0',
      wlanIpAddress: '0.0.0.0',
      justIpAddress: '0.0.0.0',
      cpuLoad: 0,
      cpuTemp: 0,
      memoryUsed: 0,
      wifiStatusCode: 0,
      emailStatusCode: 0,
      smsStatusCode: 0,
      cameraStat: 0,
      cameraActive: false,
      cameraFindFaceActive: false,
      cameraIsFoundFace: false,
      key: '',
      value: ''
    }
  },

  getdefaultKeyValue () {
    return {key: '', value: ''}
  },

  getWifiStatus (code) {
    return CONFIG.status.wifi[code]
  },

  bytesToInt (hByte, lBtye) {
    return (hByte << 8) + lBtye
  },

  bytesToString (bytes) {
    return String.fromCharCode.apply(null, bytes)
  },

  stringToByes (text, buffer, index) {
    text = text.toString()
    index = index || CONST.PARAMETER1
    if (text.length > 60) text = text.substring(0, 60)
    var i = 0

    if (!buffer) return i

    for (var ci = 0; ci < text.length; ci++) {
      buffer[index + ci] = text.charCodeAt(ci)
      // i += 1
    }
    // buffer[index + i] = 0
    return buffer
  },

  appendDic (array, buffer, index) {
    index = index || CONST.PARAMETER1
    var i = 0
    if (!buffer) return i

    for (var c in array) {
      buffer[index + i] = array[c]
      i += 1
    }
    buffer[index + i] = 0
    return buffer
  },

  processSensors (bytes) {
    let sensors = new Uint16Array(8)
    for (var i = 0; i < 8; i++) {
      sensors[i] = this.bytesToInt(bytes[1 + i * 2], bytes[1 + i * 2 + 1])
      // console.log(sensors[i])
      // remove the sensor noise
      if (sensors[i] >= 1020) {
        sensors[i] = 1024
      }
      sensor_val = sensors
      //console.log(sensor_val)
      localStorage.setItem("sensor_val", sensor_val);
    }

    return sensors
  },

  processMotors (bytes) {
    var activeBits = bytes[22]
    var onOffBits = bytes[23]
    var directionBits = bytes[24]

    var motors = this.getDefault().motors

    for (var i = 0; i < 4; i++) {
      motors[i] = {}
      motors[i].isOn = (onOffBits >> i) & 1
      motors[i].direction = (directionBits >> i) & 1 ? 'cw' : 'ccw'
      motors[i].isActive = (activeBits >> i) & 1
      motors[i].power = Math.ceil(
        (bytes[CONST.OFFSET_MOTOR_POWER_STATUS + Number(i)] / 255) * 100
      )
    }
    return motors
  },

  pad (number) {
    if (number > 9) return number.toString()
    else return '0' + number.toString()
  },

  processRTC (bytes) {
    var rtc = this.getDefault().rtc

    rtc.year = bytes[42] + 2000
    rtc.month = bytes[41]
    rtc.date = bytes[40]
    rtc.hour = bytes[38]
    rtc.minute = bytes[37]
    rtc.second = bytes[36]

    rtc.full =
      this.pad(rtc.date) +
      '/' +
      this.pad(rtc.month) +
      '/' +
      rtc.year +
      ' ' +
      this.pad(rtc.hour) +
      ':' +
      this.pad(rtc.minute) +
      ':' +
      this.pad(rtc.second)

    return rtc
  },

  getDefaultReturn () {
    return {
      type: -1,
      data: null
    }
  },

  processRpi (bytes) {
    var rpi = this.getDefaultRpi()

    rpi.revision = bytes[CONST.RPI_REG_HW_VERSION]

    if (rpi.revision === 0) {
      return rpi
    } else {
      rpi.ipAddress =
        bytes[CONST.RPI_REG_IP_1] +
        '.' +
        bytes[CONST.RPI_REG_IP_2] +
        '.' +
        bytes[CONST.RPI_REG_IP_3] +
        '.' +
        bytes[CONST.RPI_REG_IP_4]

      rpi.wlanIpAddress =
        bytes[CONST.RPI_REG_WLAN_IP_1] +
        '.' +
        bytes[CONST.RPI_REG_WLAN_IP_2] +
        '.' +
        bytes[CONST.RPI_REG_WLAN_IP_3] +
        '.' +
        bytes[CONST.RPI_REG_WLAN_IP_4]

      if (rpi.ipAddress !== '0.0.0.0') {
        rpi.justIpAddress = rpi.ipAddress
      } else if (rpi.wlanIpAddress !== '0.0.0.0') {
        rpi.justIpAddress = rpi.wlanIpAddress
      }

      rpi.cpuLoad = bytes[CONST.RPI_REG_CPU_LOAD]
      rpi.cpuTemp = bytes[CONST.RPI_REG_CPU_TEMP]
      rpi.memoryUsed = bytes[CONST.RPI_REG_MEM_USED]
      rpi.wifiStatusCode = bytes[CONST.RPI_WIFI_STATUS]
      rpi.emailStatusCode = bytes[CONST.RPI_EMAIL_STATUS]
      rpi.smsStatusCode = bytes[CONST.RPI_SMS_STATUS]

      rpi.cameraStat = bytes[CONST.RPI_REG_CAMERA_FLAGS]
      rpi.cameraActive = (rpi.cameraStat >> CONST.RPI_CAM_BIT_ON_STATUS) & 1
      rpi.cameraFindFaceActive =
        (rpi.cameraStat >> CONST.RPI_CAM_BIT_FIND_FACT_ACTIVATED) & 1
      rpi.cameraIsFoundFace =
        (rpi.cameraStat >> CONST.RPI_CAM_BIT_FACE_FOUND) & 1
      return rpi
    }
  },

  processHID (bytes) {
    if (!bytes) return this.getDefaultReturn()

    // GoGo Board Packet
    if (bytes[0] === PACKAGETYPE.GOGOBOARD) {
      var gogoPacket = this.getDefault()

      gogoPacket.sensors = this.processSensors(bytes)
      gogoPacket.motors = this.processMotors(bytes)
      gogoPacket.rtc = this.processRTC(bytes)

      gogoPacket.firmwareVersion = bytes[CONST.INDEX_FIRMWARE_VERSION]
      gogoPacket.boardVersion = bytes[CONST.INDEX_BOARD_VERSION]

      gogoPacket.info.firmwareVersion = bytes[CONST.INDEX_FIRMWARE_VERSION]
      gogoPacket.info.boardType = bytes[CONST.INDEX_BOARD_TYPE]
      gogoPacket.info.boardVersion = bytes[CONST.INDEX_BOARD_VERSION]

      gogoPacket.irValue = bytes[CONST.INDEX_IR_VALUE]

      return {
        type: PACKAGETYPE.GOGOBOARD,
        data: gogoPacket
      }

      // if (this.current.firmwareVersion == 0 && firmwareVersion != 0) {
      //   this.current.firmwareVersion = firmwareVersion
      //   // this.checkSupportedFimware()
      // }

      // if received a DEBUGGING message packet
    } else if (bytes[0] === PACKAGETYPE.DEBUGGING) {
      console.log('Debug :\t' + bytes.slice(2))
      return {
        type: PACKAGETYPE.DEBUGGING,
        data: bytes.slice(2)
      }
      // if received a raspberry pi packet
    } else if (bytes[0] === PACKAGETYPE.RASPBERRYPI) {
      // console.log('pi')
      return {
        type: PACKAGETYPE.RASPBERRYPI,
        data: this.processRpi(bytes)
      }
    // if received a key-value packet
    } else if (bytes[0] === PACKAGETYPE.KEYVALUE) {
      var result = this.getdefaultKeyValue()
      var byteLength = bytes[1]
      var keyAndValue = this.bytesToString(bytes.slice(2, byteLength - 1)).trim()

      // console.log(keyAndValue , byteLength)
      keyAndValue = keyAndValue.split(',')

      result.key = keyAndValue[0]
      // Retain the latest value
      if (keyAndValue[1].length === 1 && keyAndValue[1].charCodeAt(0) === 0) keyAndValue[1] = ''
      if (keyAndValue[1] !== '') {
        result.value = keyAndValue[1]
      }
      return {
        type: PACKAGETYPE.KEYVALUE,
        data: result
      }
    } else {
      return this.getDefaultReturn()
    }

    // this.sendMessageSensor(this.current)
  },

}
