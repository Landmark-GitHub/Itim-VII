const mysql = require('mysql2');

// create the connection to the database
// const connection = mysql.createConnection(process.env.DATABASE_URL);


// export default function handler(req, res) {
//   // simple query
//   connection.query(
//     'SELECT * FROM `itim`',
//     function (err, results, fields) {
//         res.status(200).json(results);
//     }
//   );
// }


export default function handler(req, res) {
    const dream_itim = mysql.createPool(process.env.DATABASE_URL)
    if (req.method === 'GET') {
        dream_itim.query(
            'SELECT * FROM `itim`',
            function (err, results, fields) {
                res.status(200).json(results);
            }
        );
    }
    res.status(200).json({ name: 'John Do Hee' });
}
