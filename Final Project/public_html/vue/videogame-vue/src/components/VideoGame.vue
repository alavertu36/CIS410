<template>
    <div>
        <h1>Video Games</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>VideoGame PK</th>
                    <th>Title</th>
                    <th>Cost</th>
                    <th>Genre</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="aVideoGame in theVideoGames" :key="aVideoGame.VideoGamePK">
                    <td>{{ aVideoGame.VideoGamePK }}</td>
                    <td>{{ aVideoGame.Title }}</td>
                    <td>{{ aVideoGame.Cost }}</td>
                    <td>{{ aVideoGame.GenreType }}</td>
                    <td>
                        <router-link :to="`/videogames/${aVideoGame.VideoGamePK}`">
                            <button class="btn btn-primary">Details</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

export default {
    computed: {
        theVideoGames() {
            return this.$store.state.videoGames;
        }
    }
};

</script>
<style></style>