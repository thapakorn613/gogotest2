<template>
  <div class="form-group dropdown" v-dropdown.closeOnMenuClick>
    <button id="itemsPerPageBtn" class="btn btn-primary btn-sm dropdown-toggle" type="button"
            data-toggle="dropdown">
      {{selected}} {{label}}
      <i class="ion-ios-arrow-down arrow-down"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <div class="dropdown-menu-content">
        <a class="dropdown-item" v-for="option in options" @click="selectedItemsPerPage(option.value)">{{option.value}} per page</a>
      </div>
    </div>
  </div>

</template>

<script>
  import Dropdown from 'vuestic-directives/Dropdown'

  export default {
    directives: {
      Dropdown
    },
    props: {
      label: {
        type: String
      },
      options: {
        type: Array,
        required: true
      },
      defaultPerPage: {
        type: Number
      }
    },
    data () {
      return {
        selected: this.defaultPerPage
      }
    },

    mounted () {
      this.selectedItemsPerPage(this.selected)
    },

    methods: {
      selectedItemsPerPage (optionValue) {
        this.selected = optionValue
        this.$emit('items-per-page', this.selected)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn.dropdown-toggle, .dropdown-menu {
    min-width: 13rem;
    max-width: 13rem;
    margin-left: 1rem;
  }

  .dropdown-item, .dropdown-toggle {
    text-transform: uppercase;
  }
</style>
