<script>
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const authStore = useAuthStore()
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
    <div
      class="d-block px-3 py-2 text-center text-bold skippy"
      style="background: linear-gradient(to right, #00b09b, #96c93d)"
    >
      <a href="#" class="text-black text-decoration-none">Monolithic Architecture!</a>
    </div>
    <nav
      class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark"
      aria-label="Main navigation"
      v-if="authStore.isAuthenticated"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img src="/src/shoppy.png" alt="Logo" class="" style="height: 35px" />
        </a>
        <button
          class="navbar-toggler p-0 border-0"
          type="button"
          id="navbarSideCollapse"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: $route.path === '/' }"
                aria-current="page"
                href="/"
                >Dashboard</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: $route.path === '/shopping-list' }"
                href="/shopping-list"
                >Shopping List</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: $route.path === '/about' }" href="/about"
                >About</a
              >
            </li>
          </ul>
          <!--div class="text-end col-md-4 offset-md-8" v-if="!authStore.isAuthenticated">
            <a href="/login" class="btn btn-outline-light me-2">Login</a>
            <a href="/register" class="btn btn-outline-light">Register</a>
          </div-->
          <div class="text-end">
            <button type="button" class="btn btn-outline-light me-2" @click="logoutUser">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
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

.navbar > .container,
.navbar > .container-fluid,
.navbar > .container-lg,
.navbar > .container-md,
.navbar > .container-sm,
.navbar > .container-xl,
.navbar > .container-xxl {
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
@media (min-width: 1400px) .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
  max-width: 1320px;
}
.container,
.container-fluid,
.container-lg,
.container-md,
.container-sm,
.container-xl,
.container-xxl {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}
html,
body {
  overflow-x: hidden; /* Prevent scroll on narrow devices */
}

/* body {
  padding-top: 56px;
} */

@media (max-width: 991.98px) {
  .offcanvas-collapse {
    position: fixed;
    top: 56px; /* Height of navbar */
    bottom: 0;
    left: 100%;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    visibility: hidden;
    background-color: #343a40;
    transition:
      transform 0.3s ease-in-out,
      visibility 0.3s ease-in-out;
  }
  .offcanvas-collapse.open {
    visibility: visible;
    transform: translateX(-100%);
  }
  .skippy {
    display: none !important;
  }
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.nav-underline .nav-link {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.nav-underline .nav-link:hover {
  color: #007bff;
}

.nav-underline .active {
  font-weight: 500;
  color: #343a40;
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.5);
}

.bg-purple {
  background-color: #6f42c1;
}
</style>
