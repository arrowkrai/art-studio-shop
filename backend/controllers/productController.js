import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// GET request for all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // throw new Error("This is an error message")
  res.json(products);
});

// GET request for a single product
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };

