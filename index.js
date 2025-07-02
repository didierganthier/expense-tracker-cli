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