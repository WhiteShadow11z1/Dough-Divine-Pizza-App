import express from "express";
import mailer from "nodemailer";

const sendRestockEmail = async(email, product) =>
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

    const messageOptions = {
        from : process.env.USER,
        to : email,
        subject : "Low Stock - reg",
        html : `<div><p>The stocks of ${product.name} are low</p></div>`
    }

    console.log(email, product);

    transporter.sendMail(messageOptions, (error, info) => {
        if(error)
        {
            console.log(error);
        }
        console.log(info);
    })
}

export default sendRestockEmail;