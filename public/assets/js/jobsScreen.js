$(document).ready(function () {

  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $('#wrapper').toggleClass("menuDisplayed");
  });

  $("#add-job").click(function () {
    location.pathname = '/edit';
  });

  // var $newItemInput = $("#burger");
  // // Our new todos will go inside the todoContainer
  var $appliedContainer = $("#applied-container");
  var $interviewedContainer = $("#interviewed-container");
  var $offeredContainer = $("#offered-container");
  var $archivedContainer = $("#archived-container");

  $(document).on("click", ".edit", editJob);

  // $(document).on("click", ".complete", toggleComplete);

  function editJob(event) {
    event.stopPropagation();
    var job = $(this).attr("id");
    console.log(job);
    location.pathname = `/edit/${job}`;

  }
  // // Adding event listeners for deleting, editing, and adding todos
  // $(document).on("click", "button.delete", deleteTodo);
  // $(document).on("click", ".complete", toggleComplete);
  // $(document).on("click", ".todo-item", editTodo);
  // $(document).on("keyup", ".todo-item", finishEdit);
  // $(document).on("blur", ".todo-item", cancelEdit);
  // $(document).on("click", "#addBurger", insertTodo);

  // Our initial todos array
  var jobs = [];

  // Getting todos from databa se when page loads
  getJobs();

  // This function resets the todos displayed with new todos from the database
  // function initializeRows() {
  //   $todoContainer.empty();
  //   $devouredContainer.empty();
  //   $buttonContainer.empty();
  //   var rowsToAdd = [];
  //   var devouredRows = [];
  //   var buttonRows = [];
  //   for (var i = 0; i < todos.length; i++) {

  //     if (todos[i].complete) {
  //       devouredRows.push(createNewRow(todos[i]));
  //     } else {
  //       rowsToAdd.push(createNewRow(todos[i]));

  //       var $newButtonRow = $(
  //         [
  //           "<div class='list'><button class='complete'>DEVOUR</button></div>"
  //         ].join("")
  //       );
  //       $newButtonRow.data("todo", todos[i]);
  //       buttonRows.push($newButtonRow);
  //     }
  //   }
  //   $buttonContainer.prepend(buttonRows);
  //   $todoContainer.prepend(rowsToAdd);
  //   $devouredContainer.prepend(devouredRows);
  // }

  function initializeRows() {
    $appliedContainer.empty();
    $interviewedContainer.empty();
    $archivedContainer.empty();
    $offeredContainer.empty();
    var appliedArr = [];
    var interviewedArr = [];
    var offeredArr = [];
    var archivedArr = [];
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].stage === 'applied') {
        appliedArr.push(createNewRow(jobs[i]));
      } else if ((jobs[i].stage === 'phone interviewed') || (jobs[i].stage === 'in person interviewed')) {
        interviewedArr.push(createNewRow(jobs[i]));
      } else if (jobs[i].stage === 'offered') {
        offeredArr.push(createNewRow(jobs[i]));
      } else if (jobs[i].stage === 'archived') {
        archivedArr.push(createNewRow(jobs[i]));
      }
    }
    $appliedContainer.prepend(appliedArr);
    $interviewedContainer.prepend(interviewedArr);
    $offeredContainer.prepend(offeredArr);
    $archivedContainer.prepend(archivedArr);
  }

  // This function constructs a todo-item row
  function createNewRow(job) {
    var $newInputRow = $(
      [
        `<li id='${job.id}' class='btn list-modal' data-toggle='modal' data-target='#basicModal' data="${job.id}" `,"<br>",
         `<h4><b><u>${job.company}</u></b>`, "<br>", `<i>${job.title}`, "<br>", 
        // "<button class='delete btn btn-danger'>x</button>",
        "<br>",
        // "<input type='text' class='edit' style='display: none;'>",
        // `<span><button class='edit btn btn-primary' id='${job.id}'>Edit</button></span>`,
        "</li>"

      ].join("")
    );

    $newInputRow.find("button.edit").data("id", job.id);
    // $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("job", job);
    // if (todo.complete) {
    //   $newInputRow.find("span").css("text-decoration", "line-through");
    // }
    return $newInputRow;
  }


  // This function grabs todos from the database and updates the view
  function getJobs() {
    $.get("/api/jobs", function (data) {
      jobs = data;
      console.log(jobs);
      initializeRows();
    });
  }

  //Sortable --
  $(function () {
    console.log("workk");
    $("#applied-container, #interviewed-container, #archived-container, #offered-container").sortable({
      connectWith: ".sortable",
    }).disableSelection();
  });

  var data_id;
  var prelocation;
  $("#applied-container, #interviewed-container, #archived-container, #offered-container").sortable({
    start: function(e, ui) {
      // creates a temporary attribute on the element with the old id
      // prelocation = $(this.children).attr('data-prelocate', this.id);
      prelocation = $(this).val();
      data_id = $(this.children).attr("data");

      console.log("start point")
      console.log("data:" + data_id);
      console.log($(this.children));
      console.log('=====================');

  },
    receive: function(e, ui) {
      let job_id = data_id;
      // let old_position = prelocation.attr('data-prelocate');
      let current_position = $(this).attr('data-stage');

      //reset the old positon
      $(this).removeAttr('data-prelocate');
      data_id = 0;
      prelocation = 0;
      
      
      console.log("job-id: " + job_id);
      // console.log("old: " + old_position);
      console.log("new: " + current_position);
      console.log('=====================');
      // console.log(ui.item.context.offsetParent.classList[2]);
      var newData = {
        "stage": current_position
      }
      //Post to the server to handle the changes
      $.ajax(`/api/drag/${job_id}`, {
        type: "PUT",
        data: newData
      }).then(
        function(data) {
          console.log("its work !!");
        }
      );
    // },
    //     beforeSend: function() {
    //         // Disable dragging
    //         $("#applied-container, #interviewed-container, #archived-container, #offered-container").sortable('disable');
    //     },
    //     success: function(html) {
    //         // Re-enable dragging
    //         $("#applied-container, #interviewed-container, #archived-container, #offered-container").sortable('enable');
    //     }
    // });
  }
});
  //click on jobs to open modal
  //dynamic modal
  var $header = $('#basicModal .modal-header'),
    $body = $('#basicModal .modal-body'),
    $footer = $('#basicModal .modal-footer');

  $(document).on("click", ".list-modal", modalJob);



  // modal injection
  function modalJob(event) {
    event.stopPropagation();
    var job = $(this).attr("id");
    console.log(job);
    $.ajax("/api/job/"+job).then(function(res) {
      var data = res[0];
      console.log(res)
      // console.log(data.company);
      $header.html(`<h1 class='modal-title'>${data.company} <br> ${data.title}</h1>`)
      $body.html(`<h4>${data.description}</h4><h2>Contact: ${data.primary_contact_name} <br> Phone: ${data.primary_contact_phone} <br> Salary: $${data.salary}`)
      $footer.html(`<span><button class='edit btn btn-info btn-lg modal-button' id='${job}'>Edit</button></span> <button type="button" class="btn btn-lg btn-info modal-button" data-dismiss="modal">Close</button>`)
      
    
  });
  }

});