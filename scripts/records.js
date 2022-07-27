/*
  Name: David Letterman
  Date: 4/25/2022
  Assignment: Week 6 Lab
*/

function loadUserInformation() {
  let user = null;
  user = JSON.parse(localStorage.getItem("user"));

  if (user != null) {
    $("#div-user-section").empty();

    $("#div-user-section").append(
      "<p>User's Name: " +
      user.FirstName +
      " " + 
      user.LastName +
      "<br>New Password: " +
      "</p>"
    );
    $("#div-user-section").append(
      "<a href='#page-user-info' data-mini='true' " +
      "id='btn-edit-profile' data-role='button' data-icon='edit' data-inconpos=" +
      "'left' data-inline='true'>Edit Profile</a>"
    );
    $("#btn-edit-profile").buttonMarkup();
  }
}

$("#btn-add-record").click(function () {
  $("#btn-submit-record").val("Add");
  $("#btn-submit-record").button();
  $("#btn-submit-record").button("refresh");
});

$("#page-record-form").on("pageshow", function () {
  const formOperation = $("#btn-submit-record").val();

  if (formOperation == "Add") {
    clearRecordForm();
  } else if (formOperation == "Edit") {
    showRecordForm($("#btn-submit-record").attr("index-to-edit"));
  }
});

function clearRecordForm () {
  $("#data-date").val("");
  $("#data-screen-time").val("");
}

function checkRecordForm () {
  if ($("#data-date").val() > getCurrentDateFormatted()) {
    alert("The date can't be in the future.");
    return false;
  } else if ($("#data-date").val() == "") {
    alert("You need to enter a date.");
    return false;
  } else if ($("#data-screen-time").val() == "") {
    alert("You need to enter your screen time.");
    return false;
  } else if (parseFloat($("#data-screen-time").val()) < 0) {
    alert("You can't have negative screen time.")
    return false;
  } else {
    return true;
  }
}

$("#form-record").submit(function () {
  const formOperation = $("#btn-submit-record").val();

  if (formOperation == "Add") {
    if (addRecord()) {
      $.mobile.changePage("#page-records");
    }
  } else if (formOperation == "Edit") {
    if (editRecord($("#btn-submit-record").attr("index-to-edit"))) {
      $.mobile.changePage("#page-records");
      $("#btn-submit-record").removeAttr("index-to-edit");
    }
  }

  return false;
});

function addRecord() {
  if (checkRecordForm()) {
    const record = {
      Date: $("#data-date").val(),
      ScreenTime: $("#data-screen-time").val(),
    };

    try {
      let tbRecords = JSON.parse(localStorage.getItem("tbRecords"));

      if (tbRecords == null) {
        tbRecords = [];
      }

      tbRecords.push(record);
      tbRecords.sort(compareDates);
      localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
      alert("Saving Information");
      clearRecordForm();
      listRecords();

      return true;
    } catch (e) {
      if (window.navigator.vendor === "Google Inc.") {
        if (e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);

      return false;
    }
  } else {
    return false;
  }
}

function listRecords() {
  let tbRecords = null;
  tbRecords = JSON.parse(localStorage.getItem("tbRecords"));

  if (tbRecords != null) {
    tbRecords.sort(compareDates);

    $("#tbl-records").html(
      "<thead>" +
        "  <tr>" +
        "    <th>Date</th>" +
        "    <th>Screen Time</th>" +
        "    <th>Edit / Delete</th>" +
        "  </tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody"
    );

    for (let i = 0; i < tbRecords.length; i++) {
      const rec = tbRecords[i];
      $("#tbl-records tbody").append(
        "<tr>" +
         "  <td>" +
         rec.Date +
         "</td>" +
         "  <td>" +
         rec.ScreenTime +
         "</td>" +
         "  <td><a data-inline='true' data-mini='true' data-role='button'" +
         "href='#page-record-form' onclick='callEdit(" +
         i +
         ");' " +
         "data-icon='edit' data-iconpos='notext'></a>" +
         "    <a data-inline='true' data-mini='true' data-role='button' " +
         "href='#' onclick='callDelete(" +
         i +
         ");' data-icon='delete' " +
         "data-iconpos='notext'></a></td>" +
         "</tr>"
      );
    }

    $("#tbl-Records [data-role='button']").buttonMarkup();
  } else {
    $("#tbl-records").html("");
  }
  $("#tbl-records").table();
  $("#tbl-records").table("refresh");
}

function compareDates(record1, record2) {
  const date1 = new Date(record1.Date);
  const date2 = new Date(record2.Date);

  if (date1 > date2) {
    return 1;
  } else {
    return -1;
  }
}

$("#btn-clear-history").click(function() {
  localStorage.removeItem("tbRecords");
  listRecords();
  alert("All records have been deleted.");
});

function callDelete(index) {
  deleteRecord(index);
  listRecords();
}

function deleteRecord(index) {
  try {
    const tbRecords = JSON.parse(localStorage.getItem("tbRecords"));

    tbRecords.splice(index, 1);

    if (tbRecords.length == 0) {
      localStorage.removeItem("tbRecords");
    } else {
      localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
    }
  } catch (e) {
    if (window.navigator.vendor === "Google Inc.") {
      if (e === DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }
    } else if (e === QUOTA_EXCEEDED_ERR) {
      alert("Error: Saving to local storage.");
    }

    console.log(e);
  }
}

function callEdit(index) {
  $("#btn-submit-record").attr("index-to-edit", index);
  $("#btn-submit-record").val("Edit");
  $("#btn-submit-record").button();
  $("#btn-submit-record").button("refresh");
}

function showRecordForm(index) {
  const tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
  const rec = tbRecords[index];
    
  $("#data-date").val(rec.Date);
  $("#data-screen-time").val(rec.ScreenTime);
}

function editRecord(index) {
  if (checkRecordForm()) {
    try {
      const tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
      tbRecords[index] = {
        Date: $("#data-date").val(),
        ScreenTime: $("#data-screen-time").val(),
      };

      tbRecords.sort(compareDates);
      localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
      alert("Saving Information");
      clearRecordForm();
      listRecords();

      return true;
    } catch (e) {
      if (window.navigator.vendor === "Google Inc.") {
        if (e === DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Saving to local storage.");
        }
      } else if (e === QUOTA_EXCEEDED_ERR) {
        alert("Error: Saving to local storage.");
      }

      console.log(e);

      return false;
    }
  } else {
    return false;
  }
}