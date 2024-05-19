//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import axios from 'axios';
// import { ObjectId } from 'mongodb';

export async function Companies() {
  try {
    var { data } = await axios.get(
      'https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json'
    );
    return data; // this will be the array of companies objects
  } catch (error) {
    console.log(error.message);
  }
}

export async function People() {
  try {
    var { data } = await axios.get(
      'https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json'
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const exportedMethods = {
  checkId(id) {
    if (!id) {
      throw new Error('Error: You must provide an id to search for');
    }
    if (typeof id !== 'string') {
      throw new Error('Error: id must be a string');
    }
    id = id.trim();
    if (id.length === 0) {
      throw new Error('Error: id cannot be an empty string or just spaces');
    }
    // if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
    return id;
  },

  // checkString(strVal, varName) {
  //   if (!strVal) throw `Error: You must supply a ${varName}!`;
  //   if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
  //   strVal = strVal.trim();
  //   if (strVal.length === 0)
  //     throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  //   if (!isNaN(strVal))
  //     throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  //   return strVal;
  // },
};

export default exportedMethods;
