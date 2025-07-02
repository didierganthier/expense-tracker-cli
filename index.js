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

program.command('add')
    .description('Add a new expense')
    .requiredOption('--description <description>', 'Description of the expense')
    .requiredOption('--amount <amount>', 'Amount of the expense')
    .action((options) => {
        const expenses = loadExpenses();
        const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
        const date = new Date().toISOString().split('T')[0];
        const amount = parseFloat(options.amount);

        if (isNaN(amount)) {
            console.error('❌ Invalid amount. Please enter a valid number.');
            process.exit(1);
        }

        expenses.push({
            id,
            description: options.description,
            amount,
            date
        });

        saveExpenses(expenses);
        console.log(`✅ Expense added: ${options.description} - $${amount} on ${date}`);
    });

    program.command('list')
    .description('List all expenses')
    .action(() => {
        const expenses = loadExpenses();
        if (expenses.length === 0) {
            console.log('📄 No expenses found.');
            return;
        }

        console.log('📄 List of expenses:');
        console.table(expenses.map(expense => ({
            ID: expense.id,
            Description: expense.description,
            Amount: `$${expense.amount.toFixed(2)}`,
            Date: expense.date
        })));
    });

    program.command('delete')
    .description('Delete an expense by ID')
    .requiredOption('--id <id>', 'ID of the expense to delete')
    .action((options) => {
        const expenses = loadExpenses();
        const id = parseInt(options.id, 10);
        const index = expenses.findIndex(expense => expense.id === id);

        if (index === -1) {
            console.error(`❌ Expense with ID ${id} not found.`);
            process.exit(1);
        }

        expenses.splice(index, 1);
        saveExpenses(expenses);
        console.log(`✅ Expense with ID ${id} deleted.`);
    });

program
  .command('summary')
  .description('Show total expenses or summary for a specific month')
  .option('--month <month>', 'Month number (1-12)')
  .action((options) => {
    const expenses = loadExpenses();
    let filtered = expenses;

    if (options.month) {
      const month = parseInt(options.month, 10);
      filtered = expenses.filter(exp => {
        const expMonth = new Date(exp.date).getMonth() + 1;
        return expMonth === month;
      });
      const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
      console.log(`Total expenses for month ${month}: $${total}`);
    } else {
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      console.log(`Total expenses: $${total}`);
    }
  });


    program
  .command('update')
  .description('Update an expense by ID')
  .requiredOption('--id <id>', 'Expense ID')
  .option('--description <description>', 'New description')
  .option('--amount <amount>', 'New amount')
  .action((options) => {
    const expenses = loadExpenses();
    const id = parseInt(options.id, 10);
    const exp = expenses.find(exp => exp.id === id);

    if (!exp) {
      console.error('❌ Expense not found.');
      process.exit(1);
    }

    if (options.description) exp.description = options.description;
    if (options.amount) {
      const amount = parseFloat(options.amount);
      if (isNaN(amount) || amount <= 0) {
        console.error('❌ Amount must be a positive number.');
        process.exit(1);
      }
      exp.amount = amount;
    }

    saveExpenses(expenses);
    console.log(`✅ Expense updated successfully (ID: ${id})`);
  });


  program.parse(process.argv);
