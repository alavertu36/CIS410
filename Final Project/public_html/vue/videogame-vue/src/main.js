import { createApp } from 'vue'
import App from './App.vue'
import myRouter from './routes.js';
import axios from 'axios';
import theStore from './store.js';

axios.defaults.baseURL="http://localhost:6060"
// axios.defaults.baseURL = "https://cisweb.biz.colostate.edu/cis410/Team103/video_games"

const myApp = createApp(App);
myApp.use(myRouter);
myApp.use(theStore);
myApp.mount("#app");
