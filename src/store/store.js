import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        //getDefaultState(),
        userLogged: false,
        users: [{ "username": "admin1", "password" : "heslo1"}, { "username": "admin2", "password" : "heslo2"}, { "username": "admin3", "password" : "heslo3"}],
    },

    mutations: {},
    actions: {},
    modules: {},


});

/*
export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        username: "",
        name: "",
        surname: "",
        readOnly: false,
    },
    mutations: {},
    actions: {},
    modules: {},
});

 */