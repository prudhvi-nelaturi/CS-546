$('#static-form').submit((event) => {
  event.preventDefault();
  function isConsonant(ch){
    return /[a-z]/.test(ch) && !/[aeiou]/.test(ch);
  }
  function isVowel(ch){
    return ['a', 'e', 'i', 'o', 'u'].includes(ch);
  }
  let totalLetters = (val) => {
    let count=0;
    
    for(let i=0;i<val.length; i++){
      let ch = val.charAt(i);
      if(isConsonant(ch) || isVowel(ch)){
        count++;
      }
    }
    return count;
  }
  let totalNonLetters = (val) => {
    let count=0;
    for(let i=0;i<val.length; i++){
      let ch = val.charAt(i);
      if(!isConsonant(ch) && !isVowel(ch)){
        count++;
      }
    }
    return count;
  }
  let totalVowels = (val) =>{
    let count = 0;
    for(let i=0;i<val.length; i++){
      let ch = val.charAt(i);
      if(isVowel(ch)){
        count++;
      }
    }
    return count;
  }
  let totalConsonants = (val) =>{
    let count = 0;
    for(let i=0;i<val.length; i++){
      let ch = val.charAt(i);
      if(isConsonant(ch)){
        count++;
      }
    }
    return count;
  }
  let totalNoOfWords = (val) =>{
    let inWord = false; 
    let count = 0;

    for (let i = 0; i < val.length; i++) {
      if ((/[a-z]/.test(val[i]) && !/[aeiou]/.test(val[i]) || ['a', 'e', 'i', 'o', 'u'].includes(val[i])) && !inWord) {
        if (!inWord) {
          count++;
          inWord = true;
        }
      } else if (!isConsonant(val[i]) && !isVowel(val[i])) {
        inWord = false;
      }
    }

    return count;
  }
  let totalUniqueWords = (val) =>{
    let uniqueArray = [];
    let word = "";
    for (let i = 0; i < val.length; i++){
      if(val[i]>= 'a' && val[i] <='z'){
        word += val[i];
      }else if (word.length >0){
        if((!uniqueArray.includes(word))){
          uniqueArray.push(word);
          
        }
        word = "";
      }
    }
    if (word.length > 0 && !uniqueArray.includes(word)) {
      uniqueArray.push(word);
  }
    return uniqueArray.length;
  }

  let totalLongWords = (val) => {
    let uniqueArray = [];
    let word = "";
    let count = 0;
    for (let i = 0; i < val.length; i++){
      if(val[i]>= 'a' && val[i] <='z'){
        word += val[i];
      }else if (word.length >0){
        uniqueArray.push(word);
        word = "";
      }
    }
    if (word.length > 0) {
      uniqueArray.push(word);
  }
  uniqueArray.forEach(element => {
    if(element.length >=6){
      count++;
    }
  });
  return count;
  }

  let totalShortWords = (val) => {
    let uniqueArray = [];
    let word = "";
    let count = 0;
    for (let i = 0; i < val.length; i++){
      if(val[i]>= 'a' && val[i] <='z'){
        word += val[i];
      }else if (word.length >0){
        uniqueArray.push(word);
        word = "";
      }
    }
    if (word.length > 0) {
      uniqueArray.push(word);
  }
  uniqueArray.forEach(element => {
    if(element.length <=3){
      count++;
    }
  });
  return count;
  }



  if ($('#text_to_analyze').val().trim()) {
    
    $('#error').hide();
    $('#formLabel').removeClass('error');
    $('#text_to_analyze').removeClass('inputClass');

    // const li = `<li width=> ${$('#text_to_analyze').val()} </li>`;
    // $('#dl').append(li);

    const dl = $('<dl></dl>');
    const dt = $('<dt>Original Input:</dt>');
    const dt1 = $('<dt>Total Number of Letters</dt>');
    const dt2 = $('<dt>Total Number of Non-Letters</dt>');
    const dt3 = $('<dt>Total Number of Vowels</dt>');
    const dt4 = $('<dt>Total Number of Consonants</dt>');
    const dt5 = $('<dt>Total Number of Words</dt>');
    const dt6 = $('<dt>Total Number of Unique Words</dt>');
    const dt7 = $('<dt>Total Number of Long Words</dt>');
    const dt8 = $('<dt>Total Number of Short Words</dt>');
    
    const originalText = $('#text_to_analyze').val().trim();
    const dd = $('<dd></dd>').text(originalText);
    const text = $('#text_to_analyze').val().toLowerCase().trim();
    const dd1 = $('<dd></dd>').text(totalLetters(text));
    const dd2 = $('<dd></dd>').text(totalNonLetters(text));
    const dd3 = $('<dd></dd>').text(totalVowels(text));
    const dd4 = $('<dd></dd>').text(totalConsonants(text));
    const dd5 = $('<dd></dd>').text(totalNoOfWords(text));
    const dd6 = $('<dd></dd>').text(totalUniqueWords(text));
    const dd7 = $('<dd></dd>').text(totalLongWords(text));
    const dd8 = $('<dd></dd>').text(totalShortWords(text));

    dl.append(dt);
    dl.append(dd);
    dl.append(dt1);
    dl.append(dd1);
    dl.append(dt2);
    dl.append(dd2);
    dl.append(dt3);
    dl.append(dd3);
    dl.append(dt4);
    dl.append(dd4);
    dl.append(dt5);
    dl.append(dd5);
    dl.append(dt6);
    dl.append(dd6);
    dl.append(dt7);
    dl.append(dd7);
    dl.append(dt8);
    dl.append(dd8);

    
    $('#text_output').append(dl);
    $('#static-form').trigger('reset');
    $('#text_to_analyze').focus();

  } else {
    $('#error').show();
    $('#error').html('You must enter an input value');
    $('#formLabel').addClass('error');
    $('#text_to_analyze').addClass('inputClass');
    $('#text_to_analyze').focus();
    $('#text_to_analyze').val('');
  }
})
