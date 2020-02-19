<template>
  <div class="profile">

    <div class="row align-items-center">
      <div class="offset-md-3 col-md-6 justify-content-center align-self-center ">
        <!-- <vuestic-widget :headerText="$t('extra.profileCard')" class="profile-card-widget">
          <vuestic-profile-card :name="(currentUser ? currentUser.name:'')" :photoSource="userPhotoUrl">
          </vuestic-profile-card>


          
        </vuestic-widget> -->

          <div class="text-center space-top-bottom">

            <span class=" profile-section-avatar-container">
              <img v-if="userPhotoUrl" :src="userPhotoUrl"/>
              <i v-else class="fa fa-user icon-user"></i>
            </span>
            <p class="space-top-bottom provider-name">{{ currentUser.providerName }}</p>

            <h5 class="name">{{ (currentUser ? currentUser.name:'') }}</h5>

            <p>{{ currentUser.email }}</p>


            <!-- <span v-if="location" class="location"><span class="icon glyphicon glyphicon-map-marker"></span> {{location}}</span>
            <div class="social">
              <a class="icon brandico brandico-facebook-rect"
                v-if="social && social.facebook" :href="'https://' + social.facebook" target="_blank"></a>
              <a class="icon brandico brandico-instagram"
                v-if="social && social.instagram" :href="'https://' + social.instagram" target="_blank"></a>
              <a class="icon brandico brandico-twitter"
                v-if="social && social.twitter" :href="'https://' + social.twitter" target="_blank"></a>
            </div> -->
          </div>
      </div>
    </div>

    <!-- {{ currentUser }} -->


  </div>
</template>

<script>

  export default {
    name: 'profile',
    components: {
    },
    data () {
      return {
        chatMessages: [
          {
            text: 'Hello! So glad you liked my work. Do you want me to shoot you?',
            yours: false
          },
          {
            text: 'Yeah, that would be cool. Maybe this Sunday at 3 pm?',
            yours: true
          },
          {
            text: 'Sounds great! See you later!',
            yours: false
          },
          {
            text: 'Should I bring a lightbox with me?',
            yours: true
          },
          {
            text: 'No, thanks. There is no need. Can we set up a meeting earlier?',
            yours: false
          },
          {
            text: 'I\'m working on Vuestic, so let\'s meet at 3pm. Thanks!',
            yours: true
          }
        ],
      }
    },
    beforeMouted () {
      if (!this.userIsAuthenticated) {
        this.$router.push('/auth/login')
      }
    },
    computed: {
      currentUser () {
        return this.$store.getters.user
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userPhotoUrl () {
        if (this.userIsAuthenticated && this.$store.getters.user.photoUrl) {
          return this.$store.getters.user.photoUrl
        }
        return null
      },
    }
  }
</script>

<style lang="scss" scoped>

  .profile-card-widget, .chat-widget {
    width: 100%;
    .widget-body {
      display: flex;
      justify-content: center;
      align-items: center;
      & > div {
        width: 100%;
      }

      .provider-name {
        color: $gray-light;
      }
    }
  }

  .bottom-widgets {
    > div[class^='col'] {
      & > div {
        width: 100%;
      }
    }
  }

  .profile {
    height: calc(100vh - 120px);
    margin: 0;

    .row {
      position: sticky;
      top: calc(50vh - 100px);
    }
  }

  .profile-section-avatar-container {
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
