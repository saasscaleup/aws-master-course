<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div ref="toastElement" class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">{{ message }}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  message: String
});
const emit = defineEmits(['shown']);

const toastElement = ref(null);

watch(() => props.message, (newMessage) => {
  if (newMessage) {
    const toast = new bootstrap.Toast(toastElement.value);
    toast.show();
    emit('shown'); // Optional: Notify parent when toast is shown
  }
});

onMounted(() => {
  // Initialize toast here if needed, but don't show it automatically
});
</script>
