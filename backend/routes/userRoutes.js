import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { AdminToken, generateToken, isAuth } from '../utils.js';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          imgUrl: user.imgUrl,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      imgUrl: req.body.imgUrl,
    });

    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      imgUrl: user.imgUrl,
      token: generateToken(user),
    });
  })
);

// Update details

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.imgUrl = user.imgUrl;
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        imgUrl: updatedUser.imgUrl,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

// Delete user
userRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: 'User has been deleted ' });
    } catch (err) {
      res.status(500).send(err);
    }
  })
);

//Get user
userRouter.get(
  '/find/:id',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        imgUrl: user.imgUrl,
        token: generateToken(user),
      });
    } catch (err) {
      res.status(500).send(err);
    }
  })
);

//Get all users
userRouter.get(
  '/',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(2)
        : await User.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  })
);

//Get user stats
userRouter.get(
  '/stats',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    const date = new Date();

    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  })
);

export default userRouter;
