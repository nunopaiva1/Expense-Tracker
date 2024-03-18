// routes/expenses.js

const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new expense
router.post('/', async (req, res) => {
  const { description, amount, price, category } = req.body;
  try {
    const newExpense = new Expense({
      description,
      amount,
      price,
      category
    });
    const savedExpense = await newExpense.save();
    res.json(savedExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  const { description, amount, price, category } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, {
      description,
      amount,
      price,
      category
    }, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
