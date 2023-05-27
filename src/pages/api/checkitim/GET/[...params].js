import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2';

const dream_itim = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});

export default async function dynamicHandler(req, res) {
  const { params } = req.query;
  const [date, name, typeitim] = params;

  let query = 'SELECT ';

  if (date && name && typeitim) {
    query += 'name, typeItim, SUM(quantity) AS total_quantity FROM `requisition` WHERE `date` = ? AND `name` = ? AND `typeitim` = ?';
  } else if (date && name) {
    query += 'name, typeItim, SUM(quantity) AS total_quantity FROM `requisition` WHERE `date` = ? AND `name` = ? GROUP BY `typeitim`';
  } else if (date) {
    query += 'name, typeItim, SUM(quantity) AS total_quantity FROM `requisition` WHERE `date` = ? GROUP BY `name`, `typeitim`';
  }

  dream_itim.query(query, [date, name, typeitim], function (err, results, fields) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error', date, name, typeitim });
    }
    const formattedResults = JSON.stringify(results, null, 2); // Format the JSON response
    return res.send(formattedResults);
  });
}




    //localhost:3000/api/checkitim/GET/2023-05-16/Landmark/StickXL
    //fetch (localhost:3000/api/checkitim/GET/{date}/{name}/{typeitim})

    // SELECT SUM(quantity) AS total_quantity
    // FROM `requisition`
    // WHERE date = '2023-05-27' AND name = 'ShivHkU' AND typeitem = 'StickXL';
