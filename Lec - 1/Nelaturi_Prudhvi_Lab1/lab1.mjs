export const questionOne = (index) => {
  // Implement question 1 here
  //Fibonacci
  let n1 = 0;
  let n2 = 1;

  let answer = n1+n2;
  if(index < 1){
    return 0;
  }
  else{
    for(var i = 1;i<index;i++){
      answer = n1+n2;
      n1 = n2;
      n2 = answer;
    }
  }
  return answer; //return result
};

export const questionTwo = (arr) => {
  // Implement question 2 here
  //Prime

  function isPrime(value){
    if(value < 2){
      return false;
    }
    for(let i =2;i<=Math.sqrt(value); i++){
      if(value %i ===0){
        return false;
      }
    }
    return true;
  }
  let result = {}

  if(arr === undefined){
    return result;
  }

  arr.forEach((value) => {
    result[value] = isPrime(value);
  });
  return result; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  //I am using regular expression instead of using ASCII values/Unicode function. 

  let consonants =0, vowels = 0, numbers = 0, spaces = 0, punctuation = 0, specialCharacter = 0;
  
  function isConsonant(ch){
    return /[a-z]/.test(ch) && !/[aeiou]/.test(ch);
  }
  function isVowel(ch){
    return ['a', 'e', 'i', 'o', 'u'].includes(ch);
  }
  function isNumber(ch){
    return /[0-9]/.test(ch);
  }
  function isPunctuation(ch){
    return ['.', ',', '"', '!', ';', ':', '?', '{', '}', '(', ')', '[', ']', '-', '—', "'"].includes(ch);
  }
  // function isSpecialCharacter(ch){
  //   return ['!', '@', '#', '$', '%', '^', '&', '*', '`', '~', '=', '|', '<', '>', '/', ].includes(ch);
  // }

  for(let i=0;i<str.length; i++){
    let ch = str.charAt(i).toLowerCase();
    // console.log(ch);
    if(isConsonant(ch)){
      consonants++;
    }
    else if(isVowel(ch)){
      vowels++;
    }
    else if(isNumber(ch)){
      numbers++;
    }
    else if(ch===' '){
      spaces++;
    }
    else if(isPunctuation(ch)){
      punctuation++;
    }
    else{
      specialCharacter++;
    }
    // console.log(consonants);

  }

  let result = {consonants : consonants, vowels: vowels, numbers: numbers, spaces: spaces, punctuation: punctuation, specialCharacter: specialCharacter};
  return result; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  let result = [];
  for(let i=0;i<arr.length;i++){
    if(!result.includes(arr[i])){
      result.push(arr[i]);
    }
  }
  return result; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'PRUDHVI',
  lastName: 'NELATURI',
  studentId: '20018695'
};
