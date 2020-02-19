<template>
  <div class="widget" :class="{'no-header': !headerText}">
    <div class="widget-header" v-if="headerText"
      :style="`background-color: ${headerBgColor}; color:  ${headerTextColor};`">
      <!-- <i class="fa fa-stack fa-2x" v-if="!!icon">
        <i class="fa fa-circle fa-stack-2x"></i>
        <i class="fa fa-stack-1x " :class="[icon]"></i>
      </i> -->
      <i v-if="!!icon" class="header-icon fa" :class="[icon]"></i>
      &nbsp;<span :class="headerClickAction ? 'as-a-link' : ''" @click="handleHeaderClick()">{{headerText}}</span>
    </div>
    <div class="widget-body" v-if="hasSlotData">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vuestic-widget',
    props: ['headerText', 'isHeaderLink', 'headerBgColor', 'headerTextColor', 'headerClickAction', 'icon'],
    computed: {
      hasSlotData () {
        return this.$slots.default
      }
    },
    methods: {
      handleHeaderClick () {
        if (this.headerClickAction) {
          this.headerClickAction()
        }
      }
    }
  }
</script>

<style lang="scss">
  .widget {
    background: $widget-bg;
    box-shadow: $widget-box-shadow;
    margin-bottom: $widget-mb;
    padding: 0;
    border-radius: 8px;

    &.no-header {
      .widget-body {
        height: $widget-body-no-header-height;
      }
    }

    &.larger-padding {
      .widget-body {
        padding: $widget-larger-padding;
      }
    }

    &.no-h-padding {
      .widget-body {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &.no-v-padding {
      .widget-body {
        padding-top: 0;
        padding-bottom: 0;
      }
    }

    &.brand-info {
      background-color: $brand-info;
      color: $white;
      box-shadow: $widget-info-shadow;
    }

    &.brand-danger {
      background-color: $brand-danger;
      color: $white;
      box-shadow: $widget-danger-shadow;
    }

    &.info-widget {
      border-top: $info-widget-border;

      &.brand-info {
        border-top-color: $brand-info;
      }

      &.brand-danger {
        border-top-color: $brand-danger;
      }
    }

    .widget-body {
      height: $widget-body-with-header-height;
      padding: $widget-padding;
    }

    .widget-header {
      border-radius: 8px 8px 0px 0px;
      height: $widget-header-height;
      padding: 0 $widget-padding;
      border-bottom: $widget-header-border;
      font-size: $font-size-larger;
      font-weight: 600;
      display: flex;
      align-items: center;

      .header-icon {
        font-size: 22px;
      }

      .as-a-link {
        cursor: pointer;
      }
    }
  }
</style>

