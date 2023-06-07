import { NextApiRequest, NextApiResponse } from "next";

const mysql = require('mysql2');

// create the connection to database
const dream_itim = mysql.createPool(process.env.DATABASE_URL);

export default function handler(req, res) {

    //http://localhost:3000/api/balance/date/name
    const { params } = req.query;
    const [date, name] = params;

    if (req.method === 'GET') {
        dream_itim.query(
        'SELECT * FROM `balance2` WHERE `date` = ? AND `name` = ?',
        [date, name],
        function (err, results, fields) {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Error' });
                return;
            } else {
                res.status(200).json(results)
            }
        })
    } else {
        
    }
  }