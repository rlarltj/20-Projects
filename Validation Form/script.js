const form = document.getElementById("form");
const submit = document.getElementById("submit");
const username = document.getElementById('username');
const email = document.getElementById("email2");
const password = document.getElementById("password");
const confirmed = document.getElementById("password2");
let small = document.getElementById("small");
showError(email, '이메일을 입력해라');

function isVaildEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


email.addEventListener("submit", function(e){
    e.preventDefault();
    showError(email, '이메일을 입력해라');
         if(email.value.length < 5){
            showError(email, '이메일이 그렇게 짧더냐');
        }else if(!isVaildEmail(email.value)){
            showError(email, '이메일 양식을 갖추어라~');
         
        }else{
            showSuccess(email, '잘했어요');
            isVaildEmail(email);
    }}
);



function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText  = message;
}
function showSuccess(input, message){
   
    const formControl = input.parentElement;
    formControl.className= 'form-control success'
    // formControl.classList.add('success');  
    const small = formControl.querySelector('small');
     small.innerText = message;
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    if(username.value.length <5){
        showError(username, '아이디는 5글자 이상~')
    }else{
        showSuccess(username, '잘했어요');
    }





    if(password.value === ''){
        showError(password, '비밀번호를 다시 입력해용');
    }else if(password.value.length <6){
        showError(password, '비밀번호는 6자리 이상~');
    }else{
        showSuccess(password, '잘했어요');
    };
    


if(confirmed.value != password.value){
    showError(confirmed, '비밀번호가 달라용')
}else{
    showSuccess(confirmed, '잘했어요');
}
});
