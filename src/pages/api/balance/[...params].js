import { NextApiRequest, NextApiResponse } from "next";

const mysql = require('mysql2');

// create the connection to database
const dream_itim = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
});

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