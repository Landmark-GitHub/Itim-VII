import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2';
import { useState } from "react";

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
});

export default async function dynamicHandler(req, res) {
    const { params } = req.query;
    const [date, name, nameItim] = params;

    let query = 'SELECT';

    if (date && name && nameItim) {
        query += ' nameItim, quantity FROM `requisition` WHERE `date` = ? AND `name` = ? AND `nameItim` = ?';
    } else if (date && name) {
        query += ' nameItim, quantity FROM `requisition` WHERE `date` = ? AND `name` = ?';
    } else if (date) {
        query += ' * FROM `requisition` WHERE `date` = ? ';
    }


    if (req.method === 'GET') {
        connection.query(query, [date, name, nameItim], function (err, results, fields) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }      
            
            const formattedResults = results.map((result) => ({
                id: result.id,
                date: result.date,
                name: result.name,
                nameitim: result.nameitim,
                typeitem: result.typeitem,
                quantity: result.quantity,
              }));
              
              const jsonOutput = JSON.stringify(formattedResults, null, 2);
              return res.send(results);
            
        });
    }


    // if (req.method === 'GET') {
    //     if (date) {
    //         connection.query(
    //             'SELECT * FROM `requisition` WHERE `date` = ?',
    //             [date],
    //             function (err, results, fields) {
    //                 if (err) {
    //                     console.error(err);
    //                     return res.status(500).json({ error: 'Internal Server Error' });
    //                 }
    //                 const formattedResults = JSON.stringify(results, null, 2);
    //                 return res.send(formattedResults);
    //             }
    //         )
    //     } 
    //     else if (date && name) {
    //         connection.query(
    //             'SELECT * FROM `requisition` WHERE `date` = ? AND `name` = ?',
    //             [date, name],
    //             function (err, results, fields) {
    //                 if (err) {
    //                     console.error(err);
    //                     return res.status(500).json({ error: 'Internal Server Error' });
    //                 }
    //                 return res.send(results);
    //             }
    //         )
    //     } 
    //     else if (date, name, nameItim) {
    //         connection.query(
    //             'SELECT nameItim, quantity FROM `requisition` WHERE `date` = ? AND `name` = ? AND `nameItim` = ?',
    //             [date, name, nameItim],
    //             function (err, results, fields) {
    //                 if (err) {
    //                     console.error(err);
    //                     return res.status(500).json({ error: 'Internal Server Error' });
    //                 }
    
    //                 const formattedResults = results.map((result) => ({
    //                     nameItim: decodeURIComponent(result.nameItim),
    //                     quantity: result.quantity,
    //                 }));
    
    //                 return res.send(formattedResults);
    //             }
    //         );
    //     }
    // }
}