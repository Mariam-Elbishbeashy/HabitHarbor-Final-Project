// Sondos
//user.js

window.onload = function() {
  openGeneralOnly();
  var generalLink = document.getElementById('generalLink');
  generalLink.classList.add('active');
  generalLink.style.fontWeight = 'bold';
  generalLink.style.color = '#CAF746'; 
  toggleFontWeight('generalLink');
  starRating(); 
  calculateBMI();
};

//left panel 
function toggleOption(optionName) {
  var generalContent = document.getElementById("generalContent");
  var infoContent = document.getElementById("infoContent");
  var bmiContent = document.getElementById("bmiContent");
  var healthInfoContent = document.getElementById("healthInfoContent");
  var socialLinksContent = document.getElementById("socialLinksContent");
  var passwordContent = document.getElementById("passwordContent");
  var feedbackContent = document.getElementById("feedbackContent");

  var generalLink = document.getElementById("generalLink");
  var infoLink = document.getElementById("infoLink");
  var bmiLink = document.getElementById("bmiLink");
  var healthInfoLink = document.getElementById("healthInfoLink");
  var socialLinks = document.getElementById("socialLinksLink");
  var passwordLink = document.getElementById("passwordLink");
  var feedbackLink = document.getElementById("feedbackLink");

  generalContent.style.display = "none";
  infoContent.style.display = "none";
  bmiContent.style.display = "none";
  healthInfoContent.style.display = "none";
  socialLinksContent.style.display="none";
  passwordContent.style.display = "none";
  feedbackContent.style.display = "none";

  generalLink.classList.remove("active");
  infoLink.classList.remove("active");
  bmiLink.classList.remove("active");
  healthInfoLink.classList.remove("active");
  socialLinks.classList.remove("active");
  passwordLink.classList.remove("active");
  feedbackLink.classList.remove("active");

  if (optionName === "general") {
      generalContent.style.display = "block";
      generalLink.classList.add("active");

  } else if (optionName === "info") {
      infoContent.style.display = "block";
      infoLink.classList.add("active");

    }

    else if (optionName === "bmi") { 
      bmiContent.style.display = "block";
      bmiLink.classList.add("active");
  }
    
    else if (optionName === "healthInfo") {
      healthInfoContent.style.display = "block";
      healthInfoLink.classList.add("active");
  } 
else if (optionName === "socialLinks") {
  socialLinksContent.style.display = "block";
  socialLinks.classList.add("active");
} 
else if (optionName === "password") {
      passwordContent.style.display = "block";
      passwordLink.classList.add("active");
     
  } else if (optionName === "feedback") {
      feedbackContent.style.display = "block";
      feedbackLink.classList.add("active");
  }
}
function openGeneralOnly()
{
  var generalContent = document.getElementById("generalContent");
  generalContent.style.display = "block";
  infoContent.style.display = "none";
  bmiContent.style.display = "none";
  healthInfoContent.style.display = "none";
  socialLinksContent.style.display="none";
  passwordContent.style.display = "none";
  feedbackContent.style.display = "none";
}

function toggleFontWeight(linkId) {
  var links = document.querySelectorAll('.top-panel a'); 
  links.forEach(function(link) {
      if (link.id === linkId) { 
          link.classList.add('active');
          link.style.fontWeight = 'bold';
          link.style.color = '#CAF746'; 
      } else { 
          link.classList.remove('active');
          link.style.fontWeight = 'normal';
          link.style.color = 'white'; 
      }
  });
}

//general section: profile picture
  function changeProfile() {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
  
    fileInput.onchange = function(event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function() {
        var profilePic = document.getElementById("profilePic");
        profilePic.src = reader.result;
      };
      reader.readAsDataURL(file);
    };
  
    fileInput.click();
  }
 
  //info 
function saveGenderCountryChanges() {
  document.querySelectorAll('input[name="gender"]').forEach(radio => {
      radio.disabled = true;
  });

  document.getElementById('country').disabled = true;

  document.getElementById('saveChangesButton').style.display = 'none';

  document.getElementById('editGenderButton').style.display = 'inline-block';

  document.querySelector('.custom-info p').style.display = 'none';
}
function editGenderCountry() {
  document.querySelectorAll('input[name="gender"]').forEach(radio => {
      radio.disabled = false;
  });

  document.getElementById('country').disabled = false;

  document.getElementById('saveChangesButton').style.display = 'inline-block';

  document.getElementById('editGenderButton').style.display = 'none';

  document.querySelector('.custom-info p').style.display = 'block';
}

