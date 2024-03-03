import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useAuthStore } from '@/stores/auth';

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ExpenseView from '../views/ExpenseView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: ExpenseView,
      meta: { requiresAuth: true } // Indicates this route requires authentication
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: ExpenseView,
      meta: { requiresAuth: true } // Indicates this route requires authentication
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true } // Indicates this route requires authentication
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});


export default router
