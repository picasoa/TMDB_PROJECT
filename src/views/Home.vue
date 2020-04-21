<template>
  <div class="home">
    <img alt="Vuelogo" src="../assets/tmdb.png" id="tmdb" />
    <Dashboard msg="Welcome to TMDB with Vue." />
  </div>
</template>

<script>
// @ is an alias to /src
import 	Dashboard from "@/components/Dashboard.vue";

export default {
  name: "Home",
  components: {
    Dashboard
  }
};
</script>

<style>
#tmdb{
	position:relative;
	left: 250px;
}
</style>