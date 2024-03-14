import {createRouter, createWebHistory} from "vue-router";
import myStore from "./store.js";

//remaining components
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import VideoGame from "./components/VideoGame.vue";
import VideoGameDetails from "./components/VideoGameDetails.vue";
import ReviewCreate from "./components/ReviewCreate.vue";
import Signup from "./components/Signup.vue";
import Customer from "./components/Customer.vue";
import NotFound from "./components/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Home},
        {path: "/customer", component: Customer, beforeEnter(to,from,next){
            if(myStore.state.token){
                next(); //allow the user to proceed where they were going 
                //i.e., the account route
            }
            else {
                next("/login"); //redirect user to login page
            }
        }},
        {path: "/login", component: Login},
        {path: "/videogame", component: VideoGame},
        {path: "/videogames/:pk", component: VideoGameDetails,
            children: [{path: "review", component:ReviewCreate}]},
        {path: "/signup", component: Signup},
        {path: "/:invalidroute(.*)", component: NotFound}
    ]
});
export default router;