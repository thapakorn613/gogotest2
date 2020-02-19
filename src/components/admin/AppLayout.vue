<template>
  <vuestic-layout v-layout>
    <app-navbar :isOpen="opened" @toggle-menu="toggleSidebar"/>
    <app-sidebar :isOpen="opened" @toggle-menu="toggleSidebar"/>
    <main slot="content" id="content" class="content" role="main">
      <!-- <app-breadcrumbs/> -->
      <vuestic-pre-loader v-show="isLoading" class="pre-loader"></vuestic-pre-loader>
      <router-view></router-view>
    </main>
    <!-- <span slot="footer">©2018. &nbsp;<a href="http://www.gogoboad.org" target="_blank">GoGo Board </a></span> -->
  </vuestic-layout>
</template>

<script>

  import VuesticLayout from '../../vuestic-theme/vuestic-components/vuestic-layout/VuesticLayout'
  import AppNavbar from './app-navbar/AppNavbar'
  import AppSidebar from './app-sidebar/AppSidebar'
  import AppBreadcrumbs from './app-breadcrumbs/AppBreadcrumbs'
  import Layout from 'vuestic-theme/vuestic-directives/Layout'
  import {mapGetters} from 'vuex'

  export default {
    name: 'app-layout',

    components: {
      VuesticLayout,
      AppNavbar,
      AppSidebar,
      AppBreadcrumbs
    },
    directives: {
      layout: Layout,
    },
    data () {
      return {
        opened: false
      }
    },
    methods: {
      toggleSidebar (opened) {
        this.opened = false
      }
    },
    computed: {
      ...mapGetters([
        'isLoading'
      ])
    }
  }
</script>
