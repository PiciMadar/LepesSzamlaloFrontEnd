let calEvents= []


async function getCalendarData(){
    try{
        console.log(0)
        const res = await fetch(`${SERVER_URL}/steps`)
        steps = await res.json()
        calEvents = []
        steps.forEach(step =>{
            calEvents.push({
                title: 'Lépés: ' + step.count,
                start: step.date
            })
        })
    }catch(err){
        console.log(err)
    }
}

function initCalendar(){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      
      initialView: 'dayGridMonth',
      locale: 'hu',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,timeGridDay,dayGridMonth' // user can switch between the two
      } ,
      events: calEvents
    });
    
    calendar.render()
}