<template>
    <div class="nav">
        <h5>Hello {{user.firstname}} {{user.lastname}}!
            <button @click="logout">Log Out</button>
        </h5>
        <h2>My Notes:</h2>
        <hr>
        <div v-for="note in notes" :key="note.id">
            <h5>{{note.title}}</h5>
            <small>
                {{note.create_time | formatDate}}
            </small>
            <pre>
                {{note.content}}
            </pre>

            <hr>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment'

    export default {
        name: 'Notes',
        data: function () {
            return {
                notes: []
            }
        },
        mounted() {
            axios.get('http://localhost:3000/users/' + this.user.id + '/notes', {
                headers: {
                    authorization: 'Bearer ' + this.user.accessToken
                }
            })
                .then((response) => {
                    this.notes = response.data;
                })
                .catch(() => {
                    this.logout()
                })
        },
        computed: {
            user: function () {
                return this.$store.getters.getCurrentUser
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('setCurrentUser', null);
                this.$router.push({name: 'login'});
            }
        },
        filters: {
            formatDate: function (value) {
                return moment(value).format('LLLL');
            }
        }
    }
</script>

<style scoped>
</style>
