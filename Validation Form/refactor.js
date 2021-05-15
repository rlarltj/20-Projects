const form = document.getElementById("form");
const submit = document.getElementById("submit");
const username = document.getElementById('username');
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmed = document.getElementById("password2");
let small = document.getElementById("small");

// show error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText  = message;
}

// show success message
function showSuccess(input, message){  
    const formControl = input.parentElement;
    formControl.className= 'form-control success'
    const small = formControl.querySelector('small');
     small.innerText = message;
}



// Check required fileds
function checkRequired(inputArr){
    inputArr.forEach((input) =>{
        if(input.value.trim() == ''){
            showError(input, `${getFiledName(input)} is required`)
        }else{
            showSuccess(input, 'good');
        }
    })
}

function getFiledName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1) ;
}

// Event listeners
form.addEventListener("submit", function(e){
    e.preventDefault();

    const arr= [username, email, password, confirmed];
    checkRequired(arr);
    checkLength(username, 3, 15);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordMatch(password, confirmed);
})

// Check input length
function checkLength(input, min, max){
    if(input.value.length <= min){
        showError(input, `${getFiledName(input)} must be at least ${min} characters`);
    }else if(input.value.length >= max){
        showError(input, `${getFiledName(input)} must be less than ${max} characters`);
    }else{
        showSuccess(input, 'you can use')
    }
}

// Check email form
function checkEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input, 'nice email');
    }else{
        showError(input, 'email is not vaild');
    }
}

// Check password match
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2,'password do not match')
    }else{
        showSuccess(input2, 'you can use it')
    }
}