let changeBtn = document.querySelector('.changeBtn')
let forgotButton = document.querySelector('.forgotButton')
let changeTxt = document.querySelector('.changeTxt')
let loginForm = document.querySelector('.loginForm')
let signupForm = document.querySelector('.signupForm')
let forgotForm = document.querySelector('.forgotForm')
let ptag = document.querySelector('.ptag')

// let changeBtnFlag = 0
changeBtn.addEventListener('click',function () {
    if (changeBtn.textContent == 'Sign-Up') {
        changeTxt.innerHTML = `Already have an account `
        changeBtn.textContent = 'Log-In'
        forgotButton.style.display = 'none'
        loginForm.style.display = 'none'
        signupForm.style.display = 'flex'
        new TextAnimation({
            selector: ".changeBtn, .changeTxt",
            effect: "typing",
            speed: 50,
            duration: 0.2,
            trigger: 0,
        });
        changeBtnFlag = 1;
    } else if (changeBtn.textContent == "Log-In") {
        changeTxt.innerHTML = `Don't have an account `
        changeBtn.textContent = 'Sign-Up'
        forgotButton.style.display = 'initial'
        loginForm.style.display = 'flex'
        signupForm.style.display = 'none'
        new TextAnimation({
            selector: ".changeBtn, .changeTxt",
            effect: "typing",
            speed: 50,
            duration: 0.2,
            trigger: 0,
        });
        changeBtnFlag = 0;
    }
})

forgotButton.addEventListener('click',()=>{
    if (forgotButton.textContent === 'Forgot Password') {
        forgotForm.style.display = 'flex'
    signupForm.style.display = 'none'
    loginForm.style.display = 'none'
    forgotButton.textContent = 'Back to Log-In page'
    ptag.style.display = 'none'
} else {
        ptag.style.display = 'initial'
        forgotForm.style.display = 'none'
    signupForm.style.display = 'none'
    loginForm.style.display = 'flex'
    forgotButton.textContent = 'Forgot Password'
    }
    
})

document.querySelectorAll('.loginBtns').forEach(function(btn){
    if(!btn.getAttribute('class').includes('forgotBtn')){
        btn.disabled = true;
    }
})
const allForm = document.querySelectorAll('form')


function validateForm(inp) {
    var nameRegex = /^[a-z0-9\-]+$/;
    var validfirstUsername = inp.value.match(nameRegex);

    return validfirstUsername; // Return true if valid, false otherwise
}

allForm.forEach(function(child){
   const usernameinput = child.querySelector('.username')
   const alertM = child.querySelector('.alertMsg')
   const sendBtn = child.querySelector('.loginBtns')
   usernameinput.addEventListener('input', function(){
    const isValid = validateForm(usernameinput);
    if(!isValid){
        alertM.textContent = 'Invalid username. Only characters a-z, 0-9, and \'-\' are acceptable.'
        sendBtn.disabled = true
    }else{
        alertM.textContent =''
        sendBtn.disabled = false
    }
   })
})



