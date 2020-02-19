<template>
  <div class="social-login">

      <!-- <div class="row">
          <div class="text-xs-center">
            <button class="btn btn-danger" :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">
              <i class="fa fa-google"></i> Login  with Google
            </button>
          </div>
      </div> -->
      <div class="row justify-content-center d-lg-none">
        <router-link class='link' :to="{name: 'gogoboard'}"><img src="static/favicon_256.png" width="120" height="120"/></router-link>
      </div>
      <div class="row">

          <div class="">
            <button class="btn-login btn-google" :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">
              <img class="" src="static/site-img/mini_google_logo.png" />
              <span class="">Login with Google</span>
            </button>

          </div>
      </div>
      <div class="row">
          <div class="">
            <button class="btn-login" :disabled="loading" :loading="loading" @click.prevent="onSigninFacebook">
              <img class="" src="static/site-img/mini_facebook_logo.png" />
              <span class="">Login with Facebook</span>
            </button>
          </div>
          
          <!-- <div class="text-xs-center">
            <v-btn round color="warning" dark :disabled="loading" :loading="loading" @click.prevent="onResetPassword">Reset Password By Email
              <v-icon right dark>email</v-icon>
              <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </div> -->
        </div>

  </div>
</template>

<script>
  export default {
    name: 'social-login',
    data () {
      return {
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/profile')
        }
      }
    },
    methods: {
      onSigninGoogle () {
        this.$store.dispatch('signUserInGoogle')
      },
      onSigninFacebook () {
        this.$store.dispatch('signUserInFacebook')
      },
      onSigninGithub () {
        this.$store.dispatch('signUserInGithub')
      },
      onSigninTwitter () {
        this.$store.dispatch('signUserInTwitter')
      },
      onResetPassword () {
        if (this.email === '') {
          return this.$store.dispatch('setError', {message: 'Email can not be blnak'})
        }
        this.$store.dispatch('resetPasswordWithEmail', {email: this.email})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style lang="scss">
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }
  }

  .social-login {
    padding-top: 20px;
    padding-bottom: 20px;
  }

.btn-login:not(:disabled):not(.disabled) {
    cursor: pointer;
}

  .btn-login {
    text-align: left;
    width: 210px;
    border-radius: 8px;
    color: #fff;
    background-color: #4266b2;
    border: 0px;
    margin: 5px;
    
    span {
      position: relative;
      line-height: 48px;
      left: 15px;
    }

    i {
      font-size: 28px;
      top: 5px;
      position: relative;
      padding-left: 10px;
    }

    img {
      width: 28px;
      height: 28px;
      position: relative;
      top: -2px;
      left: 4px;
    }
  }

  .btn-google {
    color: #7d8181;
    background-color: #ffffff;
    font-weight: 600;
  }
</style>
