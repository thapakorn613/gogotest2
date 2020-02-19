<template>
  <div class="profile-dropdown col nav-item dropdown navbar-dropdown" v-dropdown>
    <a class="nav-link dropdown-toggle" href="#">
      <span class="profile-section-avatar-container">
        <!-- <slot></slot> -->
        <img v-if="userPhotoUrl" :src="userPhotoUrl"/>
        <i v-else class="fa fa-4x fa-user icon-user"></i>
      </span>
    </a>
    <div class="dropdown-menu last">
      <div class="dropdown-menu-content">

        <div v-if="userIsAuthenticated">
          <!-- <router-link :to="{name: 'profile'}" class="dropdown-item dropdown-link" @click="showUserProfile()">
            <i class="fa fa-user"></i> {{ 'user.profile' | translate}}
          </router-link> -->
          <a class="dropdown-item dropdown-link" @click="showUserProfile()">
            <i class="fa fa-user"></i> <span class="cc-label">{{ 'user.profile' | translate}}</span>
          </a>
          <router-link :to="{name: 'logout'}" class="dropdown-item dropdown-link">
            <i class="fa fa-sign-out"></i> <span class="cc-label">{{ 'user.logout' | translate}}</span>
          </router-link>
        </div>

        <div v-else>
          <router-link :to="{name: 'login'}" class="dropdown-item dropdown-link">
            <i class="fa fa-sign-in"></i> <span class="cc-label">{{ 'user.login' | translate}}</span>
          </router-link>
        </div>

        <a class="dropdown-item dropdown-link" @click="showLanguageSelector()">
          <i class="fa fa-globe"></i> <span class="cc-label">{{ 'user.language' | translate}}</span>
        </a>

        <a class="dropdown-item dropdown-link" @click="showFeedbackSender()">
          <i class="fa fa-comments"></i> <span class="cc-label">{{ 'user.give_feedback' | translate}}</span>
        </a>

        <a class="dropdown-item dropdown-link" @click="showAbout()">
          <i class="fa fa-info-circle"></i> <span class="cc-label">{{ 'user.about' | translate}}</span>
        </a>

        <!-- ===================== Old way ===================== -->
        <!-- <div v-for="(menuItems, id) in menuItems" :key="id"
          class="dropdown-item">
          <router-link :to="{name: menuItems.link}" class="dropdown-link" href="#"><i class="fa" :class="[menuItems.icon]"></i> {{ `${menuItems.name}` | translate}}</router-link>
        </div> -->
      </div>
    </div>
    
    <gogo-about ref="gogoAbout" />
    <language-selector ref="languageSelector" />
  </div>
</template>

<script>

  import GogoAbout from 'components/pages/GogoAbout'
  import LanguageSelector from './LanguageSelector'

  export default {
    name: 'profile-section',
    components: {
      GogoAbout,
      LanguageSelector
    },
    props: {
      options: {
        type: Array,
        default: () => [
          {
            name: 'profile',
            redirectTo: '',
          },
          {
            name: 'logout',
            redirectTo: 'logout'
          }
        ]
      }
    },
    computed: {
      // ===================== Old way =====================
      // menuItems () {
      //   let menuItems = [
      //     // {icon: 'fa-user', name: 'auth.signUp', link: 'signup'},
      //     {icon: 'fa-sign-in', name: 'auth.login', link: 'login'}
      //   ]
      //   if (this.userIsAuthenticated) {
      //     menuItems = [
      //       {icon: 'fa-user', name: 'user.profile', link: 'profile'},
      //       {icon: 'fa-sign-out', name: 'user.logout', link: 'logout'}
      //     ]
      //   }
      //   return menuItems
      // },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userPhotoUrl () {
        if (this.userIsAuthenticated && this.$store.getters.user.photoUrl) {
          return this.$store.getters.user.photoUrl
        }
        return null
      },
      currentUser () {
        return this.$store.getters.user
      }
    },
    methods: {
      showUserProfile () {
        let htmlContent = '<span class="profile-section-avatar-popup-container">' +
            (this.userPhotoUrl ? '<img src="' + this.userPhotoUrl + '"/>' : '<i class="fa fa-user icon-user"></i>') +
            '</span>' +
            '<p class="space-top-bottom provider-name">' + this.currentUser.providerName + '</p>' +

            '<h5 class="name">' + (this.currentUser ? this.currentUser.name : '') + '</h5>' +

            '<p>' + (this.currentUser.email ? this.currentUser.email : '') + '</p>'

        this.$swal({
          html: htmlContent,
          showCloseButton: false,
          showConfirmButton: false,
        })
      },
      showAbout () {
        // console.log('About')
        // console.log(this.$refs)
        this.$refs.gogoAbout.showAboutModal()
      },
      showLanguageSelector () {
        this.$refs.languageSelector.showSelector()
      },
      showFeedbackSender () {
        if (window.Userback) {
          window.Userback.open()
          // ============ Show the feedback popup ============ //
          window.document.querySelector('body > div.userback-button-container > div').click()
        }
      }
    }

  }
</script>

<style lang="scss">
  .profile-dropdown {

    .profile-section-avatar-container {
      display: inline-block;
      width: 36px;
      height: 36px;
      background-color: white;
      border-radius: 50%;
      border: 2px solid $lighter-gray;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }

      .icon-user {
        color: #ddd;
        font-size: 45px;
      }
    }

  }

  .dropdown-menu-content {
    .fa {
      padding-right: 12px;
    }
    .dropdown-item, a {
      color: $dropdown-link-color;

      &:hover, &:active, &:focus, &.active {
        color: $dropdown-link-hover-color !important;
        // color: $dropdown-link-hover-color;
        // background-color: $dropdown-link-hover-bg;
        // border-radius: $dropdown-radius !important;
      }
    }

    .dropdown-item {
      .cc-label {
        position: absolute;
        left: 52px;
      }
    }
  }

  .profile-section-avatar-popup-container {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid $lighter-gray;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
    }

    .icon-user {
      color: #ddd;
      font-size: 105px;
    }
  }

</style>
