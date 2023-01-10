import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import stripe from 'stripe';
import { isAuth } from '../utils';

const stripeRouter = express.Router();

stripe(process.env.STRIPE_SECRET_KEY);

stripeRouter.post(
  '/payment',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.totalPrice,
        currency: 'usd',
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).send(stripeErr);
        } else {
          res.status(200).send(stripeRes);
        }
      }
    );
  })
);

export default stripeRouter;
