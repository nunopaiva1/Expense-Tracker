<template>
    <div class="expense-total">
      <h2>Expenses: {{ selectedMonth }}</h2>
      <div class="total">Total: ${{ total.toFixed(2) }}</div>
      <!--<pre>{{ debugInfo }}</pre>-->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedMonth: capitalizeFirstLetter(new Date().toLocaleString('default', { month: 'long' })),
        expenses: [],
        total: 0,
        debugInfo: '' // Initialize debugInfo
      };
    },
    created() {
      this.fetchExpenses();
    },
    methods: {
      async fetchExpenses() {
        try {
          const response = await axios.get(`http://localhost:5000/expenses?month=${this.selectedMonth}`);
          this.expenses = response.data;
          this.calculateTotal(); // Call calculateTotal after fetching expenses
        } catch (error) {
          console.error('Error fetching expenses:', error);
          // Handle error
        }
      },
      calculateTotal() {
        this.total = this.expenses.reduce((total, expense) => total + parseFloat(expense.price), 0);
        this.debugInfo = JSON.stringify({
          selectedMonth: this.selectedMonth,
          total: this.total,
          expenses: this.expenses
        }, null, 2); // Update debugInfo with relevant data
      }
    }
  };
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  </script>
  
  <style scoped>
  .expense-total {
    background-color: #333;
    color: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .total {
    font-size: 24px;
    margin-top: 10px;
  }
  
  pre {
    background-color: #444;
    padding: 10px;
    border-radius: 8px;
    overflow-x: auto;
  }
  </style>
  