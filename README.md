# Expense Tracker CLI

A simple command-line tool to track your expenses, manage your personal budget, and view summaries — all from your terminal.

# Project URL
[https://roadmap.sh/projects/expense-tracker](https://roadmap.sh/projects/expense-tracker)

## Features

- Add an expense with description and amount
- Update an existing expense by ID
- Delete an expense by ID
- List all expenses
- View total expenses summary
- View summary for a specific month
- Data stored locally in a JSON file for simplicity

## Installation

Clone the repo or install it globally from npm (if published):

```sh
npm install -g expense-tracker-cli-didierganthier
```

## Usage

**Add an expense**
```sh
expense-tracker add --description "Lunch" --amount 15
```

**Update an expense**
```sh
expense-tracker update --id 1 --description "Dinner" --amount 20
```

**Delete an expense**
```sh
expense-tracker delete --id 1
```

**List all expenses**
```sh
expense-tracker list
```

**View total summary**
```sh
expense-tracker summary
```

**View summary for a specific month (e.g. August)**
```sh
expense-tracker summary --month 8
```

## Data Storage

All expenses are stored in a local JSON file called `expenses.json` in the project folder. This keeps your data persistent between runs.

## Future Improvements

- Add expense categories and filter by category
- Set monthly budget and get warnings when exceeding it
- Export expenses to a CSV file
- Add colored output for better readability

## License

MIT

## Author

Didier Peran Ganthier