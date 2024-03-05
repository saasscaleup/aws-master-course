import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useAuthStore } from '@/stores/auth';

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ShoppingListView from '../views/ShoppingListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { requiresAuth: false } // Indicates this route requires authentication
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      meta: { requiresAuth: false } // Indicates this route requires authentication
    },
    {
      path: '/',
      name: 'Dashboard',
      component: ShoppingListView,
      meta: { requiresAuth: true } // Indicates this route requires authentication
    },
    {
      path: '/shopping-list',
      name: 'Shopping List',
      component: ShoppingListView,
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
  } else if (to.matched.some(record => !record.meta.requiresAuth) && authStore.isAuthenticated){
    next('/');
  }else{
    next();
  }
});


export default router
