let dateField = document.querySelector("#dateField")
let countField = document.querySelector("#countField")

let selectedStep = 0;

function setDate(){
    let today = new Date().toISOString().split('T')[0]
    let dateField = document.querySelector('#dateField')
    dateField.setAttribute('max', today)
}

async function addData(){
    let dateField = document.querySelector("#dateField")
    let countField = document.querySelector("#countField")
    console.log('1')

    if(dateField.value == '' || countField.value == ''){
        showMSG("danger",'Hiba','Halo')
        return
    }
    
    try{
        console.log('2')
        const respond = await fetch(`${SERVER_URL}/steps`, {
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
        if(respond.status == 200){
            console.log('3')
            dateField.value = ""
            countField.value = ""
            showMSG('success','Woohoo', 'Sikeres felvétel')
            await getSteps()
            renderSteps()
        }
        else{
            showMSG('danger','Hiba','VAlami nem stimmel')
        }
      }
    catch(err){
        console.log(err)
    }
    getSteps();
}

async function  getSteps() {
    try{
        let res = await fetch(`${SERVER_URL}/steps`)
        steps = await res.json();
        steps = steps.sort((a,b) => new Date(b.date) - new Date(a.date))
        console.log(steps)
    }
    catch(err){
        console.log(err)
    }
}

async function renderSteps() {
    let tbody = document.querySelector('#Tablazat')
    let sumSP = document.querySelector('#sumSP')
    tbody.innerHTML = ""

    let sum = 0
    steps.forEach((step,index) => {
        let Ujtr = document.createElement('tr')
        let UjtID = document.createElement('td')
        let UjtdDate = document.createElement('td')
        let UjtdCount = document.createElement('td')
        let UjtdOp = document.createElement('button')
        let UjtdOp2 = document.createElement('button')
        let tdiv = document.createElement('div')


        UjtID.innerHTML = step.id
        UjtdDate.innerHTML = step.date
        UjtdCount.innerHTML = step.count
        UjtdOp.innerHTML = "🛠"
        UjtdOp2.innerHTML = "🗑"

        tbody.appendChild(Ujtr)
        Ujtr.appendChild(UjtID)
        Ujtr.appendChild(UjtdDate)
        Ujtr.appendChild(UjtdCount)
        Ujtr.appendChild(tdiv)
        tdiv.appendChild(UjtdOp)
        tdiv.appendChild(UjtdOp2)
        

        UjtID.classList.add("text-center")
        UjtdDate.classList.add("text-start")
        UjtdCount.classList.add("text-end")
        UjtdOp.classList.add("text-end",'btn','btn-danger','btn-sm', 'me-2')
        UjtdOp2.classList.add("text-end",'btn','btn-warning','btn-sm')
        tdiv.classList.add("text-end")


        UjtdOp.setAttribute('onClick', `editStep(${index})`)
        UjtdOp2.setAttribute('onClick', `deleteStep(${index})`)

    
        sum += Number(step.count)

    });
    
    sumSP.innerHTML = sum
}

async function ListaFeltoltes() {
    
    try{
        const res = await fetch(`${SERVER_URL}/steps`,{})
        let data = await res.json()
        console.log(data)
        
        for(let i = 0; i < data.length; i++){
            let Ujtr = document.createElement('tr')
            let UjtID = document.createElement('td')
            let UjtdDate = document.createElement('td')
            let UjtdCount = document.createElement('td')
            let UjtdOp = document.createElement('td')
        
            UjtID.classlist.add("text-center")
            UjtID.classlist.add("text-start")
            UjtdDate.classlist.add("text-start")
            UjtdCount.classlist.add("text-end")
            UjtdOp.classlist.add("text-end")


            UjtID.innerHTML = data[i].id
            UjtdDate.innerHTML = data[i].date
            UjtdCount.innerHTML = data[i].count
            UjtdOp = "-"
        
            document.querySelector("#Tablazat").appendChild(Ujtr)
            Ujtr.appendChild(UjtID)
            Ujtr.appendChild(UjtdDate)
            Ujtr.appendChild(UjtdCount)
            Ujtr.appendChild(UjtdOp)
        }
    }
    catch(err){
        console.log(err)
    }


}

async function delAll(){
    steps = []
    document.querySelector('#Tablazat').innerHTML = ""
}

function editStep(index){
    let dateField = document.querySelector("#dateField")
    let countField = document.querySelector("#countField")
    toggleEditMode(true)
    dateField.value = steps[index].date;
    countField.value  = steps[index].count
    selectedStep = steps[index]
    console.log(selectedStep)
}

async function updateF(){
    /** Ha a dátum nem változott => Lépésszám frissítése a selectedStep-re
     * Ha a dátum változott => eredeti törlése, majd
     *      Ha még nincs ilyen dátum => insert új adatokka
     *      Ha már van ilyen dátm => frissítés az új lépésszámra
     */
    let dateField = document.querySelector("#dateField")
    let countField = document.querySelector("#countField")

    if(selectedStep.date == dateField.value){
        try{
            let res = await fetch(`${SERVER_URL}/steps/${selectedStep.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application.json'
                },
                body: JSON.stringify({
                    date : dateField.value,
                    count : countField.value
                })
            });
            let data = await res.json
            if(res.status == 200){
                showMSG('Success', 'ok', "Yippie")
                await getSteps()
                cancel()
                renderSteps()
            }
        }
        catch(err){console.log(err)}
    }
    else{
        try{
            let idx = await fetch(`${SERVER_URL}/steps/${steps[idx].id}`)
            if(idx == -1){
                //TODO:Szerkesztés 
            }
        }catch(err){console.log(err)}
    }
}

async function deleteStep(index){
    if(confirm('Biztosan törölni szeretnéd ezt az elemet?')){
        try{
            let res = await fetch(`${SERVER_URL}/steps/${steps[index].id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application:json'
                }
            })
            let data = await res.json()
            if(res.status == 200){
                showMSG('Success', 'ok', "Yippie")
                await getSteps()
                cancel()
                renderSteps()
            }
        } catch(err) {
            console.log("Halo")
        }
    }
}

function toggleEditMode(mode){
    let addBt = document.querySelector("#addBTN")
    let updBt = document.querySelector("#updateBTN")
    let delBt = document.querySelector("#delBTN")
    let cancBt = document.querySelector("#cancelBTN")
    if(mode){
        addBt.classList.add("d-none")
        updBt.classList.remove("d-none")
        delBt.classList.remove("d-none")
        cancBt.classList.remove("d-none")
    }
}
function cancel(){
    let dateField = document.querySelector("#dateField")
    let countField = document.querySelector("#countField")
    dateField.value = ''
    countField.value = ''
    let addBt = document.querySelector("#addBTN")
    let updBt = document.querySelector("#updateBTN")
    let delBt = document.querySelector("#delBTN")
    let cancBt = document.querySelector("#cancelBTN")
    addBt.classList.remove("d-none")
    updBt.classList.add("d-none")
    delBt.classList.add("d-none")
    cancBt.classList.add("d-none")
}

async function delF(){
    let idx = steps.findIndex(step => step.id == selectedStep.id)
    await deleteStep(idx);
}