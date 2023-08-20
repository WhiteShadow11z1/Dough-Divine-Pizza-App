import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        base : {
            type : String
        },
        sauce : {
            type : String
        },
        cheese : {
            type : String
        },
        toppings : {
            type : Array,
            default : []
        },
        email : {
            type : String
        },
        status : {
            type : String
        }
    },
    {
        timestamps : true
    }
)

const OrderModel = mongoose.model("Orders", OrderSchema);
export default OrderModel;