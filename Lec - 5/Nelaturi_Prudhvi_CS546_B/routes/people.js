//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.
import express from 'express';
import { getPeople, getPersonById } from '../data/data.js';
import validation from '../helpers.js';
const router = express.Router();
router.route('/').get(async (req, res) => {
  try {
    let peopleList = await getPeople();
    return res.json(peopleList);
  } catch (e) {
    return res.status(500).send({ Error: e.message });
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const person = await getPersonById(req.params.id);
    return res.json(person);
  } catch (e) {
    return res.status(404).json({ Error: e.message });
  }
});

export default router;
