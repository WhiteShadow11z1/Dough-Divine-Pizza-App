import express from "express";
import mailer from "nodemailer";
import crypto from "crypto";
import Token from "../Models/TokenModel.js";

const sendMail = async(user, message, res) =>
{
    const transporter = mailer.createTransport(
        {
            host : process.env.HOST,
            service : process.env.SERVICE,
            post : Number(process.env.PORT),
            secure : Boolean(process.env.SECURE),
            auth : {
                user : process.env.USER,
                pass : process.env.PASS
            }
        }
    );

    const tokenValue = crypto.randomBytes(32).toString("hex");

    const token = new Token({userID : user._id, token : tokenValue});
    await token.save();

    const verificationLink = `http://localhost:5000/auth/verification/${token.userID}/${token.token}`
    const messageOptions = {
        from : process.env.USER,
        to : user.email,
        subject : message.subject,
        html : verificationLink
    }

    transporter.sendMail(messageOptions, (error, info) => {
        if(error)
        {
            console.log(error);
            res.status(500).json({message : message.error});
        }
        res.status(200).json({message : message.response});
    })
}

export default sendMail;