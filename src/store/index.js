import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module

import user from './user'
import shared from './shared'

import app from './modules/app'
import program from './modules/program'

import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
    user: user,
    shared: shared,
    program: program
  },
  state: {},
  mutations: {}
})

Vue.use(VuexI18n.plugin, store)

export default store
