const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createPool(process.env.DATABASE_URL);

export default function itim(req, res) {
  // simple query
  connection.query(
    'SELECT * FROM `itim`',
    function (err, results, fields) {
        res.status(200).json({results});
    }
  );

//   if (connection.status === 500) {
//     NextApiResponse.send('Hello');
//   }
}


// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' });
// }
