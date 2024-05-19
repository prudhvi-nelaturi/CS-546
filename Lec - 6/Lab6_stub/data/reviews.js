// This data file should export all functions using the ES6 standard as shown in the lecture code
import validation from '../helpers.js';
import { products } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import { v4 } from 'uuid';
import { getAll, remove, update, get } from './products.js';
export const createReview = async (
  productId,
  title,
  reviewerName,
  review,
  rating
) => {
  // console.log('asdf');
  const id = validation.checkId(productId);
  // console.log('qwert');
  const reviewTitle = validation.checkString(title, 'title');
  // console.log(reviewTitle);
  const reviewReviewerName = validation.checkString(
    reviewerName,
    'reviewerName'
  );
  const reviewContent = validation.checkString(review, 'review');
  if (!rating) {
    throw new Error('Invalid rating');
  }
  if (rating < 1 || rating > 5) {
    throw new Error('Invalid rating range');
  }
  if (typeof rating !== 'number') {
    throw new Error('Rating must be a number.');
  }
  let convertedRating = rating.toString();
  let value = 0;
  for (let i = 0; i < convertedRating.length; i++) {
    if (convertedRating[i] === '.') {
      // console.log(i);
      for (let j = i + 1; j < convertedRating.length; j++) {
        value++;
      }
    }
  }
  if (value > 1) {
    throw new Error('Rating must have only upto one decimal');
  }
  const dateToday = new Date();
  const dateObtained = `${
    dateToday.getMonth() + 1
  }/${dateToday.getDate()}/${dateToday.getFullYear()}`;
  // console.log(dateObtained);
  let newReview = {
    _id: new ObjectId(),
    title: reviewTitle,
    reviewDate: dateObtained,
    reviewerName: reviewReviewerName,
    review: reviewContent,
    rating: rating,
  };
  let obtainedData = await products();
  let result = await obtainedData.updateOne(
    { _id: new ObjectId(id) },
    { $push: { reviews: newReview } }
  );
  if (!result) {
    throw new Error("Couldn't add review!");
  }
  const theNewReviewId = newReview._id;
  // console.log(theNewReviewId);
  const theReview = await getReview(theNewReviewId.toString());

  let reviewArray = await getAllReviews(id);
  // console.log(reviewArray);
  let totalRating = 0;
  reviewArray.forEach((element) => {
    totalRating += element.rating;
  });
  // console.log(reviewArray.length);
  // console.log(totalRating);
  let ObtainedAverageRating = totalRating / reviewArray.length;
  // ObtainedAverageRating = Math.round(ObtainedAverageRating * 10) / 10;
  // console.log(ObtainedAverageRating);
  await obtainedData.updateOne(
    { _id: new ObjectId(id) },
    { $set: { averageRating: ObtainedAverageRating } }
  );

  const productCollection = await products();
  const theProduct = await productCollection.findOne(
    {
      _id: new ObjectId(id),
    }
    // { returnDocument: 'after' }
  );
  return theProduct;
};

export const getAllReviews = async (productId) => {
  const id = validation.checkId(productId);
  // console.log('qwert');
  const productCollection = await products();
  // console.log('asdf');
  const result = await productCollection.findOne(
    { _id: new ObjectId(id) },
    { projection: { _id: 0, reviews: 1 } }
  );
  //{projection: {_id: 0, 'reviews.$': 1}}
  if (!result) {
    throw new Error('No product with that ID');
  }
  if (result.length === 0) {
    return [];
  }
  return result.reviews;
};

export const getReview = async (reviewId) => {
  if (!reviewId) throw new Error('You must provide a name for the reviewer');
  const id = validation.checkId(reviewId);
  let productCollection = await products();
  const foundReview = await productCollection.findOne(
    { 'reviews._id': new ObjectId(id) },
    { projection: { _id: 0, 'reviews.$': 1 } }
  );
  if (!foundReview) throw new Error('Review Not found');
  // console.log(foundReview.reviews);
  return foundReview.reviews[0];
};

