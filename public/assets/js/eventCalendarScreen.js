$(document).ready(function () {

        getEvents();

        function getEvents() {
            $.get("/api/events", function (data) {
                populateEvents(data);
            });
        }

        function populateEvents(events) {
            for (i = 0; i < events.length; i++) {
                let eventObj = {
                    title: events[i]['name'],
                    start: events[i]['event_time'],
                    description: `Location: ${events[i]['event_location']}`
                }
                eventsArr.push(eventObj);
            }
            console.log(eventsArr);
            displayCalendar();
        }

        var eventsArr = [];


        // page is now ready, initialize the calendar...
        function displayCalendar() {
            $('#calendar').fullCalendar({
            // put your options and callbacks here
                header: {
                    left: 'today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listWeek'
                },
                footer: {
                    left: 'prev',
                    right: 'next'
                },
                validRange: {
                    start: '2018-06-01'
                },
                navLinks: true, // can click day/week names to navigate views
                editable: true,
                eventLimit: true, // allow "more" link when too many events   
                eventRender: function(eventObj, $el) {
                    $el.popover({
                        title: eventObj.title,
                        content: eventObj.description,
                        trigger: 'hover',
                        placement: 'bottom',
                        container: 'body'
                    })
                },
                events: eventsArr    
            });
        }
        
});