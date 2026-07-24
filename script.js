// DOM elements
const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const transactionsList = document.getElementById('transactions-list');
const transactionForm = document.getElementById('transaction-form');
const resetBtn = document.getElementById('reset-btn');
const chartCanvas = document.getElementById('chart');
const search = document.getElementById('search');
const darkModeBtn = document.getElementById('darkmode-btn');

// initialise transactions
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
document.getElementById('date').valueAsDate = new Date();

// chart
const chart = new Chart(chartCanvas, {
  type: 'doughnut',
  data: {
    labels: ['Income', 'Expenses'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#2ecc71', '#e74c3c'],
      borderWidth: 0,
      hoverOffset: 10
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { size: 14 }, padding: 20 }
      },
      tooltip: {
        callbacks: {
          label: ctx => `₹${ctx.parsed.toFixed(2)}`
        }
      }
    },
    cutout: '70%'
  }
});

// currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
}

// summary update
function updateSummary() {
  const amounts = transactions.map(t => t.type === 'income' ? t.amount : -t.amount);
  const balance = amounts.reduce((a,b)=>a+b,0);
  const income = amounts.filter(a=>a>0).reduce((a,b)=>a+b,0);
  const expense = amounts.filter(a=>a<0).reduce((a,b)=>a+b,0) * -1;

  balanceElement.textContent = formatCurrency(balance);
  incomeElement.textContent = formatCurrency(income);
  expenseElement.textContent = formatCurrency(expense);

  chart.data.datasets[0].data = [income, expense];
  chart.update();
}

// add transaction DOM
function addTransactionDOM(transaction) {
  const sign = transaction.type === 'income' ? '+' : '-';
  const item = document.createElement('div');
  item.classList.add('transaction-item', transaction.type);

  const categoryIcons = {
    salary: 'fa-money-bill',
    freelance: 'fa-laptop',
    investment: 'fa-chart-line',
    food: 'fa-utensils',
    shopping: 'fa-shopping-bag',
    transport: 'fa-car',
    entertainment: 'fa-film',
    utilities: 'fa-bolt',
    health: 'fa-heartbeat',
    other: 'fa-question-circle'
  };

  item.innerHTML = `
    <div class="transaction-info">
      <div class="transaction-icon">
        <i class="fas ${categoryIcons[transaction.category] || 'fa-question-circle'}"></i>
      </div>
      <div class="transaction-details">
        <h3>${transaction.title}</h3>
        <p>${transaction.date} • ${transaction.category}</p>
      </div>
    </div>
    <div class="transaction-amount">
      ${sign}${formatCurrency(transaction.amount)}
    </div>
    <button class="delete-btn" data-id="${transaction.id}" aria-label="Delete transaction">
      <i class="fas fa-trash-alt"></i>
    </button>
  `;
  transactionsList.insertBefore(item, transactionsList.firstChild);
}

// refresh list
function updateTransactionsList() {
  transactionsList.innerHTML = '';
  transactions.slice().reverse().forEach(addTransactionDOM);
  updateSummary();
}

// generate id
function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

// add transaction
function addTransaction(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const typeEl = document.querySelector('.radio-option.selected');
  if (!typeEl) { alert('Select Income or Expense'); return; }
  const type = typeEl.dataset.type;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;
  if (!title || !amount || !category || !date) { alert('Please fill all fields'); return; }

  const transaction = {
    id: generateID(),
    title,
    amount,
    type,
    category,
    date: new Date(date).toLocaleDateString('en-IN', {year:'numeric',month:'short',day:'numeric'})
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  addTransactionDOM(transaction);
  updateSummary();
  transactionForm.reset();
  document.getElementById('date').valueAsDate = new Date();
  document.querySelectorAll('.radio-option').forEach(opt=>opt.classList.remove('selected'));
}

// delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t=>t.id !== id);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  updateTransactionsList();
}

// reset
function resetData() {
  if (confirm('Reset all data?')) {
    transactions = [];
    localStorage.removeItem('transactions');
    updateTransactionsList();
  }
}

// search filter
search.addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  Array.from(transactionsList.children).forEach(item => {
    const title = item.querySelector('.transaction-details h3').textContent.toLowerCase();
    item.style.display = title.includes(q) ? 'flex' : 'none';
  });
});

// export/import
document.getElementById('export-btn').addEventListener('click', () => {
  if (transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  // create a clean array for Excel with Serial numbers
  const data = transactions.map((t, index) => ({
    ID: index + 1,
    Title: t.title,
    Amount: t.amount,
    Type: t.type,
    Category: t.category,
    Date: t.date
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  XLSX.writeFile(workbook, 'transactions.xlsx');
});

// Trigger hidden file input
document.getElementById('import-btn').addEventListener('click', () => {
  document.getElementById('import-file').click();
});

// When an Excel file is selected
document.getElementById('import-file').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert sheet to JSON
    const excelData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    // Map Excel rows to transaction format
    transactions = excelData.map((row, index) => ({
      id: index + 1,
      title: row.Title || "Untitled",
      amount: parseFloat(row.Amount) || 0,
      type: row.Type || "expense",
      category: row.Category || "other",
      date: row.Date || new Date().toLocaleDateString('en-IN', {year:'numeric',month:'short',day:'numeric'})
    }));

    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateTransactionsList();
  };

  reader.readAsArrayBuffer(file);
});

// event listeners
transactionForm.addEventListener('submit', addTransaction);
resetBtn.addEventListener('click', resetData);

document.querySelectorAll('.radio-option').forEach(option => {
  option.addEventListener('click', function() {
    document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
    this.classList.add('selected');
  });
});

transactionsList.addEventListener('click', e => {
  if (e.target.closest('.delete-btn')) {
    const id = parseInt(e.target.closest('.delete-btn').dataset.id);
    deleteTransaction(id);
  }
});

// Dark mode toggle
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkModeBtn.innerHTML = document.body.classList.contains('dark') 
    ? '<i class="fas fa-sun"></i> Light Mode' 
    : '<i class="fas fa-moon"></i> Dark Mode';
});

// init
updateTransactionsList();
