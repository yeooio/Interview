import { createRouter, createWebHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
// import Login from '../views/Login.vue';
// import Home from '../views/Home.vue';
const Login = () => import('../views/Login.vue');
const Home = () => import('../views/Home.vue');
// const Prepare1 = ()=>import("../views/Prepare1.vue")
const Prepare1 =()=>import('../views/Prepare1.vue')
const Prepare2 =()=>import('../views/Prepare2.vue')
const Interview =()=>import('../views/Interview.vue')


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/interview',
        name: 'Interview',
        component: Interview
    },
    {
        path: '/Prepare1',
        name: 'Prepare1',
        component: Prepare1
    },
    {
        path: '/Prepare2',
        name: 'Prepare2',
        component: Prepare2
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;