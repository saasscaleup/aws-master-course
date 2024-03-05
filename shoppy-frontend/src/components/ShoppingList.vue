<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="text-center mb-4">Shopping List</h2>

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
          <button @click="addItem" class="btn btn-primary add-item">Add Item</button>
        </div>

        <p v-if="showError" class="text-danger">{{ showError }}</p>

        <div v-for="item in items" :key="item.id" class="card mb-3">
          <div class="card-body">
            <div class="d-flex align-items-start">
              <input
                class="form-check-input me-2 custom-checkbox"
                type="checkbox"
                v-model="item.completed"
                @change="toggleCompleted(item.id)"
              />
              <div>
                <div :class="{ completed: item.completed }">
                  {{ item.name }} - {{ item.quantity }} - {{ item.completed }}
                </div>
                <div class="text-muted small" :class="{ completed: item.completed }">
                  {{ timeAgo(item.created_at) }}
                </div>
              </div>
            </div>
            <div class="ms-auto">
              <button @click="prepareEditItem(item)" class="btn btn-icon btn-edit">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button @click="deleteItem(item.id)" class="btn btn-icon btn-delete">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <p class="text-center text-muted mt-3">Scale-Up Saas(DBC) &copy; 2024</p>

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
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" class="btn btn-primary" @click="updateItem">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export default {
  setup() {
    const items = ref([])
    const newItem = ref({ name: '', quantity: 1, completed: 0 })
    const editItemData = ref({})
    const showError = ref('')

    const API_URL = import.meta.env.VITE_APP_API_BASE_URL + '/items' // Adjust this URL to your API endpoint

    const showToastify = (message, type = 'success') => {
      let color = ''

      if (type != 'success') {
        color = 'to right, #ff5959, #ff0000'
      } else {
        color = 'to right, #00b09b, #96c93d'
      }

      Toastify({
        text: message,
        gravity: 'bottom',
        position: 'right',
        close: true,
        duration: 3000,
        style: {
          background: 'linear-gradient(' + color + ')'
        }
      }).showToast()
    }

    // Fetch all items from the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URL)
        items.value = response.data.map((item) => ({
          ...item,
          completed: item.completed === 1
        }))
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
        showToastify('Item created successfully!', 'success')
        fetchItems()
        newItem.value = { name: '', quantity: 1 } // Reset form
      } catch (error) {
        showToastify('Failed to add item: ' + error, 'error')
        //showError.value = 'Failed to add item: ' + error,'error'
        console.error('Failed to add item:', error)
      }
    }

    // Delete an item from the backend, then refresh the list
    const deleteItem = async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`)
        showToastify('Item deleted successfully!')
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

    // Function to format the creation date
    const formatDate = (dateString) => {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const timeAgo = (dateString) => {
      const now = new Date()
      const date = new Date(dateString)
      const secondsAgo = Math.round((now - date) / 1000)

      if (secondsAgo < 60) {
        return 'just now'
      } else if (secondsAgo < 3600) {
        return `${Math.round(secondsAgo / 60)} minutes ago`
      } else if (secondsAgo < 86400) {
        return `${Math.round(secondsAgo / 3600)} hours ago`
      } else {
        return `${Math.round(secondsAgo / 86400)} days ago`
      }
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
      showError,
      toggleCompleted,
      showToastify,
      formatDate,
      timeAgo
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}

.card {
  background: #f7f7f8; /* Light grey background */
  border: none;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333; /* Dark text for better readability */
}

.completed {
  color: #6c757d; /* Bootstrap's text-muted color */
  font-weight: bold; /* To visually distinguish completed tasks */
  text-decoration: line-through;
}

/* Icon buttons */
.btn-icon {
  background: none;
  border: none;
  color: #6c757d; /* Bootstrap's text-muted color */
}

.btn-edit:hover {
  color: #58a6ff; /* color on hover */
}

.btn-delete:hover {
  color: #f82d2d; /* color on hover */
}

.text-muted.small {
  font-size: 0.8rem; /* Adjust the size as needed */
}
.custom-checkbox {
  height: 35px;
  width: 35px;
  cursor: pointer;

}
.custom-checkbox:checked {
  height: 35px;
  width: 35px;
  background-color:  #00b09b;
    border-color:  #00b09b;
}
.add-item{
background: linear-gradient(to right, #00b09b, #96c93d);
}
/* Additional styling to match GitHub's design can be added here */
</style>
