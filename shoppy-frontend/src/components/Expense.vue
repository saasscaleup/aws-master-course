<template>
  <div class="github-inspired-container">
    <h2 class="text-center my-4">Shopping List</h2>

    <!-- Add Item Form -->
    <div class="d-flex justify-content-center mb-4">
      <input
        v-model.trim="newItem.name"
        type="text"
        class="form-control me-2"
        placeholder="Item Name"
        aria-label="Item Name"
      />
      <input
        v-model.number="newItem.quantity"
        type="number"
        class="form-control me-2"
        placeholder="Quantity"
        aria-label="Quantity"
      />
      <button @click="addItem" class="btn btn-primary">Add Item</button>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="text-danger">{{ error }}</p>

    <!-- Items List -->
    <ul class="list-group">
      <li
        v-for="item in items"
        :key="item.id"
        :class="{
          'list-group-item': true,
          'list-group-item-action': true,
          'd-flex': true,
          'justify-content-between': true,
          'align-items-center': true,
          completed: item.completed
        }"
      >
        <div>
          <input
            class="form-check-input me-1"
            type="checkbox"
            value=""
            aria-label="..."
            v-model="item.completed"
            @change="toggleCompleted(item.id)"
            :checked="item.completed"
          />
          {{ item.name }} - {{ item.quantity }}
        </div>
        <div>
          <button @click="prepareEditItem(item)" class="btn btn-icon btn-edit">
            <i class="fa fa-edit"></i>
          </button>
          <button @click="deleteItem(item.id)" class="btn btn-icon btn-delete">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </li>
    </ul>

    <!-- Bootstrap Modal for Editing Item -->
    <!-- Make sure to include the required Bootstrap modal HTML structure and JavaScript to initialize the modal -->
    <div
      class="modal fade"
      id="editItemModal"
      tabindex="-1"
      aria-labelledby="editItemModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editItemModalLabel">Edit Item</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              class="form-control mb-2"
              v-model="editItemData.name"
              placeholder="Item Name"
            />
            <input
              type="number"
              class="form-control"
              v-model="editItemData.quantity"
              placeholder="Quantity"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateItem">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap Toast Container -->
    <div aria-live="polite" aria-atomic="true" class="position-relative">
      <!-- Positioning container for toasts -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <!-- Toast -->
        <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true" id="itemToast">
        <div class="d-flex">
          <div class="toast-body">
            {{ toastMessage }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

const toast = ref(null)

export default {
  setup() {
    const items = ref([])
    const newItem = ref({ name: '', quantity: 1, completed: 0 })
    const editItemData = ref({})
    const error = ref('')

    const toastMessage = ref('')
    const showToast = ref(false)

    // Define your methods to show toast
    const triggerToast = (message) => {
      toastMessage.value = message
      const toastElement = document.getElementById('itemToast')
      const toast = new bootstrap.Toast(toastElement)
      toast.show()
    }

    const API_URL = import.meta.env.VITE_APP_API_BASE_URL + '/items' // Adjust this URL to your API endpoint

    // Fetch all items from the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URL)
        items.value = response.data
      } catch (error) {
        console.error('Failed to fetch items:', error)
      }
    }

    // Add a new item to the backend, then refresh the list
    const addItem = async () => {
      if (!newItem.value.name || newItem.value.quantity < 1) {
        alert('Please provide a valid name and quantity.')
        return
      }
      try {
        await axios.post(API_URL, newItem.value)
        triggerToast('Item added successfully!');
        fetchItems()
        newItem.value = { name: '', quantity: 1 } // Reset form
      } catch (error) {
        console.error('Failed to add item:', error)
      }
    }

    // Delete an item from the backend, then refresh the list
    const deleteItem = async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`)
        toast.value.show('Item deleted successfully!')
        fetchItems()
      } catch (error) {
        console.error('Failed to delete item:', error)
      }
    }

    // Prepare an item for editing and display it in the modal
    const prepareEditItem = (item) => {
      editItemData.value = { ...item }
      new bootstrap.Modal(document.getElementById('editItemModal')).show()
    }

    // Send the updated item to the backend, then refresh the list and close the modal
    const updateItem = async () => {
      try {
        await axios.put(`${API_URL}/${editItemData.value.id}`, editItemData.value)
        fetchItems()
        let modal = bootstrap.Modal.getInstance(document.getElementById('editItemModal'))
        modal.hide()
      } catch (error) {
        console.error('Failed to update item:', error)
      }
    }

    // Function to toggle the completion status of an item
    const toggleCompleted = async (itemId) => {
      // Find the item by ID
      const item = items.value.find((item) => item.id === itemId)
      // if (!item) return;

      // Toggle the completed status locally first

      // Then send the updated item to the backend
      try {
        await axios.put(`${API_URL}/${itemId}`, { ...item, completed: item.completed })
        // Optionally, you can refresh the items list from the backend here if needed
      } catch (error) {
        console.error('Failed to toggle completion status:', error)
        // Optionally, revert the local change if the request fails
        item.completed = !item.completed
      }

      // Then send the updated item to the backend
      // fetchItems();
    }

    // Initial fetch of items when component mounts
    fetchItems()

    return {
      items,
      newItem,
      editItemData,
      addItem,
      deleteItem,
      prepareEditItem,
      updateItem,
      error,
      toggleCompleted,
      toastMessage,
      triggerToast
    }
  }
}
</script>

<style scoped>
.github-inspired-container {
  max-width: 600px;
  margin: auto;
}

.completed {
  text-decoration: line-through;
  background-color: #f8f9fa;
}

.btn-icon {
  background: none;
  border: none;
  color: #c9d1d9; /* or any other color */
}

.btn-edit:hover {
  color: #58a6ff; /* color on hover */
}

.btn-delete:hover {
  color: #f82d2d; /* color on hover */
}
/* Additional styling to match GitHub's design can be added here */
</style>
