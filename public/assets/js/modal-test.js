$(".rename").click(function(e){
    e.preventDefault();
    var $this = $(this);
    var fileName = $(this).data("file");
      $("#basicModal").data("fileName", fileName).modal("toggle", $this);
    
  });
  
  $("#basicModal").on("shown.bs.modal", function(e){
    //data-fileName attribute associated with the modal added in the click event of the button
  alert($(this).data("fileName"));
    //my data-file associated with the button 
    alert($(e.relatedTarget).data("file"));
  })
  
   