export const updateReview = async (reviewId, updateObject) => {
  const id = validation.checkId(reviewId);
  if (
    typeof updateObject !== 'object' ||
    Object.keys(updateObject).length === 0
  ) {
    throw new Error('Invalid UpdateObject');
  }
  const updatedReviewData = {};
  updatedReviewData._id = new ObjectId(id);
  const existingReviewObject = await getReview(reviewId);
  if (updateObject.title) {
    updatedReviewData.title = validation.checkString(
      updateObject.title,
      'title'
    );
  } else {
    updatedReviewData.title = existingReviewObject.title;
  }
  const dateToday = new Date();
  const dateObtained = `${
    dateToday.getMonth() + 1
  }/${dateToday.getDate()}/${dateToday.getFullYear()}`;
  updatedReviewData.reviewDate = dateObtained;
  if (updateObject.reviewerName) {
    updatedReviewData.reviewerName = validation.checkString(
      updateObject.reviewerName,
      'reviewerName'
    );
  } else {
    updatedReviewData.reviewerName = existingReviewObject.reviewerName;
  }
  if (updateObject.review) {
    updatedReviewData.review = validation.checkString(
      updateObject.review,
      'review'
    );
  } else {
    updatedReviewData.review = existingReviewObject.review;
  }
  if (updateObject.rating) {
    if (updateObject.rating < 1 || updateObject.rating > 5) {
      throw new Error('Invalid rating range');
    }
    if (typeof updateObject.rating !== 'number') {
      throw new Error('Rating must be a number.');
    }
    let convertedRating = updateObject.rating.toString();
    let value = 0;
    for (let i = 0; i < convertedRating.length; i++) {
      if (convertedRating[i] === '.') {
        // console.log(i);
        for (let j = i + 1; j < convertedRating.length; j++) {
          value++;
        }
      }
    }
    if (value > 1) {
      throw new Error('Rating must have only upto one decimal');
    }
    updatedReviewData.rating = updateObject.rating;
  } else {
    updatedReviewData.rating = existingReviewObject.rating;
  }

  const isReviewExist = await getReview(reviewId);
  if (!isReviewExist) {
    throw new Error("Review isn't exist");
  }
  const productCollection = await products();
  const updateReviewInDb = await productCollection.findOneAndUpdate(
    {
      'reviews._id': new ObjectId(id),
    },
    { $set: { 'reviews.$': updatedReviewData } }
    // { returnDocument: 'after' }
  );
  if (!updateReviewInDb) {
    throw new Error("Couldn't update the review");
  }
  //
  const theProductId = updateReviewInDb._id.toString();
  // console.log(theProductId);
  let reviewArray = await getAllReviews(theProductId);
  let totalRating = 0;
  reviewArray.forEach((element) => {
    totalRating += element.rating;
  });
  let ObtainedAverageRating = totalRating / reviewArray.length;
  // ObtainedAverageRating = Math.round(ObtainedAverageRating * 10) / 10;
  // console.log(ObtainedAverageRating);
  await productCollection.updateOne(
    { _id: new ObjectId(theProductId) },
    { $set: { averageRating: ObtainedAverageRating } }
  );
  return await get(theProductId);
};

export const removeReview = async (reviewId) => {
  const id = validation.checkId(reviewId);
  const productCollection = await products();
  const removeReviewWithId = await productCollection.findOneAndUpdate(
    { 'reviews._id': new ObjectId(id) },
    { $pull: { reviews: { _id: new ObjectId(id) } } }
  );
  // console.log(removeReview);
  if (!removeReviewWithId) {
    throw new Error("Couldn't remove review");
  }
  const theProductId = removeReviewWithId._id.toString();
  let reviewArray = await getAllReviews(theProductId);
  let totalRating = 0;
  reviewArray.forEach((element) => {
    totalRating += element.rating;
  });
  let ObtainedAverageRating = 0;
  if (!reviewArray.length === 0) {
    ObtainedAverageRating = totalRating / reviewArray.length;
  }
  // ObtainedAverageRating = Math.round(ObtainedAverageRating * 10) / 10;
  // console.log(ObtainedAverageRating);
  await productCollection.updateOne(
    { _id: new ObjectId(theProductId) },
    { $set: { averageRating: ObtainedAverageRating } }
  );
  return await get(theProductId);
  // return removeReviewWithId;
  // const productIs = await productCollection.find({
  //   reviews_id: new ObjectId(id),
  // });
};
