// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from 'express';
import { productsData } from '../data/index.js';
const router = Router();
import validation from '../helpers.js';
import { isHttpUri, isHttpsUri, isUri, isWebUri } from 'valid-url';

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const productsList = await productsData.getAll();
      return res.json(productsList);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let productInfo = req.body;
    // console.log(productInfo);
    if (!productInfo || Object.keys(productInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }

    try {
      if (
        !productInfo.productName ||
        !productInfo.productDescription ||
        !productInfo.modelNumber ||
        !productInfo.price ||
        !productInfo.manufacturer ||
        !productInfo.manufacturerWebsite ||
        !productInfo.keywords ||
        !productInfo.categories ||
        !productInfo.dateReleased
      )
        throw new Error('All fields must be supplied');

      if (
        typeof productInfo.productName !== 'string' ||
        typeof productInfo.productDescription !== 'string' ||
        typeof productInfo.modelNumber !== 'string' ||
        typeof productInfo.manufacturer !== 'string' ||
        typeof productInfo.manufacturerWebsite !== 'string' ||
        typeof productInfo.dateReleased !== 'string'
      ) {
        throw new Error('data type mismatch in the input parameters');
      }
      productInfo.productName = productInfo.productName.trim();
      productInfo.productDescription = productInfo.productDescription.trim();
      productInfo.modelNumber = productInfo.modelNumber.trim();
      productInfo.manufacturer = productInfo.manufacturer.trim();
      productInfo.manufacturerWebsite = productInfo.manufacturerWebsite.trim();
      productInfo.dateReleased = productInfo.dateReleased.trim();

      if (
        productInfo.productName.length === 0 ||
        productInfo.productDescription.length === 0 ||
        productInfo.modelNumber.length === 0 ||
        productInfo.manufacturer.length === 0 ||
        productInfo.manufacturerWebsite.length === 0 ||
        productInfo.dateReleased.length === 0
      ) {
        throw new Error(
          'some input parameters cannot be empty strings or strings with just spaces'
        );
      }
      if (typeof productInfo.price !== 'number' || productInfo.price <= 0) {
        throw new Error('Price must be a number greater than 0.');
      }
      let convertedPrice = productInfo.price.toString();
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

      let myArray = productInfo.manufacturerWebsite.split('.');
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
        !isWebUri(productInfo.manufacturerWebsite) ||
        !isHttpUri(productInfo.manufacturerWebsite) ||
        !isUri(productInfo.manufacturerWebsite)
      ) {
        throw new Error('Invalid Website');
      }
      if (!Array.isArray(productInfo.keywords)) {
        throw new Error('You must provide an array of keywords');
      }
      if (productInfo.keywords.length === 0) {
        throw new Error('You must supply at least one keyword');
      }
      for (let i in productInfo.keywords) {
        if (
          typeof productInfo.keywords[i] !== 'string' ||
          productInfo.keywords[i].trim().length === 0
        ) {
          throw new Error(
            'One or more keywords is not a string or is an empty string'
          );
        }
        productInfo.keywords[i] = productInfo.keywords[i].trim();
      }

      if (!Array.isArray(productInfo.categories)) {
        throw new Error('You must provide an array of categories');
      }
      if (productInfo.categories.length === 0) {
        throw new Error('You must supply at least one category');
      }
      for (let i in productInfo.categories) {
        if (
          typeof productInfo.categories[i] !== 'string' ||
          productInfo.categories[i].trim().length === 0
        ) {
          throw new Error(
            'One or more categories is not a string or is an empty string'
          );
        }
        productInfo.categories[i] = productInfo.categories[i].trim();
      }

      const parts = productInfo.dateReleased.split('/');
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
      if (typeof productInfo.discontinued !== 'boolean') {
        throw new Error('discontinued must be boolean');
      }
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    try {
      const newProduct = await productsData.create(
        productInfo.productName,
        productInfo.productDescription,
        productInfo.modelNumber,
        productInfo.price,
        productInfo.manufacturer,
        productInfo.manufacturerWebsite,
        productInfo.keywords,
        productInfo.categories,
        productInfo.dateReleased,
        productInfo.discontinued
      );
      return res.json(newProduct);
      // return res.json(newUser);
    } catch (e) {
      return res.sendStatus(500).json({ error: e.message });
    }
  });

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
    try {
      // console.log('here');
      req.params.productId = validation.checkId(req.params.productId);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    try {
      // console.log('herer');
      let product = await productsData.get(req.params.productId);
      return res.json(product);
    } catch (e) {
      return res.status(404).json({ error: 'Product not found' });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.productId = validation.checkId(req.params.productId);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    try {
      let deletedProduct = await productsData.remove(req.params.productId);
      return res.json(deletedProduct);
    } catch (e) {
      return res.status(404).send({ error: e.message });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let productInfo = req.body;
    if (!productInfo || Object.keys(productInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    try {
      req.params.productId = validation.checkId(req.params.productId);
      if (
        !productInfo.productName ||
        !productInfo.productDescription ||
        !productInfo.modelNumber ||
        !productInfo.price ||
        !productInfo.manufacturer ||
        !productInfo.manufacturerWebsite ||
        !productInfo.keywords ||
        !productInfo.categories ||
        !productInfo.dateReleased
      )
        throw new Error('All fields must be supplied');

      if (
        typeof productInfo.productName !== 'string' ||
        typeof productInfo.productDescription !== 'string' ||
        typeof productInfo.modelNumber !== 'string' ||
        typeof productInfo.manufacturer !== 'string' ||
        typeof productInfo.manufacturerWebsite !== 'string' ||
        typeof productInfo.dateReleased !== 'string'
      ) {
        throw new Error('data type mismatch in the input parameters');
      }
      productInfo.productName = productInfo.productName.trim();
      productInfo.productDescription = productInfo.productDescription.trim();
      productInfo.modelNumber = productInfo.modelNumber.trim();
      productInfo.manufacturer = productInfo.manufacturer.trim();
      productInfo.manufacturerWebsite = productInfo.manufacturerWebsite.trim();
      productInfo.dateReleased = productInfo.dateReleased.trim();

      if (
        productInfo.productName.length === 0 ||
        productInfo.productDescription.length === 0 ||
        productInfo.modelNumber.length === 0 ||
        productInfo.manufacturer.length === 0 ||
        productInfo.manufacturerWebsite.length === 0 ||
        productInfo.dateReleased.length === 0
      ) {
        throw new Error(
          'some input parameters cannot be empty strings or strings with just spaces'
        );
      }
      if (typeof productInfo.price !== 'number' || productInfo.price <= 0) {
        throw new Error('Price must be a number greater than 0.');
      }
      let convertedPrice = productInfo.price.toString();
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

      let myArray = productInfo.manufacturerWebsite.split('.');
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
        !isWebUri(productInfo.manufacturerWebsite) ||
        !isHttpUri(productInfo.manufacturerWebsite) ||
        !isUri(productInfo.manufacturerWebsite)
      ) {
        throw new Error('Invalid Website');
      }
      if (!Array.isArray(productInfo.keywords)) {
        throw new Error('You must provide an array of keywords');
      }
      if (productInfo.keywords.length === 0) {
        throw new Error('You must supply at least one keyword');
      }
      for (let i in productInfo.keywords) {
        if (
          typeof productInfo.keywords[i] !== 'string' ||
          productInfo.keywords[i].trim().length === 0
        ) {
          throw new Error(
            'One or more keywords is not a string or is an empty string'
          );
        }
        productInfo.keywords[i] = productInfo.keywords[i].trim();
      }

      if (!Array.isArray(productInfo.categories)) {
        throw new Error('You must provide an array of categories');
      }
      if (productInfo.categories.length === 0) {
        throw new Error('You must supply at least one category');
      }
      for (let i in productInfo.categories) {
        if (
          typeof productInfo.categories[i] !== 'string' ||
          productInfo.categories[i].trim().length === 0
        ) {
          throw new Error(
            'One or more categories is not a string or is an empty string'
          );
        }
        productInfo.categories[i] = productInfo.categories[i].trim();
      }

      const parts = productInfo.dateReleased.split('/');
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
      if (typeof productInfo.discontinued !== 'boolean') {
        throw new Error('discontinued must be boolean');
      }
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    try {
      const updatedProduct = await productsData.update(
        req.params.productId,
        productInfo.productName,
        productInfo.productDescription,
        productInfo.modelNumber,
        productInfo.price,
        productInfo.manufacturer,
        productInfo.manufacturerWebsite,
        productInfo.keywords,
        productInfo.categories,
        productInfo.dateReleased,
        productInfo.discontinued
      );
      return res.json(updatedProduct);
    } catch (e) {
      return res.status(404).send({ error: e.message });
    }
  });

export default router;
