$(document).ready(function(){

    $(function () {
        $('#datetimepicker1').datetimepicker();
    });

    // var moment = require('moment');
    // moment().format();  

    let id = Number(location.pathname.split('/')[2]);
    let events = [];
    
    // get & display job data if editing existing job
    if (!isNaN(id)) {
        $.ajax("/api/job/"+id).then(function(res) {
            for (var key in res[0]) {
                $(`#${key}`).val(res[0][key]);
            }
        });
        // pget & push existing events to events array
        $.ajax("/api/event/"+id).then(function(res) {
            for (i = 0; i < res.length; i++) {
                events.push(res[i]);
            }
            if (events.length > 0) {
                renderEvents();
            } 
        });
    }

    // display events
    function renderEvents () {
        $('#eventSection').empty();
        for (i = 0; i < events.length; i++) {
            $('#eventSection').append('<div>' + event2div(events[i], i) + '</div>');
        }
    }

    // create event div
    function event2div (event, i) {
        return `<button type="button" class="editModal btn btn-info btn-lg "
        data-toggle="modal" data-target="#myModal" value="${i}">Event: ${event.name}</button>
        <button class="btn btn-danger deleteEvent" value="${i}">X</button>`;
    }

    let currentEvent = null;

    // delete event in events array & database
    $('body').on('click', '.deleteEvent', function() {
        let index = $(this).val();
        let eventId = events[index]['id'];
        console.log(eventId);
        events.splice(index, 1);
        $(this).parent().remove();

        if (!eventId) {

            // location.reload();
            return;
        }
        $.ajax("/api/events/" + eventId, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted cat", id);
            // Reload the page to update events
            // location.reload();
          }
        );
    });

    // display events modal
    // populate event data if editing event
    $('body').on('click', '.editModal', function() {
        let index = $(this).val();
        currentEvent = index;
        console.log('current event', currentEvent);
        for (var key in events[index]) {
            $(`#${key}`).val(events[index][key]);
        }        
    });

    $('.add-event').click(function() {
        $(".event-input").each(function() {
            $(this).val('');
        });      
    });
    
    // submit new job or job edit to database
    $("#submit").click(function(){
        let newJob = {};

        $(".input").each(function() {
            newJob[$(this).attr('name')] = $(this).val().trim();
        });

        let url = "/api/job";
        let type = "POST";
        if (!isNaN(id)) {
            url += "/"+id
            type = "PUT"
        }
        $.ajax(url, {
            type: type,
            data: newJob
        }).then(
            function(data) {
                if (isNaN(id)) {
                    console.log(data.id);
                    id = data.id;
                    console.log(id);
                }
                updateEvents(id);
            });
    });

    function updateEvents(id) {
        // adding job_id to newly created events
        for (i = 0; i < events.length; i++) {
            if (isNaN(events[i].job_id)) {
                events[i]['job_id'] = id;
                console.log(events[i]);
            }
        }
        // loop through events, put/post accordingly
        for (i = 0; i < events.length; i++) {
            let eventType = 'PUT';
            // if event doesn't have id yet will be POST
            if (!(events[i]['id'])) {
                eventType = 'POST';    
            }
            $.ajax('/api/event', {
                type: eventType,
                data: events[i]
            }).then(
                function() {
                    console.log("created/edited new event");
                });
        }
        location.pathname = `/jobs`;
    }

    // adds or updates event in events array
    $(".submit-event").click(function(){
        let newEvent = {};
        $(".event-input").each(function() {
            newEvent[$(this).attr('name')] = $(this).val().trim();
        });
        
        if (currentEvent) {
            newEvent['job_id'] = id;
            newEvent['id'] = events[currentEvent]['id'];
            events[currentEvent] = newEvent;
            currentEvent = null;
            console.log('current event null', currentEvent)
        } else {
            events.push(newEvent);
        }
        renderEvents();
        console.log(events)
    
    });

    // logs events in events array
    $(".eventDiv").each(function() {
        console.log($(this).data());
    });

});