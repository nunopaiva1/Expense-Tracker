<template>
    <div>
      <h2 class="mb-4">Expense List</h2>
      <ul class="list-group">
        <li v-for="expense in expenses" :key="expense._id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <span class="badge bg-secondary me-2">{{ expense.amount }}</span>
            <span class="me-2">{{ expense.description }}</span>
            <span class="me-2">{{ expense.category }}</span>
            <span class="me-2">{{ expense.price }}€</span>
          </div>
          <div>
            <button @click="editExpense(expense)" class="btn btn-primary me-2">Edit</button>
            <button @click="deleteExpense(expense._id)" class="btn btn-danger">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      expenses: {
        type: Array,
        required: true
      }
    },
    methods: {
      editExpense(expense) {
        // Implement edit functionality
        console.log('Edit expense:', expense);
        // Emit an event to notify the parent component to handle editing
        this.$emit('editExpense', expense);
      },
      async deleteExpense(expenseId) {
        try {
          await axios.delete(`http://localhost:5000/expenses/${expenseId}`);
          // Emit an event to notify the parent component about the deletion
          this.$emit('expenseDeleted', expenseId);
        } catch (error) {
          console.error('Error deleting expense:', error);
          // Handle error
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add margin-bottom to the list items */
  li {
    margin-bottom: 10px;
  }
  </style>