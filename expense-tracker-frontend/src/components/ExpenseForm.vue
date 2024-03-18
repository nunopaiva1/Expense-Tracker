<template>
  <form @submit.prevent="submitForm" class="mb-4">
    <div class="mb-3">
      <label for="description" class="form-label">Description:</label>
      <input type="text" id="description" v-model="formData.description" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="amount" class="form-label">Amount:</label>
      <input type="number" id="amount" v-model="formData.amount" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">Price:</label>
      <input type="number" id="price" v-model="formData.price" step="0.01" class="form-control" required>
      <!-- Add the step attribute with value 0.01 to allow decimal numbers -->
    </div>
    <div class="mb-3">
      <label for="category" class="form-label">Category:</label>
      <input type="text" id="category" v-model="formData.category" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-primary">Save</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        description: '',
        amount: null,
        price: null,
        category: ''
      }
    };
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:5000/expenses', this.formData)
        .then(response => {
          console.log('Expense added successfully:', response.data);
          this.formData = {
            description: '',
            amount: null,
            price: null,
            category: ''
          };
          this.$emit('expenseAdded', response.data);
        })
        .catch(error => {
          console.error('Error adding expense:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>
