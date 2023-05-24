import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Quantity = (props) => {
 
    const {date, name, nameitim} = props

    const [quantity, setQuanity] = useState([])


    const click = () => {
        console.log(quantity)
    }

    const axiosQuantity = async() => {

        try {

            const response = await axios.get(`http://localhost:3000/api/requisition/${date}/${name}/${nameitim}`, {
                params: {
                  date: date,
                  name: name,
                  nameItim: nameitim,
                },
            });
            const quantityData = response.data.length > 0 ? response.data[0].quantity : 0;
            setQuanity(quantityData);

        }catch(error){
            console.error('Error:', error);
            alert(`โหลด Quantity ไม่สำเร็จ : ${error}`);
        }
    }

    useEffect(() => {
        axiosQuantity();
    })

  return (
    <>
        <div className=" flex justify-between mb-0">
            <div className="text-2xl font-bold">Quantity</div>
            <div className="text-4xl font-bold">{quantity}</div>
        </div>

    </>
  )
}
