import express, { response } from "express";
import bcrypt from "bcrypt";
import User from "../../Models/UserModel.js";
import jwt from "jsonwebtoken";
import TokenModel from "../../Models/TokenModel.js";
import sendMail from "../../Middlewares/sendEmail.js";


/*USER LOGIN*/
export const login = async(req, res) =>
{
    const {email, password} = req.body;

    try
    {
        const user = await User.findOne({email : email});
        if(user)
        {
            if(user.verified === true)
            {
                const isValidPassword = await bcrypt.compare(password, user.password);
                if(isValidPassword)
                {
                    const userObject = {
                        userID : user._id,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email
                    }
    
                    const token = jwt.sign(userObject, process.env.JWT_KEY);
    
                    res.status(200).json({message : "User authentication successfull!", accessToken : token});
                }
    
                else 
                {
                    res.status(401).json({message : "Invalid Credentials.Please check your login credentials!"});
                }
            }
            else
            {
                res.status(400).json({message : "You need to verify your email first"});
            }
        }
        else 
        {
            res.status(404).json({message : "Please create an account before logging in!"});
        }
    }
    catch(error)
    {
        res.status(500).json({message : error.message});
    }
}

/* NEW USER REGISTRATION */
export const register = async(req, res, next) =>
{
    const {password, email} = req.body;

    try
    {
        const user = await User.findOne({email : email});
        if(!user)
        {
            const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;
            const user = new User(req.body);
            await user.save();
            sendMail(user, res);
            res.status(200).json({message:"An verfication link has been sent to your email account !"})
        }
        else
        {
            res.status(403).json({message : "Email is already in use!"});
        }
    }
    catch(error)
    {
        res.status(500).json({message : error.message});
    }
}

/*USER VERIFICATION THROUGH EMAIL*/
export const verifyToken = async(req, res) =>
{
    const userID = req.params.userID;
    const token = req.params.token;

    try
    {
        const user = await User.findOne({_id : userID});
        if(user)
        {
            const validtoken = await TokenModel.findOne({userID : user._id});
            if(validtoken.token === token)
            {
                user.verified = "true";
                await user.save();
                await TokenModel.findOneAndDelete({userID : user._id});
                res.status(200).json({verified : "true", message : "New account has been created"});
            }
            else
            {
                res.status(409).json({verified : "false", message : "Invalid Link"});
            }
        }
        else
        {
            res.status(404).json({message : "Invalid Link, no such user exists"});
        }
    }
    catch(err)
    {
        res.status(500).json({message : err.message}); 
    }
}