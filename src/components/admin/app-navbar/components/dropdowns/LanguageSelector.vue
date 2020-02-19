<template>
    <div class="language-selector">

        <!-- ===================== About Modal ===================== -->
        <vuestic-modal v-bind:large="true" ref="languageModal" :okClass="'none'" :okText="'modal.confirm' | translate" :cancelClass="'none'" :cancelText="'modal.cancel' | translate" :headerBgColor="'#eee'" :headerTextColor="'#34495e'">

            <div slot="title">
                <i class="fa fa-globe"></i> {{'pages.language.title' | translate}}</div>

            <div class="d-flex flex-wrap justify-content-around align-items-end text-center">
                <div class="p-2" v-for="(option, id) in options" :key="id">
                    <a class="dropdown-item" :class="{ active: option.code === currentLanguage() }" @click="setLanguage(option.code)">
                        <span class="flag-icon flag-icon-small" :class="flagIconClass(option.code)"></span>
                        <span class="dropdown-item__text ellipsis">&#160;
                            {{ `language.${option.name}` | translate }}
                        </span>
                    </a>
                </div>
            </div>
        </vuestic-modal>

    </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'language-selector',

  props: {
    options: {
      type: Array,
      default: () => [
        {
          code: 'gb',
          name: 'english'
        },
        // {
        //   code: 'es',
        //   name: 'spanish'
        // },
        // {
        //   code: 'br',
        //   name: 'brazilian_portuguese'
        // },
        {
          code: 'th',
          name: 'thai'
        },
      ]
    }
  },
  methods: {
    showSelector () {
      this.$refs.languageModal.open()
    //   let htmlContent = `<div>`
    //   for (const option of this.options) {
    //     htmlContent += `
    //         <a class-oo="dropdown-item"
    //             class-ok="{ active: option.code === currentLanguage() }"
    //             @click="setLanguage(option.code)">
    //             <span class="flag-icon flag-icon-small ${this.flagIconClass(option.code)}"></span>
    //             <span class="dropdown-item__text ellipsis">
    //             ${this.$t('language.' + option.name)}
    //             </span>
    //         </a>`
    //   }
    //   htmlContent += `</div>`

    //   this.$swal({
    //     html: htmlContent,
    //     showCloseButton: false,
    //     showConfirmButton: false,
    //   })
    },
    setLanguage (locale) {
      Vue.i18n.set(locale)
      this.$bus.$emit('setLanguage', locale)
      this.$refs.languageModal.cancel()

      this.$localStorage.set('lang', locale)
      // **************** Track Event **************** //
      this.$ga.event('web', 'change_lang', locale)
    },

    currentLanguage () {
      return Vue.i18n.locale() === 'en' ? 'gb' : Vue.i18n.locale()
    },

    flagIconClass (code) {
      return `flag-icon-${code}`
    }
  }
}
</script>

<style lang="scss">
</style>
