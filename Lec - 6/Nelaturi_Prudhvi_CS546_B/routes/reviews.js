// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from 'express';
import { reviewsData } from '../data/index.js';
const router = Router();
import validation from '../helpers.js';
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
      const reviewList = await reviewsData.getAllReviews(req.params.productId);
      if (reviewList.length === 0) {
        throw new Error('Reviews not found for this product id');
      }
      return res.json(reviewList);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let reviewInfo = req.body;
    if (!reviewInfo || Object.keys(reviewInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    try {
      // console.log('here');
      req.params.productId = validation.checkId(req.params.productId);

      const reviewTitle = validation.checkString(reviewInfo.title, 'title');
      // console.log(reviewTitle);
      const reviewReviewerName = validation.checkString(
        reviewInfo.reviewerName,
        'reviewerName'
      );
      const reviewContent = validation.checkString(reviewInfo.review, 'review');
      if (!reviewInfo.rating) {
        throw new Error('Invalid rating');
      }
      if (reviewInfo.rating < 1 || reviewInfo.rating > 5) {
        throw new Error('Invalid rating range');
      }
      if (typeof reviewInfo.rating !== 'number') {
        throw new Error('Rating must be a number.');
      }
      let convertedRating = reviewInfo.rating.toString();
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
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    try {
      const newReview = await reviewsData.createReview(
        req.params.productId,
        reviewInfo.title,
        reviewInfo.reviewerName,
        reviewInfo.review,
        reviewInfo.rating
      );
      return res.json(newReview);
    } catch (e) {
      return res.sendStatus(500);
    }
    // console.log(productInfo);
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const reviewId = validation.checkId(req.params.reviewId);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    try {
      const review = await reviewsData.getReview(req.params.reviewId);
      if (!review) {
        throw new Error('Review not found for this review id');
      }
      return res.json(review);
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  })
  .patch(async (req, res) => {
    //code for PATCH
    let reviewInfo = req.body;
    if (!reviewInfo || Object.keys(reviewInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }
    try {
      const reviewId = validation.checkId(req.params.reviewId);
      if (reviewInfo.title) {
        reviewInfo.title = validation.checkString(reviewInfo.title, 'title');
      }
      if (reviewInfo.reviewerName) {
        reviewInfo.reviewerName = validation.checkString(
          reviewInfo.reviewerName,
          'reviewerName'
        );
      }
      if (reviewInfo.review) {
        reviewInfo.review = validation.checkString(reviewInfo.review, 'review');
      }
      if (reviewInfo.rating) {
        if (reviewInfo.rating < 1 || reviewInfo.rating > 5) {
          throw new Error('Invalid rating range');
        }
        if (typeof reviewInfo.rating !== 'number') {
          throw new Error('Rating must be a number.');
        }
        let convertedRating = reviewInfo.rating.toString();
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
      }
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    try {
      let updatedReview = await reviewsData.updateReview(
        req.params.reviewId,
        reviewInfo
      );
      // console.log(updatedReview);
      return res.json(updatedReview);
    } catch (e) {
      return res.status(404).send({ error: e.message });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      const reviewId = validation.checkId(req.params.reviewId);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
    try {
      let reviewDeleted = await reviewsData.removeReview(req.params.reviewId);
      return res.json(reviewDeleted);
    } catch (e) {
      return res.status(404).send({ error: e.message });
    }
  });

export default router;
