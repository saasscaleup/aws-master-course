<script setupe>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'; // Import useRouter
import Toastify from 'toastify-js'

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter(); // Use useRouter to get the router instance
    const authStore = useAuthStore();
    const errorMessage = ref('') // Reactive property for registration error messages

    const login = async () => {
      try {
        // Ensure you're accessing .value for reactive references
        await authStore.login({ email: email.value, password: password.value });
        if (authStore.isAuthenticated) {
          // Redirect or perform actions after successful login
          router.push('/');
        }
      } catch (error) {
          // Check if the error is from an Axios response
          if (error.response.data) {
            errorMessage.value = error.response.data
          } else {
            errorMessage.value = 'An error occurred during sign in.'
          }

          Toastify({
            text: errorMessage.value,
            gravity: 'bottom',
            position: 'right',
            close: true,
            duration: 3000,
            style: {
              background: 'linear-gradient(to right, #ff5959, #ff0000)'
            }
          }).showToast()
        }
    };

    // Correctly return all reactive properties and methods used in the template
    return { email, password, login };
  },
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center align-items-center" style="height: 80vh">
      <div class="col-md-4">
        <div class="text-center mb-4">
          <img src="../../assets/shoppy.png" alt="Logo" class="mb-4" style="height: 50px" />
          <!-- Replace logo.png with your actual logo path -->
          <h1>Please sign in</h1>
        </div>

        <form @submit.prevent="login" class="card p-4 bg-light">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="Email address"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">Sign in</button>
          </div>
          <a href="/register" class="text-center text-muted mt-3">Or Sign-Up</a>
        </form>

        <p class="text-center text-muted mt-3">Scale-Up Saas(DBC) &copy; 2024</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control:focus {
  box-shadow: none;
}

.btn-primary {
  background: linear-gradient(
    to right,
    #0038b0,
    #a91ff8
  ); /* Use color from your image or Bootstrap primary color */
  border: none;
}

.form-label {
  font-weight: bold;
}

.card {
  border: none;
  border-radius: 10px; /* Optional: for rounded corners */
}

/* If you want to add additional custom styles, you can add them here */
</style>
