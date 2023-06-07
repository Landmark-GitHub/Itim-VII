import { NextApiRequest, NextApiResponse } from "next";
const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createPool(process.env.DATABASE_URL);

export default function itimdb(NextApiRequest, NextApiResponse) {
  // simple query
  connection.query(
    'SELECT * FROM `itim`',
    function (err, results, fields) {
      NextApiResponse.status(200).json(results);
    }
  );

  if (connection.status === 500) {
    NextApiResponse.send('Hello');
  }
}
