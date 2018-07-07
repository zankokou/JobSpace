$(document).ready(function() {
  // Getting a reference to the input field where user adds a new todo
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

  // This function deletes a todo when the user clicks the delete button
  function deleteTodo(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/todos/" + id
    }).then(getTodos);
  }

  // This function handles showing the input box for a user to edit a todo
  function editTodo() {
    var currentTodo = $(this).data("todo");
    $(this).children().hide();
    $(this).children("input.edit").val(currentTodo.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var todo = $(this).parent().data("todo");
    todo.complete = !todo.complete;
    updateTodo(todo);
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedTodo = $(this).data("todo");
    if (event.which === 13) {
      updatedTodo.text = $(this).children("input").val().trim();
      $(this).blur();
      updateTodo(updatedTodo);
    }
  }

  // This function updates a todo in our database
  function updateTodo(todo) {
    $.ajax({
      method: "PUT",
      url: "/api/todos",
      data: todo
    }).then(getTodos);
  }

  // This function is called whenever a todo item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentTodo = $(this).data("todo");
    if (currentTodo) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentTodo.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a todo-item row
  function createNewRow(todo) {
    var $newInputRow = $(
      [
        "<div class='list'>",
        todo.id, ". ",
        todo.text, "  ",
        "<button class='delete btn btn-danger'>x</button>",
        "</div>",
        // "<input type='text' class='edit' style='display: none;'>",
        // "<button class='complete btn btn-primary'>✓</button>",
        // "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", todo.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", todo);
    if (todo.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new todo into our database and then updates the view
  function insertTodo(event) {
    event.preventDefault();
    var todo = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/todos", todo, getTodos);
    $newItemInput.val("");
  }
});


// when user enters name and clicks on 'DEVOUR' button
//   checks if name matches row in eaters table
//   if no match, create new eater
//      adds eater id to devoured_by column in burger table
//      displays eaten by ... in DEVOURED html section
