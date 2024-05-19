/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

let isPalindrome = (str) =>{
    str = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    return str === str.split('').reverse().join('');
}
let isIsogram = (str) =>{
    str = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j < str.length; j++) {
            // Compare each character with every other character in the str.
            if (str[i] === str[j]) {
                // If any two characters are the same, it's not an isogram.
                return false;
            }
        }
    }
    return true;
}

let modeFunction = (objValues) =>{
    const frequencyMap = {};
    let maxFrequency = 0;
    const modes = [];

    for (const item of objValues) {
        if (frequencyMap[item]) {
            frequencyMap[item]++;
        } else {
            frequencyMap[item] = 1;
        }
        if (frequencyMap[item] > maxFrequency) {
            maxFrequency = frequencyMap[item];
        }
    }

    const allFrequencies = Object.values(frequencyMap);
    const allSameFrequency = allFrequencies.every(f => f === allFrequencies[0]);
    if (allSameFrequency && allFrequencies.length > 1) {
        return 0; 
    }

    for (const key in frequencyMap) {
        if (frequencyMap[key] === maxFrequency) {
            modes.push(Number(key));
        }
    }

    return modes.length ? modes : 0; 


    // const frequencyMap = {};
    // let maxFrequency = 0;
    // const modes = [];


    // for (const item of objValues) {
    //     if (frequencyMap[item]) {
    //         frequencyMap[item]++;
    //     } else {
    //         frequencyMap[item] = 1;
    //     }
    //     if (frequencyMap[item] > maxFrequency) {
    //         maxFrequency = frequencyMap[item];
    //     }
    // }
    // for (const key in frequencyMap) {
    //     if (frequencyMap[key] === maxFrequency) {
    //         modes.push(Number(key));
    //     }
    // }

    // return modes;
}

let isObject = (obj) => {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}

export {isPalindrome, isIsogram, modeFunction, isObject};