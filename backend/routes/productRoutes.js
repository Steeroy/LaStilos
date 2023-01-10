import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { AdminToken } from '../utils.js';

const productRouter = express.Router();

// GET ALL PRODUCTS
productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

// GET PRODUCT
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

// CREATE A PRODUCT
productRouter.post(
  '/',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product(req.body);

    try {
      const savedProduct = await newProduct.save();
      res
        .status(200)
        .send({ message: 'Product successfully created.', savedProduct });
    } catch (err) {
      res.status(500).send(err);
    }
  })
);

// UPDATE A PRODUCT
productRouter.put(
  '/:id',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res
        .status(200)
        .send({ message: 'Product successfully updated.', updatedProduct });
    } catch (err) {
      res.status(500).send(err);
    }
  })
);

// DELETE A PRODUCT
productRouter.delete(
  '/:id',
  AdminToken,
  expressAsyncHandler(async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: 'Product successfully deleted.' });
    } catch (err) {
      res.status(500).send(err);
    }
  })
);

export default productRouter;
