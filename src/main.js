import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import Vuex from 'vuex';
import {mapState, mapMutations} from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
    state: {
        token: '',
        users: {},
        is_Active: ""
    },
    mutations: {
        login(state, payload) {
            state.token = payload.token
        },
        setUsers(state, payload) {
            state.users = payload
        },
        activePopUp(state) {
            state.is_Active = "is-active"
        },
        deActivePopUp(state) {
            state.is_Active = ""
        }
    },
    actions: {
        users(context, payload) {
            context.commit('setUsers', payload);
        }
    }
});

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {path: '/', name: 'login', component: Login},
        {path: '/home', name: 'home', component: Home},
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path !== '/') {
        let isAuthenticated = localStorage.getItem('token') || null;
        if (!isAuthenticated) next('/');
        else next()
    } else {
        next()
    }
});

new Vue({
    router,
    store,
    computed: mapState([
        'token',
        'is_Active',
        'users'
    ]),
    methods: mapMutations([
        'login',
        'activePopUp',
        'deActivePopUp',
        'setUsers'
    ]),
    render: h => h(App)
}).$mount('#app');
