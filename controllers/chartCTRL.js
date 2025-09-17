let chart = null
let chartLabels = []
let chartData = []

async function getChartData() {
    // Backendről a user lépésadai -> feltölti a data és a labels tömböket
    try{
        console.log(0)
        const res = await fetch(`${SERVER_URL}/steps`)
        let data = await res.json()
        chartLabels = []
        chartData = []
        if(res.status == 200){
            console.log(1)
            for(let i = 0; i < data.length; i++){
                console.log(2)
                chartLabels.push(data[i].date)
                chartData.push(data[i].count)
            }
        }
    }catch(err){
        console.log(err)
    }
    
}


function initChart(){

    const ctx = document.getElementById("ChartCanvas").getContext('2d')
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets:[{
                label: 'Felhasználó',
                data: chartData
            }]
        },
        options: {
          scales:{
            y:{beginAtZero:true}
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },
    });
}