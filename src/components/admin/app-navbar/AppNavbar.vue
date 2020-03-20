<template>

  <vuestic-navbar>
    <header-selector slot="selector" class="d-block d-lg-none" :isOpen.sync="valueProxy"/>
    <span slot="logo" class="i-vuestic"></span>

    <!-- <button class="btn btn-info btn-with-icon rounded-icon cc-btn-collapse"
      slot="collapse"
      v-if="isProgramTab"
      :title="$t('navbar.'+(program.isShowWidget ? 'hide_widgets' : 'show_widgets'))"
      v-on:click="toggleShowWidget()">
      <i id="beep-icon" class="fa" :class="'fa-chevron-circle-'+(program.isShowWidget ? 'left' : 'right')"></i>
    </button> -->

    <!-- ====================== Show/Hide Widgets toggle icon ====================== -->
    <div slot="collapse" class="d-none d-lg-block custom-link" v-if="isProgramTab">
      <i id="collapse-icon"  class="fa"
        :class="'fa-chevron-circle-'+(isShowWidget ? 'left' : 'right')"
        :title="$t('navbar.'+(isShowWidget ? 'hide_widgets' : 'show_widgets'))"
        v-tooltip.bottom="{ content: $t('navbar.'+(isShowWidget ? 'hide_widgets' : 'show_widgets'))}"
        v-on:click="toggleShowWidget()"></i>
    </div>

    <!-- <i v-if="isProgramTab" slot="collapse" class="fa fa-inverse wiget-collapse"
      v-tooltip.right="{ content: $t('navbar.'+(program.isShowWidget ? 'hide_widgets' : 'show_widgets')) }"
      :class="'fa-angle-double-'+(program.isShowWidget ? 'left' : 'right')"
      @click="toggleShowWidget()"></i> -->

    <div slot="center">

      <router-link
        class="custom-link"
        :to="{ name: 'gogoboard' }"
        target="_self">
        <slot name="title">
          <i class="fa fa-desktop"></i>
          <span>{{ $t('navbar.gogoboard') }}</span>
        </slot>
        <i class="fa fa-circle"
          v-bind:class="[ gogoInfo.boardType > 0 ? 'icon-connect' : 'icon-disconnect' ]"></i>
      </router-link>
      <!--|
      <router-link
        class="custom-link "
        :to="{ name: 'raspberry' }"
        target="_self">
        <slot name="title">

          <pi-icon :size="18" />
          <span>{{ $t('navbar.raspberrypi') }}</span>
        </slot>
        <i class="fa fa-circle"
          v-bind:class="[ rpiStatus > 0 ? 'icon-connect' : 'icon-disconnect' ]"></i>
      </router-link>-->
      |
      <router-link
        class="custom-link "
        :to="{ name: 'program' }"
        target="_self">
        <slot name="title">
          <i class="fa fa-code "></i>
          <span>{{ $t('navbar.program') }}</span>
        </slot>
      </router-link>

      <!-- <router-link
        class="custom-link "
        :to="{ name: 'program-and-blockly' }"
        target="_self">
        <slot name="title">
          <i class="fa fa-code "></i>
          <span>Blockly</span>
        </slot>
      </router-link> -->

    </div>
    <!-- <img src="static/site-img/icon-raspberrypi-fill.svg" width="50" height="50" id="icon-pi" /> -->
    <header-connection></header-connection>
    <global-monitor></global-monitor>

    <!-- ===================== Project Name ===================== -->
    <div v-if="isProgramTab" id="project-name" class="form-group">
      <div class="input-group" v-tooltip.bottom="$t('project.form.name')">
        <input v-model="projectName" maxlength="100" required/>
        <i class="bar"></i>
      </div>
    </div>
    <div v-if="isProgramTab" class="col nav-item dropdown navbar-dropdown">
      <a class="nav-link custom-link" href="#"
        @click="$bus.$emit('saveProject')"
        v-tooltip.bottom="$t('program.menus.save_desc')">
        <i id="navbar-save-icon" class="fa fa-save "></i>
      </a>
    </div>

    <message-dropdown v-if="isProgramTab" />
    <!-- <notification-dropdown/> -->
    <!-- <language-dropdown/> -->
    <profile-dropdown/>
  </vuestic-navbar>

