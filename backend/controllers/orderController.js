import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// POST request to create new order
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({ user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// GET request to get order by id
const getOrderById = asyncHandler(async (req, res) => {
  console.log("cats")
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// GET request to update order as paid
const updateOrderAsPaid = asyncHandler(async (req, res) => {
  console.log("dogs1")
  
  
  const order = await Order.findById(req.params.id);
  // console.log(order)
  
  console.log("dogs2")
  if (order) {
    console.log("dogs3")
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    
    console.log("dogs4")
    console.log(order)
    
    const updatedOrder = await order.save();
    
    console.log("dogs5")
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export { addOrderItems, getOrderById, updateOrderAsPaid };
