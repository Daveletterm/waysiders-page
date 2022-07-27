/*
  Name: David Letterman
  Date: 5/1/2022
  Assignment: Week 7 Lab
*/

/*
  showAdvice will try to get the tbRecords from localStorage.  If there are
  no records, then it will alert the user and return to the menu page.
  Otherwise, it will get the user and most recent record from tbRecords.
  It will get the TSH Range from the user and the TSH value from the 
  most recent record and use those to draw the advice gauge and display
  the suggested actions.
*/
function showAdvice() {
  try {
    const tbRecords = JSON.parse(localStorage.getItem("tbRecords"));

    if (tbRecords == null) {
      alert("No records exist yet");

      $(location).attr("href", "#page-menu");
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      const screenTimeLevel = user.ScreenTime;

      const canvas = document.getElementById("canvas-advice");
      const context = canvas.getContext("2d");
      context.fillStyle = "#C0C0C0";
      context.fillRect(0, 0, 550, 550);
      context.font = "22px Arial";
      drawAdviceCanvas(context, screenTimeLevel);
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
  drawAdviceCanvas takes in a 2d context of a canvas, a target TSH level, and 
  a TSH value.  It will add text to the context stating the TSH value, the 
  target TSH level, the advice based on the TSH value with respect to the 
  target TSH level, and draw the gauge based on the given values.
*/
function drawAdviceCanvas(context, screenTimeLevel) {
  context.font = "22px Arial";
  context.fillStyle = "black";
  context.fillText("Your current screen time is " + screenTimeLevel + ".", 25, 320);

  if (screenTimeLevel < 60) {
    context.fillText("Your target screen time range is 60 minutes.", 25, 350);
    levelAWrite(context, screenTimeLevel);
    levelAMeter(context, screenTimeLevel);
  } else if (screenTimeLevel >= 60) {
    context.fillText("Your target screen time range is 60 minutes.", 25, 350);
    levelBWrite(context, screenTimeLevel);
    levelBMeter(context, screenTimeLevel);
  }
}

/*
  levelAWrite will take in a 2d context of a canvas and a TSH value.  It will
  write the advice to the context based on the TSH value using ranges for level
  A.
*/
function levelAWrite(context, screenTimeLevel) {
  if (screenTimeLevel <= 60) {
    writeAdvice(context, "green");
  } else if ((screenTimeLevel > 60) && (screenTimeLevel <= 300)) {
    writeAdvice(context, "yellow");
  } else {
    writeAdvice(context, "red");
  }
}

/*
  writeAdvice will take in a 2d context of a canvas and a level color as a
  string that represents the advice rating that is needed.  It will write the
  corresponding advice message to the context.
*/
function writeAdvice(context, screenTimeLevel) {
  let adviceLine1 = "";
  let adviceLine2 = "";

  if (screenTimeLevel == "red") {
    adviceLine1 = "Please cut back on the the screen time";
    adviceLine2 = "and contact a physician urgently.";
  } else if (screenTimeLevel == "yellow") {
    adviceLine1 = "Take it easy on the screen time";
    adviceLine2 = "you're going to wreck your eyesight.";
  } else if (screenTimeLevel == "green") {
    adviceLine1 = "Keep up the good work.";
  }

  context.fillText("Your screen time is is " + screenTimeLevel + ".", 25, 380);
  context.fillText(adviceLine1, 25, 410);
  context.fillText(adviceLine2, 25, 440);
}

/*
  levelAMeter will take in a 2d context of a canvas and a TSH value.  It will
  check if the TSH value is less than or equal to 3.  If it is, it will create
  a corner gauge based with an upper bound of 3.  Otherwise, it will create a 
  corner gauge with an upper bound of the TSH value.  Finally, it will
  draw the gauge on the context. Assumes a level A TSH value.
*/
function levelAMeter(context, screenTimeLevel) {
  let gauge;
  if (tsh <= 3) {
    gauge = new RGraph.CornerGauge("canvas-advice", 0, 3, screenTimeLevel)
      .Set("chart.colors.ranges", [[0.5, 3, "red"], [0.1, 0.5, "yellow"],
      [0.01, 0.1, "green"]]);
  } else {
    gauge = new RGraph.CornerGauge("canvas-advice", 0, screenTimeLevel)
      .Set("chart.colors.ranges", [[0.5, 3, "red"], [0.1, 0.5, "yellow"],
      [0.01, 0.1, "green"], [3.01, screenTimeLevel, "red"]]);
  }
  drawMeter(gauge);
}

/*
  drawMeter will take in a corner gauge object and apply final settings for
  this gauge representing the TSH Level and draw it
*/
function drawMeter(gauge) {
  gauge.Set("chart.value.text.units.post", " muU/L")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "SCREEN TIME LEVEL")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}