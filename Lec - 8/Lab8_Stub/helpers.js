const exportedMethods = {
  checkString(strVal, varName) {
    if (!strVal) throw new Error(`You must supply a ${varName}!`);
    if (typeof strVal !== 'string')
      throw new Error(`${varName} must be a string!`);
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw new Error(
        `${varName} cannot be an empty string or string with just spaces`
      );
    return strVal;
  },
};

export default exportedMethods;
