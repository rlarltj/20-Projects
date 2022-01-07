const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMB = document.getElementById("SOM");
const sortBtn = document.getElementById("SBR");
const calculateBtn = document.getElementById("CEW");

let data =[];

// Fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Double everyones money
function doubleMoney(){
    data = data.map((user) =>{
        return {name: user.name , money: user.money * 2};
    })
    updateDOM();
}

// Sort users by ricest
function sortByRichest(){
    data.sort((a,b) => (b.money - a.money))
    updateDOM();
}

// Add new object to data arr
function addData(value){
   data.push(value);
    updateDOM();
}

// Update DOM
function updateDOM(providedData = data){
    // Clear main div
    main.innerHTML = `<h2>
    <strong>Person</strong>
    Wealth</h2>`;
    providedData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element);
    })
}

// Calculate the total wealth
function calculateWealth(){
    const data1= data.reduce((acc, user) => acc + user.money, 0);
    console.log(formatMoney(data1));
    const block = document.createElement('div');
    block.innerHTML =`<h3>Total Wealth:<strong>${formatMoney(data1)}</strong></h3>`;
    main.appendChild(block);
}


// Format number as money
function formatMoney(number){
    return  '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Filter only millionaires
function showMillion(){
    data = data.filter((user) => user.money > 1000000);
    updateDOM();
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMB.addEventListener("click", showMillion)
calculateBtn.addEventListener("click", calculateWealth)

getRandomUser(); 
getRandomUser(); 
getRandomUser(); 