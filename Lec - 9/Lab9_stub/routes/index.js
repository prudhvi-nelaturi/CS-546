//Here you will require route files and export them as used in previous labs.
import textDecoderRoutes from './textdecoder.js';

const constructorMethod = (app) => {
  app.use('/textdecoder', textDecoderRoutes);

  app.use('*', (req, res) => {
    res.redirect('/textdecoder');
  });
};

export default constructorMethod;
