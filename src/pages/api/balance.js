const mysql = require('mysql2');

// create the connection to database
const dream_itim = mysql.createPool(process.env.DATABASE_URL);

export default function handler(req, res) {

    //http://localhost:3000/api/balance?date=123&name=123

    if (req.method === 'POST') {
        const {date, name, typeitim, quantity, } = req.body;
        // insert a new member
        dream_itim.query(
          'INSERT INTO `balance2` (`date`, `name`, `typeitim`, `quantity`) VALUES (?, ?, ?, ?)',
          [date, name, typeitim, quantity ],
          function (err, results, fields) {
            if (err) {
              console.error(err);
              res.status(500).json({ message: 'Error' });
              return;
            } else {
              console.log(results);
              res.status(200).json({ message: 'Save Success' });
            }
    
          }
        );
    } else if (req.method === 'PUT') {
      const { date, name, typeitim, quantity } = req.body;
      dream_itim.query(
        'UPDATE `balance2` SET `quantity` = ? WHERE `date` = ? AND `name` = ? AND `typeitim` = ?',
        [quantity, date, name, typeitim],
        function (err, results, fields) {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Error' });
            return;
          } else {
            console.log(results);
            res.status(200).json({ message: 'Update Success' });
          }
        }
      );
    } 
}