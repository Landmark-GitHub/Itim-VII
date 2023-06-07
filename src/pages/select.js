import React, { useEffect, useState } from 'react'
import LayoutTest from "./components/LayoutTest";
import ListItim from './components/ListItim';
import {mysql} from 'mysql2';

const Requisition = () => {

    const connection = mysql.createPool(process.env.DATABASE_URL);
    const [data, setData] = useState([])

    useEffect(() => {
        connection.query(
            'SELECT * FROM `itim`',
            function (err, results, fields) {
                // res.status(200).json(results);
                setData(results);
            }
        );
    })

    return (
        <LayoutTest
        >
            <div className={`w-full h-5/6 bg-gray-500 opacity-75 
                    flex text-center items-center justify-center text-5xl`}>
                Select Member and Date Now <br></br>
            </div>
        </LayoutTest>
    )
}

export default Requisition
