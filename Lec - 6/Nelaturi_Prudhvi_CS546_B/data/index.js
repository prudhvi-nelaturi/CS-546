// This file should import both data files and export them as shown in the lecture code
import { create, get, getAll, remove, update } from './products.js';
import {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  removeReview,
} from './reviews.js';

export const productsData = { create, get, getAll, remove, update };
export const reviewsData = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  removeReview,
};
