import { NextApiRequest, NextApiResponse } from "next";

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const { id } = req.query
  const { name, phone, idcard } = req.body;
    // simple query
    if (req.method === 'GET') {
      connection.query(
        'SELECT * FROM `member` WHERE `member_id`= ? ', [id],
        function (err, results, fields) {
          res.status(200).json(results)
        }
      );
    }else if (req.method === 'DELETE') {
      const { id } = req.query;
      connection.query(
        'DELETE FROM `member` WHERE `member_id` = ?',
        [id],
        function (err, results, fields) {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error' });
            return;
          }
          console.log(results);
          res.status(200).json({ message: 'Delete Member Success' });
        }
      );
    }else if (req.method === 'PUT'){
      const { member_id, member_name, member_phone, member_idcard } = req.body;
      connection.query(
        'UPDATE `member` SET `member_name` = ?, `member_phone` = ?, `member_idcard` = ? WHERE `member_id` = ?',
        [member_name, member_phone, member_idcard, member_id],
        function (err, results, fields) {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error' });
            return;
          }
          console.log(results);
          res.status(200).json({ message: 'Update Member Success' });
        }
      );
    }

}
