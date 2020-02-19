<template>
  <div class="user-projects">
    <!-- <button @click="getWorkspace()">Hello</button> -->
    <!-- <button @click="showProjectModal()">HI</button> -->

    <!-- ===================== Projects Modal ===================== -->
    <vuestic-modal v-bind:large="true" ref="projects"
      :okClass="'none'"
      :okText="'modal.confirm' | translate"
      :cancelClass="'none'"
      :cancelText="'modal.cancel' | translate"
      :headerBgColor="'#eee'">

      <div slot="title"><i class="fa fa-folder"></i> {{'project.headers.my_projects' | translate}}</div>

      <!-- ===================== Searching ===================== -->
      <!-- <project-search /> -->
      <div class="row">
        <div class="col-md-10 offset-md-1">
          <div class="form-group with-icon-left with-icon-right">
            <div class="input-group">
              <input id="input-icon-left" name="input-icon-left" required v-model="query"/>
              <i class="fa fa-search icon-left input-icon"></i>
              <label class="control-label" for="input-icon-left">{{'project.form.search'
                | translate}}</label><i class="bar"></i>
              <i class="fa fa-times icon-right input-icon pointer"
                @click="clearQuery()"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- {{ query }}

      {{ searchResult }} -->

      <!-- {{ $store.getters.program }} <br> -->
      <!-- ===================== Loading ===================== -->
      <center class="loading" v-if="isLoadingProjects">
        <spring-spinner
          :animation-duration="2500"
          :size="100"
          color="#a5d442"
          class="self-align-center"
        />
      </center>

      <!-- ===================== Projects ===================== -->
      <div v-else-if="searchResult && searchResult.length>0" class="cards-container">

          <vuestic-card stripe="success"
            v-for="record in searchResult" :key="record.id">

            <div v-if="projectToEdit && projectToEdit.id === record.id">

              <!-- ===================== Edit Pending ===================== -->
              <center class="loading-edit" v-if="isEditPending">
                <half-circle-spinner
                  :animation-duration="2500"
                  :size="100"
                  color="#a5d442"
                  class="self-align-center"
                />
              </center>

              <!-- ===================== Edit Project ===================== -->
              <project-edit v-else
                :projectToEdit="projectToEdit"
                @confirmEditProject="confirmToEdit"
                @cancelEditProject="cancelToEdit"
              />

            </div>

            <!-- ===================== View Project Details ===================== -->
            <project-view v-else :record="record"
              @openProject="handleOpenProject"
              @editProject="handleEditProject"
              @confirmDeleteProject="confirmToDelete"
            />

          </vuestic-card>

          <!-- <vuestic-card stripe="danger" v-for="index in 10" :key="index">
            <p slot="title">{{ $t('cards.title.stripeNoImage') }}</p>
            {{ $t('cards.contentText') }}
            <p class="pt-3 mb-0">
              <a href="#" class="pr-2">{{ $t('project.open') }}</a>
              <a href="#" class="pr-2">{{ $t('cards.link.setAsDefault') }}</a>
              <a href="#">{{ $t('cards.link.delete') }}</a>
            </p>
          </vuestic-card> -->

      </div>

      <!-- ===================== Empty Project ===================== -->
      <div v-else class="text-center space-top-bottom no-project-area">
        <i class="fa fa-file fa-4x"></i>
        <h4 class="space-top-bottom">{{'project.no_project' | translate}}</h4>
      </div>
    </vuestic-modal>

    <!-- ===================== Edit Modal ===================== -->
    <!-- <vuestic-modal v-bind:meduim="true" ref="editModal"
      :okText="'modal.ok' | translate"
      :okClass="'btn btn-info'"
      :cancelText="'modal.cancel' | translate"
      :headerBgColor="'#eee'"
      @ok="confirmToEdit()"
      @cancel="cancelToDelete()"
      >
      <div slot="title"><i class="fa fa-edit"></i> {{'project.headers.edit_project' | translate}}</div>
      <div class="row" v-if="projectToEdit">
        <div class="col-md-6 offset-md-3">
          <fieldset>
            <div class="form-group with-icon-left">
              <div class="input-group">
                <input id="input-icon-left" name="input-icon-left"
                  v-model="projectToEdit.name"
                  required/>
                <i class="fa fa-pencil icon-left input-icon"></i>
                <label class="control-label" for="input-icon-left">{{'project.form.name'
                  | translate}}</label><i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <textarea type="text" id="simple-textarea"
                  v-model="projectToEdit.desc"
                  required></textarea>
                <label class="control-label" for="simple-textarea">{{'project.form.desc'
                  | translate}}</label><i class="bar"></i>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </vuestic-modal> -->

    <!-- ===================== New Project Modal ===================== -->
    <vuestic-modal v-bind:meduim="true" ref="newProjectModal"
      :okText="'modal.ok' | translate"
      :okClass="'btn btn-success btn-micro'"
      :cancelText="'modal.cancel' | translate"
      :cancelClass="'btn btn-secondary btn-micro'"
      :headerBgColor="'#eee'"
      @ok="confirmToNewProject()"
      @cancel="cancelToNewProject()"
      >
      <div slot="title"><i class="fa fa-edit"></i> {{'project.headers.new_project' | translate}}</div>
      <div class="row" >
        <div class="col-md-10 offset-md-1">
          <fieldset>
            <div class="form-group with-icon-left">
              <div class="input-group">
                <input id="input-icon-left" name="input-icon-left"
                  v-model="newProject.name" maxlength="100" required/>
                <i class="fa fa-pencil icon-left input-icon"></i>
                <label class="control-label" for="input-icon-left">{{'project.form.name'
                  | translate}}</label><i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <textarea type="text" id="simple-textarea" maxlength="255"
                  v-model="newProject.desc" required></textarea>
                <label class="control-label" for="simple-textarea">{{'project.form.desc'
                  | translate}}</label><i class="bar"></i>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </vuestic-modal>

    <!-- ===================== Delete Confirm Modal ===================== -->
    <vuestic-modal v-bind:small="true" ref="deleteConfirmPopup"
      :okText="'modal.confirm' | translate"
      :okClass="'btn btn-danger btn-micro'"
      :cancelClass="'btn btn-secondary btn-micro'"
      :cancelText="'modal.cancel' | translate"
      :headerBgColor="'#eee'"
      @ok="confirmToDelete()"
      @cancel="cancelToDelete()"
      >
      <div slot="title"><i class="fa fa-trash"></i> {{'project.headers.delete_project' | translate}}</div>
      <div class="text-center" v-if="projectToDelete">
        {{ 'project.deletion.delete_confirm_text' | translate }} <b> {{ projectToDelete.name }} ?</b><br>
      </div>
    </vuestic-modal>

    <!-- ===================== Share Project Modal ===================== -->
    <vuestic-modal v-bind:meduim="true" ref="shareProjectModal"
      :okClass="'invisible'"
      :cancelClass="'invisible'"
      :headerBgColor="'#fff'"
      >
      <!-- <div slot="title"><i class="fa fa-edit"></i> {{'project.headers.new_project' | translate}}</div> -->

      <!-- ** Clone of sweet alert ** -->
      <div class="success">
        <div class="swal2-header"><ul class="swal2-progresssteps" style="display: none;"></ul><div class="swal2-icon swal2-error" style="display: none;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><div class="swal2-icon swal2-question" style="display: none;"><span class="swal2-icon-text">?</span></div><div class="swal2-icon swal2-warning" style="display: none;"><span class="swal2-icon-text">!</span></div><div class="swal2-icon swal2-info" style="display: none;"><span class="swal2-icon-text">i</span></div><div class="swal2-icon swal2-success swal2-animate-success-icon" style="display: flex;"><div class="swal2-success-circular-line-left" style="background-color: rgb(255, 255, 255);"></div><span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span><div class="swal2-success-ring"></div> <div class="swal2-success-fix" style="background-color: rgb(255, 255, 255);"></div><div class="swal2-success-circular-line-right" style="background-color: rgb(255, 255, 255);"></div></div><img class="swal2-image" style="display: none;">
          <h2 class="swal2-title" id="swal2-title" style="">
            {{ 'program.messages.shared_title' | translate }}
          </h2>
        </div>

        <div class="swal2-content">
          <div style="display: block;">
            {{'program.messages.share_success' | translate}}
          </div>
        </div>

      </div>
      <!-- ** / Clone of sweet alert ** -->

      <div class="row" >
        <div class="col-md-10 offset-md-1">
          <fieldset>

            <!-- <div class="form-group with-icon-left">
              <div class="input-group">
                <input name="input-icon-left"
                  value="newProject.name"/>
                <i class="fa fa-chain icon-left input-icon"></i>
                <i class="bar"></i>
              </div>
            </div> -->
            <!-- 
              http://localhost:8080/#/app/program/64b3cde9-25d4-4740-91f5-865e30900ed2
              -->
            <div class="form-group mt-3">
              <div class="input-group">
                <textarea type="text" readonly v-model="sharedUrl">
                  </textarea>
                <i class="bar"></i>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </vuestic-modal>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import ProjectView from './ProjectView'
