import express from "express";
import {getStock, restock } from "../../Controllers/Admin/InventoryController.js";

const router = express.Router();

router.get("/stock", getStock);
router.post("/stock/restock", restock);

export default router;