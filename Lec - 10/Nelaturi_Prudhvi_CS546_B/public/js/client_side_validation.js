// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
function checkString(strVal, varName) {
  if (!strVal) throw new Error(`You must supply a ${varName}!`);
  if (typeof strVal !== 'string')
    throw new Error(`${varName} must be a string!`);
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw new Error(
      `${varName} cannot be an empty string or string with just spaces`
    );
  if (!isNaN(strVal))
    throw new Error(
      `${strVal} is not a valid value for ${varName} as it only contains digits`
    );
  return strVal;
}
$('#signup-form').submit((event) => {
  let registerInfo = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    username: $('#username').val(),
    favoriteQuote: $('#favoriteQuote').val(),
    themePreference: $('#themePreference').val(),
    password: $('#password').val(),
    confirmPassword: $('#confirmPassword').val(),
    role: $('#role').val(),
  };
  let errors = [];
  try {
    registerInfo.firstName = checkString(registerInfo.firstName, 'firstName');
    registerInfo.lastName = checkString(registerInfo.lastName, 'lastName');
    registerInfo.username = checkString(registerInfo.username, 'username');
    registerInfo.favoriteQuote = checkString(
      registerInfo.favoriteQuote,
      'favoriteQuote'
    );
    registerInfo.themePreference = checkString(
      registerInfo.themePreference,
      'themePreference'
    );
    registerInfo.role = checkString(registerInfo.role, 'role');
    if (
      registerInfo.firstName.length < 2 ||
      registerInfo.firstName.length > 25 ||
      registerInfo.lastName.length < 2 ||
      registerInfo.lastName.length > 25
    ) {
      throw new Error('Invalid length of firstName or lastName');
    }
    if (registerInfo.username.length < 5 || registerInfo.username.length > 10) {
      throw new Error('length of username must of between 5 and 10');
    }
    registerInfo.username = registerInfo.username.toLowerCase();
    if (!registerInfo.password) throw new Error(`You must supply a password!`);
    if (typeof registerInfo.password !== 'string')
      throw new Error(`${password} must be a string!`);
    registerInfo.password = registerInfo.password.trim();
    if (registerInfo.password.length === 0)
      throw new Error(
        `Password cannot be an empty string or string with just spaces`
      );
    if (registerInfo.password.length < 8) {
      throw new Error('The length of the password must be atleast 8');
    }
    let isUpperCase = false;
    let isNumber = false;
    let isSpecialCharacter = false;
    for (let i = 0; i < registerInfo.password.length; i++) {
      if (registerInfo.password[i].match(/[A-Z]/)) {
        isUpperCase = true;
      } else if (registerInfo.password[i].match(/[0-9]/)) {
        isNumber = true;
      } else if (registerInfo.password[i].match(/[!@#$?%^&*]/)) {
        isSpecialCharacter = true;
      }
    }
    if (!isUpperCase || !isNumber || !isSpecialCharacter) {
      throw new Error(
        'There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character'
      );
    }
    if (registerInfo.password !== registerInfo.confirmPassword) {
      throw new Error('Password and confirm password mismatch');
    }
    // for (let i = 0; i < registerInfo.password; i++) {}
    if (
      registerInfo.favoriteQuote.length < 20 ||
      registerInfo.favoriteQuote.length > 255
    ) {
      throw new Error('Invalid length of favourite quote');
    }
    registerInfo.themePreference = registerInfo.themePreference.toLowerCase();
    let isValidThemePreference = false;
    if (
      registerInfo.themePreference == 'light' ||
      registerInfo.themePreference == 'dark'
    ) {
      isValidThemePreference = true;
    } else {
      throw new Error('Invalid theme preference');
    }
    registerInfo.role = registerInfo.role.toLowerCase();
    let isValidRole = false;
    if (registerInfo.role == 'admin' || registerInfo.role == 'user') {
      isValidRole = true;
    } else {
      throw new Error('Invalid role');
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    event.preventDefault();
    $('#error').show();
    $('#error').html(`${errors[0]}`);
  } else {
    $('#error').hide();
  }
});

$('#signin-form').submit((event) => {
  let loginInfo = {
    username: $('#username').val(),
    password: $('#password').val(),
  };
  let errors = [];
  try {
    loginInfo.username = checkString(loginInfo.username, 'username');
    if (loginInfo.username.length < 5 || loginInfo.username.length > 10) {
      throw new Error('length of username must of between 5 and 10');
    }
    loginInfo.username = loginInfo.username.toLowerCase();
    if (!loginInfo.password)
      throw new Error(`Error: You must supply a password!`);
    if (typeof loginInfo.password !== 'string')
      throw new Error(`Error: password must be a string!`);
    loginInfo.password = loginInfo.password.trim();
    if (loginInfo.password.length === 0)
      throw new Error(
        `Error: password cannot be an empty string or string with just spaces`
      );
    if (loginInfo.password.length < 8) {
      throw new Error('The length of the password must be atleast 8');
    }
    let isUpperCase = false;
    let isNumber = false;
    let isSpecialCharacter = false;
    for (let i = 0; i < loginInfo.password.length; i++) {
      if (loginInfo.password[i].match(/[A-Z]/)) {
        isUpperCase = true;
      } else if (loginInfo.password[i].match(/[0-9]/)) {
        isNumber = true;
      } else if (loginInfo.password[i].match(/[!@#$%?^&*]/)) {
        isSpecialCharacter = true;
      }
    }
    if (!isUpperCase || !isNumber || !isSpecialCharacter) {
      throw new Error(
        'There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character'
      );
    }
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    event.preventDefault();
    $('#error').show();
    $('#error').html(`${errors[0]}`);
  } else {
    $('#error').hide();
  }
});
