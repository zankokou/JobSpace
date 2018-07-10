$(document).ready(function(){
    console.log('JS FILE LOADED!!! ready to do ajax calls to hit up routes and grab some data!!!');

    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $('#wrapper').toggleClass("menuDisplayed");
    });

    var $newItemInput = $("#burger");
    // Our new todos will go inside the todoContainer
    var $todoContainer = $(".todo-container");
    var $devouredContainer = $(".devoured-container");
    var $buttonContainer = $(".buttons");
  
    // Adding event listeners for deleting, editing, and adding todos
    $(document).on("click", "button.delete", deleteTodo);
    $(document).on("click", ".complete", toggleComplete);
    $(document).on("click", ".todo-item", editTodo);
    $(document).on("keyup", ".todo-item", finishEdit);
    $(document).on("blur", ".todo-item", cancelEdit);
    $(document).on("click", "#addBurger", insertTodo);
  
    // Our initial todos array
    var todos = [];
  
    // Getting todos from databa se when page loads
    getTodos();
  
    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
      $todoContainer.empty();
      $devouredContainer.empty();
      $buttonContainer.empty();
      var rowsToAdd = [];
      var devouredRows = [];
      var buttonRows = [];
      for (var i = 0; i < todos.length; i++) {
  
        if (todos[i].complete) {
          devouredRows.push(createNewRow(todos[i]));
        } else {
          rowsToAdd.push(createNewRow(todos[i]));
  
          var $newButtonRow = $(
            [
              "<div class='list'><button class='complete'>DEVOUR</button></div>"
            ].join("")
          );
          $newButtonRow.data("todo", todos[i]);
          buttonRows.push($newButtonRow);
        }
      }
      $buttonContainer.prepend(buttonRows);
      $todoContainer.prepend(rowsToAdd);
      $devouredContainer.prepend(devouredRows);
    }
  
    // This function grabs todos from the database and updates the view
    function getTodos() {
      $.get("/api/todos", function(data) {
        todos = data;
        initializeRows();
      });
    }
});

