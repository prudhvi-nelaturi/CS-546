/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { modeFunction, isObject } from './helpers.js';

let objectStats = (arrObjects) => {
  //Code goes here
  if (arrObjects === undefined) {
    throw new Error('Please provide the input argument');
  }
  if (!Array.isArray(arrObjects)) {
    throw new Error('Please provide array as an input');
  }

  if (arrObjects.length === 0) {
    throw new Error(
      'Please provide at least one object in the array. The array should not be empty'
    );
  }
  arrObjects.forEach((obj) => {
    if (
      typeof obj !== 'object' ||
      obj === null ||
      Object.keys(obj).length === 0
    ) {
      throw new Error(
        'Each object in the array should not be empty and has at least 1 key value pair'
      );
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'number') {
          const isThreeDecimalOrLess =
            Number(value.toString().split('.')[1]?.length) <= 3 ||
            value.toString().split('.')[1] === undefined;
          if (!isThreeDecimalOrLess) {
            throw new Error(
              'Some values/value have more than three decimal places'
            );
          }
        } else {
          throw new Error('Some values/value is not a number');
        }
      }
    }
  });

  let objValues = [];
  let mean = 0,
    median = 0,
    mode = 0,
    range = 0,
    minimum = 0,
    maximum = 0,
    count = 0,
    sum = 0;

  for (let i = 0; i < arrObjects.length; i++) {
    Object.values(arrObjects[i]).forEach((value) => {
      objValues.push(value);
    });
    objValues.sort((a, b) => a - b);
  }
  sum =
    Math.round(
      objValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) * 1000
    ) / 1000;
  mean = Math.round((sum / objValues.length) * 1000) / 1000;
  let mid = Math.floor(objValues.length / 2);
  if (objValues.length % 2 === 0) {
    median =
      Math.round(((objValues[mid - 1] + objValues[mid]) / 2) * 1000) / 1000;
  } else {
    //Math.round((() * 1000)/1000;
    median = objValues[mid];
  }
  mode = modeFunction(objValues);
  mode.sort((a, b) => a - b);
  if (mode.length < 2) {
    mode = mode[0];
  }
  minimum = Math.min(...objValues);
  maximum = Math.max(...objValues);

  range = maximum - minimum;
  count = objValues.length;
  let result = {
    mean: mean,
    median: median,
    mode: mode,
    range: range,
    minimum: minimum,
    maximum: maximum,
    count: count,
    sum: sum,
  };
  return result;
};

let nestedObjectsDiff = (obj1, obj2) => {
  //Code goes here
  if (obj1 === undefined || obj2 === undefined) {
    throw new Error('Please provide the input argument');
  }
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    throw new Error('Obj1 or Obj2 must be an object');
  }

  if (
    obj1 === null ||
    Object.keys(obj1).length === 0 ||
    obj2 === null ||
    Object.keys(obj2).length === 0
  ) {
    console.log(obj1 === null);
    console.log(Object.keys(obj1).length === 0);
    console.log(obj2 === null);
    console.log(Object.keys(obj2).length === 0);
    console.log(Object.keys(obj1));
    throw new Error('Obj1 or Obj2 must have at least one key/value pair');
  }
  let result = {};

  Object.keys(obj1).forEach((key) => {
    if (!obj2.hasOwnProperty(key)) {
      result[key] = undefined;
    } else if (isObject(obj1[key]) && isObject(obj2[key])) {
      let objDiff = nestedObjectsDiff(obj1[key], obj2[key]);
      if (Object.keys(objDiff).length > 0) {
        result[key] = objDiff;
      }
    } else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      if (
        obj1[key].length !== obj2[key].length ||
        obj1[key].some((item, index) => item !== obj2[key][index])
      ) {
        result[key] = obj2[key];
      }
    } else if (obj1[key] !== obj2[key]) {
      result[key] = obj2[key];
    }
  });

  Object.keys(obj2).forEach((key) => {
    if (!obj1.hasOwnProperty(key)) {
      result[key] = obj2[key];
    }
  });

  return result;
};

let mergeAndSumValues = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  // console.log(args);
  // console.log(args.length);
  let result = {};
  if (args === undefined) {
    throw new Error('Please provide the input argument');
  }
  for (let obj of args) {
    if (typeof obj !== 'object') {
      throw new Error(
        'Please provide at least one key value pair as arguments in object'
      );
    }
    if (obj === null) {
      throw new Error('An object in the given input parameter is null');
    }
    if (Object.keys(obj).length === 0) {
      throw new Error(
        'The length of an object in the given input parameter is zero'
      );
    }
    if (obj === undefined) {
      throw new Error('Please provide the input argument');
    }
    for (let [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        if (isNaN(Number(value))) {
          throw new Error('There is a string that is not a valid number');
        }
      } else if (typeof value !== 'number') {
        throw new Error('Please provide either number or string as number');
      }

      const numValue = Number(value);
      if (result.hasOwnProperty(key)) {
        result[key] += numValue;
      } else {
        result[key] = numValue;
      }
    }
  }

  return result;
};

export { objectStats, nestedObjectsDiff, mergeAndSumValues };
