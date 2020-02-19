<template>
  <div class="auth-layout">
    <!-- <div class="nav d-lg-none"><router-link class="i-vuestic" :to="{path: '/'}"></router-link></div> -->
    <div class="main row">
      <div class="auth-wallpaper col-12">
        <vuestic-widget class="login-widget">
          <only-social-login/>
        </vuestic-widget>
      </div>

      <!-- for logout page -->
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script>
//   <div class="auth-wallpaper col-lg-6 col-12">
//   <!-- <div class="oblique"></div> -->
//   <!-- <router-link class="i-vuestic" :to="{path: '/'}"></router-link> -->
//   <social-login></social-login>
// </div>
// <div class="auth-content col-lg-6 col-12">
//   <router-view></router-view>
// </div>

// import SocialLogin from './SocialLogin.vue'

import OnlySocialLogin from './OnlySocialLogin.vue'

export default {
  name: 'AuthLayout',
  components: {
    OnlySocialLogin
  }
}
</script>

<style lang="scss">
  .auth-layout {
    height: 100vh;
    margin: 0;
    .nav {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $top-mobile-nav-height;
      background-color: $top-nav-bg;
      .i-vuestic {
        height: $auth-mobile-nav-ivuestic-h;
        width: 100%;
      }
    }
    .main {
      margin: 0;
      height: 100%;
      .auth-content {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
      }
      .auth-wallpaper {
        // background-color: $top-nav-bg;
        // background-color: #a5d441;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .i-vuestic {
          z-index: 2;
          height: $auth-wallpaper-ivuestic-h;
          width: 100%;
        }
        .oblique {
          position: absolute;
          background-color: $auth-wallpaper-oblique-line;
          left: calc(50% - 27%/2);
          transform: rotate(15deg);
          width: 27%;
          height: 115%;
        }
      }
    }

    @include media-breakpoint-down(md) {
      .main {
        height: $auth-mobile-main-h;
        .auth-content {
          align-items: flex-start;
          padding-top: $auth-content-padding-t;
        }
      }
    }
  }

  .login-widget {
    width: 400px;
    // background-color: #f0f0f0;
  }
</style>
