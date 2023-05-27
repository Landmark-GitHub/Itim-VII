import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2';

const dream_itim = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
});

export default async function handler(req, res) {

    //localhost:3000/api/checkbill?date=2023-05-16&name=Rohit&typeitim=StickXL
    //fetch ()


    //SELECT SUM(quantity) AS total_quantity FROM `requisition` 
    //WHERE date = '2023-05-27' AND name = 'ShivHkU' AND typeitem = 'StickXL';

    if (req.method === 'GET') {
        const { date, name , typeitim} = req.query;
    }
    const { date, name, typeitim, } = req.query;
    res.status(200).json({date: date,
                          name: name,
                          typeitim: typeitim});
}
