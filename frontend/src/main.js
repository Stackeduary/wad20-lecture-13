import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Login from './components/Login'
import Notes from './components/Notes'

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentUser: null
    },
    mutations: {
        setCurrentUser: (state, user) => {
            state.currentUser = user;
        }
    },
    actions: {
        setCurrentUser: (state, user) => {
            state.commit('setCurrentUser', user)
        }
    },
    getters: {
        getCurrentUser: (state) => state.currentUser,
    }
});

const routes = [
    {path: '/', name: 'notes', component: Notes, meta: {requiresAuth: true}},
    {path: '/login', name: 'login', component: Login},
];

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.getCurrentUser) {
            next({name: 'login'});
            return;
        }
    }
    next();
});



Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
