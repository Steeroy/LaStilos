import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import data from '../data.js';
import Team from '../models/teamModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  await Team.deleteMany({});

  const createdTeam = await Team.insertMany(data.team);
  res.send({ createdProducts, createdUsers, createdTeam });
});

export default seedRouter;
