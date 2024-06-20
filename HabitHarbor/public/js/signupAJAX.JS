function validateForm() {
  var currentTabElement = formPages[currentTab];
  var fields = currentTabElement.find("input:not([type=button]):not([type=submit]), select");

  // Check if all fields in the current tab are filled and valid
  for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      if (!field.checkValidity()) {
          alert("Please fill in all fields correctly.");
          return false;
      }

      // Additional custom validation for specific fields using regex patterns
      switch (field.id) {
          case "fname":
          case "lname":
              if (!isValidName(field.value)) {
                  alert("Please enter a valid name.");
                  return false;
              }
              break;
          case "email":
              if (!isValidEmail(field.value)) {
                  alert("Please enter a valid email address.");
                  return false;
              }
              break;
          case "number":
              if (!isValidPhoneNumber(field.value)) {
                  alert("Please enter a valid phone number.");
                  return false;
              }
              break;
          case "weight":
          case "height":
              if (!isValidNumber(field.value)) {
                  alert("Please enter a valid number.");
                  return false;
              }
              break;
          case "username":
              if (!isValidUsername(field.value)) {
                  alert("Please enter a valid username.");
                  return false;
              }
              break;
          case "password":
              if (!isValidPassword(field.value)) {
                  alert("Please enter a valid password.");
                  return false;
              }
              break;
          case "gender":
              if (!isValidGender(field.value)) {
                  alert("Please select a valid gender.");
                  return false;
              }
              break;
          default:
              // No specific validation needed for other fields
              break;
      }
  }

  // Proceed to the next tab
  if (currentTab < formPages.length - 1) {
      currentTab++;
      showTab(currentTab);
  } else {
      // Submit form using jQuery AJAX
      var formData = {};
      $("#signupForm").serializeArray().forEach(function(field) {
          formData[field.name] = field.value;
      });

      $.ajax({
          url: '/user/checkUN',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(formData),
          success: function(response) {
              $('#result').html('Form submitted successfully! ', response);

              if (response == 'taken') {
                  $('#result').css("color", "red");
              } else {
                  $('#result').css("color", "green");
              }
          },
          error: function(xhr, status, error) {
              alert("Error submitting form: " + error);
          }
      });
  }

  return false; // Prevent form submission
}

// Regex pattern functions
function isValidName(name) {
  return /^[a-zA-Z'-]+$/.test(name);
}

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPhoneNumber(number) {
  return /^[\+]?[\d\s\-()]+$/.test(number);
}

function isValidNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9_]{4,20}$/.test(username);
}

function isValidPassword(password) {
  // Requires at least 8 characters including at least one uppercase letter, one lowercase letter, one digit, and one special character
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

function isValidGender(gender) {
  return /^(Male|Female|Other)$/.test(gender);
}