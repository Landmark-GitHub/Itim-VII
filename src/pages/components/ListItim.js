import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import { useRouter } from 'next/router';
import swal from 'sweetalert2';
import { Quantity } from './Quantity';

const ListItim = () => {
    const [listItim, setListItim] = useState([]);
    const [detailItim, setDetailItim] = useState({})
    const [quantity, setQuantity] = useState(0);
    const [allquantity, setAllQuantity] = useState(0)


    const router = useRouter();
    const activity = router.query.activity;
    const date = router.query.date;
    const name = router.query.name;
  
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState(false);


    const selectItim = (nameitim, typeitim, pieceitim) => {
        // axiosAllQuantity();
        const selectedQuantity = allquantity.find(item => item.nameitim === nameitim) || { quantity: 0 }
        setQuantity(selectedQuantity.quantity)

        setModal(!modal);
        setDetailItim({
            date: date,
            name: name,
            nameitim: nameitim,
            typeitim: typeitim,
            pieceitim: pieceitim,
            quantity: selectedQuantity.quantity
        })
 
        // console.log('Open modal');
        // C:\Users\LandMark\Desktop\PROJUCT\Itim-VII\src\pages\[activity]\[date]\[name]\saveitim.js
        // router.push(`/${activity}/${date}/${name}/${nameitim}`)
        // C:\Users\LandMark\Desktop\PROJUCT\Itim-VII\src\pages\[activity]\[date]\[name]\saveitim\saveitim.js
        // router.push({
        //     pathname: `/${activity}/${date}/${name}/saveitim`,
        //     query: { nameitim, typeitim, pieceitim },
        //   });
    }

    const handleDecrease = (e) => {
        e.preventDefault()
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
        console.log(quantity)
    }

    const handleIncrease = (e) => {
        e.preventDefault()
        setQuantity(parseInt(quantity) + 1)
        console.log(quantity)
    }

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value >= 0 ? value : 0);
    }
    
    const saveQuantity = async(e) => {
        event.preventDefault(e)

        const newItem = {
            date: date,
            name: name,
            nameitim: detailItim.nameitim,
            typeitim: detailItim.typeitim,
            quantity: quantity,
        };

        console.log(newItem)

        try {
            const response = await axios.post('http://localhost:3000/api/requisition', newItem);

            if (response.status === 200) {
                console.log(newItem);
                swal.fire({
                    icon: 'success',
                    title: 'Save success',
                    html: `Date: ${newItem.date} <br> Name: ${newItem.name} <br> Item: ${newItem.nameitim} 
                            <br> Type Item: ${newItem.typeitim} <br> Quantity: ${newItem.quantity}`
                });
                setQuantity(0)
                axiosAllQuantity();
                setModal(!modal);
            } else {
                console.error(`HTTP error ${response.status}`);
                alert(`มีข้อผิดพลาดเกิดขึ้น AddItim: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error:', error);
            alert(`Error add itim หา http ไม่เจอ: ${error}`);
        }
    };

    const updateQuantity = async (e) => {
        e.preventDefault();
      
        const newItem = {
          date: date,
          name: name,
          nameitim: detailItim.nameitim,
          quantity: quantity,
        };
      
        try {
          const response = await axios.put(`http://localhost:3000/api/requisition/`, newItem);
      
          if (response.status === 200) {
            console.log(newItem);
            swal.fire({
              icon: 'success',
              title: 'Save success',
              html: `Date: ${newItem.date} <br> Name: ${newItem.name} <br> Item: ${newItem.nameitim} 
                      <br> Type Item: ${newItem.typeitem} <br> Quantity: ${newItem.quantity}`
            });
            axiosAllQuantity();
            setQuantity(0);
            setModal(!modal);
          } else {
            console.error(`HTTP error ${response.status}`);
            alert(`มีข้อผิดพลาดเกิดขึ้น AddItim: ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error:', error);
          alert(`Error add itim หา http ไม่เจอ: ${error}`);
        }
    };
      
    const axiosListItim = async () => {
        console.log('start axiosListItim')
        try {
            const data = await axios.get('http://localhost:3000/api/itim');
            setListItim(data.data);
            console.log('end axiosListItim')
        } catch (error) {
            console.log(`Connection to itimDB: ${error}`);
            alert(`Connection to itimDB: ${error}`);
        }
    };

    const axiosAllQuantity = async () => {
        console.log('start axiosAllQuantity')
        try {
            // http://localhost:3000/api/requisition/2023-05-24/ShivHkU
            // const response2 = await axios.get(`http://localhost:3000/api/requisition/${date}/${name}`,);
            const response2 = await axios.get(`http://localhost:3000/api/requisition/`, {
                params: {
                    date: date,
                    name: name,
                },
            });
            setAllQuantity(response2.data);
            console.log('end axiosAllQuantity')
        } catch (error) {
            console.error('Error:', error);
            alert(`เกิดปัญหาในการส่ง Req2 : ${error}`);
        }
    }

    useEffect(() => {
        axiosListItim();
        axiosAllQuantity();
    },[date, name]);

    return (
        <>
        <div div="true" className='h-5/6'>
            <div className='p-2 h-3/4 w-full font-sans grid grid-rows-3 gap-2 overflow-y-auto' style={{ gridAutoFlow: 'column' }}>
                {Array.isArray(listItim) &&
                    listItim.map(item => (
                        <div
                            key={item.itim_id}
                            className='bg-white drop-shadow-2xl w-80 rounded-lg cursor-pointer'
                            onClick={() => selectItim(item.itim_name, item.itim_type,item.itim_piece)}
                        >
                            <div className='grid grid-cols-2 gap-1 w-full h-full'>
                                <div className='bg-gray-300 rounded-lg m-2'>
                                    {activity}{date}{name}
                                </div>
                                <div className='py-2 cursor-pointer'>
                                    <h1 className='text-2xl font-bold'>{item.itim_name}</h1>
                                    <p className='text-lg'>Piece: {item.itim_piece}</p>
                                    <p className='text-lg'>Type: {item.itim_type}</p>
                                    <div className='mr-2 mt-1'>
                                        <Quantity
                                            name = {name}
                                            date = {date}
                                            nameitim = {item.itim_name}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className=' bg-gray-300 mt-2 rounded-lg grid w-full gap-2 md:grid-cols-4'>

                    <div className="m-2">
                        <input type="checkbox" id="react-option" value="" className="hidden peer"></input>
                        <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:border-gray-700 peer-checked:border-green-400 peer-checked:bg-green-400 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <div className="w-full text-lg font-semibold">Dry ICE</div>
                                <div className="w-full text-sm">Piece : 25</div>
                            </div>
                        </label>
                    </div>

                    <div className="m-2">
                        <input type="checkbox" id="flowbite-option" value="" className="hidden peer"></input>
                        <label htmlFor="flowbite-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-400 peer-checked:bg-green-400 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <div className="w-full text-lg font-semibold">Home</div>
                                <div className="w-full text-sm">Piece : 20</div>
                            </div>
                        </label>
                    </div>

                    <div className="m-2">
                        <input type="checkbox" id="angular-option2" value="" className="hidden peer"></input>
                        <label htmlFor="angular-option2" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-400 peer-checked:bg-green-400 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <div className="w-full text-lg font-semibold">Car</div>
                                <div className="w-full text-sm">Piece : 20</div>
                            </div>
                        </label>
                    </div>

                    <div className="m-2">
                        <input type="checkbox" id="angular-option3" value="" className="hidden peer"></input>
                        <label htmlFor="angular-option3" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-400 peer-checked:bg-green-400 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <div className="w-full text-lg font-semibold">Other</div>
                                <div className="w-full text-sm">Test 5000</div>
                            </div>
                        </label>
                    </div>

            </div>
        </div>

        {modal && detailItim.quantity === 0 && (
            <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>
                <form onSubmit={(e) => saveQuantity(e)} className='bg-white rounded-lg shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2 p-4' onClick={(e) => e.stopPropagation()}>

                    <div className='grid grid-cols-2 gap-2 w-full'>

                        <div className='bg-gray-300'>
                            {date}
                        </div>

                        <div className='text-2xl'>
                            <h1>AddItim</h1>
                            <h1 className='text-5xl font-bold text-black'>{detailItim.nameitim}</h1>
                            <p className='text-3xl font-bold'>Type: {detailItim.typeitim}</p>
                            <span className='text-3xl font-bold'>Piece: {detailItim.pieceitim}</span>

                            <div className="custom-number-input h-16 w-full flex justify-center">
                                <div className="flex gap-2 justify-between w-full bg-transparent">
                                    <button className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-full rounded-l cursor-pointer">
                                        <span className="text-2xl font-thin"
                                            onClick={(e) => handleDecrease(e)}>−</span>
                                    </button>
                                    <input type="int" className="w-32 text-center font-semibold text-md hover:text-blac md:text-base cursor-default flex items-center text-gray-700 outline-none"
                                        placeholder={quantity} value={quantity} onChange={(event) => handleInputChange(event)}
                                    >
                                    </input>
                                    <button className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-full rounded-l cursor-pointer">
                                        <span className="text-2xl font-thin"
                                            onClick={(e) => handleIncrease(e)}>+</span>
                                    </button>
                                </div>
                            </div>


                            <button type="submit" className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:text-sm">
                                Save
                            </button>
                            <button type="button" className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:text-sm"
                                onClick={() =>{setModal(!modal);}}>
                                Cancel
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
        )}

        {modal && detailItim.quantity > 0 && (
            <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>
                <form 
                onSubmit={(e) => updateQuantity(e)} 
                className='bg-white rounded-lg shadow-xl transform transition-all sm:w-3/4 md:w-2/3 lg:w-1/2 p-4' onClick={(e) => e.stopPropagation()}>

                    <div className='grid grid-cols-2 gap-2 w-full'>

                        <div className='bg-gray-300'>
                            {date}
                        </div>

                        <div className='text-2xl'>
                            <h1>Update Quantity</h1>
                            <h1 className='text-5xl font-bold text-black'>{detailItim.nameitim}</h1>
                            <p className='text-3xl font-bold'>Type: {detailItim.typeitim}</p>
                            <span className='text-3xl font-bold'>Piece: {detailItim.pieceitim}</span>

                            <div className="custom-number-input h-16 w-full flex justify-center">
                                <div className="flex gap-2 justify-between w-full bg-transparent">
                                    <button className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-full rounded-l cursor-pointer">
                                        <span className="text-2xl font-thin"
                                            onClick={(e) => handleDecrease(e)}>−</span>
                                    </button>
                                    <input type="int" className="w-32 text-center font-semibold text-md hover:text-blac md:text-base cursor-default flex items-center text-gray-700 outline-none"
                                        placeholder={quantity} value={quantity} onChange={(event) => handleInputChange(event)}
                                    >
                                    </input>
                                    <button className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-full rounded-l cursor-pointer">
                                        <span className="text-2xl font-thin"
                                            onClick={(e) => handleIncrease(e)}>+</span>
                                    </button>
                                </div>
                            </div>


                            <button type="submit" className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:text-sm">
                                Update
                            </button>
                            <button type="button" className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:text-sm"
                                onClick={() =>{setModal(!modal);}}>
                                Cancel
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
        )}
        </>
    );
};

export default ListItim;
