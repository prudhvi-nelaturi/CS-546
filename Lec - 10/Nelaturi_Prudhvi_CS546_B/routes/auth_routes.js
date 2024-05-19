//import express, express router as shown in lecture code
import validation from '../helpers.js';
import { Router } from 'express';
import { loginUser, registerUser } from '../data/users.js';

const router = Router();
router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: 'YOU SHOULD NOT BE HERE!' });
  // return res.redirect('/login');
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      if (req.session.user.role == 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role == 'user') {
        return res.redirect('/user');
      }
    }
    try {
      // console.log('asdf');
      res.render('register', { title: 'Register' });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let registerInfo = req.body;
    let errors = [];
    let hasErrors = false;
    try {
      registerInfo.firstName = validation.checkString(
        registerInfo.firstName,
        'firstName'
      );
      registerInfo.lastName = validation.checkString(
        registerInfo.lastName,
        'lastName'
      );
      registerInfo.username = validation.checkString(
        registerInfo.username,
        'username'
      );
      registerInfo.favoriteQuote = validation.checkString(
        registerInfo.favoriteQuote,
        'favoriteQuote'
      );
      registerInfo.themePreference = validation.checkString(
        registerInfo.themePreference,
        'themePreference'
      );
      registerInfo.role = validation.checkString(registerInfo.role, 'role');
      if (
        registerInfo.firstName.length < 2 ||
        registerInfo.firstName.length > 25 ||
        registerInfo.lastName.length < 2 ||
        registerInfo.lastName.length > 25
      ) {
        throw new Error('Invalid length of firstName or lastName');
      }
      if (
        registerInfo.username.length < 5 ||
        registerInfo.username.length > 10
      ) {
        throw new Error('length of username must of between 5 and 10');
      }
      registerInfo.username = registerInfo.username.toLowerCase();
      if (!registerInfo.password)
        throw new Error(`You must supply a password!`);
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
      return res.status(400).render('register', {
        title: 'Register',
        error: error,
        registerBody: registerInfo,
      });
    }
    try {
      const addUser = await registerUser(
        registerInfo.firstName,
        registerInfo.lastName,
        registerInfo.username,
        registerInfo.password,
        registerInfo.favoriteQuote,
        registerInfo.themePreference,
        registerInfo.role
      );
      if (addUser.signupCompleted) {
        return res.render('login', { title: 'Login' });
      }
    } catch (error) {
      if (error) {
        return res.status(400).render('register', {
          title: 'Register',
          error: error,
          registerBody: registerInfo,
        });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      if (req.session.user.role == 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role == 'user') {
        return res.redirect('/user');
      }
    }
    try {
      // console.log('asdf');
      res.render('login', { title: 'Login' });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let loginInfo = req.body;
    // console.log('here');
    let errors = [];
    let hasErrors = false;
    try {
      loginInfo.username = validation.checkString(
        loginInfo.username,
        'username'
      );
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
      return res.status(400).render('login', {
        title: 'Login',
        error: error,
        loginBody: loginInfo,
      });
    }
    try {
      let userLogin = await loginUser(loginInfo.username, loginInfo.password);
      if (userLogin) {
        req.session.user = {
          firstName: userLogin.firstName,
          lastName: userLogin.lastName,
          username: userLogin.username,
          favoriteQuote: userLogin.favoriteQuote,
          themePreference: userLogin.themePreference,
          role: userLogin.role,
        };
      }
      if (req.session.user.role == 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role == 'user') {
        return res.redirect('/user');
      }
    } catch (error) {
      res.status(400).render('login', {
        title: 'Login',
        error: error,
        loginBody: loginInfo,
      });
    }
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  let admin = false;
  if (req.session.user.role == 'admin') {
    admin = true;
  }
  if (req.session.user) {
    return res.render('user', {
      title: 'User',
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      currentTime: new Date().toUTCString(),
      favoriteQuote: req.session.user.favoriteQuote,
      admin: admin,
      role: req.session.user.role,
      themePreference: req.session.user.themePreference,
    });
  }
});

router.route('/admin').get(async (req, res) => {
  //code here for GET

  if (req.session.user) {
    if (req.session.user.role == 'admin') {
      return res.render('admin', {
        title: 'Admin',
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        currentTime: new Date().toUTCString(),
        favoriteQuote: req.session.user.favoriteQuote,
        admin: true,
        themePreference: req.session.user.themePreference,
      });
    }
  }
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  res.clearCookie('AuthenticationState');
  res.render('logout', { title: 'Logout' });
});

export default router;
