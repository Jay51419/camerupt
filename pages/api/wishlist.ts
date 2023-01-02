import { NextApiRequest, NextApiResponse } from "next";
import db from "../../utils/db";



async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body
  switch (req.method) {
    case "GET":
      db('SELECT * FROM wishlist')
        .then(e => res.json(e))
        .catch(err => res.json(err))
      break;
    case "POST":
      if (body.name) {
        db(`INSERT INTO wishlist (name) VALUES ("${body.name}")`)
          .then(e => res.json(e))
          .catch(err => res.json(err))
      } else {
        res.json("Name is required")
      }
      break;
    case "PUT":
      if (body.name && body.id) {
        db(`UPDATE wishlist SET name="${body.name}" WHERE id=${body.id}`)
          .then(e => res.json(e))
          .catch(err => res.json(err))
      } else {
        res.json("Name and ID are required")
      }
      break;
    case "DELETE":
      if (body.id) {
        db(`DELETE FROM wishlist WHERE id=${body.id}`)
          .then(e => res.json(e))
          .catch(err => res.json(err))
      } else {
        res.json("ID is required")
      }
      break;
    default:
      break;
  }

}

export default handler;