import ProjectEdit from './ProjectEdit'
import ProjectSearch from './ProjectSearch'

import notification from 'services/notification'
import iframeMessage from 'services/iframeMessage'
import fb from 'services/firebaseConfig'
import utils from 'services/utils'

import { SpringSpinner, HalfCircleSpinner } from 'epic-spinners'
import { mapGetters } from 'vuex'

const SAVINGTYPE = {
  SAVE: 1,
  SAVEAS: 2,
  SHARE: 3
}

export default {
  name: 'user-project',
  components: {
    SpringSpinner,
    HalfCircleSpinner,
    ProjectView,
    ProjectEdit,
    ProjectSearch
  },
  props: {
    // projects: {
    //   type: Array,
    //   default: () => []
    // },
    // isLoadingProjects: {
    //   type: Boolean,
    //   default: () => true
    // }
  },
  data () {
    return {
      projects: [],
      isLoadingProjects: false,
      isEditPending: false,

      projectToDelete: null,
      projectToEdit: null,
      lastestFileId: null,
      newProject: {
        name: '',
        desc: '',
      },
      newProjectType: '',
      query: '',
      sharedUrl: '',
    }
  },
  mounted () {
    this.$bus.$on('showNewProjectModal', (newProjectType) => {
      if (this.$store.getters.user && this.$store.getters.user.id) {
        this.showNewProjectModal(newProjectType)
      }
    })
    this.$bus.$on('showProjectsModal', () => {
      this.showProjectModal()
    })
    this.$bus.$on('hideProjectsModal', () => {
      this.hideProjectModal()
    })
    // this.$bus.$on('setUserProject', (projects) => {
    //   this.projects = projects
    // })
    this.$bus.$on('saveProject', () => {
      this.startSaveProject(SAVINGTYPE.SAVE)
    })

    this.$bus.$on('saveProjectAs', () => {
      this.startSaveProject(SAVINGTYPE.SAVEAS)
    })

    this.$bus.$on('openProject', (projectId) => {
      this.downloadFromStorageToWorkspace(projectId)
    })

    this.$bus.$on('forceOpenProject', (projectId) => {
      this.forceDownloadFromStorageToWorkspace(projectId)
    })

    this.$bus.$on('setProjectLoadingStatus', (status) => {
      this.isLoadingProjects = status
    })
  },
  destroyed () {
    this.$bus.$off('saveProject')

    this.$bus.$off('showNewProjectModal')
    this.$bus.$off('showProjectsModal')
    this.$bus.$off('hideProjectsModal')
    this.$bus.$off('saveProjectAs')
    this.$bus.$off('openProject')
    this.$bus.$off('forceOpenProject')
    this.$bus.$off('setProjectLoadingStatus')
  },
  methods: {
    showProjectModal () {
      if (this.$refs.projects) {
        this.$refs.projects.open()
      }
    },
    hideProjectModal () {
      if (this.$refs.projects) {
        this.$refs.projects.clickMask()
      }
    },
    downloadFromStorageToWorkspace (fileId) {
      if (!this.$store.getters.user || !this.$store.getters.user.id) {
        notification.warning(this.$t('program.messages.please_login'))
      } else {
        this.forceDownloadFromStorageToWorkspace(fileId)
      }
    },
    forceDownloadFromStorageToWorkspace (fileId) {
      let data = {
        action: 'get',
        key: fileId,
        uid: (this.$store.getters.user ? this.$store.getters.user.id : '')
      }
      this.$http.get('https://gogoapi.learninginventions.org/storage/v2/', {params: data}, { emulateJSON: true }).then(
        response => {
          this.$bus.$emit('doBlocklyAction', 'setXML', {data: response.bodyText})
          iframeMessage.sendMessage({event: 'setXML', data: response.bodyText})
          this.hideProjectModal()
        },
        response => {
          notification.warning(this.$t('program.messages.unable_to_load'))
        }
      )
    },
    handleOpenProject (record) {
      this.$store.dispatch('setProjectId', record.id)
      this.$store.dispatch('setCurrentProject', {name: record.name, desc: record.desc})
      this.downloadFromStorageToWorkspace(record.fileId)
      utils.changeURL('')
      // Update open timestamp
      if (record.userId === this.$store.getters.user.id) {
        fb.projectsCollection.doc(record.id).update({
          openedAt: new Date(),
        }).then((response) => {
          // console.log('Database', '\t', response)
        })
        // .catch(err => {
        //   console.log('Database', '\t', 'Error', err)
        // })
      }
    },
    handleEditProject (record) {
      this.projectToEdit = Object.assign({}, record)
    },
    showEditModal (record) {
      this.projectToEdit = Object.assign({}, record)
      if (this.$refs.editModal) {
        this.$refs.editModal.open()
      }
    },
    confirmToEdit () {
      // console.log('Confirm\t', this.projectToEdit)
      if (!this.projectToEdit) return
      this.isEditPending = true
      fb.projectsCollection.doc(this.projectToEdit.id).update({
        updatedAt: new Date(),
        name: this.projectToEdit.name ? this.projectToEdit.name : 'Untitled',
        desc: this.projectToEdit.desc
      }).then((response) => {
        // console.log(response)
        if (this.projectToEdit.id === this.$store.getters.program.currentProjectId) {
          this.$store.dispatch('setCurrentProject',
            {name: this.projectToEdit.name || 'Untitled',
              desc: this.projectToEdit.desc})
        }

        this.projectToEdit = null
        this.isEditPending = false
        // notification.success(this.$t('program.messages.update_success'))
        this.$swalSuccess({
          title: this.$t('program.messages.updated_title'),
          text: this.$t('program.messages.update_success'),
        })
        // console.log('Database', '\t', response)
      }).catch(err => {
        this.isEditPending = false
        notification.warning(this.$t('program.messages.unable_to_save'))
        console.log('Database', '\t', 'Error', err)
      })
    },
    cancelToEdit () {
      this.projectToEdit = null
    },
    confirmToDelete (project) {
      // console.log('Confirm\t', this.projectToDelete)
      if (!project) return

      fb.projectsCollection.doc(project.id).delete()
      .then(ref => {
        if (project.id === this.$store.getters.program.currentProjectId) {
          this.$store.dispatch('setProjectId', null)
        }
        // notification.success(`${this.$t('project.deletion.delete_success_start')} "${project.name}" ${this.$t('project.deletion.delete_success_end')}`)
        this.$swalSuccess({
          title: this.$t('project.deletion.deleted_title'),
          html: `${this.$t('project.deletion.delete_success_1')} "<b>${project.name}</b>" ${this.$t('project.deletion.delete_success_2')}`,
        })
      }).catch(err => {
        console.log(err)
        notification.warning(this.$t('project.deletion.delete_fail'))
      })
    },
    showNewProjectModal (newProjectType) {
      this.newProjectType = newProjectType
      if (this.$refs.newProjectModal) {
        this.$refs.newProjectModal.open()
      }
    },
    confirmToNewProject () {
      this.$store.dispatch('setToSaveProject', this.newProject)
      this.$store.dispatch('setCurrentProject', this.newProject)
      this.newProject = {
        name: '',
        desc: ''
      }
      if (this.newProjectType === 'noname') {
        this.$swalSaving({})
        this.addProjectToDB(this.lastestFileId)
      }
    },
    cancelToNewProject () {
      this.newProject = {
        name: '',
        desc: ''
      }
      this.$store.dispatch('setToSaveProjectEmpty')
    },
    uploadToStorage (content, callback, isSharing) {
      if (!(this.$store.getters.user && this.$store.getters.user.id) && !isSharing) {
        this.$store.dispatch('setProjectSavingState', false)
        notification.warning(this.$t('program.messages.please_login'))
      } else {
        let data = {
          action: 'link',
          xml: content,
          uid: (this.$store.getters.user ? this.$store.getters.user.id : '')
        }
        this.$http.post('https://gogoapi.learninginventions.org/storage/v2/', data, { emulateJSON: true }).then(
          response => {
            // Success
            // Valid ID ?
            if (response.bodyText.length === 36) {
              // this.addOrUpdateProjectToDB(response.bodyText)
              if (typeof callback === 'function') {
                callback(response.bodyText)
              }
            } else {
              this.$store.dispatch('setProjectSavingState', true)
              notification.warning(this.$t('program.messages.unable_to_save'))
            }
          },
          response => {
            this.$store.dispatch('setProjectSavingState', true)
            notification.warning(this.$t('program.messages.unable_to_save'))
            // Error
          }
        )
      }
    },
    handleShare () {
      this.$swalSaving({})

      // setTimeout(() => {
      //   this.$swalHide()
      //   this.$refs.shareProjectModal.open()
      // }, 500)

      this.uploadToStorage(this.getWorkspace(), (fileId) => {
        this.lastestFileId = fileId
        // console.log(fileId)
        let sharedUrl = utils.buildSharingUrl(fileId)
        this.sharedUrl = sharedUrl
        utils.changeURL(fileId)

        this.$swalHide()
        this.$refs.shareProjectModal.open()

        // //The prev version
        // this.$swalSuccess({
        //   timer: null,
        //   title: this.$t('program.messages.shared_title'),
        //   html: `${this.$t('program.messages.share_success')} <br><br>

        //     <div class="row">
        //       <div class="col-10">
        //         <div class="well text-grey">
        //           ${shareUrl}
        //         </div>
        //       </div>
        //       <div class="col-2">
        //         ok
        //       </div>
        //     </div>
        //     <a href="${shareUrl}" target="_blank"><b>${sharedUrl}</></a>`
        // })
      }, true)
    },
    startSaveProject (savingType) {
      this.$bus.$emit('fethAndSaveWorkspace')
      if (savingType === SAVINGTYPE.SHARE) {
        this.handleShare()
      } else if (savingType === SAVINGTYPE.SAVEAS) {
        this.uploadToStorage(this.getWorkspace(), (fileId) => {
          if (this.$store.getters.program.currentProjectId) {
            this.newProject = Object.assign({}, this.$store.getters.program.currentProject)
          } else {
            this.newProject = Object.assign({}, this.$store.getters.program.toSaveProject)
          }
          this.lastestFileId = fileId
          this.showNewProjectModal('noname')
        })
      // ********** Exisiting project ********** //
      } else if (this.$store.getters.program.currentProjectId) {
        this.$swalSaving({})
        if (!this.$store.getters.program.currentProject.name) {
          this.$store.dispatch('setCurrentProjectName', 'Untitled')
        }
        // notification.info(this.$t('program.messages.saving'))
        this.uploadToStorage(this.getWorkspace(), (fileId) => {
          this.lastestFileId = fileId
          fb.projectsCollection.doc(this.$store.getters.program.currentProjectId).update({
            updatedAt: new Date(),
            name: this.$store.getters.program.currentProject.name || 'Untitled',
            fileId: fileId
          }).then((response) => {
            // notification.success(this.$t('program.messages.save_success'))
            this.$swalSuccess({
              title: this.$t('program.messages.saved_title'),
              text: this.$t('program.messages.save_success'),
            })
          }).catch(err => {
            notification.warning(this.$t('program.messages.unable_to_save'))
            console.log('Database', '\t', 'Error', err)
          })
        })
      // ********** Prefilled Project Name ********** //
      } else if (this.$store.getters.program.toSaveProject.name) {
        // notification.info(this.$t('program.messages.saving'))
        this.$swalSaving({})
        this.uploadToStorage(this.getWorkspace(), (fileId) => {
          this.lastestFileId = fileId
          this.addProjectToDB(fileId)
        })
      // ********** Start asking project name **********//
      } else {
        // addProjectToDB(fileId)
        this.uploadToStorage(this.getWorkspace(), (fileId) => {
          this.lastestFileId = fileId
          this.showNewProjectModal('noname')
        })
      }
    },
    // addOrUpdateProjectToDB (fileId) {
    //   this.lastestFileId = fileId
    //   notification.info(this.$t('program.messages.saving'))
    //   // Update to exists document
    //   if (this.$store.getters.program.currentProjectId) {
    //     fb.projectsCollection.doc(this.$store.getters.program.currentProjectId).update({
    //       updatedAt: new Date(),
    //       fileId: fileId
    //     }).then((response) => {
    //       notification.success(this.$t('program.messages.save_success'))
    //     }).catch(err => {
    //       notification.warning(this.$t('program.messages.unable_to_save'))
    //       console.log('Database', '\t', 'Error', err)
    //     })
    //   // Add new document
    //   } else if (this.$store.getters.program.toSaveProject.name) {
    //     this.addProjectToDB(fileId)
    //   } else {
    //     // addProjectToDB(fileId)
    //     // this.show
    //     this.showNewProjectModal('noname')
    //   }
    // },
    addProjectToDB (fileId) {
      fb.projectsCollection.add({
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: this.$store.getters.user.id,
        fileId: fileId,
        // name: (this.newProject.name ? this.newProject.name : 'Untitled'),
        // desc: this.newProject.desc
        name: this.$store.getters.program.toSaveProject.name || 'Untitled',
        desc: this.$store.getters.program.toSaveProject.desc
      }).then((response) => {
        // notification.success(this.$t('program.messages.save_success'))
        this.$swalSuccess({
          title: this.$t('program.messages.saved_title'),
          text: this.$t('program.messages.save_success'),
        })
        // console.log('Database', '\t', response)
        this.$store.dispatch('setProjectId', response.id)
        this.$store.dispatch('setCurrentProject',
          {name: this.$store.getters.program.toSaveProject.name || 'Untitled',
            desc: this.$store.getters.program.toSaveProject.desc})
      })
      // .catch(err => {
      //   notification.warning(this.$t('program.messages.unable_to_save'))
      //   console.log('Database', '\t', 'Error', err)
      // })
    },
    getWorkspace () {
      return this.$store.getters.program.currentWorkspaceXmlText
      // if (window.document.querySelector('#programming-frame')) {
      //   var xml = window.document.querySelector('#programming-frame').contentWindow.Code.getXMLString()
      //   // console.log(xml)
      //   return xml
      // }
    },
    clearQuery () {
      this.query = ''
    }
  },
  computed: {
    ...mapGetters(['program']),
    searchResult () {
      return this.program.userProjects.filter((project) => {
        return project.name.search(new RegExp(this.query, 'i')) > -1 || project.desc.search(new RegExp(this.query, 'i')) > -1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$singleGutter: #{(19/16)}rem;
.vuestic-modal .modal-content {
  border-radius: 12px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: -$singleGutter;
  align-items: flex-start;
}

.loading {
  padding: 60px;
}

.loading-edit {
  padding-top: 50px;
  padding-bottom: 50px;
}

.cc-btn-edit {
  margin-left: 5px;
  margin-right: 5px;
}

.no-project-area {
  color: $lighter-gray;
}
</style>

<style lang="scss">
.cc-btn-round {
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  // background-color: #eee;
  border-radius: 50%;
  cursor: pointer;
  padding: 2px;

  &:hover {
    background-color: $lighter-gray;
  }

  i {
    left: 0.5rem;
    position: absolute;
    top: 0.5rem;
  }
}
@media (min-width: 1200px){
  .vuestic-card {
    min-width: 235px;
  }
}
</style>
