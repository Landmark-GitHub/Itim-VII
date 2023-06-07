import { NextApiRequest, NextApiResponse } from "next";
const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createPool(process.env.DATABASE_URL);

export default function itimdb(req, res) {
  // simple query
  connection.query(
    'SELECT * FROM `itim`',
    function (err, results, fields) {
      res.status(200).json(results);
    }
  );
}
