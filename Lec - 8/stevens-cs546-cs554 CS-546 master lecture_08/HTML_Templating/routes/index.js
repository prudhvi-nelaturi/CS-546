import postRoutes from './posts.js';
import userRoutes from './users.js';
import path from 'path';
import {static as staticDir} from 'express';
const constructorMethod = (app) => {
  app.use('/posts', postRoutes);
  app.use('/users', userRoutes);
  app.get('/about', (req, res) => {
    res.sendFile(path.resolve('static/about.html'));
  });
  app.use('/public', staticDir('public'));
  app.use('*', (req, res) => {
    res.redirect('/posts');
  });
};

export default constructorMethod;
