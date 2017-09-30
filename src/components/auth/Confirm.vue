<template>
  <v-app>
    <main>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: "confirm",
    created: function() {
      var id = this.$route.params.id;
      console.log(`Your query token is ${this.$route.query.code}`);

      var url = `${process.env.API}${process.env.CONFIRM_REG}/${id}?code=${this.$route.query.code}`;
      console.log("Getting URL " + url);
      this.$http.get(url).then(function(res) {
        console.log(res);
      });

      this.$router.push('/auth/login');
      alertify.success("Registration confirmed!  Please login.");
    }
  }
</script>

<style>

</style>
