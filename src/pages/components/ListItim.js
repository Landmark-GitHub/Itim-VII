import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListItim = ({ children }) => {
    const [listItim, setListItim] = useState([]);

    const axiosListItim = async () => {
        try {
            const data = await axios.get('http://localhost:3000/api/itim');
            setListItim(data.data);
        } catch (error) {
            console.log(`Connection to itimDB: ${error}`);
            alert(`Connection to itimDB: ${error}`);
        }
    };

    useEffect(() => {
        axiosListItim();
    }, []);

    return (
        <div className='h-5/6'>
            { children }
            <div className='bg-red-300 p-2 h-3/4 w-full font-sans grid grid-rows-3 gap-2 overflow-y-auto' style={{ gridAutoFlow: 'column' }}>
                {Array.isArray(listItim) &&
                    listItim.map(item => (
                        <div
                            key={item.itim_id}
                            className='bg-white drop-shadow-2xl w-80 rounded-lg cursor-pointer'
                            onClick={() => selectItem(item.itim_name, item.itim_piece, item.itim_type, quantityTotal)}
                        >
                            <div className='grid grid-cols-2 gap-1 w-full h-full'>
                                <div className='bg-gray-300 rounded-lg m-2'>
                                    IMGGGGGGG
                                </div>
                                <div className='py-2 cursor-pointer'>
                                    <h1 className='text-2xl'>{item.itim_name}</h1>
                                    <p className='text-lg'>Piece: {item.itim_piece}</p>
                                    <p className='text-lg'>Type: {item.itim_type}</p>
                                    <div className='flex justify-between items-center mb-0 w-full'>
                                        Quantity
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
    );
};

export default ListItim;
