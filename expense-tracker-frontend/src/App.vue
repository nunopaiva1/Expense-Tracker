<template>
  <div class="container">
    <h1 class="mt-4 mb-4">Expense Tracker</h1>
    <div class="row">
      <div class="col-md-6 mb-4">
        <ExpenseForm @expenseAdded="handleExpenseAdded" />
      </div>
      <div class="col-md-6">
        <ExpenseList :expenses="expenses" @expenseDeleted="handleExpenseDeleted" @editExpense="handleEditExpense" />
        <ExpenseTotal ref="expenseTotal" /> <!-- Add ref attribute here -->
      </div>
    </div>
  </div>
</template>

<script>
import ExpenseForm from './components/ExpenseForm.vue';
import ExpenseList from './components/ExpenseList.vue';
import ExpenseTotal from './components/ExpenseTotal.vue'; // Import the ExpenseTotal component

import axios from 'axios';

export default {
  components: {
    ExpenseForm,
    ExpenseList,
    ExpenseTotal // Add ExpenseTotal to the components object
  },
  data() {
    return {
      expenses: []
    };
  },
  created() {
    this.fetchExpenses();
  },
  methods: {
    async fetchExpenses(month) {
      try {
        // Make sure to pass the month to the API endpoint
        const response = await axios.get(`http://localhost:5000/expenses?month=${month}`);
        this.expenses = response.data;
        // Call calculateTotal on the ExpenseTotal component after fetching expenses
        this.$refs.expenseTotal.calculateTotal();
      } catch (error) {
        console.error('Error fetching expenses:', error);
        // Handle error
      }
    },
    async handleExpenseDeleted(expenseId) {
      try {
        // Update the expenses array after deleting an expense
        this.expenses = this.expenses.filter(expense => expense._id !== expenseId);
      } catch (error) {
        console.error('Error deleting expense:', error);
        // Handle error
      }
    },
    handleExpenseAdded(newExpense) {
      this.expenses.push(newExpense);
    },
    handleEditExpense(expense) {
      // Implement edit functionality here if needed
      console.log('Editing expense:', expense);
    }
  }
};
</script>

<style scoped>
/* Add component styles here if needed */
</style>