function editInfo() {
  document.getElementById('editInfoModal').style.display = 'block';
  document.getElementById('editAge').value = '';
  document.getElementById('editPhoneNumber').value = '';
  document.getElementById('countryCode').selectedIndex = 0; 
  document.getElementById('ageError').innerText = '';
  document.getElementById('numberError').innerText = '';
}

function closeEditInfoModal() {
  document.getElementById('editInfoModal').style.display = 'none';
}

function saveEditedInfo() {
 
  var age = document.getElementById('editAge').value;
  var ageError = '';
  if (isNaN(age) || age === '' || age <= 0 ||age>120) {
      ageError = 'Please enter a valid age.';
  }

  var phoneNumber = document.getElementById('editPhoneNumber').value;
  var numberError = '';
  if (!(/^\+?\d{1,3}[- ]?\d{9}$/.test(phoneNumber))) {
      numberError = 'Please enter a valid phone number.';
  }

  document.getElementById('ageError').innerText = ageError;
  document.getElementById('numberError').innerText = numberError;

  if (ageError !== '' || numberError !== '') {
      return;
  }

  document.getElementById('age').value = age;
  document.getElementById('phoneNumber').value = document.getElementById('countryCode').value + " " + phoneNumber;

  closeEditInfoModal();
}

  //health info
  function toggleOtherTextArea() {
    var otherCheckbox = document.getElementById("goal5");
    var otherTextArea = document.getElementById("otherGoalTextArea");
    if (otherCheckbox.checked) {
        otherTextArea.style.display = "block";
    } else {
        otherTextArea.style.display = "none";
    }
}

//BMI
function calculateBMI() {
  var heightInput = document.getElementById("heightCm").value;
  var weightInput = document.getElementById("weightKg").value;
  
  var heightMeters = parseFloat(heightInput) / 100; 
  
  var weightKg = parseFloat(weightInput);
  
  var bmi = weightKg / (heightMeters * heightMeters);
  
  var bmiOutput = document.getElementById("bmi");
  bmiOutput.textContent = bmi.toFixed(2); 
  
  var descOutput = document.getElementById("desc");
  var color;
  if (bmi < 18.5) {
      descOutput.textContent = "Underweight";
      color = getComputedStyle(document.documentElement).getPropertyValue("--underweight");
  } else if (bmi >= 18.5 && bmi < 25) {
      descOutput.textContent = "Normal";
      color = getComputedStyle(document.documentElement).getPropertyValue("--normal");
  } else if (bmi >= 25 && bmi < 30) {
      descOutput.textContent = "Overweight";
      color = getComputedStyle(document.documentElement).getPropertyValue("--overweight");
  } else {
      descOutput.textContent = "Obese";
      color = getComputedStyle(document.documentElement).getPropertyValue("--obese");
  }
  descOutput.style.color = color; 
  
  var scaleDivs = document.querySelectorAll(".bmi-scale div");
  scaleDivs.forEach(function(div) {
      var range = div.querySelector("p").textContent.split('-');
      var minRange = parseFloat(range[0]);
      var maxRange = parseFloat(range[1]);
      
      if (bmi >= minRange && bmi < maxRange) {
          var color = div.style.getPropertyValue("--color");
      }
  });
}

function weightHeightModal() {
  var modal = document.getElementById("weightHeightModal");
  modal.style.display = "block";
}

function closeWeightHeightModal() {
  var modal = document.getElementById("weightHeightModal");
  modal.style.display = "none";
}

