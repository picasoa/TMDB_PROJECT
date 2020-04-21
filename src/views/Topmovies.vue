<template>

  <div class="home">
    <div class="poster"></div>
    <img alt="Vue logo" src="../assets/tmdb.png" id="tmdb" />
    <Topmovies msg="Top Movies" />
  </div>
</template>
<script>
// @ is an alias to /src
import Topmovies from "@/components/Topmovies.vue";

export default{
  name:"Tomovies",
  components:{
    Topmovies
  }
 }
</script>
<style>
img{
	height: 300px;
	width: 300px;
}
#tmdb{
  position:relative;
  left: 250px;
}
</style>