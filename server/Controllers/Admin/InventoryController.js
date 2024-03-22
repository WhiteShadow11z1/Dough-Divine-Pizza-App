import express from "express";
import InvertoryModel from "../../Models/Inventory.js";

export const restock = async(req, res) =>
{
    const {name, count} = req.body;

    try 
    {
        const product = await InvertoryModel.findOne({name : name});

        if(product)
        {
            const updatedProduct = await InvertoryModel.findOneAndUpdate({name : name}, {count : count}, {new : true});
            await updatedProduct.save();

            const stock = await InvertoryModel.find();
            res.status(200).json({stock : stock, message : "Stock has been added"});
        }
        else
        {
            res.status(400).json({stock : null, message : "No such item exists"});
        }
    }
    catch(err)
    {
        res.status(500).json({error : err, message : "Server's not responding! Please try again after some time!!"});
    }
}

export const getStock = async(req, res) => 
{
    try
    {
        const stock = await InvertoryModel.find();
        res.status(200).json(stock);
    }
    catch(err)
    {
        res.status(500).json({message : "Internal Server Error"});
    }
}

