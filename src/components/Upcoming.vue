<template>
  <div>
    <h1 id="heading">{{ msg }}</h1>
      <div class="movie-list">
      <ul>
          <li v-for="(movie,index) in movieList" :key="index">
              <div class="movie-container">
                  <img :src="posters[index]" />
                  <div class="info-div">
                  <h3 class="poster__title">{{movie.title}}</h3>
                  <p class="poster__text">{{movie.overview}}</p>
                  <p class="rating">{{movie.vote_average}}/10<span>_IMDB*</span></p>
                      <p class="date"><span>In screen on :</span>{{movie.release_date}}</p>
                  </div>
              </div>
              </li>
         </ul>
      </div>
      <div v-if="loader" id="loader"></div>
    <div  @click="newReqst" class="footer-btn">LOAD MORE </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "Upcoming",
  props: {
    msg: String
  },
  data(){
    return {
      movieList:[],
      posters:[],
      pageNumber:1,
      loader:false
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
      axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=b07047d6534d39a6838e3c3828716add&language=en-US&page="+this.pageNumber++)
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
        axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=b07047d6534d39a6838e3c3828716add&language=en-US&region=in")
      .then( response => {for(var y in response.data.results) 
                            {
                              this.movieList.unshift(response.data.results[y])
                            }
                            this.createPosters(response.data.results) } )
  
  }

};
</script>

<style>
.home{
  background:url("../assets/tmdb.png" );
}
ul{
  list-style-type:none;
  width:100%;
  display:flex;
  flex-flow: row wrap;
  justify-content: space-around;
  padding-left:0;
}
ul li {
  width: 300px;
  display:inline;
}
.movie-container{
  width: auto;
  min-width: 250px;
  box-sizing:content-box;
  text-align:center;
  backgound:
}
div > img {
width: 250px;

  
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

 #poster_text{
  line-clamp: 3;
 overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
 } 


 div > h3{
  margin: 0.5em
 }

</style>