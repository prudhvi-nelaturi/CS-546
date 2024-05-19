//import mongo collections, bcrypt and implement the following data functions
import bcrypt from 'bcrypt';
import { users } from '../config/mongoCollections.js';
import validation from '../helpers.js';
export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  firstName = validation.checkString(firstName, 'firstName');
  lastName = validation.checkString(lastName, 'lastName');
  username = validation.checkString(username, 'username');
  favoriteQuote = validation.checkString(favoriteQuote, 'favoriteQuote');
  themePreference = validation.checkString(themePreference, 'themePreference');
  role = validation.checkString(role, 'role');
  if (
    firstName.length < 2 ||
    firstName.length > 25 ||
    lastName.length < 2 ||
    lastName.length > 25
  ) {
    throw new Error('Invalid length of firstName or lastName');
  }
  if (username.length < 5 || username.length > 10) {
    throw new Error('length of username must of between 5 and 10');
  }
  username = username.toLowerCase();
  if (!password) throw new Error(`Error: You must supply a ${password}!`);
  if (typeof password !== 'string')
    throw new Error(`Error: ${password} must be a string!`);
  password = password.trim();
  if (password.length === 0)
    throw new Error(
      `Error: ${password} cannot be an empty string or string with just spaces`
    );
  if (password.length < 8) {
    throw new Error('The length of the password must be atleast 8');
  }
  let isUpperCase = false;
  let isNumber = false;
  let isSpecialCharacter = false;
  for (let i = 0; i < password.length; i++) {
    if (password[i].match(/[A-Z]/)) {
      isUpperCase = true;
    } else if (password[i].match(/[0-9]/)) {
      isNumber = true;
    } else if (password[i].match(/[!@#$?%^&*]/)) {
      isSpecialCharacter = true;
    }
  }
  if (!isUpperCase || !isNumber || !isSpecialCharacter) {
    throw new Error(
      'There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character'
    );
  }
  if (favoriteQuote.length < 20 || favoriteQuote.length > 255) {
    throw new Error('Invalid length of favourite quote');
  }
  themePreference = themePreference.toLowerCase();
  let isValidThemePreference = false;
  if (themePreference == 'light' || themePreference == 'dark') {
    isValidThemePreference = true;
  } else {
    throw new Error('Invalid theme preference');
  }
  role = role.toLowerCase();
  let isValidRole = false;
  if (role == 'admin' || role == 'user') {
    isValidRole = true;
  } else {
    throw new Error('Invalid role');
  }

  let userCollection = await users();
  let findInfo = await userCollection.findOne({
    username: username,
  });
  if (findInfo) {
    throw new Error('username already exists');
  }
  const saltRounds = 16;
  let tempPassword = password;
  password = await bcrypt.hash(tempPassword, saltRounds);

  let newUser = {
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role,
  };
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error("Couldn't add user");
  }
  return { signupCompleted: true };
};

export const loginUser = async (username, password) => {
  username = validation.checkString(username, 'username');
  if (username.length < 5 || username.length > 10) {
    throw new Error('length of username must of between 5 and 10');
  }
  username = username.toLowerCase();
  if (!password) throw new Error(`Error: You must supply a ${password}!`);
  if (typeof password !== 'string')
    throw new Error(`Error: ${password} must be a string!`);
  password = password.trim();
  if (password.length === 0)
    throw new Error(
      `Error: ${password} cannot be an empty string or string with just spaces`
    );
  if (password.length < 8) {
    throw new Error('The length of the password must be atleast 8');
  }
  let isUpperCase = false;
  let isNumber = false;
  let isSpecialCharacter = false;
  for (let i = 0; i < password.length; i++) {
    if (password[i].match(/[A-Z]/)) {
      isUpperCase = true;
    } else if (password[i].match(/[0-9]/)) {
      isNumber = true;
    } else if (password[i].match(/[!@#$%?^&*]/)) {
      isSpecialCharacter = true;
    }
  }
  if (!isUpperCase || !isNumber || !isSpecialCharacter) {
    throw new Error(
      'There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character'
    );
  }
  let userCollection = await users();
  let findInfo = await userCollection.findOne({
    username: username,
  });
  if (!findInfo) {
    throw new Error('Either the username or password is invalid');
  }
  let compareToMatch = false;

  try {
    compareToMatch = await bcrypt.compare(password, findInfo.password);
  } catch (e) {}

  if (compareToMatch) {
    return {
      firstName: findInfo.firstName,
      lastName: findInfo.lastName,
      username: findInfo.username,
      favoriteQuote: findInfo.favoriteQuote,
      themePreference: findInfo.themePreference,
      role: findInfo.role,
    };
  } else {
    throw new Error('Either the username or password is invalid');
  }
};
