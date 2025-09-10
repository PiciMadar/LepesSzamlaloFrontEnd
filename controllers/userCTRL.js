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

    let users = [];
    try{
        const res = await fetch(`${SERVER_URL}/users`)
        users = await res.json();
        
        
        users.forEach(user => {
            if(user.email == loginEmailField.value && user.password == loginPasswordField.value)
            {
                loggedUser = user
                showMSG('success','Siker!','Sikeresen bejelentkeztés. Átirányítás folyamatban')

                
                return
            }
            else
            {
                showMSG('danger','Hiba','Az email cím vagy a jelszó helytelen')
                return
            }
        })
        sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        await render('home')
        getLoggedUser()



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
