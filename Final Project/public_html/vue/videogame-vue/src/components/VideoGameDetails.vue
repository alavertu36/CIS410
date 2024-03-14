<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h2 class="text-primary">{{ videoGames.Title }}</h2>
                <br />
                <p>Cost <br /><strong>{{ videoGames.Cost }}</strong></p>
                
                <p>Genre <br /><strong>{{ videoGames.GenreType }}</strong></p> 
            </div>
        </div>
        <br />
        <router-link v-if="auth" :to="`/videogames/${this.$route.params.pk}/review`">
            <button class="btn btn-success">Add a Review</button>
        </router-link>
        <router-link v-else :to="`/login`">
            <button class="btn btn-outline-success">Login to Add a Review</button>
        </router-link>
        <br /><br />
        <router-view />
    </div>
</template>
<script>
export default {
    computed: {
        videoGames(){
            let allVideoGames = this.$store.state.videoGames;
            let thisVideoGame = allVideoGames.find((aVideoGame)=>{
                            return aVideoGame.VideoGamePK == this.$route.params.pk;
            });
            return thisVideoGame;
        }, //end videoGames
        auth(){
            return this.$store.state.token;
         } //end auth
    }//end computed
}; //end export default
</script>
<style></style>