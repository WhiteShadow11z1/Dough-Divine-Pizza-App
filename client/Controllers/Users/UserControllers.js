import express from "express";
import InvertoryModel from "../../Models/Inventory.js";
import OrderModel from "../../Models/OrderModel.js";
import sendRestockEmail from "../../Middlewares/sendRestockEmail.js";
import AdminModel from "../../Models/AdminModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";


export const placeOrder = async(req, res) =>
{
    async function sendRestockEmailToAdmins(emails, itemName) {
        for (var i = 0; i < emails.length; i++) {
          try {
            await sendRestockEmail(emails[i], { name: itemName });
          } catch (error) {
            console.log(error);
          }
        }
    }

    console.log(req);

    const {base, sauce, cheese, toppings, email} = req;
    try
    {
        console.log(req);
        const newOrder = new OrderModel({base : base, sauce : sauce, cheese : cheese, toppings : toppings, email : email, status : "Preparing"});
        await newOrder.save();
        
        const bases = await InvertoryModel.findOne({name : base});
        const updatedBase = await InvertoryModel.findOneAndUpdate({name : base}, {count : bases.count - 1}, {new : true});
       

        const sauces = await InvertoryModel.findOne({name : sauce});
        const updatedSauce = await InvertoryModel.findOneAndUpdate({name : sauce}, {count : sauces.count - 1}, {new : true});
        

        const cheeses = await InvertoryModel.findOne({name : cheese});
        const updatedCheese = await InvertoryModel.findOneAndUpdate({name : cheese}, {count : cheeses.count - 1}, {new : true});
        
        for(var i = 0; i < toppings.length; i++)
        {
            const topping = await InvertoryModel.findOne({name : toppings[i]});
            const updatedToppings = await InvertoryModel.findOneAndUpdate({name : toppings[i]}, {count : topping.count-1}, {new : true});
            await updatedToppings.save();
        }

        await updatedBase.save();
        await updatedCheese.save();
        await updatedSauce.save();

        const admins = await AdminModel.find();
        const emails = admins.map(obj => obj.email);
        console.log(emails);

        if(updatedBase.count <= 5){
            sendRestockEmailToAdmins(emails, base);
        }
        if(updatedSauce.count <= 5)
        {
            sendRestockEmailToAdmins(emails, sauce);
        }
        if(updatedCheese.count <= 5)
        {
            sendRestockEmailToAdmins(emails, cheese);
        }

        
        res.status(200).json({message : "Payment has been processed and order has been created!!"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

export const getOrder = async(req, res) =>
{
    const {email} = req.body;
    console.log(email);
    try
    {
        var stock = 0;
        stock = await OrderModel.find({email : email}).sort({timestamp : -1});
        res.status(200).json(stock);
    }
    catch(err)
    {
        res.status(500).json({message : err});
    }
}


export const orderGeneration = async(req, res) => 
{
    try
    {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        var options = {
            amount: req.body.price * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        };

        instance.orders.create(options, function(err, order) {
            if(err)
            {
                console.log(err);
                res.status(500).json({error: err, message : "Internal Server Error"});
            }
            console.log(order);
            res.status(200).json({data : order});
        });
    }
    catch(err)
    {
        res.status(500).json({error : err, message : "Internal Server Error"});
    }
}

export const verifyPayment = async(req, res) =>
{
    const {razorpay_order_id, razorpay_signature, razorpay_payment_id} = req.body.verify;
    try{
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256",process.env.KEY_SECRET).update(sign.toString()).digest("hex");
        if(razorpay_signature === expectedSign){
            placeOrder(req.body.order, res);
        }
        else{
            res.status(400).json({message : "Invalid signature"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error : err, message : "Internal server error"});
    }
}