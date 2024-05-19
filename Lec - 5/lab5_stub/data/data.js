/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import { Companies, People } from '../helpers.js';
import validation from '../helpers.js';

export const getCompanies = async () => {
  let obtainedData = await Companies();
  if (!obtainedData) {
    throw new Error('Company data not found');
  } else {
    return obtainedData;
  }
  // console.log(CompanyCollection);
};

export const getPeople = async () => {
  let obtainedData = await People();
  if (!obtainedData) {
    throw new Error('People data not found');
  } else {
    return obtainedData;
  }
};

export const getCompanyById = async (id) => {
  id = validation.checkId(id);
  let obtainedData = await Companies();
  if (!obtainedData) {
    throw new Error('Company data not found');
  }
  let result = obtainedData.find((obj) => obj.id === id);

  if (!result) {
    throw new Error('Company not found');
  } else {
    return result;
  }
};

export const getPersonById = async (id) => {
  id = validation.checkId(id);
  let obtainedData = await People();
  if (!obtainedData) {
    throw new Error('People data not found');
  }
  let result = obtainedData.find((obj) => obj.id === id);

  if (!result) {
    throw new Error('People not found');
  } else {
    return result;
  }
};
