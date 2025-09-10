const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SERVER_URL = 'http://localhost:3000';

async function registration(){
    /*await fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => console.log(data))*/
    let NameField = document.querySelector('#NameInp')
    let emailField = document.querySelector('#emailInp')
    let passwordField = document.querySelector('#floatingPassword')
    let confirmField = document.querySelector('#floatingConfirm')




    if(NameField.value == '' || emailField.value == '' || passwordField.value == '' || confirmField.value == ''){
        showMSG('danger','Hiba','Nem adtál meg minden adatot')  
        return
    }
    if(passwordField.value != confirmField.value){
        showMSG('danger','Hiba','A jelszó nem egyezik')  
        return  
    }

    if(!passwordRegExp.test(passwordField.value)){
        showMSG('danger','Hiba','Nem elég biztonságos a jelszód')  
        return
    }

    if(!emailRegExp.test(emailField.value)){
        showMSG('danger','Hiba','Nem megfelelő az emal címed')
        return
    }

    try{
        const respond = await fetch(`${SERVER_URL}/users`, {
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

async function login(){
    let loginEmailField = document.querySelector('#floatingLogEInput')
    let loginPasswordField = document.querySelector('#floatingLogPassword')


    if(loginEmailField.value == '' || loginPasswordField.value == ''){
        showMSG('danger','Hiba','Nem adtál meg minden adatot')  
        return
    }

    let user = {};
    try{
        const res = await fetch(`${SERVER_URL}/users/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginEmailField.value,
                password: loginPasswordField.value
            })
        })
        user = await res.json();
        if(user.id != undefined){
            loggedUser = user;
        }
        
        
        if(!loggedUser){
            showMSG('danger', 'Hiba', 'Hibás belépési adatok!')
            return
        }
        sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        getLoggedUser()
        await render('home')




    }
    catch(err)
    {
        console.log("Hiba!\n" + err)
    }

}

function logout(){
    sessionStorage.removeItem('loggedUser')
    getLoggedUser()
    alert('logout')
    render('login')

}

function getProfile(){

}

function updateProfile(){

}

function updatePassword(){

}

function nemEmelFol(segitseg){alert("Nagyon fáj")}
