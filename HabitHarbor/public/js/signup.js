const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const nextBtnFourth = document.querySelector(".next-3");
const prevBtnFifth = document.querySelector(".prev-4");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event) {
    event.preventDefault();
    if (validateForm()) {
        slidePage.style.marginLeft = "-25%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
    }
});

nextBtnSec.addEventListener("click", function(event) {
    event.preventDefault();
    if (validateForm()) {
        slidePage.style.marginLeft = "-50%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
    }
});

nextBtnThird.addEventListener("click", function(event) {
    event.preventDefault();
    if (validateForm()) {
        slidePage.style.marginLeft = "-75%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
    }
});

nextBtnFourth.addEventListener("click", function(event) {
    event.preventDefault();
    if (validateForm()) {
        slidePage.style.marginLeft = "-100%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
    }
});

submitBtn.addEventListener("click", function(event) {
    if (validateForm()) {
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;
        setTimeout(function() {
            location.reload();
        }, 800);
    } else {
        event.preventDefault();
    }
});

prevBtnSec.addEventListener("click", function(event) {
    event.preventDefault();
    slidePage.style.marginLeft = "0%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

prevBtnThird.addEventListener("click", function(event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

prevBtnFourth.addEventListener("click", function(event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

prevBtnFifth.addEventListener("click", function(event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-75%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

function validateForm() {
    var currentTabElement = document.querySelectorAll(".page")[current - 1];
    var fields = currentTabElement.querySelectorAll("input:not([type=button]):not([type=submit]), select");

    // Check if all fields in the current tab are filled and valid
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (!field.checkValidity()) {
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

    return true; // All validations passed
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
    return /^[\+]?[\d\s\-()]+$/.test(value);
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