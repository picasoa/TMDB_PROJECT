<template>
<div>
		<h1 id="heading">{{msg}}</h1>
	<div>
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
		<div  @click="newReqst" class="footer-btn">LOAD MORE </div>
		
</div>
</template>

<script>

import axios from "axios";
export default{
			name: "Dashboard",
			props: { msg:String },
		
		data()
		   {
			return {
		      movieList:[],
		      pageNumber:1,
		      posters:[],
		      loader:false,
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
            
             axios.get("https://api.themoviedb.org/3/movie/popular?api_key=b07047d6534d39a6838e3c3828716add&language=en-US&page="+this.pageNumber++)
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
            axios.get("https://api.themoviedb.org/3/movie/popular?api_key=b07047d6534d39a6838e3c3828716add&language=en-US&region=in")
            .then( response => {
             for(var y in response.data.results) 
                  {
                    this.movieList.unshift(response.data.results[y])
                   }
                   this.createPosters(response.data.results) } )
  
          }
}
</script>
<style>

body
{
	margin:0;
}

.poster__text
{
	max-lines: 5;
}

.home{
	background:
	url("../assets/interstellar.jpg" )
	 top center / 1350px  750px
     no-repeat    
     fixed                      
     padding-box             
     content-box;
     background-color:rgba(0,0,0,0.5);  
     box-shadow:inset 5px 5px 200px rgba(0,0,0,1);
     padding: 1em;
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
	text-align:left;
	position:relative;
}

div > img {

width: 280px;
heigt: 320px;
	
}

.info-div{
	position:absolute;
	display: block;
	width: 280px;
	height: 300px;
	color: white;
	z-index: 3;
	overflow: hidden;
	bottom: 8px;
	opacity: 0.0;
	backgound:transparent;
	padding: 0.5em;
	
}

.info-div:hover{
				transition: 0.5s;
			opacity: 1;
			backgound: rgba(0,0,0);
			box-shadow:inset 10px 10px 300px rgba(0,0,0,1);
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

.footer-btn{
		  border-radius:20px 20px 20px 20px ;
  		content-align:center;
  		width: 250px;
  		height:50px;
  		padding:0.5em;
  		font-size: 1.2em;
  		background: rgb(72,205,184);
  		margin: auto;
  		margin-bottom:1em;
		background: linear-gradient(90deg, rgba(72,205,184,1) 0%, rgba(97,232,115,1) 50%, rgba(215,212,90,1) 100%);
  }

 .poster__text{
 	overflow: hidden;
		display: -webkit-box;
	   -webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
 }

 div > h3{
  margin: 0.5em
 }

</style>