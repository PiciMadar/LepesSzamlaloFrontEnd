
function setDate(){
    let today = new Date().toISOString().split('T')[0]
    let dateField = document.querySelector('#dateField')
    dateField.setAttribute('max', today)
}

async function add(){
    let dateField = document.querySelector("#dateField")
    let countField = document.querySelector("#countField")

    try{
        const respond = await fetch(`${SERVER_URL}/steps/user`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: 
            JSON.stringify({
                date: dateField.value,
                count: countField.value,
                
            }   
        )
        })
        
        const data = await respond.json(); 
        console.log(data)
        alert(data.msg)
        if(res.status == 200){
            dateField.value = ""
            countField.value = ""
            
        }
      }
    catch(err){
        console.log(err)
    }   
}