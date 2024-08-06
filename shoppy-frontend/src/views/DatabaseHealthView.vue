<template>
    <div class="container">
      <div class="content">
        <h1>Database Health</h1>
        <p v-if="loading">Loading...</p>
        <p :class="{'error': error}" v-else-if="error"> {{ error }}</p>
        <p :class="{'success': result}" v-else>{{ result}}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  export default {
    setup() {
      const route = useRoute()
      const result = ref(null)
      const loading = ref(true)
      const error = ref(null)
  
      //const API_URL = import.meta.env.VITE_APP_API_BASE_URL + '/database-health' // Adjust this URL to your API endpoint
      const API_URL = '/api/database-health' // Adjust this URL to your API endpoint

      const fetchDatabaseHealth = async () => {
        loading.value = true
        error.value = null

        try {
          const response = await axios.get(`${API_URL}`)
          result.value = response.data
        } catch (err) {
          error.value = "Error fetching database status"
        } finally {
          loading.value = false
        }
      }
  
      onMounted(() => {
        fetchDatabaseHealth()
      })

      return {
        result,
        loading,
        error
      }
    }
  }
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

  p.success {
  color: rgb(0, 176, 155); 
}
  </style>
  