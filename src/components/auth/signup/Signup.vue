<template>
  <div class="signup">
    <center class="row justify-content-center d-none d-lg-block">
      <router-link class='link' :to="{name: 'gogoboard'}"><img src="static/Logo-Remote-Lab.png" width="120" height="120"/></router-link>
    </center>
    <h2>{{'auth.createNewAccount' | translate}}</h2>
    <form @submit.prevent="onSignup">
      <div class="form-group with-icon-left">
          <div class="input-group">
              <input type="email" id="email" required="required" v-model="email"/>
              <i class="fa fa-envelope icon-left input-icon"></i>
              <!-- <i class="bar"></i> -->
              <label class="control-label" for="email">{{'auth.email' | translate}}</label><i class="bar"></i>
          </div>
      </div>

      <div class="form-group with-icon-left">
          <div class="input-group">
              <input type="password" id="password" required="required" v-model="password"/>
              <i class="fa fa-lock icon-left input-icon"></i>
              <!-- <i class="bar"></i> -->
              <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
          </div>
      </div>

      <vuestic-alert type="warning" @dismissed="onDismissed" v-if="error" :withCloseBtn="true">
        {{ (error? error.message : '') }}
      </vuestic-alert>
      <!-- <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" required="required"/>
          <label class="control-label" for="email">{{'auth.email' | translate}}</label><i class="bar"></i>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" required="required"/>
          <label class="control-label" for="password">{{'auth.password' | translate}}</label><i class="bar"></i>
        </div>
      </div> -->
      <!-- <vuestic-checkbox
        :id="'checkbox1'"
        v-model="checkboxOneModel">
        <template slot="label">{{'auth.agree' | translate}}
          <router-link to="">{{'auth.termsOfUse' | translate}}</router-link>
        </template>
      </vuestic-checkbox> -->
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
        <button class="btn btn-primary" type="submit">
          {{'auth.signUp' | translate}}
        </button>
        <router-link class='link' :to="{name: 'login'}">{{'auth.alreadyJoined' | translate}}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'signup',
    data () {
      return {
        checkboxOneModel: true,
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
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
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style lang="scss">
  .signup {
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
      margin-top: 2.6875rem;
    }
  }
</style>
