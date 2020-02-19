<template>
  <div class="col nav-item dropdown navbar-dropdown" v-dropdown>
    <a class="nav-link dropdown-toggle custom-link" href="#"
      v-tooltip.bottom="{ content: $t('program.menus.menus')}">
      <!-- <span class="i-nav-messages"></span> -->
      <i id="menu-icon" class="fa fa-chevron-circle-down "></i>
    </a>
    <div class="dropdown-menu">
      <div class="dropdown-menu-content">
        <!-- <a v-for="(option, id) in options" :key="id" class="dropdown-item" href="#">
          <span class="ellipsis">{{ $t(`messages.${option.name}`, { name: option.details.name})}}</span>
        </a>
        <div class="dropdown-item plain-link-item">
          <a class="plain-link" href="#">{{'messages.all' | translate}}</a>
        </div> -->

        <a class="dropdown-item" href="javascript:;"
          v-tooltip.left="$t('program.menus.new_project_desc')"
          @click="handleFunction('newfile')">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'file']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.new_project' | translate}}</span>
        </a>

        <a class="dropdown-item" href="javascript:;"
          v-tooltip.left="$t('program.menus.my_projects_desc')"
          @click="handleListProject()">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'folder']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.my_projects' | translate}}</span>
        </a>

        <a class="dropdown-item" href="javascript:;"
          v-tooltip.left="$t('program.menus.project_example_desc')"
          @click="handleShowProjectExample()">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'folder']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.project_example' | translate}}</span>
        </a>

        <a class="dropdown-item" href="javascript:;"
          v-if="isUserLoggedIn"
          v-tooltip.left="$t('program.menus.save_desc')"
          @click="handleSave()">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'save']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.save' | translate}}</span>
        </a>

        <a class="dropdown-item" href="javascript:;"
          v-if="isUserLoggedIn"
          v-tooltip.left="$t('program.menus.save_as_desc')"
          @click="handleSaveAs()">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'save']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.save_as' | translate}}</span>
        </a>

        <a class="dropdown-item" href="javascript:;"
          v-tooltip.left="$t('program.menus.open_desc')"
          @click="handleFunction('open')">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'folder-open']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.open' | translate}}</span>
        </a>

        <a class="dropdown-item" href="javascript:;"
          v-tooltip.left="$t('program.menus.import_desc')"
          @click="handleFunction('import')">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'file-import']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.import' | translate}}</span>
        </a>

        <a class="dropdown-item" href="javascript:;"
          v-tooltip.left="$t('program.menus.save_as_a_file_desc')"
          @click="handleFunction('download')">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'file-download']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.save_as_a_file' | translate}}</span>
        </a>

        <a class="dropdown-item" href="javascript:;"
          v-tooltip.left="$t('program.menus.share_desc')"
          @click="handleShare()">
          <font-awesome-icon class="cc-icon" :icon="['fas', 'share-alt']"></font-awesome-icon> 
          <span class="cc-label">{{'program.menus.share' | translate}}</span>
        </a>

        <!-- <div v-for="(menuItems, id) in menuItems" :key="id"
          class="dropdown-item">
          <router-link :to="{name: menuItems.link}" class="dropdown-link" href="#">
            <font-awesome-icon class="cc-icon" :icon="['fas', menuItems.icon]"></font-awesome-icon> 
            {{ `${menuItems.name}` | translate}}</router-link>
        </div> -->
      </div>
    </div>
    <user-project ref="userProject"/>
    <project-example ref="projectExample"/>
  </div>
</template>

