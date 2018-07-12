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
        <button class="deleteEvent">X</button>`;
    }

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
            function() {
                console.log("created/edited new job");
                location.pathname = '/jobs';
            }
        );
    });


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

        // let newDiv = $('<div>').html('hai');
        // newDiv.data(newEvent);
        // newDiv.addClass('eventDiv')
        // $('#eventSection').append(newDiv);
    
    });

    $(".eventDiv").each(function() {
        console.log($(this).data());
    });

})