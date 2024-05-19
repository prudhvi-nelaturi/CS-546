// This data file should export all functions using the ES6 standard as shown in the lecture code
import { isHttpUri, isHttpsUri, isUri, isWebUri } from 'valid-url';
import { products } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import validation from '../helpers.js';

export const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  if (
    !productName ||
    !productDescription ||
    !modelNumber ||
    !price ||
    !manufacturer ||
    !manufacturerWebsite ||
    !keywords ||
    !categories ||
    !dateReleased
  )
    throw new Error('All fields must be supplied');

  if (
    typeof productName !== 'string' ||
    typeof productDescription !== 'string' ||
    typeof modelNumber !== 'string' ||
    typeof manufacturer !== 'string' ||
    typeof manufacturerWebsite !== 'string' ||
    typeof dateReleased !== 'string'
  ) {
    throw new Error('data type mismatch in the input parameters');
  }
  productName = productName.trim();
  productDescription = productDescription.trim();
  modelNumber = modelNumber.trim();
  manufacturer = manufacturer.trim();
  manufacturerWebsite = manufacturerWebsite.trim();
  dateReleased = dateReleased.trim();

  if (
    productName.length === 0 ||
    productDescription.length === 0 ||
    modelNumber.length === 0 ||
    manufacturer.length === 0 ||
    manufacturerWebsite.length === 0 ||
    dateReleased.length === 0
  ) {
    throw new Error(
      'some input parameters cannot be empty strings or strings with just spaces'
    );
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Price must be a number greater than 0.');
  }
  let convertedPrice = price.toString();
  let value = 0;
  for (let i = 0; i < convertedPrice.length; i++) {
    if (convertedPrice[i] === '.') {
      // console.log(i);
      for (let j = i + 1; j < convertedPrice.length; j++) {
        value++;
      }
    }
  }
  if (value > 2) {
    throw new Error('Price must have only upto two decimals');
  }

  let myArray = manufacturerWebsite.split('.');
  if (myArray[1].length < 5) {
    throw new Error(
      'Please provide a valid website that has at least 5 charcters'
    );
  }
  // console.log(isUri(manufacturerWebsite));
  // console.log(isHttpUri(manufacturerWebsite));
  // console.log(isHttpsUri(manufacturerWebsite));
  // console.log(isWebUri(manufacturerWebsite));
  if (
    !isWebUri(manufacturerWebsite) ||
    !isHttpUri(manufacturerWebsite) ||
    !isUri(manufacturerWebsite)
  ) {
    throw new Error('Invalid Website');
  }
  if (!Array.isArray(keywords)) {
    throw new Error('You must provide an array of keywords');
  }
  if (keywords.length === 0) {
    throw new Error('You must supply at least one keyword');
  }
  for (let i in keywords) {
    if (typeof keywords[i] !== 'string' || keywords[i].trim().length === 0) {
      throw new Error(
        'One or more keywords is not a string or is an empty string'
      );
    }
    keywords[i] = keywords[i].trim();
  }

  if (!Array.isArray(categories)) {
    throw new Error('You must provide an array of categories');
  }
  if (categories.length === 0) {
    throw new Error('You must supply at least one category');
  }
  for (let i in categories) {
    if (
      typeof categories[i] !== 'string' ||
      categories[i].trim().length === 0
    ) {
      throw new Error(
        'One or more categories is not a string or is an empty string'
      );
    }
    categories[i] = categories[i].trim();
  }

  const parts = dateReleased.split('/');
  const month = parseInt(parts[0]);
  const day = parseInt(parts[1]);
  const year = parseInt(parts[2]);
  if (month <= 0 || month > 12) {
    throw new Error('Invalid month');
  }
  if (year > 2024) {
    throw new Error('Invalid year');
  }
  const datesArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day > datesArray[month - 1]) {
    throw new Error('Please provide the valid date');
  }
  // console.log(year);
  // console.log(month);
  // console.log(day);
  const dateToday = new Date();
  if (year === 2024) {
    if (month - 1 > dateToday.getMonth()) {
      throw new Error('Future month');
    } else if (month - 1 === dateToday.getMonth()) {
      if (day > dateToday.getDate()) {
        throw new Error('Future Date');
      }
    }
  }
  if (typeof discontinued !== 'boolean') {
    throw new Error('discontinued must be boolean');
  }
  let newProduct = {
    productName: productName,
    productDescription: productDescription,
    modelNumber: modelNumber,
    price: price,
    manufacturer: manufacturer,
    manufacturerWebsite: manufacturerWebsite,
    keywords: keywords,
    categories: categories,
    dateReleased: dateReleased,
    discontinued: discontinued,
    reviews: [],
    averageRating: 0,
  };
  let productCollection = await products();
  const insertInfo = await productCollection.insertOne(newProduct);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw new Error("Couldn't add product");
  }
  // console.log(insertInfo.insertedId);
  const newId = insertInfo.insertedId.toString();
  // console.log(newId);
  const theProduct = get(newId);
  return theProduct;
};

export const getAll = async () => {
  let productCollection = await products();
  let productList = await productCollection
    .find({}, { projection: { productName: 1 } })
    .toArray();
  // productList = productList.map((element) => {
  //   element._id = element._id.toString();
  //   return element;
  // });
  // We do not need to do this actually, according to the comment in slack that "No need to do that now that we have a web server. The res.json in your route does that automatically"
  return productList;
};

