<template>
  <div class="container">
    <div class="content">
      <h1>Fibonacci Calculation</h1>
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">{{ error }}</p>
      <p v-else>Fibonacci number at position {{ n }} is {{ result }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const result = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const n = ref(parseInt(route.params.n, 10));

    const calculateFibonacci = () => {
      loading.value = true;
      error.value = null;
      const number = parseInt(route.params.n, 10);
      if (isNaN(number) || number < 0) {
        error.value = 'Invalid input. Please provide a non-negative integer.';
        loading.value = false;
        return;
      }
      try {
        result.value = fibonacci(number);
      } catch (err) {
        error.value = 'Error calculating Fibonacci number';
      } finally {
        loading.value = false;
      }
    };

    const fibonacci = (n) => {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    onMounted(() => {
      calculateFibonacci();
    });

    watch(() => route.params.n, () => {
      n.value = parseInt(route.params.n, 10);
      calculateFibonacci();
    });

    return {
      result,
      loading,
      error,
      n
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

p {
  font-size: 18px;
  color: #555;
}

p.error {
  color: red;
}
</style>