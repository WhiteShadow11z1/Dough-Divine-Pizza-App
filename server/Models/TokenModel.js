import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
    {
        userID : {
            type : String,
            required : true,
            unique : true
        },
        token : {
            type : String,
            required : true
        },
        createdAt : {
            type : Date,
            default : Date.now(),
            expires : 600
        }
    }
);

const TokenModel = mongoose.model("Token", TokenSchema);
export default TokenModel;