<template>
    <!-- Bootstrap Toast Container -->
    <div aria-live="polite" aria-atomic="true" class="position-relative">
      <!-- Positioning container for toasts -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <!-- Toast -->
        <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" id="itemToast">
        <div class="d-flex">
          <div class="toast-body">
            {{ message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const props = defineProps({
    message: String
  });
  

  </script>
  