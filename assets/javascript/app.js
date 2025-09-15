const AppTitle = "Lépésszámláló App"
const Author = "13.a Szoftverfejlesztő"
const Company = "Bajai SZC - Türr István Technikum"

let title = document.querySelector('#Title')
let company = document.querySelector('#Company')
let author = document.querySelector('#Author')
title.innerHTML = AppTitle
company.innerHTML = Company
author.innerHTML = Author


let theme = "light"
let loggedUser = null
let NapTeli = document.querySelector("#NapTeli")
let NapUres = document.querySelector("#NapUres")

let main = document.querySelector("main")
let mainMenu = document.querySelector("#mainmenu")
let userMenu = document.querySelector("#usermenu")

NapTeli.addEventListener('click', () => {
    NapTeli.style.display = "none"
    NapUres.style.display = "block"
    setTheme("dark")
    saveTheme("dark")
})
NapUres.addEventListener('click', () => {
    NapTeli.style.display = "block"
    NapUres.style.display = "none"
    setTheme("light")
    saveTheme("light")
})


function loadTheme() {
    if(localStorage.getItem('SCTheme')){
        theme = localStorage.getItem('SCTheme');
    }
    setTheme(theme);
    if(theme == "dark"){
        NapUres.style.display = "block"
        NapTeli.style.display = "none"
    }
    else{
        NapUres.style.display = "none"
        NapTeli.style.display = "block"
    }
}

function saveTheme(theme) {
    localStorage.setItem('SCTheme', theme   )
}

function setTheme(theme){
    document.documentElement.setAttribute('data-bs-theme', theme)
}

async function render(view){
    main.innerHTML = await (await fetch(`views/${view}.html`)).text();

    switch(view){
        case "profile" :{
            getProfile()
            break
        }
        case "home" :{
            setDate()
            break
        }
    }
}




async function getLoggedUser(){
    if(sessionStorage.getItem('loggedUser')){
        loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
        mainMenu.classList.add('d-none')
        userMenu.classList.remove('d-none')
        await render("home")
    }
    else{
        loggedUser = null
        mainMenu.classList.remove('d-none')
        userMenu.classList.add('d-none')
        await render('login')
    }
}


loadTheme()

getLoggedUser()
