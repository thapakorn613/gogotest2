<template>
  <div class="project-example">
    <!-- <button @click="showExModal()">Ex</button> -->
    <!-- ===================== Projects Modal ===================== -->
    <vuestic-modal v-bind:large="true" ref="projectExModal" class="project-ex-modal"
      :okClass="'none'"
      :okText="'modal.confirm' | translate"
      :cancelClass="'none'"
      :cancelText="'modal.cancel' | translate"
      :headerBgColor="'#eee'">

      <div slot="title"><i class="fa fa-folder"></i> {{'Example' | translate}}</div>
      <iframe src="https://lilcmu.gitlab.io/gogo-example/th/gogoboard/" id="iframe-ex" width="100%" frameborder="0" />

      <!-- ===================== Empty Project ===================== -->
      <!-- <div class="text-center space-top-bottom no-project-area">
        <i class="fa fa-file fa-4x"></i>
        <h4 class="space-top-bottom">{{'project.no_project' | translate}}</h4>
      </div> -->
    </vuestic-modal>
  </div>
</template>

<script>


import { SpringSpinner, HalfCircleSpinner } from 'epic-spinners'
import { mapGetters } from 'vuex'

export default {
  name: 'project-example',
  components: {
    SpringSpinner,
    HalfCircleSpinner,
  },
  props: {
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
    window.onmessage = (e) => {
      var msg = e.data
      if (typeof msg === 'object') {
        if (!msg.event) {
        } else if (msg.event === 'loadProject') {
          this.hideExModal()
          this.openProject(msg.data)
        }
      }
    }
  },
  destroyed () {

  },
  methods: {
    openProject (projectId) {
      this.$swalConfirm({})
        .then((result) => {
          if (result.value) {
            this.$bus.$emit('forceOpenProject', projectId)
          }
        })
    },
    showExModal () {
      if (this.$refs.projectExModal) {
        this.$refs.projectExModal.open()
      }
    },
    hideExModal () {
      if (this.$refs.projectExModal) {
        this.$refs.projectExModal.clickMask()
      }
    }
  },
  computed: {
    ...mapGetters(['program']),
  }
}
</script>

<style lang="scss" scoped>

.block-extension {
  display: inline-block;
}

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

.project-example .vuestic-modal {
   
  .modal {
    overflow: hidden;
  }
  .modal-dialog {
    max-width: calc(100vw - 45px);
    left: 20px;
    top: 20px;
    margin: 0px;
    padding: 0px;
    // border-radius: 0px !important;

    .modal-content {
      border-radius: 0px !important;

      .modal-body {
        // height: calc(100vh - 55px);
        height: calc(100vh - 100px);
        padding: 0px;

        iframe {
          // height: calc(100vh - 55px);
          height: calc(100vh - 100px);
        }
      }
      .modal-footer {
        display: none;
      }
    }

  }
  
}
</style>
