const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool(process.env.DATABASE_URL);

export default function handler(req, res) {

    if (req.method === 'GET') {
        const { date, name } = req.query;
        
        connection.query(
        `SELECT * FROM balance2 WHERE date < ? AND name = ? ORDER BY date DESC LIMIT 6`,
        [date, name],
        function (err, results, fields) {
            if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
            }
            
            res.status(200).json(results);
        }
        );
    } else {
        res.status(400).json({ message: 'Method Not Allowed' });
    }
}


// const mysql = require('mysql2');

// // create the connection to database
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
// });

// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     const { date, name } = req.query;

//     connection.query(
//       'SELECT * FROM balance2 WHERE date < ? AND name = ? ORDER BY date DESC LIMIT 6',
//       [date, name],
//       function (err, results, fields) {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ message: 'Internal server error' });
//           return;
//         }

//         res.status(200).json(results);
//       }
//     );
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }

