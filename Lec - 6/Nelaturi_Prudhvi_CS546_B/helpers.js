// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import { ObjectId } from 'mongodb';
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
    if (!ObjectId.isValid(id)) {
      throw new Error('Error: invalid object ID');
    }
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw new Error(`Error: You must supply a ${varName}!`);
    if (typeof strVal !== 'string')
      throw new Error(`Error: ${varName} must be a string!`);
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw new Error(
        `Error: ${varName} cannot be an empty string or string with just spaces`
      );
    if (!isNaN(strVal))
      throw new Error(
        `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`
      );
    return strVal;
  },
};

export default exportedMethods;
