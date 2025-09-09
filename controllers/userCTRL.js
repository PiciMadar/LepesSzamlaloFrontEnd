const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function registration(){
    /*await fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => console.log(data))*/
    let NameField = document.querySelector('#NameInp')
    let emailField = document.querySelector('#emailInp')
    let passwordField = document.querySelector('#floatingPassword')
    let confirmField = document.querySelector('#floatingConfirm')



    if(NameField.value == '' || emailField.value == '' || passwordField.value == '' || confirmField.value == ''){
        alert("Nem adtál meg minden adatot!")
        return
    }
    if(passwordField.value != confirmField.value){
        alert("A jelszó nem egyezik!")
        return  
    }

    if(!passwordRegExp.test(passwordField.value)){
        alert("A megadott jelszó nem elég biztonságos!")
        return
    }

    if(!emailRegExp.test(emailField.value)){
        alert("Nem megfelelő email cím!")
        return
    }

    try{
        const respond = await fetch('http://localhost:3000/users', {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: 
            JSON.stringify({
                name: NameField.value,
                email: emailField.value,
                password: passwordField.value,
            }   
        )
        })
        
        const data = await respond.json(); 
        console.log(data)
        alert(data.msg)
        if(res.status == 200){
            NameField.value = '';
            emailField.value = '';
            passwordField.value = '';
            confirmField.value = '';
        }
    }   
    catch(  err){
        console.log("Hiba történt! ", err)
    }

}

function login(){

}

function logout(){

}

function getProfile(){

}

function updateProfile(){

}

function updatePassword(){

}

function nemEmelFol(segitseg){alert("Nagyon fáj")}
