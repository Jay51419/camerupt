import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
const wishlist = ["20 dariyas", "kalsubai trek"]
const mailOptions = {
    from: process.env.EMAIL,
    to: 'jaygandhi51419@gmail.com',
    subject: 'Wishlist',
    html: `
        <ul>
        ${wishlist.map(e => `<li>${e}</li>`)}  
        </ul>
    `
}


function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    transporter.sendMail(mailOptions,async function (error, info) {
        if (error) {
            await res.status(404).json(error)
        } else {
            await res.status(200).json({ name: 'Reminded king' })
        }
    });
    res.json({msg:"processing"})
  }
  
export default verifySignature(handler);

export const config = {
    api: {
      bodyParser: false,
    },
};