import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
});

// Autenticacao de rotas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');

    if (!token) {
      next('/login');
    } else {

      axios.post('http://localhost:3000/validate-token', { token })
        .then(response => {
          if (response.data.error == false) {
            next(); 
          } else {
            next('/login'); 
          }
        });
    }
  } else {
    next();
  }
});

export default router;
