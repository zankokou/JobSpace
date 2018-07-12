$(document).ready(function(){
    let id = Number(location.pathname.split('/')[2]);
    // let jobId = Number(location.pathname.split('/')[3]);
    // if (!isNaN(jobId)) {
    //     $.ajax("/api/job/"+id).then(function(res) {
    //         for (var key in res[0]) {
    //             $(`#${key}`).val(res[0][key]);
    //         }
    //     });
    // }

    $("#submit").click(function(){
        let newJob = {};

        newJob['job_id'] = id;
        $(".input").each(function() {
            newJob[$(this).attr('name')] = $(this).val().trim();
        });

        let url = "/api/event";
        let type = "POST";
        // if (!isNaN(id)) {
        //     url += "/"+id
        //     type = "PUT"
        // }
        // Send the POST request.
        $.ajax(url, {
            type: type,
            data: newJob
        }).then(
            function() {
                console.log("created/edited new job");
                // Reload the page to get the updated list
                // location.reload();
                location.pathname = `/edit/${id}`;
            }
        );
    });


})