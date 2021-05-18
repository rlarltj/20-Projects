const currencyEL_one = document.getElementById("currency-one");
const currencyEL_two = document.getElementById("currency-two");
const amountEL_one = document.getElementById("amount-one");
const amountEL_two = document.getElementById("amount-two");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

// Event listeners
currencyEL_one.addEventListener("change", calculate)
amountEL_one.addEventListener("input", calculate)
currencyEL_two.addEventListener("change", calculate)
amountEL_two.addEventListener("input", calculate)
swap.addEventListener("click", () => {
    const temp = currencyEL_one.value;
    currencyEL_one.value = currencyEL_two.value;
    currencyEL_two.value = temp;
    calculate();
})



// Fetch exchange rates and updates the DOM!!
function calculate(){
    const currency_one = currencyEL_one.value;
    const currency_two = currencyEL_two.value; 
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        const rates =data.rates[currency_two]
        rate.innerText = `1 ${currency_one} = ${rates}${currency_two}`;

        if(amountEL_one.value <0){
            alert('마이너스는 안돼용~')
        }else if(amountEL_one.value =='3000'){
            alert('i love you 3000')
        }else{amountEL_two.value = (amountEL_one.value *rates).toFixed(2);}
        
    });

    


}

