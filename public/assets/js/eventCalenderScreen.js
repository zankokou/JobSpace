$(document).ready(function () {
    $(function() {

        // page is now ready, initialize the calendar...

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
            events: [
                {
                    title: 'All Day Event',
                    start: '2018-07-01',
                    color: 'purple' // override!
                },
                {
                    title: 'Long Event',
                    start: '2018-01-07',
                    end: '2018-07-10',
                    description: 'description for Long Event',
                    color: 'green'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2018-07-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2018-07-16T16:00:00'
                }
              ]         
        });
    });
});