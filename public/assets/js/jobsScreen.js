$(document).ready(function () {

  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $('#wrapper').toggleClass("menuDisplayed");
  });

  $("#add-job").click(function () {
    location.pathname = '/edit';
  });

  var $appliedContainer = $("#applied-container");
  var $interviewedContainer = $("#interviewed-container");
  var $offeredContainer = $("#offered-container");
  var $archivedContainer = $("#archived-container");

  $(document).on("click", ".edit", editJob);


  function editJob(event) {
    event.stopPropagation();
    var job = $(this).attr("id");
    console.log(job);
    location.pathname = `/edit/${job}`;
  }
  
  var jobs = [];

  getJobs();

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

  function createNewRow(job) {
    var $newInputRow = $(
      [
        `<li id='${job.id}' class='btn list-modal' data-toggle='modal' data-target='#basicModal' data="${job.id}" `,"<br>",
         `<h4 id='job-name'><b><u>${job.company}</u></b></h4>`, "<br>", `<i>${job.title}`, "<br>", 
        // "<button class='delete btn btn-danger'>x</button>",
        "<br>",
        // "<input type='text' class='edit' style='display: none;'>",
        // `<span><button class='edit btn btn-primary' id='${job.id}'>Edit</button></span>`,
        "</li>"

      ].join("")
    );

    $newInputRow.find("button.edit").data("id", job.id);
    $newInputRow.data("job", job);
    return $newInputRow;
  }


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