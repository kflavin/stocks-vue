<template>
  <v-app>
    <main>
      <v-card class="grey lighten-4 elevation-10">
          <v-card-text>
            <v-container>
              <h5>Register</h5>
              <v-layout>
                <v-flex xs4>
                  <v-subheader>Email</v-subheader>
                </v-flex>
                <v-flex xs4>
                  <v-text-field
                    name="Email"
                    label="Enter your email address"
                    id="Email"
                    v-model="user.email"
                    @keyup.native.enter="register"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
              <v-flex xs4>
                <v-subheader>Password</v-subheader>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  name="password"
                  label="Enter your password"
                  v-model="user.password"
                  @keyup.native.enter="register"
                  type="password"
                ></v-text-field>
              </v-flex>
            </v-layout>
              <v-layout row>
              <v-flex xs4 offset-xs4>
                <v-text-field
                  name="password2"
                  label="Enter your password (again)"
                  v-model="password2"
                  @keyup.native.enter="register"
                  type="password"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
            <v-flex xs4 offset-xs4>
              <v-btn v-on:keyup.enter.native="register" @click.native="register" dark raised>Register!</v-btn>
              <p class="text-center">
                If you already have an account, <router-link to="/auth/login">sign in</router-link>.
              </p>
            </v-flex>
          </v-layout>
            </v-container>
          </v-card-text>
      </v-card>
  </main>
  </v-app>



</template>

<script>

  export default {
    name: "register",
    data: function() {
      return {
        user: {
          email: "",
          password: ""
        },
        password2: ""
      }
    },
    methods: {
        register: function() {
          var validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

          // Password must be between 6 and 20 characters, with one digit, one uppercase letter, and one lowercase letter.
//          var validPasswordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;

          if (!this.user.email.match(validEmailFormat)) {
            alertify.error("Invalid email address!");
            return;
          }

          if (this.user.password !== this.password2) {
            alertify.error("Passwords do not match!");
            return;
          }

//          if (!this.user.email.match(validPasswordFormat)) {
//            alertify.error("Password must contain between 6 and 20 characters, one digit, one uppercase letter, and one lowercase letter.");
//            return;
//          }

          this.$http.post("/auth/register", this.user)
            .then(function(res) {
                // send a success message, then redirect to the login page
                alertify.success("You have registered.  Please check your email address for confirmation.");
                this.$router.push('/auth/login');

            }); // catch block is handled in main.js as an interceptor
        }
    }
  }
</script>

<style>
</style>
