import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderAsPaid,
  getProfileOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/profileorders").get(protect, getProfileOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderAsPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
export default router;
