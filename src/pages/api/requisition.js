import { NextApiRequest, NextApiResponse } from "next";

const mysql = require('mysql2');

// create the connection to database
const dream_itim = mysql.createPool(process.env.DATABASE_URL);

export default async function handler(req, res) {
    
    if (req.method === 'GET') {
        const { date, name } = req.query;

        let query = 'SELECT * FROM `requisition`';

        // Add conditions to the query if date and name parameters are provided
        if (date && name) {
            query += ' WHERE `date` = ? AND `name` = ?';
        } else if (date) {
            query += ' WHERE `date` = ?';
        } else if (name) {
            query += ' WHERE `name` = ?';
        }

        //http://localhost:3000/api/requisition?date=2023-05-16&name=Rohit
        //http://localhost:3000/api/requisition
        try {
            await new Promise((resolve, reject) => {
                dream_itim.query(
                    query,
                    [date, name],
                    function (err, results, fields) {
                        if (err) {
                            reject(err);
                        } else {
                            const formattedResults = results.map((result) => ({
                                id: result.id,
                                date: result.date,
                                name: result.name,
                                nameitim: decodeURIComponent(result.nameitim),
                                typeitim: result.typeitim,
                                quantity: result.quantity,
                            }));

                            res.send(JSON.stringify(formattedResults, null, 2))
                            resolve();
                        }
                    }
                );
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error' });
        }
    }else if (req.method === 'POST') {
        try {
          const { date, name, nameitim, typeitim, quantity } = req.body;
          await new Promise((resolve, reject) => {
            dream_itim.query(
              'INSERT INTO `requisition` (`date`,`name`,`nameitim`,`typeitim`,`quantity`) VALUES (?, ?, ?, ?, ?)',
              [date, name, nameitim, typeitim, quantity],
              function (err, results, fields) {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              }
            );
          });
          res.status(200).json({ message: 'Add Quantity Success' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error' });
        }
    }else if (req.method === 'PUT'){
        const { date, name, nameitim, quantity} = req.body;
        dream_itim.query(
            'UPDATE `requisition` SET `quantity` = ? WHERE `date` = ? AND `name` = ? AND `nameItim` = ?',
            [quantity, date, name, nameitim],
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