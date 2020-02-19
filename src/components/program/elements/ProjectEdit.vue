<template>
  <div>
    <div class="form-group with-icon-left">
      <div class="input-group">
        <input id="input-icon-left" name="input-icon-left" 
          v-model="projectToEdit.name" maxlength="100" required/>
        <i class="fa fa-pencil icon-left input-icon"></i>
        <label class="control-label" for="input-icon-left">{{'project.form.name'
          | translate}}</label><i class="bar"></i>
      </div>
    </div>

    <div class="form-group">
      <div class="input-group">
        <textarea type="text" id="simple-textarea"
          v-model="projectToEdit.desc" maxlength="255"
          required></textarea>
        <label class="control-label" for="simple-textarea">{{'project.form.desc'
          | translate}}</label><i class="bar"></i>
      </div>
    </div>

    <div class="row btn-margin-row">
      <div class="col-12 d-flex justify-content-around">
        <button @click="$emit('confirmEditProject')"
          v-tooltip.bottom="$t('project.buttons.save')"
          class="cc-btn-edit btn btn-primary btn-micro" >
          {{'project.buttons.save' | translate}}
        </button>
        <button @click="$emit('cancelEditProject')"
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
  name: 'project-edit',
  components: {
  },
  props: ['projectToEdit'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>