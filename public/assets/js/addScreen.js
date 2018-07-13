$(document).ready(function(){
    let id = Number(location.pathname.split('/')[2]);
    let events = [];
    
    if (!isNaN(id)) {
        $.ajax("/api/job/"+id).then(function(res) {
            for (var key in res[0]) {
                $(`#${key}`).val(res[0][key]);
            }
        });

        $.ajax("/api/event/"+id).then(function(res) {
            for (i = 0; i < res.length; i++) {
                events.push(res[i]);
            }
           if (events.length > 0) {
               renderEvents();
           } 
        });
    }

    console.log(events);

    function renderEvents () {
        $('#eventSection').empty();
        for (i = 0; i < events.length; i++) {
            $('#eventSection').append('<div>' + event2div(events[i], i) + '</div>');
        }
    }

    let currentEvent = null;

    function event2div (event, i) {
        return `NAME: ${event.name} <button type="button" class="editModal btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" value="${i}">edit</button>
        <button class="deleteEvent" value="${i}">X</button>`;
    }

    $('body').on('click', '.deleteEvent', function() {
        let index = $(this).val();
        let eventId = events[index]['id'];
        console.log('event id', eventId);
        currentEvent = index;
        console.log(currentEvent);
        events.splice(index, 1);
        console.log(events);
        // Send the DELETE request.
        $.ajax("/api/events/" + eventId, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted cat", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });

    $('body').on('click', '.editModal', function() {
        let index = $(this).val();
        currentEvent = index;
        for (var key in events[index]) {
            $(`#${key}`).val(events[index][key]);
        }        
    });
    
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
        // Send the POST request.
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
        for (i = 0; i < events.length; i++) {
            if (isNaN(events[i].job_id)) {
                events[i]['job_id'] = id;
                console.log(events[i]);
            }
        }
        for (i = 0; i < events.length; i++) {
            if (!events[i].id) {
            console.log(events[i]);
            console.log('dude');
            $.ajax('/api/event', {
                type: 'POST',
                data: events[i]
            }).then(
                function() {
                    console.log("created/edited new event");
                    // Reload the page to get the updated list
                    // location.reload();
                }
            );
            }
        }
        location.pathname = `/jobs`;
    }


    $(".submit-event").click(function(){
        let newEvent = {};
        newEvent['job_id'] = id;
        $(".event-input").each(function() {
            newEvent[$(this).attr('name')] = $(this).val().trim();
        });
        
        if (currentEvent) {
            events[currentEvent] = newEvent;
            currentEvent = null;
        } else {
            events.push(newEvent);
        }
        renderEvents();
        console.log(events)
    
    });

    $(".eventDiv").each(function() {
        console.log($(this).data());
    });

    $(".delete-cat").on("click", function(event) {
        var id = $(this).data("id");
    
        // Send the DELETE request.
        $.ajax("/api/cats/" + id, {
          type: "DELETE"
        }).then(
          function() {
            console.log("deleted cat", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
    });
});