//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import validation from '../helpers.js';
import { Router } from 'express';
import { searchMoviesByName, searchMovieById } from '../data/movies.js';
const router = Router();
router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    // console.log("asdf");
    res.render('home');
  } catch (e) {
    res.status(500).json({error: e});
  }
});

router.route('/searchmovies').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
  const moviesPostdata = req.body;
  let errors = [];
  try {
    moviesPostdata.searchMoviesByName = validation.checkString(moviesPostdata.searchMoviesByName, "Title");
  } catch (e) {
    errors.push(e);
  }
  let hasErrors = false;
  if (errors.length > 0) {
    hasErrors = true;
    res.status(400).render('error', {
      errors: errors,
      hasErrors: hasErrors
    });
    return;
  }
  try {
    const searchResult = await searchMoviesByName(moviesPostdata.searchMoviesByName);
    if(searchResult.Response == "False"){
      res.status(404).render('error',{searchMoviesByName: moviesPostdata.searchMoviesByName, isSearchByName: true});
    }
    else{
      res.render('movieSearchResults', {searchResult: searchResult.Search, searchMoviesByName: moviesPostdata.searchMoviesByName});
    }
  } catch (e) {
    res.status(500).json({error: e});
  }
});

router.route('/movie/:id').get(async (req, res) => {
  //code here for GET a single movie
  let errors = [];
  try {
    req.params.id = validation.checkString(req.params.id, "Id");
  } catch (e) {
    errors.push(e);
  }
  let isSearchById = false;
  if (errors.length > 0) {
    isSearchById = true;
    res.status(400).render('error', {
      errors: errors,
      isSearchById: isSearchById
    });
    return;
  }

  try {
    let errors = [];
    const searchByIdResult = await searchMovieById(req.params.id);
    if(searchByIdResult.Response == "False"){
      errors.push("No movie with the given Id")
      res.status(404).render('error',{searchMoviesById: req.params.id, isSearchById: true, errors:errors});//.........................................................................
    }
    else{
      res.render('movieById', {searchByIdResult: searchByIdResult, movieId: req.params.id});
    }
  } catch (error) {
    res.status(500).json({error: e});
  }
});

//export router
export default router;
