<template>
  <div>
  <div class="poster"></div>
    <h1 id="heading">{{ msg }}</h1>
      <div id=top>
      <ul>
          <li v-for="(movie,index) in movieList" :key="index">
              <div class="movie-container">
                  <img :src="posters[index]" />
                  <div class="info-div">
                      <h3 class="poster__title">{{movie.title}}</h3>
                      <p class="poster__text">{{movie.overview}}</p>
                      <p class="rating">{{movie.vote_average}}/10</p>
                      <p class="date">{{movie.release_date}}</p>
                  </div>
              </div>
              </li>
         </ul>
      </div>
       <div v-if="loader" id="loader"></div>
    <div  @click="newReqst" class="footer-btn" href="#heading">LOAD MORE </div>
</div>
</template>


<script>
import axios from "axios";
export default {
  name: "Topmovies",
  props: {
    msg: String
  },
  data(){
  	return {
  		movieList:[],
      posters:[],
      loader:false,
      pageNumber:1,
  	}
  },
  methods:{
      createPosters(list)
    {
      console.log(list);
      for(var x in list)
      {

        this.posters.unshift("https://image.tmdb.org/t/p/w500"+list[x].poster_path);
      }
      console.log(this.posters);

    },
       newReqst(){
       console.log("started")
      this.loader =true;
      axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=b07047d6534d39a6838e3c3828716add&language=en-US&page="+this.pageNumber++)
      .then( (response) => { 
                    console.log("GOT RESPONSE");
                    console.log(response.data.results);
                    this.createPosters(response.data.results);
                    for(var x in response.data.results)
                    {
                      this.movieList.unshift(response.data.results[x]);
                    }
                    console.log(this.movieList);
                    this.loader=false 
                    })
      console.log(this.pageNumber);     
    }
  },
  mounted(){
 			
 			axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=b07047d6534d39a6838e3c3828716add&language=en-US&region=in")
 			.then( response => {for(var y in response.data.results) 
                            {
                              this.movieList.unshift(response.data.results[y])
                            }
                            this.createPosters(response.data.results) } )
  
  }

};
</script>
<style>
*,
*:before,
*:after {
  box-sizing: border-box;
}
.movie-container{
  border-radius: 50px;
}

html {
  font-size: 18px;
}

body {
  font-family: "Roboto", sans-serif;
  font-size: 1em;
  line-height: 1.6;
  background: #eee;
  box-shadow:inset 0px 0px 85px rgba(0,0,0,1);

}

.container {
  display: block;
  width: 375px;
  height: 677px;
  background: #ffffff;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  padding: 70px 30px 0;
}

.poster {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 0 10px 0 rgba(0, 0, 0, 0.2);
  &__img {
    height: 200px;
    background: url('http://cdn1-www.comingsoon.net/assets/uploads/gallery/angry-birds-1412173620/angrybirdsmovie0004.jpg');
    background-position: center;
    background-size: cover;
    width: 100%;
  }
  &__info {
    background: #fff;
    padding: 25px 25px 40px;
  }
  &__title {
    font-size: 1.2em;
    font-weight: 300;
    margin-bottom: .4em;
  }
  &__text {
    font-size: .9em;
    color: #999;
    font-weight: 300;
  }
}

a {
  display: block;
  width: 250px;
  background: #27ae60;
  text-align: center;
  margin: 30px auto;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: .15em;
  text-decoration: none;
  font-size: .9em;
  font-weight: 300;
  background: linear-gradient(90deg, #2ecc71, #27ae60);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.10), 0 1px 2px rgba(0, 0, 0, 0.18);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.10), 0 8px 8px rgba(0, 0, 0, 0.18);
  }
}
#heading {
  font-size: 72px;
  background: -webkit-linear-gradient(0deg, rgba(60,185,177,0.938813025210084) 65%, rgba(254,255,0,0.4822303921568627) 90%);;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#loader{
    border:10px solid;
    border-color: rgb(87,196,188) rgb(87,196,188)  transparent;
    height: 100px;
    width: 100px;
    margin: auto;
    border-radius: 50px;
    animation: spin 1s linear infinite;
    position:fixed;
    left:0%;
    right:0%;
    bottom:0%;
    top:0%;
    z-index:10000;
   }
   @keyframes spin{
   100%
   {
    transform:rotate(360deg);
   }
   }
 
  .footer-btn:hover {
  cursor:pointer;
  text-shadow: 0px 0px 10px rgba(0,0,0,1);
  }

 #poster_text{
  line-clamp: 3;
 overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
 }
 div > h3,p{
  margin: 0.5em
 }

</style>