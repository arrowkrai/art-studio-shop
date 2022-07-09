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

// DELETE request to delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// POST request to create a product
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Name",
    price: 0,
    user: req.user._id,
    image: "/",
    stock: 0,
    numReviews: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// PUT request to update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, stock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.stock = stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
