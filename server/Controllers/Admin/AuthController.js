import express from "express";
import AdminModel from "../../Models/AdminModel.js";
import bcrypt from "bcrypt";

export const login = async(req, res) =>
{
    const {adminID, password} = req.body;

    try
    {
        const admin = await AdminModel.findOne({adminID : adminID});
        if(admin)
        {
            const validPassword = await bcrypt.compare(password, admin.password);
            if(validPassword)
            {
                const userObject = {
                    adminID : adminID,
                    firstName : admin.firstName,
                    lastName : admin.lastName
                }

                const token = jwt.sign(userObject, process.env.JWT_KEY);

                res.status(200).json({message : "Admin authentication successfull!", accessToken : token});
            }
            else 
            {
                res.status(401).json({message : "Invalid Login Credentials"});
            }
        }
        else
        {
            res.status(404).json({message : "No such admin exists"});
        }
    }
    catch(err)
    {
        res.status(500).json({message : err.message});
    }
} 

export const register = async(req , res) =>
{
    //const {adminID} = req.body;

    try
    {
        //const admin = await AdminModel.findOne({adminID : adminID});

        //if(admin)
        //{
        //    res.status(403).json({message : "Admin already exists"});
        //}
        //else
        //{
            //const salt = await bcrypt.genSalt(process.env.SALTROUNDS);
            //const hashedPassword = await bcrypt.hash(req.body.password, salt);
            //req.body.password = hashedPassword;
            const newAdmin = new AdminModel(req.body);
            await newAdmin.save();
            res.status(200).json({message : "Your application has been considered, well process it and send an email regarding the further process!"});
        //}
    }
    catch(err)
    {
        res.status(500).json({message : err.message})
    }
}