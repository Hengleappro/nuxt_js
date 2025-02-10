import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue'; // Adjust the path as necessary
import Signup from '@/pages/Signup.vue'; // Adjust the path as necessary

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;