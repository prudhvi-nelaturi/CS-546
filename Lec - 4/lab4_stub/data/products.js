// TODO: Export and implement the following functions in ES6 format

import { isHttpUri, isHttpsUri, isUri, isWebUri } from 'valid-url';
import { products } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';

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
  let productList = await productCollection.find({}).toArray();
  productList.forEach((element) => {
    element._id = element._id.toString();
    return element;
  });
  return productList;
};

export const get = async (id) => {
  if (!id) {
    throw new Error('Please provide the valid id');
  }
  if (typeof id !== 'string') {
    throw new Error('Id must be a string');
  }
  if (id.trim().length === 0) {
    throw new Error('Id cannot be an empty string or just spaces');
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw new Error('invalid object ID');
  }
  let productCollection = await products();
  const theProduct = await productCollection.findOne({ _id: new ObjectId(id) });
  if (theProduct === null) {
    throw new Error('No product with that id');
  }
  theProduct._id = theProduct._id.toString();
  return theProduct;
};

export const remove = async (id) => {
  if (!id) {
    throw new Error('Please provide the valid id');
  }
  if (typeof id !== 'string') {
    throw new Error('Id must be a string');
  }
  if (id.trim().length === 0) {
    throw new Error('Id cannot be an empty string or just spaces');
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw new Error('invalid object ID');
  }
  let productCollection = await products();
  const deletionInfo = await productCollection.findOneAndDelete({
    _id: new ObjectId(id),
  });

  if (!deletionInfo) {
    throw new Error(`Could not delete product with id of ${id}`);
  }
  return `${deletionInfo.productName} has been successfully deleted!`;
};

export const rename = async (id, newProductName) => {
  if (!id) {
    throw new Error('Please provide the valid id');
  }
  if (typeof id !== 'string') {
    throw new Error('Id must be a string');
  }
  if (id.trim().length === 0) {
    throw new Error('Id cannot be an empty string or just spaces');
  }
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw new Error('invalid object ID');
  }
  if (!newProductName) {
    throw new Error('Please provide the valid newProductName');
  }
  if (typeof newProductName !== 'string') {
    throw new Error('newProductName must be a string');
  }
  if (newProductName.trim().length === 0) {
    throw new Error('newProductName cannot be an empty string or just spaces');
  }
  newProductName = newProductName.trim();
  let productCollection = await products();
  const isProductThere = await productCollection.findOne({
    _id: new ObjectId(id),
  });
  if (isProductThere === null) {
    throw new Error('No product is there,  with that id');
  }
  if (isProductThere.productName === newProductName) {
    throw new Error('product name and the new name must not be same');
  }
  let updateInfo = productCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { productName: newProductName } }
  );
  if (!updateInfo) {
    throw new Error("Can't rename with the given id. It may not be existed");
  }
  let theProduct = get(id);

  // const theProduct = await productCollection.findOne({
  //   _id: new ObjectId(id),
  // });
  // theProduct._id = theProduct._id.toString();
  return theProduct;
  // console.log(updateInfo);
};
