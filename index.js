#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

const expensesFile = path.join(__dirname, 'expenses.json');

program.name('expense-tracker')
  .description('A simple command-line expense tracker')
  .version('1.0.0');


const loadExpenses = () => {
    if (!fs.existsSync(expensesFile)) {
        fs.writeFileSync(expensesFile, '[]');
    }
    const data = fs.readFileSync(expensesFile);
    return JSON.parse(data);
}

const saveExpenses = (expenses) => {
    fs.writeFileSync(expensesFile, JSON.stringify(expenses, null, 2));
}