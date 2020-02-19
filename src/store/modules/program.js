export default {
  state: {
    program: {
      isShowWidget: true,
      isSaving: false,
      currentProjectId: null,
      userProjects: [],
      currentProject: {
        name: '',
        desc: ''
      },
      toSaveProject: {
        name: '',
        desc: ''
      },
      currentWorkspaceXmlText: null
    }
  },
  mutations: {
    // setUser (state, payload) {
    //   state.user = payload
    // },
    // setCurrentUser (state, val) {
    //   state.currentUser = val
    // },
    // setUserProfile (state, val) {
    //   state.userProfile = val
    // }
    TOGGLE_PROGRAM_SHOW_WIDGET (state) {
      state.program.isShowWidget = !state.program.isShowWidget
    },
    SET_PROJECT_ID (state, projectId) {
      state.program.currentProjectId = projectId
    },
    SET_CURRENT_PROJECT (state, project) {
      state.program.currentProject = project
      state.program.currentProject.name = project.name
    },
    SET_CURRENT_PROJECT_NAME (state, projectName) {
      state.program.currentProject.name = projectName
      state.program.currentProject = {
        name: projectName,
        desc: state.program.currentProject.desc
      }
    },
    SET_USER_PROJECTS (state, projects) {
      state.program.userProjects = projects
    },
    SET_PROJECT_SAVING_STATE (state, status) {
      state.program.isSaving = status
    },
    SET_TOSAVE_PROJECT (state, project) {
      state.program.toSaveProject = project
      state.program.toSaveProject.name = project.name
    },
    SET_TOSAVE_PROJECT_NAME (state, projectName) {
      state.program.toSaveProject.name = projectName
      state.program.toSaveProject = {
        name: projectName,
        desc: state.program.toSaveProject.desc
      }
    },
    SET_CURRENT_WORKSPACE_XML_TEXT (state, text) {
      state.program.currentWorkspaceXmlText = text
    }
  },
  actions: {
    toggleProgramShowWidget ({ commit }) {
      commit('TOGGLE_PROGRAM_SHOW_WIDGET')
    },
    setProjectId ({ commit }, projectId) {
      commit('SET_PROJECT_ID', projectId)
    },
    setCurrentProject ({ commit }, project) {
      commit('SET_CURRENT_PROJECT', project)
    },
    setCurrentProjectName ({ commit }, projectName) {
      commit('SET_CURRENT_PROJECT_NAME', projectName)
    },
    setUserProjects ({ commit }, projects) {
      commit('SET_USER_PROJECTS', projects)
    },
    setProjectSavingState ({ commit }, status) {
      commit('SET_PROJECT_SAVING_STATE', status)
    },
    setToSaveProject ({ commit }, project) {
      commit('SET_TOSAVE_PROJECT', project)
    },
    setToSaveProjectName ({ commit }, projectName) {
      commit('SET_TOSAVE_PROJECT_NAME', projectName)
    },
    setToSaveProjectEmpty ({ commit }) {
      commit('SET_TOSAVE_PROJECT', {name: '', desc: ''})
    },
    setCurrentWorkspaceXmlText ({commit}, text) {
      commit('SET_CURRENT_WORKSPACE_XML_TEXT', text)
    }
  },
  getters: {
    program (state) {
      return state.program
    },
    currentProject (state) {
      return state.program.currentProject
    },
    currentWorkspaceXmlText (state) {
      return state.program.currentWorkspaceXmlText
    }
  }
}
