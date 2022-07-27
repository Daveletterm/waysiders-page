/*
  Assignment: Screen Time Tracking App
  Author: David Letterman
  Date: 5/1/2022
  Purpose: To assist in the tracking of the user's screen time
*/

/*
  showGraph will try to get the tbRecords from localStorage.  If there are
  no records, then it will alert the user and return to the menu page.
  Otherwise, it will set-up the canvas and draw a line graph showing the 
  TSH values over time in the records and lines for the lower and upper
  bound of the target TSH range
*/
function showGraph() {
    try {
      const tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
  
      if (tbRecords == null) {
        alert("No records exist yet");
  
        $(location).attr("href", "#page-menu");
      } else {
        setupCanvas();
  
        const screenTimeArr = new Array();
        const dateArr = new Array();
        getScreenTimeHistory(screenTimeArr, dateArr);
  
        drawLines(screenTimeArr, dateArr);
        labelAxes();
      }
    } catch(e) {
      if (window.navigator.vendor === "Google Inc.") {
        if(e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }
  
      console.log(e);
    }
  }
  
  /*
    setupCanvas will get the canvas-graph element and will add a rectangle for
    the background to the context of the canvas
  */
  function setupCanvas() {
    const canvas = document.getElementById("canvas-graph");
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, 500, 500);
  }
  
  /*
    getScreenTimeHistory will take in an empty array for scree time values and an empty array 
    for date values and try to fill it with the values from tbRecords in local
    storage.
  */
  function getScreenTimeHistory(screenTimeArr, dateArr) {
    try {
      const tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
  
      for (let i = 0; i < tbRecords.length; i++) {
        const currRecord = tbRecords[i];
        
        const currDateAsArr = currRecord.Date.split("-");
        const month = currDateAsArr[1];
        const day = currDateAsArr[2];
        dateArr[i] = (month + "/" + day);
  
        screenTimeArr[i] = parseFloat(currRecord.ScreenTime);
      }
    } catch(e) {
      if (window.navigator.vendor === "Google Inc.") {
        if(e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }
  
      console.log(e);
    }
  }
  
  /*
    getTSHBounds takes in an empty array for the lower TSH bound values and an
    empty array for the upper TSH bound values.  It will try to get the user
    from local storage to determine and fill in these bound arrays.
  */
  function getScreenTimeBounds(screenTimeUpper) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const screenTimeLevel = user.ScreenTime;
  
      if (screenTimeLevel < 60) {
        screenTimeUpper[0] = 60; 
        screenTimeUpper[1] = 60;

      } else {
        screenTimeUpper[0] = 300;
        screenTimeUpper[1] = 300;
    
      }
    } catch(e) {
      if (window.navigator.vendor === "Google Inc.") {
        if(e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }
  
      console.log(e);
    }
  }
  
  /*
    drawLines will take in an array representing the screen time values, an array
    representing the date values, and an array representing the upper bound.  It will use these values to draw
    a line graph and add it to the canvas-graph element.
  */
  function drawLines(screenTimeArr, dateArr, screenTimeUpper) {
    const screenTimeLine = new RGraph.Line("canvas-graph", screenTimeArr, screenTimeUpper)
      .Set("labels", dateArr)
      .Set("colors", ["blue", "green"])
      .Set("shadow", true)
      .Set("shadow.offsetx", 1)
      .Set("shadow.offsety", 1)
      .Set("linewidth", 1)
      .Set("numxticks", 6)
      .Set("scale.decimals", 2)
      .Set("xaxispos", "bottom")
      .Set("gutter.left", 40)
      .Set("tickmarks", "filledcircle")
      .Set("ticksize", 5)
      .Set("chart.labels.ingraph", [,["Screen Time", "blue", "yellow", 1, 50]])
      .Set("chart.title", "Screen Time")
      .Draw();
  }
  
  /*
    labelAxes will get the context of the canvas-graph element and add text
    for the x and y axis labels
  */
  function labelAxes() {
    const canvas = document.getElementById("canvas-graph");
    const context = canvas.getContext("2d");
  
    context.font = "11px Georgia";
    context.fillStyle = "green";
    context.fillText("Date (MM/DD)", 400, 470);
    context.rotate(-Math.PI / 2);
    context.textAlign = "center";
    context.fillText("Screen Time", -250, 10);
  }