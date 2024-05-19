/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
import { isPalindrome, isIsogram } from "./helpers.js";

let swapChars = (string1, string2) => {
  //code goes here
  if (string1 === undefined || string2 === undefined) {
    throw new Error("Both of the arguments must be provided");
  }

  if (typeof string1 !== 'string' || typeof string2 !== 'string') {
    throw new Error("Please provide the both argument as string type only");
  }

  if (string1.trim().length < 4 || string2.trim().length < 4) {
    throw new Error("Both the strings must contain at least 4 characters");
  }
  let trimmedString1 = string1.trim();
  let trimmedString2 = string2.trim();
  let string1SubString = trimmedString1.substring(0, 4);
  let string2SubString = trimmedString2.substring(0, 4);
  let string1Rest = trimmedString1.slice(4);
  let string2Rest = trimmedString2.slice(4);

  return `${string2SubString}${string1Rest} ${string1SubString}${string2Rest}`;
};

let longestCommonSubstring = (str1, str2) => {
  //code goes here
  if (str1 === undefined || str2 === undefined) {
    throw new Error("Please provide both the arguments");
  }

  // Check if both parameters are of the proper type (strings)
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw new Error("Both the provided arguments must be strings");
  }

  // Check if both strings are not just empty or spaces and have at least 5 characters
  if (str1.trim().length < 5 || str2.trim().length < 5) {
    throw new Error("String is less than 5 characters");
  }

  let trimmedStr1 = str1.trim().toLowerCase();
  let trimmedStr2 = str2.trim().toLowerCase();

  let longestCommonSubstring = "";

  for (let i = 0; i < trimmedStr1.length; i++) {
    for (let j = i+1; j <= trimmedStr1.length; j++) {
      let subString = trimmedStr1.slice(i, j);

      if(trimmedStr2.includes(subString) && subString.length > longestCommonSubstring.length){
        longestCommonSubstring = subString;
      }
    }
  }
  return longestCommonSubstring;
};

let palindromeOrIsogram = (arrStrings) => {
  //code goes here
  

  if (!Array.isArray(arrStrings)) {
    throw new Error("Please provide an array with strings");
  }
  if(arrStrings === undefined){
    throw new Error("Please provide the input argument");
  }
  
  if (arrStrings.length < 2) {
    throw new Error("Please provide at least two string elements in the array");
  }

  for (let i = 0; i < arrStrings.length; i++) {
    if (typeof arrStrings[i] !== 'string' || arrStrings[i].trim().length === 0) {
      throw new Error("Please provide strings as elements and it should be at least one character");
    }
    else if((arrStrings[i].replace(/[^A-Za-z0-9]/g, '').toLowerCase()).length===0){
      throw new Error("Please provide string that has at least one character");
    }
  }
  let result = {};
  arrStrings.forEach(element => {
    if(isPalindrome(element) && isIsogram(element)){
      result[element] = "Both";
    }
    else if(isPalindrome(element)){
      result[element] = "Palindrome";
    }
    else if(isIsogram(element)){
      result[element] = "Isogram";
    }
    else{
      result[element] = "Neither";
    }
  });
  return result;
};

export {swapChars, longestCommonSubstring, palindromeOrIsogram};

