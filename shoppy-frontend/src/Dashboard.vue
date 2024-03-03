<script>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useAuthStore } from '@/stores/auth';


export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); // Use useRouter to get the router instance

    const logoutUser = () => {
      console.log('logoutUser')
      authStore.logout();
      router.push('/login');
    };

    return { logoutUser };
  }
}

</script>


<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">VueShop</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/expenses">Expenses</router-link>
            </li>
          </ul>
          <button class="btn btn-outline-success" @click="logoutUser">Logout</button>
        </div>
      </div>
    </nav>
    <!-- Main Content -->
    <main>
      <router-view/>
    </main>
  </div>
</template>