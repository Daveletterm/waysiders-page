/*
  Name: David Letterman
  Date: 4/24/2022
  Assignment: Week 6 Lab
*/

/*
  initializeKeypadButtons goes through each of the buttons in the keypad element
  and initializes them with a click event handler for addValueToPassword based 
  on its text content
*/

function initializeKeypadButtons() {
    const keypad = document.getElementById("keypad");
    if (keypad) {
      const keypadButtons = [...keypad.querySelectorAll("a[data-role='button']")];
      keypadButtons.forEach(button => {
        button.addEventListener("click", () => addValueToPassword(button.textContent));
      });
    }
  }

/*
  addValueToPassword takes in a value representing the key pressed. If it is 
  'del' we remove the last character of the value in the passcode element.
  Otherwise, we concatenate the value onto the end of the current value in the
  passcode element.
*/

function addValueToPassword(key) {
    const currVal = $("#data-password").val();
    if (key == "del") {
      $("#data-password").val(currVal.substring(0, currVal.length - 1));
    } else {
      $("#data-password").val(currVal.concat(key));
    }
  }

  function getPassword() {
    if (typeof Storage == "undefined") {
      alert("Your browser does not support HTML5 localStorage.  Try upgrading.");
    } else if (localStorage.getItem("user") != null) {
      return JSON.parse(localStorage.getItem("user")).NewPassword;
    } else {
      return "2345"; // default password
    }
  }
  
  $("#btn-enter-password").click(function () {
    const enteredPasscode = $("#data-password").val();
    const storedPasscode = getPassword();
  
    // This is to clear the password input after entering a password attempt
    $("#data-password").val("");
  
    if (enteredPasscode == storedPasscode) {
      // check if they have agreed to the legal disclaimer
      if (localStorage.getItem("agreedToLegal") == null) {
        $("#btn-enter-password").attr("href", "#page-disclaimer").blur();
      } else if (localStorage.getItem("agreedToLegal") == "true") {
        // check if a user profile has been saved yet
        if (localStorage.getItem("user") == null) {
          $("#btn-enter-password").attr("href", "#page-user-info").blur();
        } else {
          $("#btn-enter-password").attr("href", "#page-menu").blur();
        }
      }
    } else {
      // NOTE: This was added to prevent someone from returing to the login page and being able to enter without the correct password
      $("#btn-enter-password").attr("href", "#").blur();
  
      alert("Incorrect password, please try again.");
    }
  });

  $("#btn-notice-yes").click(function () {
    try {
      localStorage.setItem("agreedToLegal", "true");
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
  });