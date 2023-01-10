import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { AdminToken, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      paymentResults: req.body.paymentResults,
      itemsPrice: req.body.itemsPrice,
      delivery: req.body.delivery,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

//GET USER ORDER
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

//GET ALL USER ORDERS
orderRouter.get(
  '/',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find();
      res.send(orders);
    } catch (err) {
      res.status(404).send(err);
    }
  })
);

//GET ALL USER ORDERS
orderRouter.get(
  '/income',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await Order.aggregate([
        { $match: { paidAt: { $gte: date } } },
        {
          $project: {
            month: { $month: '$paidAt' },
            sales: '$totalPrice',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ]);
      res.status(200).send(income);
    } catch (err) {
      res.status(500).send(err);
    }
  })
);

//GET ORDER
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

//DELETE ORDER
orderRouter.delete(
  '/:id',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: 'Order successfully deleted.' });
    } catch (err) {
      res.status(404).send({ message: 'Order Not Found.' });
    }
  })
);

// PAY ORDER
orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResults = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// DELIVER ORDER
orderRouter.put(
  '/:id/deliver',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
