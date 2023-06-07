const mysql = require('mysql2');

export default function handler(req, res) {
    // const dream_itim = mysql.createPool(process.env.DATABASE_URL)
    // if (req.method === 'GET') {
    //     dream_itim.query(
    //         'SELECT * FROM `itim`',
    //         function (err, results, fields) {
    //             res.status(200).json(results);
    //         }
    //     );
    // } else {
    res.status(200).json({ name: 'John Do Hee' });
    // }
}
