import express from "express";
import { placeOrder, getOrder, orderGeneration, verifyPayment} from "../../Controllers/Users/UserControllers.js";

const router = express.Router();

router.post("/status", getOrder);
router.post("/order", orderGeneration);
router.post("/payment/verify", verifyPayment);

export default router;