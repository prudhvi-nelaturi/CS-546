//import axios, md5
import axios from 'axios';
import validation from '../helpers.js';

export const searchMoviesByName = async (title) => {
  /*Function to make an axios call to search the api and return up to 20 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  'http://www.omdbapi.com/?apikey=CS546&s={title}&page={2}'
  */
  title = validation.checkString(title, 'title');
  try {
    var { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=CS546&s=${title}`
    );
    if (data.totalResults > 10) {
     try {
      var { data: data1 } = await axios.get(
        `http://www.omdbapi.com/?apikey=CS546&s=${title}&page=2`
      );
     } catch (error) {
      console.log(error.message);
     }
      for(let i = 0;i<data1.Search.length; i++){
        data.Search.push(data1.Search[i]);
      }
      //should I just push the other ten into the movielist or how to return those two objects?.....................................................................................
    }
    
    return data; // this will be the array of objects
  } catch (error) {
    console.log(error.message);
  }
};

export const searchMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
  id = validation.checkString(id, 'id');
  // console.log(id);
  try {
    var { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=CS546&i=${id}`
    );
    return data; // this will be the array of objects
  } catch (error) {
    console.log(error.message);
  }
};
