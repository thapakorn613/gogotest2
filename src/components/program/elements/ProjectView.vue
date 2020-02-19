<template>
  <div>
    <!-- <p slot="title">{{ record.name }}</p> -->
    <h5>{{ record.name }}</h5>
    <p>{{ record.desc }}</p>
    <!-- <span class="text-muted"
      v-tooltip.top="{ content: $unix(record.updatedAt.seconds).format('LLLL') }">
      {{ record.updatedAt.seconds | unix().fromNow() }}
    </span> -->
    <!-- <span class="text-muted">
      {{ record.updatedAt.seconds | moment("YYYY-MM-DD HH:mm:ss") }}
    </span> -->
    <div class="row text-center justify-content-around">
      <!-- <div class="cc-btn-round" v-tooltip.top="$t('project.buttons.open')"
        @click="handleOpenProject(record)">
        <i class="fa fa-folder-open"></i>
      </div> -->
      <div class="cc-btn-round" v-tooltip.top="$t('project.buttons.open')"
        @click="$emit('openProject', record)">
        <i class="fa fa-folder-open"></i>
      </div>

      <div class="cc-btn-round" v-tooltip.top="$t('project.buttons.edit')"
        @click="$emit('editProject', record)">
        <i class="fa fa-pencil"></i>
      </div>

      <div class="cc-btn-round" v-tooltip.top="$t('project.buttons.delete')"
        @click="handleDeleteProject(record)">
        <i class="fa fa-trash"></i>
      </div>

    </div>

    <div class="row btn-margin-row my-3" v-if="projectToDelete && projectToDelete.id === record.id">
      <div class="col-12 d-flex justify-content-around">
        <button @click="$emit('confirmDeleteProject', record)"
          v-tooltip.bottom="$t('project.buttons.confirm_delete')"
          class="cc-btn-edit btn btn-danger btn-with-icon btn-micro rounded-icon">
          <div class="btn-with-icon-content">
            <i class="ion-md-checkmark ion"></i>
          </div>
        </button>
        <button @click="cancelToDelete()"
          v-tooltip.bottom="$t('project.buttons.cancel')"
          class="cc-btn-edit btn btn-secondary btn-with-icon btn-micro rounded-icon">
          <div class="btn-with-icon-content">
            <i class="ion-md-close ion"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'project-view',
  components: {
  },
  props: ['record'],
  data () {
    return {
      projectToDelete: null
    }
  },
  methods: {
    handleDeleteProject (record) {
      this.projectToDelete = record
      // this.$refs.deleteConfirmPopup.open()
    },
    cancelToDelete () {
      this.projectToDelete = null
      // console.log('Cancel\t', this.projectToDelete)
    },
  }
}
</script>