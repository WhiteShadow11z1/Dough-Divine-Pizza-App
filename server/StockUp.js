import mongoose from "mongoose";
import InvertoryModel from "./Models/Inventory.js";

const stock = [
    {name : "Flat Bread Crust", count : 10},
    {name : "Thin Crust", count : 10},
    {name : "Cheese Crust", count : 10},
    {name : "Tomato Sauce", count : 10},
    {name : "Pesto Sauce", count : 10},
    {name : "White Sauce", count : 10},
    {name : "Hummus", count : 10},
    {name : "Buffalo Sauce", count : 10},
    {name : "Mozzarella", count : 10},
    {name : "Cheddar", count : 10},
    {name : "Panner", count : 10},
    {name : "Cottage", count : 10},
    {name : "Pepperoni", count : 10},
    {name : "Mushroom", count : 10},
    {name : "Bell Pepper", count : 10},
    {name : "Olives", count : 10},
    {name : "Onions", count : 10}
]


export const stockUp = async() => {
    InvertoryModel.insertMany(stock);
}