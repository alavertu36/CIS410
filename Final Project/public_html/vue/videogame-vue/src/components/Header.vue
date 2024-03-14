<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Home</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-if="auth">
                        <router-link class="nav-link active" aria-current="page" to="/customer">Customer</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/videogame">VideoGame</router-link>
                    </li>
                    <li class="nav-item" v-if="!auth">
                        <router-link class="nav-link active" aria-current="page" to="/login">
                            <button class="btn btn-warning">Login</button>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="!auth">
                        <router-link class="nav-link active" aria-current="page" to="/signup">
                            <button class="btn btn-outline-warning text-dark">Signup</button>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="auth">
                        <button class="btn btn-warning" @click="onLogout">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    computed: {
        auth() {
            return this.$store.state.token;
        }
    },
    methods: {
        onLogout() {
            this.$store.dispatch('logout');
        }
    }
}
</script>
<style scoped>
    .navbar-nav {
        align-items: center;
    }
</style>