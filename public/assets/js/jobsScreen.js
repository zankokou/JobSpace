$(document).ready(function(){

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
        "<div class='list'>",
        job.company, ". ",
        job.title, "  ",
        // "<button class='delete btn btn-danger'>x</button>",
        "</div>",
        // "<input type='text' class='edit' style='display: none;'>",
        // "<button class='complete btn btn-primary'>✓</button>",
        // "</li>"
      ].join("")
    );

    // $newInputRow.find("button.delete").data("id", todo.id);
    // $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("job", job);
    // if (todo.complete) {
    //   $newInputRow.find("span").css("text-decoration", "line-through");
    // }
    return $newInputRow;
  }
  
    // This function grabs todos from the database and updates the view
    function getJobs() {
      $.get("/api/jobs", function(data) {
        jobs = data;
        console.log(jobs);
        initializeRows();
      });
    }
});

