function showMSG(severity, title, message){
    let messageBox = document.querySelector('#messageBox');
    let h3 = document.createElement('h3')
    let p = document.createElement('p')
    let btn = document.createElement('button')

    messageBox.innerHTML = '';
    h3.innerHTML = title;
    p.innerHTML = message

    btn.classList.add('btn-close')
    p.classList.add('m-0','p-0')

    btn.setAttribute('data-bs-dismiss','alert')
    btn.setAttribute('aria-label','Close')

    messageBox.classList.add('alert', `alert-${severity}`, 'alert-dismissible', 'fade', 'show')
    messageBox.setAttribute('role', 'alert')


    messageBox.appendChild(h3)
    messageBox.appendChild(p)
    messageBox.appendChild(btn)
    messageBox.classList.remove('hide')
    messageBox.style = "display:block"


    setTimeout(() => {
        messageBox.classList.add('hide')
        messageBox.classList.remove('show')
    }, 3000);
    setTimeout(() => {
        messageBox.style = "display:none"
    }, 3300);
}

/*
<div class="alert alert-warning alert-dismissible fade hide" role="alert">
  <h3>Holy guacamole!</h3> You should check in on some of those fields below.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
*/