function saveWeightHeight() {
  var weightInput = document.getElementById("weightInput").value.trim(); 
  var heightInput = document.getElementById("heightInput").value.trim(); 
  var weightError = document.getElementById("weightError");
  var heightError = document.getElementById("heightError");

  if (weightInput === "" || isNaN(parseFloat(weightInput)) || parseFloat(weightInput) <= 0) {
    weightError.textContent = "Please enter a valid weight.";
  } else {
    weightError.textContent = ""; 
  }

  if (heightInput === "" || isNaN(parseFloat(heightInput)) || parseFloat(heightInput) <= 0) {
    heightError.textContent = "Please enter a valid height.";
  } else {
    heightError.textContent = ""; 
  }

  if (weightError.textContent === "" && heightError.textContent === "") {
    var weight = parseFloat(weightInput);
    var weightUnit = document.getElementById("weightUnit").value;
    var height = parseFloat(heightInput);
    var heightUnit = document.getElementById("heightUnit").value;

    if (weightUnit === "lbs") {
       var weightKg = (weight * 0.453592).toFixed(2); 
       document.getElementById("weightKg").value = weightKg + " kg";
       document.getElementById("weightLbs").value = weight + " lbs";
    } else {
      var weightLbs = (weight * 2.2046).toFixed(2);
      document.getElementById("weightKg").value = weight + " kg";
      document.getElementById("weightLbs").value = weightLbs + " lbs";
    }

    if (heightUnit === "feet") {
       var heightCm = (height * 30.48).toFixed(2); 
       document.getElementById("heightCm").value = heightCm + " cm";
       document.getElementById("heightFt").value = height + " ft";
    } else {
      var heightFt= (height / 30.48).toFixed(2);
      document.getElementById("heightCm").value = height + " cm";
      document.getElementById("heightFt").value = heightFt + " ft";
    }

    calculateBMI();

    closeWeightHeightModal();
  }
}

function saveHealthInfoChanges() {
  var checkboxes = document.querySelectorAll('#healthInfoContent input[type="checkbox"]');
  var otherTextArea = document.getElementById("otherGoal");
  var saveChangesButton = document.querySelector('#healthInfoContent button');

  checkboxes.forEach(function(checkbox) {
      checkbox.disabled = true;
  });

  otherTextArea.disabled = true;

  saveChangesButton.style.display = "none";
  saveChangesButton.style.border = "none";

  var instructionLine = document.querySelector('.custom-info');
  instructionLine.style.display = "none";

  checkboxes.forEach(function(checkbox) {
      checkbox.classList.add('disabled-checkbox');
  });

  var healthIssuesTextArea = document.getElementById("health-issues");
  healthIssuesTextArea.disabled = true;

  var modal = document.getElementById("saveChanges-modal");
  modal.style.display = "block";

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
      modal.style.display = "none";
  }

  var closeModalBtn = document.getElementById("closeModalBtn");
  closeModalBtn.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  var editButton = document.getElementById("editHealthInfoButton");
  editButton.style.display = "block";

  disableTextAreaAndCheckboxes(true);
  
}

function editHealthInfo() {
  disableTextAreaAndCheckboxes(false);

  var saveChangesButton = document.querySelector('#healthInfoContent button');
  saveChangesButton.style.display = "block";

  var editButton = document.getElementById("editHealthInfoButton");
  editButton.style.display = "none";

  var checkboxes = document.querySelectorAll('#healthInfoContent input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
      checkbox.classList.remove('disabled-checkbox');
  });
}

//Password
function validatePasswords() {
  var currentPasswordInput = document.getElementById("currentPassword");
  var newPasswordInput = document.getElementById("newPassword");
  var confirmPasswordInput = document.getElementById("confirmPassword");
  var currentPassword = currentPasswordInput.value;
  var newPassword = newPasswordInput.value;
  var confirmPassword = confirmPasswordInput.value;
  var currentPasswordError = document.getElementById("currentPasswordError"); 
  var newPasswordError = document.getElementById("newPasswordError");
  var confirmPasswordError = document.getElementById("confirmPasswordError");

  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  if (currentPassword.trim() === '') {
      currentPasswordError.innerHTML = "Please enter your current password"; 
      return false;
  } else {
      currentPasswordError.innerHTML = ""; 
  }

  if (newPassword !== confirmPassword) {
      confirmPasswordError.innerHTML = "Passwords do not match";
      return false;
  } else {
      confirmPasswordError.innerHTML = "";
  }

  if (newPassword === currentPassword) {
      newPasswordError.innerHTML = "New password cannot be the same as the current password";
      return false;
  } else {
      newPasswordError.innerHTML = "";
  }

  if (!newPassword.match(passwordRegex)) {
      newPasswordError.innerHTML = "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters";
      return false;
  } else {
      newPasswordError.innerHTML = "";
  }

  confirmPasswordError.innerHTML = "";
  newPasswordError.innerHTML = "";

  return true;
}

