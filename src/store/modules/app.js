import * as types from '../mutation-types'

import deviceProcess from 'services/deviceProcess'
import deviceControl from 'services/deviceControl'

import { PACKAGETYPE } from '../../services/const'

// import { deviceControl } from '../../services/deviceControl'

// var deviceProcess = require('../../services/deviceProcess')
// var deviceControl = require('../../services/deviceControl')

const state = {
  sidebar: {
    opened: false,
    withoutAnimation: false
  },
  config: {
    googleMaps: {
      apiKey: 'AIzaSyBNAqPrTQoz9P4NBlDDyfxrnKiafkaL8iQ'
    },
    windowMatchSizeLg: '(min-width: 992px)',
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd'
    }
  },
  isLoading: true,
  gogo: deviceProcess.getDefault(),
  rpi: deviceProcess.getDefaultRpi(),
  keyValue: deviceProcess.getdefaultKeyValue(),
  status: '',
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  },
  gogoControls: deviceControl.controls,
  // program: {
  //   isShowWidget: true,
  //   isSaving: false,
  //   currentProjectId: null,
  //   userProjects: [],
  //   toSaveProject: {
  //     name: '',
  //     desc: ''
  //   }
  // }
}

const mutations = {
  [types.CLOSE_MENU] (state) {
    if (document.documentElement.clientWidth < 992) {
      state.sidebar.opened = false
    }
  },
  [types.TOGGLE_SIDEBAR] (state, opened) {
    state.sidebar.opened = opened
  },
  [types.TOGGLE_WITHOUT_ANIMATION] (state, value) {
    state.sidebar.withoutAnimation = value
  },
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  updateGogo (state, data) {
    state.gogo = data
  },
  SOCKET_ONOPEN (state, event) {
    deviceControl.setSocket(event.target)
    state.socket.isConnected = true
  },
  SOCKET_ONCLOSE (state, event) {
    state.socket.isConnected = false

    // Update Value
    state.gogo = deviceProcess.getDefault()
  },
  SOCKET_ONERROR (state, event) {
    // console.error(state, event)
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE (state, message) {
    // state.socket.message = message.data

    // console.log(message)

    // if (message.data && message.data !== 'nodata') {
    //   var subdata = message.data.split('::')
    //   var sensors = subdata[1].split('-')

    //   sensors.forEach((val, index) => {
    //     sensors[index] = parseInt(val)
    //   })

    //   state.gogo.sensors = sensors
    // } else {
    //   // Update Value
    //   state.gogo.sensors = defaultVal.gogo.sensors
    // }
    var processedData = deviceProcess.processHID(message.stream)
    var processedStatus = deviceControl.mqttreceive()
    state.status = processedStatus
    // console.log(processedData.data.motors)

    if (processedData.type === PACKAGETYPE.GOGOBOARD) {
      state.gogo = processedData.data
      deviceControl.setGoGoInfo(state.gogo.info)
    } else if (processedData.type === PACKAGETYPE.RASPBERRYPI) {
      state.rpi = processedData.data
      // deviceControl.setGoGoInfo(state.gogo.info)
    } else if (processedData.type === PACKAGETYPE.KEYVALUE) {
      if (processedData.data.value !== '') {
        state.keyValue = processedData.data
      }
    } else if (!message.stream) {
      state.gogo = deviceProcess.getDefault()
      state.rpi = deviceProcess.getDefaultRpi()
      state.keyValue = deviceProcess.getdefaultKeyValue()
      deviceControl.setGoGoInfo(state.gogo.info)
    }
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT (state, count) {
    // console.info(count)
  },
  SOCKET_RECONNECT_ERROR (state) {
    state.socket.reconnectError = true
  },

  doGogo (state, cmd) {
    deviceControl.processCommand(cmd)
  },

  doGogoCmd (state, cmd) {
    deviceControl.processCommand('cmd::' + cmd)
  },

  doGogoCmdObj (state, cmdObj) {
    if (!cmdObj.type) { cmdObj.type = 'control' }
    deviceControl.processCommandObject(cmdObj)
  },
  // TOGGLE_PROGRAM_SHOW_WIDGET (state) {
  //   state.program.isShowWidget = !state.program.isShowWidget
  // },
  // SET_PROJECT_ID (state, projectId) {
  //   state.program.currentProjectId = projectId
  // },
  // SET_USER_PROJECTS (state, projects) {
  //   state.program.userProjects = projects
  // },
  // SET_PROJECT_SAVING_STATE (state, status) {
  //   state.program.isSaving = status
  // }
}

const actions = {
  closeMenu ({ commit }) {
    commit(types.CLOSE_MENU)
  },
  toggleSidebar ({ commit }, opened) {
    commit(types.TOGGLE_SIDEBAR, opened)
  },
  isToggleWithoutAnimation ({ commit }, value) {
    commit(types.TOGGLE_WITHOUT_ANIMATION, value)
  },
  // toggleProgramShowWidget ({ commit }) {
  //   commit('TOGGLE_PROGRAM_SHOW_WIDGET')
  // },
  // setProjectId ({ commit }, projectId) {
  //   commit('SET_PROJECT_ID', projectId)
  // },
  // setUserProjects ({ commit }, projects) {
  //   commit('SET_USER_PROJECTS', projects)
  // },
  // setProjectSavingState ({ commit }, status) {
  //   commit('SET_PROJECT_SAVING_STATE', status)
  // }
}

export default {
  state,
  mutations,
  actions
}