<script>

  import UserProject from 'components/program/elements/UserProject'
  import ProjectExample from 'components/extension/ProjectExample.vue'

  import iframeMessage from 'services/iframeMessage'

  // import fb from 'services/firebaseConfig'
  // import UserProjects from '../../../../program/elements/UserProjects'

  export default {
    name: 'message-dropdown',
    components: {
      UserProject,
      ProjectExample,
    },
    props: {
      options: {
        type: Array,
        default: () => [
          {
            name: 'new',
            details: { name: 'Oleg M' }
          },
          {
            name: 'new',
            details: { name: 'Andrei H' }
          },
        ]
      }
    },
    data () {
      return {
        // isLoadingProject: false,
      }
    },
    computed: {
      currentUserId () {
        return (this.$store.getters.user ? this.$store.getters.user.id : undefined)
      },
      isUserLoggedIn () {
        return this.currentUserId !== undefined
      },
      menuItems () {
        let menuItems = [
          {icon: 'folder-open', name: 'open', link: 'signup'},
          {icon: 'file-import', name: 'import', link: 'login'},
          {icon: 'file-download', name: 'download', link: 'login'}

        ]
        // if (1) {
        //   menuItems = [
        //     {icon: 'fa-user', name: 'user.profile', link: 'profile'},
        //     {icon: 'fa-sign-out', name: 'user.logout', link: 'logout'}
        //   ]
        // }
        return menuItems
      },
    },
    methods: {
      handleFunction (name) {
        this.$bus.$emit('doBlocklyAction', name)
        iframeMessage.sendMessage({event: 'action', name: name})
      },
      handleSave () {
        // console.log('Handle\tSave')
        // iframeMessage.sendMessage({event: 'getXML'})
        this.$store.dispatch('setProjectSavingState', true)
        // this.$bus.$emit('saveProject')
        this.$refs.userProject.startSaveProject(1)
      },
      handleSaveAs () {
        // console.log('Handle\tSave')
        // iframeMessage.sendMessage({event: 'getXML'})
        this.$store.dispatch('setProjectSavingState', true)
        // this.$bus.$emit('saveProjectAs')
        this.$refs.userProject.startSaveProject(2)
      },
      handleShare () {
        this.$refs.userProject.startSaveProject(3)
      },
      handleListProject () {
        this.$refs.userProject.showProjectModal()
        // this.isLoadingProject = true
        // this.$bus.$emit('setProjectLoadingStatus', true)
        // this.$bus.$emit('showProjectsModal')
        // fb.projectsCollection.where('userId', '==', this.$store.getters.user.id).get().then(docs => {
        //   console.log(docs)
        //   let projects = []

        //   docs.forEach(doc => {
        //     let record = doc.data()
        //     record.id = doc.id
        //     projects.push(record)
        //   })

        //   this.$bus.$emit('setUserProject', projects)
        //   this.$bus.$emit('setProjectLoadingStatus', false)
        // })

        // fb.projectsCollection.where('userId', '==', this.$store.getters.user.id)
        //   .onSnapshot((docs) => {
        //     console.log(docs)
        //     let projects = []

        //     docs.forEach(doc => {
        //       let record = doc.data()
        //       record.id = doc.id
        //       projects.push(record)
        //     })
        //     this.$bus.$emit('setUserProject', projects)
        //     this.$bus.$emit('setProjectLoadingStatus', false)
        //   })
      },
      handleShowProjectExample () {
        this.$refs.projectExample.showExModal()
      }
      // Example
      // createPost () {
      //   fb.postsCollection.add({
      //     createdOn: new Date(),
      //     content: 'content',
      //     userId: 'userId',
      //     userName: 'userName',
      //     comments: 0,
      //     likes: 0
      //   }).then(ref => {
      //     console.log('finish')
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // }
    }
  }
</script>

<style lang="scss" scoped>
.i-nav-messages {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: -6px;
    background-color: $brand-primary;
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
}
.cc-menu-dropdown {
  color: $white;
  i {
    font-size: 1.5rem !important;
  }
}

.dropdown-item {
  .cc-label {
    position: absolute;
    left: 52px;
  }
}

#menu-icon {
  // font-size: 22px !important;
  font-size: 2rem !important;
}
</style>

