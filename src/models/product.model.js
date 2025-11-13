import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true  // Removes whitespace from start and end
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    }, stock: {
      type: String,
      required: true,
      min: 0,
      default: 0,
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product',productSchema);
export default Product;