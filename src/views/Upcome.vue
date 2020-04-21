<template>
  <div class="home">
    <img alt="Vue logo"  id="tmdb" src="../assets/tmdb.png" />
    <Upcoming msg="UpcomingMovies" />
  </div>
</template>
<script>
// @ is an alias to /src
import Upcoming from "@/components/Upcoming.vue";

export default{
  name:"Upcome",
  components:{
    Upcoming
  }
 };
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