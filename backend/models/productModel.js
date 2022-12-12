import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    inStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numRatings: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
