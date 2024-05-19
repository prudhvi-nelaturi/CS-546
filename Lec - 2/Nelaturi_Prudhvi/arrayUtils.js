/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayPartition = (arrayToPartition, partitionFunc) => {
  //code goes here
  if(!Array.isArray(arrayToPartition)){
    throw new Error('Please provide a valid array as first argument');
  }
  if(arrayToPartition === undefined || partitionFunc === undefined){
    throw new Error("Please provide the input argument");
  }

  if(arrayToPartition.length<2){
    throw new Error('Please provde at least two elements in the first argument')
  }

  if(typeof partitionFunc !== 'function'){
    throw new Error('Please provide a valid function as second argument');
  }

  let satisfiedArr = [];
  let unSatisfiedArr = [];
  let result = []
  arrayToPartition.forEach(value => {
    if(partitionFunc(value)){
      satisfiedArr.push(value);
    }
    else{
      unSatisfiedArr.push(value);
    } 
    // try {
    //   if(partitionFunc(value)){
    //     satisfiedArr.push(value);
    //   }
    //   else{
    //     unSatisfiedArr.push(value);
    //   }
    // } catch (e) {
    //   console.log(e.message);
    // }
  });

  result.push(satisfiedArr);
  result.push(unSatisfiedArr);
  return result;
};

let arrayShift = (arr, n) => {
  //code goes here
  if(arr === undefined || n===undefined){
    throw new Error("Please provide the input argument");
  }
  if (!Array.isArray(arr)) {
    throw new TypeError("Please provide valid array as first argument");
  }

  if (arr.length < 2|| arr.every(element => element === "")) {
    throw new Error("Please provide the array with at least two elements as first argument");
  }

  if (typeof n !== 'number') {
    throw new TypeError("Please provide a valid number as second argument");
  }

  if (!Number.isInteger(n)) {
    throw new Error("Please provide a valid Integer as second argument");
  }
  n = n%arr.length;
  // console.log(n);
  

  if(n>0){ // pop = To remove last element and unshift to add an element in the beginning of the array
    for (let i = 0; i < n; i++) {
      let elementRemoved = arr.pop();
      arr.unshift(elementRemoved);
    }
    return arr;
  }
  else if(n<0){
    let nPositive = Math.abs(n);
    for (let i = 0; i < nPositive; i++) { //shift() to remove first element in the array and push to add element in the end. 
      let elementRemoved = arr.shift();
      arr.push(elementRemoved);
    }
    return arr;
  } else{
    return arr;
  }

  
};

let matrixOne = (matrix) => {
  //code goes here
  if(matrix === undefined){
    throw new Error("Please provide the input argument");
  }
  if (!Array.isArray(matrix)) {
    throw new Error("Please provide the array as matrix argument");
  }

  
  if (matrix.length === 0) {
    throw new Error("Please provide elements in the matrix array");
  }
  let expectedLength = matrix[0].length;

  if (expectedLength === 0) {
    throw new Error("The elements in the sub array of matrix must also be provided");
  }

  for (let i = 0; i < matrix.length; i++) {
    let row = matrix[i];

    if (!Array.isArray(row)) {
      throw new Error('Some elements in the matrix might not be an array');
    }

    if (row.length === 0) {
      throw new Error('An array in the sub array might be empty');
    }
    if(row === undefined){
      throw new Error("Please provide the input argument");
    }
    if (row.length !== expectedLength) {
      throw new Error('All rows in the matrix must have the same number of elements.');
    }

    for (let j = 0; j < row.length; j++) {
      if (typeof row[j] !== 'number') {
        throw new Error('Some elements in the matrix might not be a number');
      }
    }
  }

  let rowsToUpdate = [];
  let columnsToUpdate = [];

  let noOfRows = matrix.length;
  let noOfCols = matrix[0].length;
  for (let i = 0; i <noOfRows; i++) {
    for (let j = 0; j < noOfCols; j++) {
      if(matrix[i][j] === 0){
        if(!rowsToUpdate.includes(i)){
          rowsToUpdate.push(i);
        }
        if(!columnsToUpdate.includes(j)){
          columnsToUpdate.push(j);
        }
      } 
    }
  }
  rowsToUpdate.forEach(element => {
    for(let j = 0; j<noOfCols;j++){
      matrix[element][j] = 1;
    }
  });

  columnsToUpdate.forEach(element => {
    for(let i = 0; i<noOfRows;i++){
      matrix[i][element] = 1;
    }
  });

  return matrix;
};


export { arrayPartition, arrayShift, matrixOne };
