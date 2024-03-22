import { Int32 } from "mongodb";
import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
    {
        name : {
            type : String,
        },
        count : {
            type : Number
        }
    }
);

const InvertoryModel = mongoose.model("Inventory", InventorySchema);
export default InvertoryModel;