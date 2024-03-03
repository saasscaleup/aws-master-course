<script setupe>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter(); // Use useRouter to get the router instance
    const authStore = useAuthStore();

    const login = async () => {
      // Ensure you're accessing .value for reactive references
      await authStore.login({ email: email.value, password: password.value });
      if (authStore.isAuthenticated) {
        // Redirect or perform actions after successful login
        router.push('/');
      }
    };

    // Correctly return all reactive properties and methods used in the template
    return { email, password, login };
  },
};
</script>


<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="login">

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="text" class="form-control" id="email" v-model="email" placeholder="Enter your email">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


