/*
  Name: David Letterman
  Date: 4/24/2022
  Assignment: Week 6 Lab
*/

function checkUserForm() {
    if(($("#data-first-name").val()!= "") &&
    ($("#data-last-name").val()!= "") &&
    ($("#data-new-password").val()!= "")) {
        return true;
    } else {
        return false;
    }
}

function getCurrentDateFormatted () {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate =
      year +
      "-" +
      (("" + month).length < 2 ? "0" : "") +
      month +
      "-" +
      (("" + day).length < 2 ? "0" : "") +
      day;

    return formattedDate;
}

$("#form-user-info").submit( function () {
    saveUserForm();
    return false;
});

function saveUserForm() {
    if(checkUserForm()) {
        const user = {
            FirstName  : $("#data-first-name").val(),
            LastName  : $("#data-last-name").val(),
            NewPassword  : $("#data-new-password").val() 
        };

        try {
            localStorage.setItem("user", JSON.stringify(user));
            alert("Saving Information");

            $.mobile.changePage("#pageMenu");
            window.location.reload();
        } catch(e) {
            if (window.navigator.vendor==="Google Inc") {
                if( e === DOMException.QUOTA_EXCEEDED_ERR) {
                    alert("Error: Saving to local storage.");
                }
            } else if (e == QUOTA_EXCEEDED_ERR) {
                alert("Error: Saving to local storage.");
            }

            console.log(e);
        }
    }
}

function showUserForm() {
    let user = null;
    user = JSON.parse(localStorage.getItem("user"));

    if (user != null) {
        $("#data-first-name").val(user.FirstName);
        $("#data-last-name").val(user.LastName);
        $("#data-new-password").val(user.NewPassword);
    }
}
