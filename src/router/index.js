import Vue from "vue";
import VueRouter from "vue-router";
import Upcome from "../views/Upcome.vue";
import Home from "../views/Home.vue"; 
import Topmovies from "../views/Topmovies.vue"; 

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    name:"Home",
    component:Home
  },
  {
    path:"/Up",
    name:"Upcome",
    component:Upcome
  },
  {
    path:"/top",
    name:"Topmovies",
    component:Topmovies
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
