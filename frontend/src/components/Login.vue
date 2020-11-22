<template>
    <div class="login">
        <div>
            <input type="email" v-model="email" placeholder="Email">
        </div>
        <div>
            <input type="password" v-model="password" placeholder="Password">
        </div>
        <div>
            <button @click="login">Log In</button>
        </div>
        <div class="error" v-if="error">
            {{error}}
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Login',
        data: function() {
            return {
                email: null,
                password: null,
                error: null,
            }
        },
        methods: {
            login: function() {
                let data = {
                    email: this.email,
                    password: this.password
                };
                this.error = null;
                // let that = this;
                axios.post('http://localhost:3000/users/login', data)
                    .then((response) => {
                        this.$store.dispatch('setCurrentUser', response.data);
                        this.$router.push({name: 'notes'})
                    })
                    .catch((error) => {
                        this.error = error.response.data.message
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
