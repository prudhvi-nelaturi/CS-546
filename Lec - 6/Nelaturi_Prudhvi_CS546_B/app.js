import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

// const todayDate = new Date();
// console.log(todayDate);

// import { create, getAll, get, remove, update } from './data/products.js';
// // import { getAllReviews } from './data/reviews.js';
// import { dbConnection, closeConnection } from './config/mongoConnection.js';
// import {
//   createReview,
//   getAllReviews,
//   getReview,
//   updateReview,
//   removeReview,
// } from './data/reviews.js';
// import { ObjectId } from 'mongodb';

//Seeding
// const db = await dbConnection();
// try {
//   const result = await create(
//     '83 inch LG OLED',
//     "The advanced LG OLED evo C-Series is better than ever. The LG OLED evo C3 is powered by the next-gen a9 AI Processor Gen6—exclusively made for LG OLED—for ultra-realistic picture and sound. And the Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content. The LG OLED evo C3 not only performs great, but looks great as well. With an almost invisible bezel, it will blend into the background for a seamless look. When you're finished watching, display paintings, photos and other content to blend the LG OLED evo C3 into your space even more. But that's not all. Experience less searching and more streaming, thanks to the next generation of AI technology from LG webOS 23. Every LG OLED comes loaded with Dolby Vision for extraordinary color, contrast and brightness, plus Dolby Atmos** for wrap-around sound. And LG's FILMMAKER MODE allows you to see films just as the director intended. Packed with gaming features, the LG OLED evo C-Series comes with everything you need to win like a 0.1ms response time, native 120Hz refresh rate and four HDMI 2.1 inputs. *Based on LG internal testing: 55/65/77/83 LG OLED evo C3 models are brighter than non-OLED evo B3 models and excludes the 42 and 48 LG OLED evo C3. **Dolby, Dolby Atmos and the double-D symbol are registered trademarks of Dolby Laboratories.",
//     'OLED83C3PUA',
//     4757.29,
//     'LG',
//     'http://www.lgelectronics.com',
//     ['TV', 'Smart TV', 'OLED', 'LG', 'Big Screen', '83 Inch'],
//     ['Electronics', 'Television & Video', 'Televisions', 'OLED TVs'],
//     '04/15/2023',
//     false
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   const result = await create(
//     'iPhone 14 Pro',
//     'iPhone 14 Pro 256 GB with tri-Camera. Enjoy.',
//     'i-123456',
//     999,
//     'Apple',
//     'http://www.AppleEle.com',
//     ['Phone', 'Smart Pjone', 'OLED', 'Apple', 'Touch Screen', '6 Inch'],
//     ['Electronics', 'SmartPhones', 'HandPhone', 'Mobiles'],
//     '01/29/2022',
//     false
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   const result = await create(
//     'HP Laptop',
//     'HP Laptop 512 SSD 16 GB RAM',
//     'H-PackardModel5',
//     1499,
//     'Hawlett Packard',
//     'http://www.HPLaptops.com',
//     ['Laptop', 'LED', 'HP', 'Big Screen', '15.5 Inch'],
//     ['Electronics', 'Laptops', 'Softwares', 'Computations'],
//     '02/11/2024',
//     false
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   const result = await create(
//     'testname',
//     'TestDescription',
//     'TestModelNumber',
//     1234,
//     'Test',
//     'http://www.testwebsite.com',
//     ['test', 'testing TV', 'tester', 'testable'],
//     ['testeersttesting', 'testingasdf', 'teaaasting', 'taaaste'],
//     '09/26/1999',
//     false
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// console.log('projection issue');
// try {
//   const result = await getAll();
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   // console.log('asdf');
//   const result = await get('65f7c50580a66d3feaaf5e95');
//   // console.log('qwer');
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   // console.log('asdf');
//   const result = await remove('65f7c50580a66d3feaaf5e96');
//   // console.log('qwer');
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   const result = await update(
//     '65f89b622de31e089c7ff260',
//     'name',
//     'description given',
//     'Model changed also',
//     56,
//     'Trends Ajio',
//     'http://www.mybraasdfAJIOgiven.com',
//     ['TV', 'fasion', '83 Inch'],
//     ['Televisions', 'OLED TVs'],
//     '3/11/2024',
//     false
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   // console.log('sdf');
//   let result = await createReview(
//     '65f89b622de31e089c7ff25f',
//     'Wow',
//     'Prudhvi Nelaturi',
//     "This TV was amazing! I don't know how I'll ever go back after experiencing OLED!",
//     5
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   // console.log('sdf');
//   let result = await createReview(
//     '65f89b622de31e089c7ff25f',
//     'wowtest',
//     'Prudhvi Nelaturi test',
//     'this tv is good review test',
//     3
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   // console.log('sdf');
//   let result = await createReview(
//     '65f89b622de31e089c7ff25f',
//     'good good',
//     'Master reviewer',
//     "This TV was amazing! I don't kno",
//     4
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   // console.log('sdf');
//   let result = await createReview(
//     '65f89b622de31e089c7ff260',
//     'great',
//     'Prudhvi Nelaturi',
//     'This Phone is good',
//     3
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   // console.log('sdf');
//   let result = await createReview(
//     '65f89b622de31e089c7ff260',
//     'awesome',
//     'Kalyan mamidikatya',
//     'This phone is my heart',
//     4.9
//   );
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   const Reviews = await getAllReviews('65f7c50580a66d3feaaf5e93');
//   console.log(Reviews);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   const reviewtoReviw = await removeReview('65f88f6b12ac3fe3ebeaf5c7');
//   console.log(reviewtoReviw);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   const result = await getReview('65f664d640a0d6feba0b8b77');
//   console.log(result);
// } catch (error) {
//   console.log(error.message);
// }

// try {
//   let reviewObject = {
//     title: 'wow3.0',
//     // review: 'Movie super Thalaiva',
//     reviewerName: 'Rajinikanth',
//     rating: 4,
//   };
//   // let reviewArray = 0;
//   const reviewToUpdate = await updateReview(
//     '65f89bac9b61bff5a7c8d621',
//     reviewObject
//   );
//   console.log(reviewToUpdate);
// } catch (error) {
//   console.log(error.message);
// }
// await closeConnection();