export const get = async (productId) => {
  const id = validation.checkId(productId);
  let productCollection = await products();
  // console.log(id);
  const theProduct = await productCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!theProduct) {
    throw new Error('No product with that id');
  }
  // console.log(theProduct);
  // theProduct._id = theProduct._id.toString();
  // console.log(theProduct);
  return theProduct;
};

export const remove = async (productId) => {
  const id = validation.checkId(productId);
  let productCollection = await products();
  const deletionInfo = await productCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (!deletionInfo) {
    throw new Error(`Could not delete product with id of ${id}`);
  }
  return { _id: deletionInfo._id, deleted: true };
};

export const update = async (
  productId,
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  const id = validation.checkId(productId);
  if (
    !productName ||
    !productDescription ||
    !modelNumber ||
    !price ||
    !manufacturer ||
    !manufacturerWebsite ||
    !keywords ||
    !categories ||
    !dateReleased
  )
    throw new Error('All fields must be supplied');

  if (
    typeof productName !== 'string' ||
    typeof productDescription !== 'string' ||
    typeof modelNumber !== 'string' ||
    typeof manufacturer !== 'string' ||
    typeof manufacturerWebsite !== 'string' ||
    typeof dateReleased !== 'string'
  ) {
    throw new Error('data type mismatch in the input parameters');
  }
  productName = productName.trim();
  productDescription = productDescription.trim();
  modelNumber = modelNumber.trim();
  manufacturer = manufacturer.trim();
  manufacturerWebsite = manufacturerWebsite.trim();
  dateReleased = dateReleased.trim();

  if (
    productName.length === 0 ||
    productDescription.length === 0 ||
    modelNumber.length === 0 ||
    manufacturer.length === 0 ||
    manufacturerWebsite.length === 0 ||
    dateReleased.length === 0
  ) {
    throw new Error(
      'some input parameters cannot be empty strings or strings with just spaces'
    );
  }
  if (typeof price !== 'number' || price <= 0) {
    throw new Error('Price must be a number greater than 0.');
  }
  let convertedPrice = price.toString();
  let value = 0;
  for (let i = 0; i < convertedPrice.length; i++) {
    if (convertedPrice[i] === '.') {
      // console.log(i);
      for (let j = i + 1; j < convertedPrice.length; j++) {
        value++;
      }
    }
  }
  if (value > 2) {
    throw new Error('Price must have only upto two decimals');
  }

  let myArray = manufacturerWebsite.split('.');
  if (myArray[1].length < 5) {
    throw new Error(
      'Please provide a valid website that has at least 5 charcters'
    );
  }
  // console.log(isUri(manufacturerWebsite));
  // console.log(isHttpUri(manufacturerWebsite));
  // console.log(isHttpsUri(manufacturerWebsite));
  // console.log(isWebUri(manufacturerWebsite));
  if (
    !isWebUri(manufacturerWebsite) ||
    !isHttpUri(manufacturerWebsite) ||
    !isUri(manufacturerWebsite)
  ) {
    throw new Error('Invalid Website');
  }
  if (!Array.isArray(keywords)) {
    throw new Error('You must provide an array of keywords');
  }
  if (keywords.length === 0) {
    throw new Error('You must supply at least one keyword');
  }
  for (let i in keywords) {
    if (typeof keywords[i] !== 'string' || keywords[i].trim().length === 0) {
      throw new Error(
        'One or more keywords is not a string or is an empty string'
      );
    }
    keywords[i] = keywords[i].trim();
  }

  if (!Array.isArray(categories)) {
    throw new Error('You must provide an array of categories');
  }
  if (categories.length === 0) {
    throw new Error('You must supply at least one category');
  }
  for (let i in categories) {
    if (
      typeof categories[i] !== 'string' ||
      categories[i].trim().length === 0
    ) {
      throw new Error(
        'One or more categories is not a string or is an empty string'
      );
    }
    categories[i] = categories[i].trim();
  }

  const parts = dateReleased.split('/');
  const month = parseInt(parts[0]);
  const day = parseInt(parts[1]);
  const year = parseInt(parts[2]);
  if (month <= 0 || month > 12) {
    throw new Error('Invalid month');
  }
  if (year > 2024) {
    throw new Error('Invalid year');
  }
  const datesArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day > datesArray[month - 1]) {
    throw new Error('Please provide the valid date');
  }
  // console.log(year);
  // console.log(month);
  // console.log(day);
  const dateToday = new Date();
  if (year === 2024) {
    if (month - 1 > dateToday.getMonth()) {
      throw new Error('Future month');
    } else if (month - 1 === dateToday.getMonth()) {
      if (day > dateToday.getDate()) {
        throw new Error('Future Date');
      }
    }
  }
  if (typeof discontinued !== 'boolean') {
    throw new Error('discontinued must be boolean');
  }
  let productCollection = await products();
  // console.log('hasdf');
  let updatedProduct = await productCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        productName: productName,
        productDescription: productDescription,
        modelNumber: modelNumber,
        price: price,
        manufacturer: manufacturer,
        manufacturerWebsite: manufacturerWebsite,
        keywords: keywords,
        categories: categories,
        dateReleased: dateReleased,
        discontinued: discontinued,
      },
    }
  );
  // console.log(updatedProduct);
  // console.log('asqwe');
  // if (!updatedProduct) {
  //   throw new Error("Couldn't update the product");
  // }
  return await get(id);
};
