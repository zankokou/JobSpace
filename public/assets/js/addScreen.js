$(document).ready(function(){
    let id = Number(location.pathname.split('/')[2]);
    if (!isNaN(id)) {
        $.ajax("/api/job/"+id).then(function(res) {
            for (var key in res[0]) {
                $(`#${key}`).val(res[0][key]);
            }
        });

        $('#events-section').css('display', 'block');
        $.ajax("/api/event/"+id).then(function(res) {

            console.log(res);
        });
    }

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
                // Reload the page to get the updated list
                // location.reload();
                location.pathname = '/jobs';
            }
        );
    });

    $("#add-event").click(function(){
        // let newEvent = {};

        // $(".input").each(function() {
        //     newJob[$(this).attr('name')] = $(this).val().trim();
        // });

        // let url = "/api/job";
        // let type = "POST";
        // if (!isNaN(id)) {
        //     url += "/"+id
        //     type = "PUT"
        // }
        // // Send the POST request.
        // $.ajax(url, {
        //     type: type,
        //     data: newJob
        // }).then(
        //     function() {
        //         console.log("created/edited new job");
                // Reload the page to get the updated list
                // location.reload();
                
                // if id is NaN, need to make it 
                location.pathname = `/event/${id}`;
        //     }
        // );
    });


})