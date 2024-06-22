function previewImage(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var imgElement = document.getElementById('profile-image-preview');
        imgElement.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function validateForm() {
    clearErrors();

    var firstname = document.getElementById('firstname').value.trim();
    var lastname = document.getElementById('lastname').value.trim();
    var username = document.getElementById('username').value.trim();
    var email = document.getElementById('email').value.trim();
    var age = document.getElementById('age').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var gender = document.querySelector('input[name="Gender"]:checked');
    var country = document.getElementById('country').value;
    var height = document.getElementById('height').value.trim();
    var weight = document.getElementById('weight').value.trim();
    var facebook = document.getElementById('facebook').value.trim();
    var instagram = document.getElementById('instagram').value.trim();
    var twitter = document.getElementById('twitter').value.trim();
    var linkedin = document.getElementById('linkedin').value.trim();

    var isValid = true;

    if (firstname === '') {
        setError('firstnameError', 'First Name cannot be empty.');
        isValid = false;
    }

    if (lastname === '') {
        setError('lastnameError', 'Last Name cannot be empty.');
        isValid = false;
    }

    if (username === '') {
        setError('usernameError', 'Username cannot be empty.');
        isValid = false;
    }

    if (email === '') {
        setError('emailError', 'Email cannot be empty.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        setError('emailError', 'Enter a valid email address.');
        isValid = false;
    }

    if (age === '' || isNaN(age) || age < 0 || age > 120) {
        setError('ageError', 'Enter a valid age between 0 and 120.');
        isValid = false;
    }

    if (phone === '' || phone.length < 11 || !isValidPhoneNumber(phone)) {
        setError('phoneError', 'Enter a valid phone number (at least 11 digits, digits only).');
        isValid = false;
    }

    if (!gender) {
        setError('genderError', 'Select a gender.');
        isValid = false;
    }

    if (country === '') {
        setError('countryError', 'Select a country.');
        isValid = false;
    }

    if (height === '' || isNaN(height)) {
        setError('heightError', 'Enter a valid height.');
        isValid = false;
    }

    if (weight === '' || isNaN(weight)) {
        setError('weightError', 'Enter a valid weight.');
        isValid = false;
    }

    if (facebook !== '' && !isValidFacebookUrl(facebook)) {
        setError('facebookError', 'Enter a valid URL for Facebook.');
        isValid = false;
    }

    if (instagram !== '' && !isValidUrl(instagram)) {
        setError('instagramError', 'Enter a valid URL for Instagram.');
        isValid = false;
    }

    if (twitter !== '' && !isValidUrl(twitter)) {
        setError('twitterError', 'Enter a valid URL for Twitter.');
        isValid = false;
    }

    if (linkedin !== '' && !isValidUrl(linkedin)) {
        setError('linkedinError', 'Enter a valid URL for LinkedIn.');
        isValid = false;
    }

    if (!isValid) {
        alert('Please correct the errors in the form.');
    }

    return isValid;
}

function clearErrors() {
    var errors = document.getElementsByClassName('error');
    for (var i = 0; i < errors.length; i++) {
        errors[i].innerHTML = ''; 
    }
}


function setError(id, errorMessage) {
    var element = document.getElementById(id);
    if (element) {
        element.innerHTML = errorMessage;
    }
}

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidFacebookUrl(url) {
    var facebookRegex = /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/[a-zA-Z0-9(\.\?)?]/;
    return facebookRegex.test(url);
}

function isValidUrl(url) {
    var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}

function isValidPhoneNumber(phone) {
    var phoneRegex = /^\+?\d+$/;
    return phoneRegex.test(phone);
}


var form = document.getElementById('editForm');
form.addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault(); 
    }
});
