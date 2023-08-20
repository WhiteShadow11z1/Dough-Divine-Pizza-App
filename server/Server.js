import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./Routes/UserRoutes/AuthRoutes.js";
import cors from "cors";
import AdminAuthRoutes from "./Routes/AdminRoutes/AuthRoutes.js";
import InventoryRoutes from "./Routes/AdminRoutes/InventoryRoutes.js";
import { stockUp } from "./StockUp.js";
import UserRoutes from "./Routes/UserRoutes/UserRoutes.js";
import OrderModel from "./Models/OrderModel.js";
const app = express();


/*CONFIG*/
dotenv.config();
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json({ extended : "true"}));
app.use(cors());

/*ROUTES*/
app.use("/admin", AdminAuthRoutes);
app.use("/auth", AuthRoutes);
app.use("/inventory", InventoryRoutes);
app.use("/user", UserRoutes);


/*MONGODB CONNECTION*/
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser : true, useUnifiedTopology : true})
.then(
    app.listen(5000, (req, res) => {
        console.log("Listening on port 5000");  
    })
).catch((error) => {
    console.log(`Database refused to connect + ${error}`);
});