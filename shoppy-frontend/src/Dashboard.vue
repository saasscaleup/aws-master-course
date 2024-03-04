<script>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter() // Use useRouter to get the router instance

    const logoutUser = () => {
      console.log('logoutUser')
      authStore.logout()
      router.push('/login')
    }

    return { logoutUser, authStore }
  }
}
</script>

<template>
  <div>
    <div class="d-block px-3 py-2 text-center text-bold skippy" style="background: linear-gradient(to right, #00b09b, #96c93d);">
      <a href="#" class="text-black text-decoration-none"
        >Three-Tier Architecture!</a
      >
    </div>
    <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="nav-item"><router-link class="nav-link px-2 text-white" to="/">Dashboard</router-link></li>
          <li class="nav-item"><router-link class="nav-link px-2 text-white" to="/shopping-list">Shopping list</router-link></li>
        </ul>

        <div class="text-end" v-if="!authStore.isAuthenticated">
          <a href="/login" class="btn btn-outline-light me-2">Login</a>
          <a href="/register" class="btn btn-warning">Register</a>
        </div>
        <div class="text-end" v-else>
          <button type="button" class="btn btn-outline-light me-2" @click="logoutUser">Logout</button>
        </div>
      </div>
    </div>
  </header>
    <!-- Navigation Bar -->
    <!-- Main Content -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
.bd-navbar {
    padding: 0.75rem 0;
    background-color: #7952b3;
}
@media (min-width: 768px) .navbar-expand-md {
    flex-wrap: nowrap;
    justify-content: flex-start;
}
.navbar {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.navbar>.container, .navbar>.container-fluid, .navbar>.container-lg, .navbar>.container-md, .navbar>.container-sm, .navbar>.container-xl, .navbar>.container-xxl {
    display: flex;
    flex-wrap: inherit;
    align-items: center;
    justify-content: space-between;
}
@media (min-width: 768px) .flex-md-nowrap {
    flex-wrap: nowrap !important;
}

.flex-wrap {
    flex-wrap: wrap !important;
}
@media (min-width: 1400px)
.container, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
    max-width: 1320px;
}
.container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
    width: 100%;
    padding-right: var(--bs-gutter-x, 0.75rem);
    padding-left: var(--bs-gutter-x, 0.75rem);
    margin-right: auto;
    margin-left: auto;
}
</style>