$(document).ready(function() {
    // Regex patterns for validation
    var regexPatterns = {
        emailOrPhone: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^\+?[0-9]{8,14}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    };

    // Selecting form elements
    var form = $('form');
    var emailOrPhoneInput = form.find('input[type="text"]');
    var passwordInput = form.find('input[type="password"]');

    // Function to validate form
    function validateForm() {
        if (!isValidEmailOrPhone(emailOrPhoneInput.val().trim())) {
            alert("Please enter a valid email address or phone number.");
            return false;
        }

        if (!isValidPassword(passwordInput.val().trim())) {
            alert("Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter.");
            return false;
        }

        // Form is valid
        return true;
    }

    // Event listener for form submission
    form.submit(function(event) {
        event.preventDefault(); // Prevent form submission
        if (validateForm()) {
            // Perform AJAX request
            $.ajax({
                url: 'your-server-endpoint-url',
                method: 'POST',
                data: form.serialize(), // Serialize form data
                success: function(response) {
                    // Handle success response
                    alert("Form submitted successfully!");
                    // Optionally, redirect or perform other actions after successful submission
                },
                error: function(xhr, status, error) {
                    // Handle error response
                    alert("Error occurred while submitting the form.");
                    console.error(error);
                }
            });
        }
    });

    // Function to validate email or phone using regex
    function isValidEmailOrPhone(value) {
        return regexPatterns.emailOrPhone.test(value);
    }

    // Function to validate password using regex
    function isValidPassword(value) {
        return regexPatterns.password.test(value);
    }
});
