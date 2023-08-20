import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        adminID : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        }
    }
);

const AdminModel = mongoose.model("Admins", AdminSchema);
export default AdminModel;