export const CONST = {
  ENDPOINT_ID: 0,

  /* board types */
  GOGOBOARD: 1,
  PITOPPING: 2,
  WIRELESSGOGO: 3,

  /* category names */
  CATEGORY_OUTPUT_CONTROL: 0,
  CATEGORY_MEMORY_CONTROL: 1,
  CATEGORY_RASPBERRY_PI_CONTROL: 2,

  /* Output contorl command names */
  CMD_PING: 1,
  CMD_MOTOR_ON_OFF: 2,
  CMD_MOTOR_DIRECTION: 3,
  CMD_MOTOR_RD: 4,
  CMD_SET_POWER: 6,
  CMD_SET_ACTIVE_PORTS: 7,
  CMD_TOGGLE_ACTIVE_PORT: 8,
  CMD_SET_SERVO_DUTY: 9,
  CMD_LED_CONTROL: 10,
  CMD_BEEP: 11,
  CMD_AUTORUN_STATE: 12,
  CMD_LOGO_CONTROL: 13,
  CMD_SYNC_RTC: 50,
  CMD_READ_RTC: 51,
  CMD_SHOW_SHORT_TEXT: 60,
  CMD_SHOW_LONG_TEXT: 61,
  CMD_CLEAR_SCREEN: 62,

  CMD_VOICE_PLAY_PAUSE: 70,
  CMD_VOICE_NEXT_TRACK: 71,
  CMD_VOICE_PREV_TRACK: 72,
  CMD_VOICE_GOTO_TRACK: 73,
  CMD_VOICE_ERASE_ALL_TRACKS: 74,
  CMD_REBOOT: 100,

  /* Memory control command names */
  MEM_LOGO_SET_POINTER: 1,
  MEM_SET_POINTER: 2,
  MEM_WRITE: 3,
  MEM_READ: 4,

  /* Raspberry Pi Commands */

  RPI_SHUTDOWN: 1,
  RPI_REBOOT: 2,
  RPI_CAMERA_CONTROL: 10,
  RPI_FIND_FACE_CONTROL: 11,
  RPI_TAKE_SNAPSHOT: 12,

  RPI_WIFI_CONNECT: 15,
  RPI_WIFI_DISCONNECT: 16,

  RPI_EMAIL_CONFIG: 17,
  RPI_EMAIL_SEND: 18,
  RPI_SMS_SEND: 19,

  RPI_SET_TX_BUFFER: 20,

  RPI_RFID_INIT: 25,
  RPI_RFID_COMMAND: 26,

  /* output buffer location names */
  ENDPOINT: 0,
  CATEGORY_ID: 1,
  CMD_ID: 2,
  PARAMETER1: 3,
  PARAMETER2: 4,
  PARAMETER3: 5,
  PARAMETER4: 6,
  PARAMETER5: 7,
  PARAMETER6: 8,
  PARAMETER7: 9,

  TX_PACKET_SIZE: 64,
  RX_PACKET_SIZE: 64,

  RETRIES_ALLOWED: 5 /* number of attempts to connect to HID device */,

  countNoData: 0,

  /* Packet index or offset */

  INDEX_BOARD_TYPE: 17,
  INDEX_BOARD_VERSION: 18,
  INDEX_FIRMWARE_VERSION: 20,
  OFFSET_MOTOR_POWER_STATUS: 25,
  INDEX_IR_VALUE: 33,

  // raspberry pi packet constants
  RPI_REG_PACKET_TYPE: 0, // value must always be 2
  RPI_REG_HW_VERSION: 1,
  RPI_REG_CPU_LOAD: 2, // in %
  RPI_REG_CPU_TEMP: 3, // in degrees C
  RPI_REG_MEM_USED: 4, // in %

  RPI_REG_IP_1: 10,
  RPI_REG_IP_2: 11,
  RPI_REG_IP_3: 12,
  RPI_REG_IP_4: 13,
  RPI_REG_WLAN_IP_1: 14,
  RPI_REG_WLAN_IP_2: 15,
  RPI_REG_WLAN_IP_3: 16,
  RPI_REG_WLAN_IP_4: 17,

  RPI_REG_CAMERA_FLAGS: 18,
  RPI_REG_SMS_FLAGS: 19,

  RPI_SCREEN_TAP: 20,
  RPI_SCREEN_TAP_X_POS_HB: 21,
  RPI_SCREEN_TAP_X_POS_LB: 22,
  RPI_SCREEN_TAP_Y_POS_HB: 23,
  RPI_SCREEN_TAP_Y_POS_LB: 24,

  RPI_WIFI_STATUS: 25,
  RPI_EMAIL_STATUS: 26,
  RPI_SMS_STATUS: 27,

  RPI_RFID_STATUS: 28,
  RPI_RFID_TAG_CONTENT: 29,

  RPI_CAM_BIT_ON_STATUS: 0,
  RPI_CAM_BIT_FIND_FACT_ACTIVATED: 1,
  RPI_CAM_BIT_FACE_FOUND: 2
}

export const PACKAGETYPE = {
  GOGOBOARD: 0,
  DEBUGGING: 1,
  RASPBERRYPI: 2,
  KEYVALUE: 7
}

export const CONFIG = {
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
}
