<template>
    <div>
        <h1>Login</h1>
        <div v-if="this.$route.signupsuccess=true" class="alert alert-success">
            Thanks for signing up. Please log in now.
        </div>
        <form @submit.prevent="onSubmit()">
            <div class = "mb-3">
                <label for="email-input">Email</label>
                <input type = "email" class = "form-control" 
                id ="email-input" required 
                placeholder="Enter Email"
                v-model="email">
            </div>
            <div class = "mb3">
                <label for="password-input">Password</label>
                <input type = "password" class="form-control"
                id="password-input" required placeholder="Password" 
                v-model="password">
            </div>
            <button type ="submit" class="btn btn-primary">Submit</button>
            <p v-if="credentialsError" class="form-text text-danger">Invalid credentials</p>
            <p v-if="loginError" class="form-text text-danger">Error with login, please try again</p>
        </form>
            <!-- next week -->
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: "",
            password: "",
            loginError: false,
            credentialError: false
        }
    },
    methods: {
        onSubmit() {
            const myFormData= {
                email: this.email,
                password: this.password
            };
            axios.post("/customer/login",myFormData)
            .then((myResponse)=>{
                console.log(myResponse);
                this.$store.commit("storeTokenInApp",myResponse.data.token);
                this.$store.commit("storeUserInApp", myResponse.data.user);
                //redirect to main account page
                this.$router.replace("/customer");
            })
            .catch((err)=>{
                console.log(err);
                if(err.response.status==401){
                    this.credentialsError=true;
                }
                else {
                    this.loginError=true;
                }
            });
        }
    }
}
</script>
<style></style>