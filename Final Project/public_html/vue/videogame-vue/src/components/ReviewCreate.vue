<template>
    <div>
        <div class = "row justify-content-center">
            <div class = "col-log-10">
                <div class = "card">
                    <div class = "card-body">
                        <h4>Create a Review</h4>
                        <form id = "review-form" @submit.prevent="submitReview">
                            <div class = "mb-3">
                                <label for="rating-input" class="form-label">
                                    Rating
                                </label>
                                <input type="number" id="rating-input" class="form-control" required min="1" max="10" v-model="rating">
                            </div>
                            <div class="mb-3">
                                <label for="summary-input" class="form-label">
                                    Summary
                                </label>
                                <input type="text" id="summary-input" class="from-control" required row="3" v-model="summary">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit Review</button>
                            <button type="reset" class="btn btn-outline-danger" v-on:click="cancelReview">Cancel</button>
                            <p class="form-text text-danger" v-if="errorMessage">{{ errorMessage }}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                rating: null,
                summary: "",
                errorMessage: null
            }
        },
        methods: {
            submitReview() {
                const myReview = {
                    rating: this.rating,
                    summary: this.summary,
                    videoGameFK: this.$route.params.pk
                };
                axios.post("/review",myReview,{
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    }
                })
                .then(()=>{
                    this.$router.replace("/customer");
                })
                .catch(()=>{
                    this.errorMessage = "Unable to create review.";
                });
            },
            cancelReview(){
                this.$router.go(-1); //go back 1 route
            }
        }
    };
</script>
<style></style>