</template>

<script>
import VuesticNavbar from '../../../vuestic-theme/vuestic-components/vuestic-navbar/VuesticNavbar'
import HeaderSelector from './components/HeaderSelector'
import LanguageDropdown from './components/dropdowns/LanguageDropdown'
import ProfileDropdown from './components/dropdowns/ProfileDropdown'
import NotificationDropdown from './components/dropdowns/NotificationDropdown'
import MessageDropdown from './components/dropdowns/MessageDropdown'
import HeaderConnection from './components/HeaderConnection'
import GlobalMonitor from './components/GlobalMonitor'
// import UserProject from 'components/program/elements/UserProject'

import PiIcon from './components/PiIcon'

import { mapGetters } from 'vuex'

export default {
  name: 'app-navbar',

  components: {
    VuesticNavbar,
    HeaderSelector,
    MessageDropdown,
    NotificationDropdown,
    LanguageDropdown,
    ProfileDropdown,
    HeaderConnection,
    GlobalMonitor,
    PiIcon
    // UserProject
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      projectName: '',
    }
  },
  computed: {
    valueProxy: {
      get () {
        return this.isOpen
      },
      set (opened) {
        this.$emit('toggle-menu', opened)
      }
    },
    isProgramTab () {
      return this.$route.name === 'program' || this.$route.name === 'program-v1'
    },
    isShowWidget () {
      return this.$store.getters.program.isShowWidget
    },
    ...mapGetters(['gogoInfo', 'rpiStatus', 'currentProject'])
  },
  methods: {
    toggleShowWidget () {
      this.$store.dispatch('toggleProgramShowWidget')
    }
  },
  watch: {
    currentProject (newVal, oldVal) {
      this.projectName = newVal.name
    },
    projectName (newVal, oldVal) {
      this.$store.dispatch('setToSaveProjectName', this.projectName)
      // Update existing project name
      if (this.$store.getters.program.currentProjectId) {
        this.$store.dispatch('setCurrentProjectName', this.projectName)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.header-elem-wrapper a {
  // color: $white;
}

.navbar {
  .router-link-active {
    // color: #ffffff;
    color: $cc-dark-blue;
    font-weight: 500;
  }

  // .router-link-active {
  //   background-color: #019ae0;
  // }
}

// #icon-pi {
// }

.wiget-collapse {
  color: $cc-dark-blue;
  cursor: pointer;
  font-size: 28px;
}

.cc-btn-collapse {
  width: 2.5rem !important;
  height: 2.5rem !important;
  i {
    font-size: 1.5rem !important;
    left: 0.85rem !important;
    top: 0.5rem !important;
  }
}

#collapse-icon {
  // color: $white;
  cursor: pointer;
  font-size: 2rem !important;
  left: 0.85rem !important;
  top: 0.5rem !important;
}

#project-name {
  .bar {
    border-color: #a8e2fd;

    &:before {
      background: $cc-dark-blue;
    }
  }
  input {
    // color: #a8e2fd;
    color: $white;
  }
}

#navbar-save-icon {
  font-size: 1.5rem !important;
}
</style>


<style lang="scss">
.custom-link {
  color: #a8e2fd;
  padding-left: 8px;
  padding-right: 8px;
  // background-color: #1cb8ff;
  padding-top: 26px;
  // padding-bottom: 26px;
  padding-bottom: 20px;

  &:hover {
    // color: #fff;
    // background-color: #0099de;

    // background-color: #1cb8ff;
    color: $cc-dark-blue;
  }
}
</style>
