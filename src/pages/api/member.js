const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
});


export default function handler(req, res) {

  if (req.method === 'GET') {
    connection.query(
      'SELECT * FROM `member`',
      function (err, results, fields) {
        res.status(200).json(results)
      }
    );
  } else if (req.method === 'POST') {
    const { member_name, member_phone, member_idcard } = req.body;
    // insert a new member
    connection.query(
      'INSERT INTO `member` (`member_name`, `member_phone`, `member_idcard`) VALUES (?, ?, ?)',
      [member_name, member_phone, member_idcard],
      function (err, results, fields) {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Error' });
          return;
        } else {
          console.log(results);
          res.status(200).json({ message: 'Add Member Success' });
        }

      }
    );
  } else if (req.method === 'PUT'){
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