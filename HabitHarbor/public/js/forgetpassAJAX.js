function resetPassword() {
  var email = document.getElementById('emailInput').value;
  var newPassword = document.getElementById('newPassInput').value;

  if (!email) {
      alert("Please enter your email.");
      return;
  }
  if (!newPassword) {
      alert("Please enter the new password.");
      return;
  }

  // Perform AJAX request
  $.ajax({
      url: '/forgetpass',
      method: 'PUT',
      data: { Email: email, Password: newPassword },
      success: function(response) {
          alert("Password updated successfully!");
          window.location.href = '/login'; // Redirect to login page after success
      },
      error: function(xhr, status, error) {
          alert("Error occurred while resetting password.");
          console.error(error);
      }
  });
}
