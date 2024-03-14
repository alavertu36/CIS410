<template>
    <div>
        <h1>Customer</h1>
        <hr/>
        <h3>{{ firstName }}'s Reviews</h3>
        <br/>
        <table class = "table">
            <thead>
                <!-- Learn to pull Title from the database. -->
                <th>Title</th> 
                <th>Rating</th>
                <th>Summary</th>
            </thead>
            <tbody>
                <tr v-for="thisReview in reviewsByUser" :key="thisReview.ReviewPK">
                    <td>{{ thisReview.Title }}</td>
                    <td>{{ thisReview.Rating }}</td>
                    <td>{{ thisReview.Summary }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            reviewsByUser: null,
            accountError: false
        };
    },
    computed: {

firstName(){
        if (this.$store.state.user) {
            return this.$store.state.user.FirstName;
        }
        else {
            return "";
        }
 },
},
    created() {
        axios.get("/customer/me", {
            headers: {
                Authorization: `Bearer ${this.$store.state.token}`
            }
        })
        .then((theResponse) => {
            //assign this.reviewsByUser to the response.data
            this.reviewsByUser = theResponse.data;
        })
    }
};
</script>
<style></style>