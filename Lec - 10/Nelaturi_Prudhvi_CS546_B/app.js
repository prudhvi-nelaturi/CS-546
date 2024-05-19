// Setup server, session and middleware here.

/*
You will have the following middleware functions:

1. This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following: 

A. This middleware will log to your console for every request made to the server, with the following information:

Current Timestamp: new Date().toUTCString()
Request Method: req.method
Request Route: req.originalUrl
Some string/boolean stating if a user is authenticated
There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

An example would be:

[Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:14 GMT]: POST /login (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:19 GMT]: GET /user (Authenticated User)
[Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)
B. After you log the request info in step A,  if the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will redirect them to the GET /login route. 

2. This middleware will only be used for the GET /login route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will allow them to get through to the GET /login route. A logged in user should never be able to access the login form.

 3. This middleware will only be used for the GET /register route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will allow them to get through to the GET /register route. A logged in user should never be able to access the registration form.

4. This middleware will only be used for the GET /user route and will do one of the following:

If a user is not logged in, you will redirect to the GET /login route.
If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.
Users with both roles admin or user should be able to access the /user route, so you simply need to make sure they are authenticated in this middleware.
5. This middleware will only be used for the GET /admin route and will do one of the following:

If a user is not logged in, you will redirect to the GET /login route.
If a user is logged in, but they are not an admin user, you will redirect to /error and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403.
If the user is logged in AND the user has a role of admin, the middleware will "fall through" to the next route calling the next() callback.
ONLY USERS WITH A ROLE of admin SHOULD BE ABLE TO ACCESS THE /admin ROUTE!
6. This middleware will only be used for the GET /logout route and will do one of the following:

1. If a user is not logged in, you will redirect to the GET /login route.

2. if the user is logged in, the middleware will "fall through" to the next route calling the next() callback.

*/

import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import configRoutes from './routes/index.js';
import session from 'express-session';
app.use(cookieParser());
import exphbs from 'express-handlebars';

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};
app.use(
  session({
    name: 'AuthenticationState',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: false,
  })
);
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine(
  'handlebars',
  exphbs.engine({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

app.use(async (req, res, next) => {
  let user = '';
  if (req.session.user) {
    user = '(Authenticated User)';
  } else {
    user = '(Non-Authenticated User)';
  }
  console.log(
    `[${new Date().toUTCString()}]: ${req.method} ${req.path} ${user}`
  );
  next();
});

app.use('/', async (req, res, next) => {
  if (req.path == '/') {
    if (req.session.user) {
      if (req.session.user.role == 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role == 'user') {
        return res.redirect('/user');
      }
    } else {
      return res.redirect('/login');
    }
  }
  next();
});
app.use('/login', async (req, res, next) => {
  if (req.method == 'GET') {
    if (req.session.user) {
      if (req.session.user.role == 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role == 'user') {
        return res.redirect('/user');
      }
    }
  }
  next();
});

app.use('/register', async (req, res, next) => {
  if (req.method == 'GET') {
    if (req.session.user) {
      if (req.session.user.role == 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role == 'user') {
        return res.redirect('/user');
      }
    }
  }
  next();
});

app.use('/user', async (req, res, next) => {
  if (req.session.user && req.method == 'GET') {
    next();
  } else {
    return res.redirect('/login');
  }
});

app.use('/admin', async (req, res, next) => {
  if (req.session.user && req.method == 'GET') {
    if (req.session.user.role == 'user') {
      res.status(403).render('error');
    }
    next();
  } else {
    return res.redirect('/login');
  }
});

app.use('/logout', async (req, res, next) => {
  if (req.session.user && req.method == 'GET') {
    next();
  } else {
    return res.redirect('/login');
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

// import { loginUser, registerUser } from './data/users.js';
// import { dbConnection, closeConnection } from './config/mongoConnection.js';
// const db = await dbConnection();
// try {
//   let user = {
//     firstName: 'Patrick',
//     lastName: 'Hill',
//     username: 'Graffxnyc',
//     password: 'MyAwesomePassword@P1',
//     favoriteQuote:
//       'We have two lives, the 2nd begins when you realize you only have one.',
//     themePreference: 'LIGHT',
//     role: 'USER',
//   };
//   let result = await registerUser(
//     user.firstName,
//     user.lastName,
//     user.username,
//     user.password,
//     user.favoriteQuote,
//     user.themePreference,
//     user.role
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// app.use('/', async (req, res, next) => {

// });

// try {
//   let user = { username: 'graffxnyc', password: 'MyAwesomePassword@P1' };
//   let result = await loginUser(user.username, user.password);
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// await closeConnection();
