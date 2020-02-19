<template>
  <!-- <div class="pi-keyvalue-panel"> -->
  <div class="d-flex align-items-center bd-highlight" style="height: 100%;">
    <div class="row" style="width: 100%;">
      <div class="col-sm-6 text-center">
        <p>{{ 'raspberry.key_value.key' | translate }}</p>
        <p class="value">{{ keyValue.key }}</p>
      </div>

      <div class="col-sm-6 text-center">
        <p>{{ 'raspberry.key_value.value' | translate }}</p>
        <p class="value">{{ keyValue.value }}</p>
      </div>
    </div>
  </div>
    <!-- <div class="row d-flex justify-content-around">
      <div class="text-center">
        <p>{{ 'raspberry.key' | translate }}</p>
        <p class="value">{{ keyValue.key }}</p>
      </div>

      <div class="text-center">
        <p>{{ 'raspberry.value' | translate }}</p>
        <p class="value">{{ keyValue.value }}</p>
      </div>

    </div> -->

  <!-- </div> -->
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: 'pi-keyvalue-panel',
    data () {
      return {
      }
    },
    methods: {
    },
    computed: {
      ...mapGetters(['keyValue']),
    },
  }
</script>

<style lang="scss" scoped>

  .pi-keyvalue-panel {
    height: 100%;
  }

  .value {
    font-size: 18px;
    color: $cc-blue;
    font-weight: 600;
  }
</style>
