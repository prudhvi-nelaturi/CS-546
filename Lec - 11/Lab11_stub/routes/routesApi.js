// Set-Up Routes
import { Router } from 'express';
const router = Router();
import xss from 'xss';
import path from 'path';

router.route('/').get(async (req, res) => {
  //code here for GET to show static HTML flie
  //IF you have any other routes besides this one, you will get a 0. everything must be done via client-side and AJAX requests (a client-side fetch or axios request can be used instead of AJAX)
  res.sendFile(path.resolve('static/webpage.html'));
});

export default router;
