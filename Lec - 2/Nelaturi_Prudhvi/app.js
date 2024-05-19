import { arrayPartition, arrayShift, matrixOne } from './arrayUtils.js';
import {
  swapChars,
  longestCommonSubstring,
  palindromeOrIsogram,
} from './stringUtils.js';
import {
  objectStats,
  nestedObjectsDiff,
  mergeAndSumValues,
} from './objectUtils.js';
// import arrayShift from "./arrayUtils.js"

/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
// console.log("Hello World!")

//arrayUtils

// try {
//     const arrayToPartition3 = ["apple", "banana", "cherry", "date"];
//     const partitionFunc3 = (fruit) => fruit.length >= 6;
//     const partitionedArrays3 = arrayPartition(arrayToPartition3, partitionFunc3); // Expected Result: [['banana', 'cherry'], ['apple', 'date']]
//     console.log(partitionedArrays3);
// } catch (e) {
//     console.log(e.message);
// }

// try {
//     const arrayToPartition4 = [0];
//     const partitionFunc4 = (num) => num >= 0;
//     const partitionedArrays4 = arrayPartition(arrayToPartition4, partitionFunc4); // Throws error
//     console.log(partitionedArrays4);
// } catch (e) {
//     console.log(e.message);
// }

// try {
//     let temp = arrayShift(["","",""], 3) // throws error
//     console.log(temp);
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     let example1 =arrayShift(["Hello",true, 5,"Patrick","Goodbye"], -2)   // returns [true, 5, "Patrick", "Goodbye", "Hello"]
//     console.log(example1);
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     let result = matrixOne([[2,2,2],[2,0,2],[2,2,2]]) //returns [[2,1,2],[1,1,1],[2,1,2]]
//     console.log(result);
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     let result = matrixOne([[0,1,2,0],[3,5,4]])// throws error
//     console.log(result);
// } catch (error) {
//     console.log(error.message);
// }

// //stringUtils

// try {
//     let result = swapChars("Patrick", ""); //throws error
//     console.log(result);
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     let result = swapChars("A test", "twice"); //twicst A tee
//     console.log(result);
// } catch (error) {
//     console.log(error.message);
// }

// // try {
// //     let result = swapChars ("h","e") // Throws Error
// //     console.log(result)
// // } catch (error) {
// //     console.log(error.message);
// // }

// try {
//     const str1 = "programmer";
//     const str2 = "ProGramming";
//     const commonSubstring = longestCommonSubstring(str1, str2); // Expected Result: "programm"
//     console.log(commonSubstring);
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     const str1 = "";
//     const str2 = "123456";
//     const commonSubstring = longestCommonSubstring(str1, str2); // Expected Result: throws error
//     console.log(commonSubstring);
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     const checkStrings = (["Madam", "Lumberjack", "He did, eh?", "Background", "Taco cat? Taco cat.", "Invalid String"]);
//     const results = palindromeOrIsogram(checkStrings);
//     console.log(results);
// //returns and then logs:
// // { "Madam": "Palindrome", "Lumberjack": "Isogram", "He did, eh?": "Palindrome", "Background": "Isogram", "Taco cat? Taco cat.": "Palindrome", "Invalid String": "Neither" }
// } catch (error) {
//     console.log(error.message);

// }

// try {
//     const strings2 = ["f", "!?o!", "!asd!", "!!", "Go hang a salami, I’m a lasagna hog"];
//     const results2 = palindromeOrIsogram(strings2);
//     console.log(results2); //throws error
// } catch (error) {
//     console.log(error.message);
// }

// //objectUtils

// try {
//     const arrayOfObjects1 =  [ { a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 }, { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }, ];
//     const statsResult1 = objectStats(arrayOfObjects1);
//     console.log(statsResult1);
// // Expected Result:{ mean: 8.346, median: 10, mode: 15, range: 17, minimum: -2, maximum: 15, count: 13, sum: 108.5 }
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     const arrayOfObjects3 = [  ];  //Thwors error
//     const statsResult3 = objectStats(arrayOfObjects3);
//     console.log(statsResult3);
// } catch (error) {
//     console.log(error.message);
// }

try {
  const obj1 = { a: 1, b: { c: 2, d: [3, 4] }, e: 'hello' };
  const obj2 = { a: 1, b: { c: 2, d: [3, 5] }, f: 'world' };
  const differences1 = nestedObjectsDiff(
    { a: {}, c: { a: '4', b: {} } },
    { a: {}, b: {}, c: { a: '5', b: 'five' } }
  ); // Expected Result: { b: { d: [3, 5] }, e: undefined, f: "world" }
  console.log(differences1);
} catch (error) {
  console.log(error.message);
}

// try {
//     const obj1 = { };
//     const obj2 = { key1: "value1", key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey", };
//     const differences = nestedObjectsDiff(obj1, obj2);
// // Example Output:  throws error
//     console.log(differences);
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     const object1 = { a: 3, b: 7, c: "5" };
//     const object2 = { b: 2, c: "8", d: "4" };
//     const object3 = { a: 5, c: 3, e: 6 };
//     const resultMergedAndSummed = mergeAndSumValues(object1, object2, object3);
//     console.log(resultMergedAndSummed);
// // Expected Result: { a: 8, b: 9, c: 16, d: 4, e: 6 }
// } catch (error) {
//     console.log(error.message);
// }

// try {
//     const obj10 = { a: 1, b: "2", c: 3 };
//     const obj11 = { b: 3, c: 4, d: 5 };
//     const obj12 = { a: 2, c: "hello", e: 6 };
//     const result4 = mergeAndSumValues(obj10, obj11, obj12); // Throws an error
// } catch (error) {
//     console.log(error.message);
// }
