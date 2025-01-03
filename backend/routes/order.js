import {
  getMyOrders,
  getCarrierOrders,
  getOrdersByProductId,
  createNewOrder,
  updateDelivered,
  getMyCurrentOrder,
  getMyPrevOrders,
  updateOrderPaymentStatus,
  createPaymentSession,
} from "../controllers/ordersController.js";
import {carrier_auth} from "../middleware/carrier_auth.js";
import {auth} from "../middleware/auth.js";
import express from "express";

const router = express.Router();

// user routes
router.get("/get-my-orders", auth, getMyOrders);
router.get("/get-my-current-order", auth, getMyCurrentOrder);
router.get("/get-my-prev-orders", auth, getMyPrevOrders);
router.post("/create-new-order", auth, createNewOrder);
router.post("/create-payment", auth, createPaymentSession);

// Carrier-specific routes
router.get("/get-carrier-orders", carrier_auth, getCarrierOrders);
router.get("/get-by-product-id/:productId", carrier_auth, getOrdersByProductId);
router.post("/update-delivered", carrier_auth, updateDelivered);

// stripe webhook
router.post(
  "/webhook",
  express.raw({type: "application/json"}),
  updateOrderPaymentStatus
);

export default router;