function changePassword() {
  if (validatePasswords()) {
    var modal = document.getElementById("saveChanges-modal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    var closeModalBtn = document.getElementById("closeModalBtn");
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    document.getElementById("showCurrentPassword").checked = false;
    document.getElementById("showNewPassword").checked = false;
    document.getElementById("showConfirmPassword").checked = false;
    
  } else {
      console.log("Password validation failed...");
  }
}

function showPassword(inputId, checkboxId) {
  var passwordInput = document.getElementById(inputId);
  var checkbox = document.getElementById(checkboxId);
  
  checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
          passwordInput.type = 'text';
      } else {
          passwordInput.type = 'password';
      }
  });
}

function disableTextAreaAndCheckboxes(disabled) {
  var healthIssuesTextArea = document.getElementById("health-issues");
  healthIssuesTextArea.disabled = disabled;

  var checkboxes = document.querySelectorAll('#healthInfoContent input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
      checkbox.disabled = disabled;
  });

  var otherTextArea = document.getElementById("otherGoal");
  otherTextArea.disabled = disabled;
}

//feedback
function starRating() {
  var stars = document.getElementsByClassName("fas");
  var emoji = document.getElementById("emojis");

  for (let i = 0; i < stars.length; i++) {
    stars[i].onclick = function() {
      for (let j = 0; j < stars.length; j++) {
        if (j <= i) {
          stars[j].style.color = "#CAF746";
        } else {
          stars[j].style.color = "#e4e4e4";
        }
      }
      emoji.style.transform = `translateX(-${i * 100}px)`;
    };
  }
}

function displayFeedbackModal() {
    document.getElementById("feedbackModal").style.display = "block";

    document.getElementById("submitBtn").style.display = "none";

    document.getElementById("feedbackSubmitButton").style.display = "block";

    var stars = document.getElementsByClassName("fas");
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.pointerEvents = "none";
    }

    document.getElementById("feedback").disabled = true;
}

function closeFeedbackModal() {
  document.getElementById("feedbackModal").style.display = "none";
}

document.getElementById("submitBtn").addEventListener("click", displayFeedbackModal);
document.getElementById("closeFeedbackModalBtn").addEventListener("click", closeFeedbackModal);

window.addEventListener("click", function(event) {
  var feedbackModal = document.getElementById("feedbackModal");
  if (event.target == feedbackModal) {
      closeFeedbackModal();
  }
});

function changeRatingButton() {
  document.getElementById("feedbackModal").style.display = "none";

  document.getElementById("submitBtn").style.display = "block";

  document.getElementById("feedbackSubmitButton").style.display = "none";

  var stars = document.getElementsByClassName("fas");
  for (var i = 0; i < stars.length; i++) {
      stars[i].style.pointerEvents = "auto";
      stars[i].style.color = "#e4e4e4"; 
  }

  document.getElementById("feedback").value = "";

  document.getElementById("feedback").disabled = false;
}

//edit general info
function editGeneralInfo() {
  var modal = document.getElementById("editModal");
  modal.style.display = "block";

  document.getElementById("editFirstName").value = "";
  document.getElementById("editLastName").value = "";
  document.getElementById("editUsername").value = "";
  document.getElementById("editEmail").value = "";
}

function closeEditModal() {
  var modal = document.getElementById("editModal");
  modal.style.display = "none";
  
  document.getElementById("firstNameError").innerHTML = "";
  document.getElementById("lastNameError").innerHTML = "";
  document.getElementById("usernameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
}

document.getElementById("editButton").addEventListener("click", editGeneralInfo);

document.getElementsByClassName("close")[1].addEventListener("click", closeEditModal);

function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
}

