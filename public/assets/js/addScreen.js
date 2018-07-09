$(document).ready(function(){

    $("button").click(function(){
        let newJob = {};

        $("input").each(function() {
            newJob[$(this).attr('name')] = $(this).val().trim();
        });

        newJob["stage"] = $("#stage").val().trim();

        // Send the POST request.
        $.ajax("/api/job", {
            type: "POST",
            data: newJob
        }).then(
            function() {
                console.log("created new job");
                // Reload the page to get the updated list
                location.reload();
            }
        );






    });


})