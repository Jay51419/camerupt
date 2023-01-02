import { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/nextjs";
import nodemailer from "nodemailer"
import db, { WishListSchema } from "../../utils/db";
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  db('SELECT * FROM wishlist')
    .then(wishlist => transporter.sendMail({
      from: process.env.EMAIL,
      to: 'jaygandhi51419@gmail.com',
      subject: 'Wishlist',
      html: `
          <ul>
          ${wishlist ? wishlist.map(e => `<li>${e.name}</li>`) : "Databse error"}  
          </ul>
      `
    })
      .then(e => (res.status(200).json({ msg: "Reminded king" })))
      .catch(err => (res.json(err))))

}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};