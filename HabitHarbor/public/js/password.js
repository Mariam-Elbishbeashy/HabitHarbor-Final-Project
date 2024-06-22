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

  function validateCurrentPassword() {
    const currentPasswordInput = document.getElementById('currentPassword').value;

    // AJAX request to validate current password
    fetch('/validateCurrentPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword: currentPasswordInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Password is valid, clear error message if any
            document.getElementById('currentPasswordError').textContent = '';
        } else {
            // Password is not valid, show error message
            document.getElementById('currentPasswordError').textContent = 'Incorrect current password';
        }
    })
    .catch(error => console.error('Error:', error));
}

// Event listener for current password input
document.getElementById('currentPassword').addEventListener('blur', validateCurrentPassword);

function validateNewPassword() {
    const newPasswordInput = document.getElementById('newPassword').value;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

    if (strongRegex.test(newPasswordInput)) {
        document.getElementById('newPasswordError').textContent = '';
    } else {
        document.getElementById('newPasswordError').textContent = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character';
    }
}

// Event listener for new password input
document.getElementById('newPassword').addEventListener('blur', validateNewPassword);

function validateConfirmPassword() {
    const newPasswordInput = document.getElementById('newPassword').value;
    const confirmPasswordInput = document.getElementById('confirmPassword').value;

    if (newPasswordInput === confirmPasswordInput) {
        document.getElementById('confirmPasswordError').textContent = '';
    } else {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
    }
}

// Event listener for confirm password input
document.getElementById('confirmPassword').addEventListener('blur', validateConfirmPassword);
