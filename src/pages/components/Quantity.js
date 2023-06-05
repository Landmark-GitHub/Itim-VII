import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Quantity(props) {
 
    const {date, name, nameitim} = props

    const [quantity, setQuanity] = useState([])

    const [loading, setLoading] = useState(false)


    const click = () => {
        console.log(quantity)
    }

    const axiosQuantity = async() => {

        try {
            setLoading(true);
            const source = axios.CancelToken.source();
            const timeoutId = setTimeout(() => {
                source.cancel('Request timeout');
            }, 100);

            const response = await axios.get(`http://localhost:3000/api/requisition/${date}/${name}/${nameitim}`, {
                params: {
                  date: date,
                  name: name,
                  nameItim: nameitim,
                },
                // cancelToken: source.token,
            });

            clearTimeout(timeoutId);

            if (response.status === 200) {
                const quantityData = response.data.length > 0 ? response.data[0].quantity : 0;
                setQuanity(quantityData);
                setLoading(false);
            } else {
                throw new Error('Failed to fetch data');
            }

        }catch(error){
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.log(`Connection to QuantityItim: ${error}`);
                alert(`Connection to QuantityItim: ${error}`);
            }
        } finally {
            setLoading(false);
            console.log('Finally block');
        }
    }

    useEffect(() => {
        axiosQuantity();
    })

  return (
    <>
        {loading ? 
            <SkeletonTheme baseColor="#c8d1d1" highlightColor="#ffffff">
                <div className="p-0">
                    <Skeleton height={40} width={150} />
                </div>
            </SkeletonTheme>
        :
            <div className=" flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quantity</h2>
                <h2 className="font-bold">{quantity}</h2>
            </div>
        } 
    </>
  )
}

export { Quantity };

