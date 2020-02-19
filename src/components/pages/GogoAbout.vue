<template>
  <div class="gogo-about">

    <!-- ===================== About Modal ===================== -->
    <vuestic-modal v-bind:large="true" ref="aboutModal" :okClass="'none'" :okText="'modal.confirm' | translate" :cancelClass="'none'" :cancelText="'modal.cancel' | translate" :headerBgColor="'#eee'" :headerTextColor="'#34495e'">

      <div slot="title">
        <i class="fa fa-info-circle"></i> {{'pages.about.title' | translate}}</div>

      <div class="d-flex flex-row justify-content-around align-items-end text-center">
        <div class="p-2">
          <img src="/static/site-img/logo-gogo.png" alt="GoGo Board">
          <p><a href="http://www.gogoboard.org" target="_blank"><b>www.gogoboard.org</b></a></p>
        </div>
        <div class="p-2">
          <img src="/static/site-img/logo-lil.png" alt="Learning Inventions Laboratory">
          <p><a href="https://learninginventions.org" target="_blank"><b>learninginventions.org</b></a></p>
        </div>
      </div>
    </vuestic-modal>

  </div>
</template>

<script>
export default {
  name: 'gogo-about',
  methods: {
    showAboutModal () {
      // console.log('called success')
      if (this.$refs.aboutModal) {
        this.$refs.aboutModal.open()
      }
    },
  }
}
</script>