function validateForm(form) {
  var firstName = form.elements["editFirstName"].value.trim();
  var lastName = form.elements["editLastName"].value.trim();
  var username = form.elements["editUsername"].value.trim();
  var email = form.elements["editEmail"].value.trim();

  var nameRegex = /^[a-zA-Z]+$/;
  var usernameRegex = /^[a-zA-Z0-9_]+$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var isValid = true;
  var errorMessage = "";

  if (firstName === "") {
    printError("firstNameError", "Please enter your first name");
    isValid = false;
  } else if (!firstName.match(nameRegex)) {
    printError("firstNameError", "Please enter a valid first name");
    isValid = false;
  } else {
    printError("firstNameError", "");
  }

  if (lastName === "") {
    printError("lastNameError", "Please enter your last name");
    isValid = false;
  } else if (!lastName.match(nameRegex)) {
    printError("lastNameError", "Please enter a valid last name");
    isValid = false;
  } else {
    printError("lastNameError", "");
  }

  if (username === "") {
    printError("usernameError", "Please enter a username");
    isValid = false;
  } else if (!username.match(usernameRegex)) {
    printError("usernameError", "Please enter a valid username");
    isValid = false;
  } else {
    printError("usernameError", "");
  }

  if (email === "") {
    printError("emailError", "Please enter an email address");
    isValid = false;
  } else if (!email.match(emailRegex)) {
    printError("emailError", "Please enter a valid email address");
    isValid = false;
  } else {
    printError("emailError", "");
  }

  if (isValid) {
    saveUserInfo(form);
  }
}

function saveUserInfo(form) {
  var firstName = form.elements["editFirstName"].value.trim();
  var lastName = form.elements["editLastName"].value.trim();
  var username = form.elements["editUsername"].value.trim();
  var email = form.elements["editEmail"].value.trim();

  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;
  document.getElementById("username").value = username;
  document.getElementById("email").value = email;

  closeEditModal();
}

//social links
function saveSocialLinksChanges() {
  var facebookLink = document.getElementById("facebookLink").value;
  var twitterLink = document.getElementById("twitterLink").value;
  var instagramLink = document.getElementById("instagramLink").value;
  var linkedinLink = document.getElementById("linkedinLink").value;

  // Regular expression for validating URLs
  var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  var errorMessages = {
      facebookLinkError: "Please enter a valid Facebook link",
      twitterLinkError: "Please enter a valid Twitter link",
      instagramLinkError: "Please enter a valid Instagram link",
      linkedinLinkError: "Please enter a valid LinkedIn link"
  };

  var validationResults = {
      facebookLinkError: !urlRegex.test(facebookLink) && facebookLink.trim() !== '',
      twitterLinkError: !urlRegex.test(twitterLink) && twitterLink.trim() !== '',
      instagramLinkError: !urlRegex.test(instagramLink) && instagramLink.trim() !== '',
      linkedinLinkError: !urlRegex.test(linkedinLink) && linkedinLink.trim() !== ''
  };

  Object.keys(validationResults).forEach(function(key) {
      if (validationResults[key]) {
          printError(key, errorMessages[key]);
      } else {
          printError(key, ""); 
      }
  });

  var hasErrors = Object.values(validationResults).some(function(result) {
      return result;
  });

  if (!hasErrors) {
  
    var socialLinksInputs = document.querySelectorAll('#socialLinksContent input[type="text"]');
    var saveChangesButton = document.querySelector('#socialLinksContent button');

    socialLinksInputs.forEach(function(input) {
        input.disabled = true;
    });

    saveChangesButton.style.display = "none";
    editButton2.style.display = "block";

    var modal = document.getElementById("saveChanges-modal");
    modal.style.display = "block";

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    var closeModalBtn = document.getElementById("closeModalBtn");
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
  }
}

function editSocialLinks() {
  var facebookInput = document.getElementById("facebookLink");
  var twitterInput = document.getElementById("twitterLink");
  var instagramInput = document.getElementById("instagramLink");
  var linkedinInput = document.getElementById("linkedinLink");

  facebookInput.disabled = false;
  twitterInput.disabled = false;
  instagramInput.disabled = false;
  linkedinInput.disabled = false;

  facebookInput.value = "";
  twitterInput.value = "";
  instagramInput.value = "";
  linkedinInput.value = "";

  document.querySelector('#socialLinksContent button').style.display = "inline";
  document.getElementById("editButton2").style.display = "none";
}

function openLink(linkId) {
  var link = document.getElementById(linkId).value;
  if (link.trim() !== '') {
      window.open(link, '_blank');
  } else {
      alert("Please enter a valid link before opening.");
  }
}
