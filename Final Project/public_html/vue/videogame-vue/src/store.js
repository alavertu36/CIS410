import { createStore } from 'vuex';
import axios from 'axios';
import myRoutes from './routes.js';

export default createStore({
    state: {
        token: null,
        user: null,
        videoGames: [],
    },

    mutations: {
        storeTokenInApp(state, myToken) {
            state.token = myToken;
        },
        storeUserInApp(state, theUser) {
            state.user = theUser;
        },
        storeVideoGames(state, videogames) {
            state.videoGames = videogames;
        },
        clearAuthData(state) {
            state.token=null;
            state.user=null;
        },
        storeReviews(state, reviews) {
            state.reviews = reviews;
        }
    },

    actions: {
        getVideoGames({ commit }) {
            axios.get("/videogame")
                .then((aResponse) => {
                    commit("storeVideoGames", aResponse.data);
                });
        },
        getReviews({ commit }) {
            axios.get("/review")
                .then((anotherResponse) => {
                    commit("storeReviews", anotherResponse.data)
                })
        },
        logout({commit, state}) {
            axios.post("/customer/logout", null, {
                headers: {Authorization: `Bearer ${state.token}`}
            })
            .then(() => {
                commit("clearAuthData");
                myRoutes.replace('/');
            })
            .catch(() => {
                console.log("error in logout");
            });
        }
    },
});