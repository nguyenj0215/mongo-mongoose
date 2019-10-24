//On click of an articles scraped class of appended p tags
$(document).on("click", ".articlesScraped", function () {
  // Empty the notes from the note section
  $("#comments").empty();
  // Save the id from the p tag
  let thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      $("#comments").append("<p class='commentTitleBox'>" + data.title + "</p>");
      // An input to enter a new title
      $("#comments").append("<input id='titleinput' name='title' placeholder='Comment Title'>");
      // A textarea to add a new note body
      $("#comments").append("<textarea id='bodyinput' name='body' placeholder='Comment Body' ></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='savecomments'>Save</button>");
      // A button to delete a new note, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='deletecomments'>Delete</button>");

      // If there's a note in the article
      if (data.comment) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    });
})
// When you click the savenote button
$(document).on("click", "#savecomments", function () {
  // Grab the id associated with the article from the submit button
  let thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Empty the notes section
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When user clicks the delete button for a note
$(document).on("click", "#deletecomments", function () {
  // Save the p tag that encloses the button
  let thisId = $(this).attr("data-id");
  console.log(thisId)
  $.ajax({
    url: '/comments/' + thisId,
    method: "GET"
  }).then(function (data) {
    // Empty the notes section
    $("#comments").empty();
  });
  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});