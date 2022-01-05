import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Todos from '@/views/Todos';
import Host from '@/views/Host';
import index from '@/views/Login'
import jsonData from '@/views/jsonData';

Vue.use(VueRouter)

const routes = [
    {path:"/Login", component: Login},
    {path:"/Todos", component: Todos},
    {path:"/Host", component: Host},
    {path:"/jsonData", component: jsonData},
    {path:"/", component: index}

];

const router = new VueRouter({
    routes,
});

export default router;

