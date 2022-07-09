import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById, updateOrderAsPaid, getProfileOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/profileorders").get(protect, getProfileOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderAsPaid);
export default router;
