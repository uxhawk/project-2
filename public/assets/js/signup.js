$(document).ready(function() {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked, we
  // validate the email and password are not blank
  signUpForm.on('submit', function(event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email) {
      alert('Please enter an email address to sign up.');
      return;
    }

    if (!userData.password) {
      alert('Please enter an password for your account.');
      return;
    }

    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful,
  // we are redirected to the members page
  // Otherwise we log any errors

  /**
 * signUpUser.
 * @param {email} email The email for the new user.
 * @param {password} password The encrypted password for the user.
 */
  function signUpUser(email, password) {
    $.post('/api/signup', {
      email: email,
      password: password,
    })
        .then(function(data) {
          window.location.replace('/members');
        // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
  }

  /**
 * signUpUser.
 * @param {err} err The err response from the backend.
 */
  function handleLoginErr(err) {
    // $('#alert .msg').text(err.responseJSON);
    console.log(err.responseJSON);
    $('#alert .msg').text(`The email 
    ${err.responseJSON.errors[0].value} is already registered.`);
    $('#alert').fadeIn(500);
  }
});
