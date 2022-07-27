/*
  Name: David Letterman
  Date: 4/25/2022
  Assignment: Week 6 Lab
*/

/*
  Adds a pageshow handler
*/

$(document).on("pageshow", function() {
  const activePageId = $(".ui-page-active").attr("id")
  if (activePageId == "page-user-info") {
    showUserForm();
  } else if (activePageId == "page-records") {
    loadUserInformation();
    listRecords();
  } else if (activePageId == "page-advice") {
    showAdvice();
    resizeGraph();
  } else if (activePageId == "page-graph") {
    showGraph();
    resizeGraph();
  }
});

/*
  resizeGraph will check if the width of the window is less than 700px.  If it
  is then it will change the width of the advice canvas and graph canvas to be
  75px smaller than the window width
*/
function resizeGraph() {
  if ($(window).width() < 700) {
    $("#canvas-advice").css({"width": $(window).width() - 75});
    $("#canvas-graph").css({"width": $(window).width() - 75});
  }
}