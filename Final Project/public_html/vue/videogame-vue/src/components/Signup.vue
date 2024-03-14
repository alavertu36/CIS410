<template>
    <div>
        <h1>Signup</h1>
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label for="fnameInput" class="form-label">First Name</label>
                <input type="text" class="form-control" id=fnameInput required placeholder="First Name" v-model="firstName">
            </div>
            <div class="mb-3">
                <label for="lnameInput" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lnameInput" required placeholder="Last Name" v-model="lastName">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" required placeholder="Enter email" v-model="email">
                <small v-if="dupEmail" class="text-danger">Please choose a different email</small>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" required placeholder="Password"
                    v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <p id="error-signup" class='text-danger'>{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errorMessage: "",
            dupEmail: false
        }
    },
    methods: {
        onSubmit() {
            console.log("Form submitted");
            const myFormData = {
                nameFirst: this.firstName,
                nameLast: this.lastName,
                email: this.email,
                password: this.password
            };
            //post the object via axios
            axios.post("/customer", myFormData)
                .then((myResponse) => {
                    console.log("Response is ", myResponse);
                    this.$router.replace("/login?signupsuccess=true")
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 409) { //this compares error code with the rockwell-api/index.js. contact.post api that was made previously. 
                        this.dupEmail = true;
                    } //409 error is duplicate acocunt
                    else {
                        this.errorMessage = "General signup error, please try again";
                    }
                });
        }
    }
}
</script>
<style></style>