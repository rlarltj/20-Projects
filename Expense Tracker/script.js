const balance = document.getElementById("balance");
const plus = document.getElementById("money-plus");
const minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//     {  id: 1, text: 'Flower', amount: -20 },
//     {  id: 2, text: 'Salary', amount: 300 },
//     {  id: 3, text: 'Book', amount: -10 },
//     {  id: 4, text: 'Camera', amount: 150 },
// ];


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')); 
let transactions = localStorage.getItem('transactions') !== null ?
localStorageTransactions : [];
// Add transaction
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() ===''){
        alert('please add a text and amount');
    }else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);

        addTransactionDom(transaction);
        updateValues();
        updateLocalStorage();
        text.value='';
        amount.value='';
    }
}

// Generate random ID
function generateID(){
    return Math.floor(Math.random() * 10000000);
}

// Add transactions to DOM list
function addTransactionDom(transactions){
    // Get sign
    const sign = transactions.amount < 0? '-' : '+';
    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transactions.amount< 0? 'minus' : 'plus');
    item.innerHTML = `
    ${transactions.text}<span>${sign}${Math.abs(transactions.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transactions.id})">x</button>
    `;
    list.appendChild(item);
}

// Update the balance income and expense
function updateValues(){
    const amount = transactions.map(transaction => transaction.amount);
    
    const total = amount.reduce((acc, item) => (acc +=item), 0)
    .toFixed(2);
    const income = amount.filter(item => item > 0)
    .reduce((acc, item) => (acc+=item),0).toFixed(2);
    const expense = -1* amount.filter(item => item<0)
    .reduce((acc, item) => (acc+=item),0).toFixed(2);
    console.log(amount);
    balance.innerText =`${total}`;
    plus.innerText=`${income}`;
    minus.innerText=`${expense}`;

}

// Remove transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(item => item.id !== id);
    init();
    updateLocalStorage();
}

// Update local storage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));

}


// Init app
function init(){
    list.innerHTML = '';
    transactions.forEach((item)=>addTransactionDom(item));
    updateValues();
}
init();

form.addEventListener('submit', addTransaction);

